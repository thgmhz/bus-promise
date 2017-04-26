import axios from 'axios'
import { API } from './constants'
import { buildLinhasResponse } from './helpers'

const isBrowser = typeof window !== 'undefined'

function handleError (err) {
  throw new Error(err)
}

function hasOptions (options) {
  options || handleError('O método "find" deve receber um objeto com opções.')
  return options
}

const hasAuth = options => {
  options.auth || handleError('O método "find" deve receber o parâmetro "auth".')
  return options
}

function isAllowedType (options) {
  options.tipo in API || handleError(`O "tipo" "${options.tipo}" não existe.`)
  return options
}

function hasRequiredParams (options) {
  const requiredParams = API[options.tipo].required
  if (!requiredParams) return options

  const checkParam = param => !(param in options)
  const missingParams = requiredParams.filter(checkParam)
  missingParams.length === 0 || handleError(`Parâmetro(s) obrigatório(s): "${missingParams}".`)

  return options
}

function buildParams (options) {
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

function validateHttpStatus (res) {
  res.status === 200 || handleError(`Erro ${res.status} ao se conectar com o serviço da SPTrans.`)
  return res
}

function handleResponse (res, options) {
  if (options.tipo === 'linhas') {
    return buildLinhasResponse(res.data)
  }
  return res.data
}

function fetchData (options) {
  const buildPromise = params => {
    let url = API.endpoint + API[options.tipo].route
    let headers = {
      Cookie: options.auth
    }

    if (isBrowser && params) {
      headers = null
      url = API.heroku
      Object.assign(params, {
        auth: options.auth,
        route: API[options.tipo].route
      })
    }

    const config = {
      method: 'get',
      url,
      headers,
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
    .then(res => handleResponse(res, options))
}

export default options =>
  Promise.resolve(options)
    .then(hasOptions)
    .then(hasAuth)
    .then(isAllowedType)
    .then(hasRequiredParams)
    .then(buildParams)
    .then(fetchData)
