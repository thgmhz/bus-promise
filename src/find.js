import axios from 'axios'
import { API } from './constants'
import { buildLinhasResponse } from './helpers'

const isBrowser = typeof window !== 'undefined'

function handleError (err) {
  throw new Error(err)
}

function hasOptions (options) {
  options || handleError('The "find" method should receive an object with options.')
  return options
}

function hasAuth (options) {
  options.auth || handleError('The "find" method should receive the "auth" parameter.')
  return options
}

function isAllowedType (options) {
  options.type in API || handleError(`The "${options.type}" type does not exist.`)
  return options
}

function hasRequiredParams (options) {
  const requiredParams = API[options.tipo].required
  if (!requiredParams) return options

  const optionsHasParam = param => !(param in options)
  const missingParams = requiredParams.filter(optionsHasParam)
  missingParams.length === 0 || handleError(`Required parameter(s): "${missingParams}".`)

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
  res.status === 200 || handleError(`Error ${res.status} when connecting to the SPTrans service.`)
  return res
}

function handleResponse (res, options) {
  if (options.tipo === 'linhas' && options.params.termosBusca !== '*') {
    return buildLinhasResponse(res.data)
  }
  return res.data
}

function fetchData (options) {
  const buildPromise = params => {
    let url = API.sptrans + API[options.tipo].route
    let headers = {
      Cookie: options.auth
    }

    if (isBrowser && params) {
      headers = null
      url = `${API.server}/find`
      Object.assign(params, {
        auth: options.auth,
        route: API[options.tipo].route
      })
    }

    if (options.tipo === 'trajeto') {
      headers = null
      url = `${API.server}/shapes/${options.codigoTrajeto}`
    }

    if (options.tipo === 'linhas' && params.termosBusca === '*') {
      headers = null
      url = `${API.server}/trips`
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
