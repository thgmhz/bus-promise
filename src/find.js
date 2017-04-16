import axios from 'axios'
import { API } from './constants'

const handleError = err => {
  throw new Error(err)
}

const hasOptions = options => {
  options || handleError('O método "find" deve receber um objeto com opções.')
  return options
}

const hasAuth = options => {
  options.auth || handleError('O método "find" deve receber o parâmetro "auth".')
  return options
}

const isAllowedType = options => {
  options.tipo in API || handleError(`O "tipo" "${options.tipo}" não existe.`)
  return options
}

const hasRequiredParams = options => {
  const requiredParams = API[options.tipo].required
  if (!requiredParams) return options

  const checkParam = param => !(param in options)
  const missingParams = requiredParams.filter(checkParam)
  missingParams.length === 0 || handleError(`Parâmetro(s) obrigatório(s): "${missingParams}".`)

  return options
}

const buildParams = options => {
  const requiredParams = API[options.tipo].required
  if (!requiredParams) return options

  const build = (acc, cur) => {
    const paramValue = options[cur]
    if (paramValue instanceof Array) {
      return paramValue.map(value => ({ [cur]: value }))
    }
    acc[cur] = paramValue
    return acc
  }

  const params = requiredParams.reduce(build, {})
  return Object.assign(options, { params })
}

const validateHttpStatus = res => {
  res.status === 200 || handleError(`Erro ${res.status} ao se conectar com o serviço da SPTrans.`)
  return res
}

const handleResponse = res => res.data

const fetchData = options => {
  const buildPromise = params => {
    const config = {
      method: 'get',
      url: API.endpoint + API[options.tipo].route,
      headers: {
        Cookie: options.auth
      },
      params
    }
    return axios(config)
  }

  if (options.params instanceof Array) {
    const promises = options.params.map(buildPromise)
    return Promise.all(promises)
      .then(res => res.map(validateHttpStatus))
      .then(res => res.map(handleResponse))
  }

  return buildPromise(options.params)
    .then(validateHttpStatus)
    .then(handleResponse)
}


export default options =>
  Promise.resolve(options)
    .then(hasOptions)
    .then(hasAuth)
    .then(isAllowedType)
    .then(hasRequiredParams)
    .then(buildParams)
    .then(fetchData)
    .catch(handleError)
