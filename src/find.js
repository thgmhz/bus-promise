import axios from 'axios'
import { API, ALLOWED_TYPES } from './constants'

const handleError = err => {
  throw new Error(err)
}

const hasOptions = options =>
  options || handleError('O método "find" deve receber um objeto com opções.')

const hasAllowedType = options => {
  ALLOWED_TYPES.includes(options.type) || handleError(`O "type" "${options.type}" não existe.`)
  return options
}

const hasProxyParamForThisType = options => {
  const apiType = API[options.type]
  if (!apiType.param) return options
  
  const proxyParam = apiType.proxyParam
  options[proxyParam] || handleError(`O "${proxyParam}" é obrigatório para este "type".`)

  const updatedOptions = Object.assign(options, {
    paramValue: options[proxyParam]
  })

  return updatedOptions
}

const validateHttpStatus = res => {
  res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.')
  return res
}

const handleResponse = res => res.data

const fetchData = options => {
  const { auth, type, paramValue } = options

  const buildPromise = value => {
    let config = {
      method: 'get',
      url: API.endpoint + API[type].route,
      headers: {
        Cookie: auth
      }
    }

    if (value) {
      const apiParam = API[type].param
      config = Object.assign(config, {
        params: {
          [apiParam]: value
        }
      })
    }

    return axios(config)
  }

  if (paramValue instanceof Array) {
    const promises = paramValue.map(buildPromise)
    return Promise.all(promises)
      .then(res => res.map(validateHttpStatus))
      .then(res => res.map(handleResponse))
  }

  return buildPromise(paramValue)
    .then(validateHttpStatus)
    .then(handleResponse)
}

export default options =>
  Promise.resolve(options)
    .then(hasOptions)
    .then(hasAllowedType)
    .then(hasProxyParamForThisType)
    .then(fetchData)
