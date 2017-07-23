import axios from 'axios'
import { API } from './constants'
import {
  linesResponse,
  shapesResponse,
  stopsResponse,
  corridorsResponse,
  vehiclesPositionResponse,
  arrivalForecastResponse,
  lineForecastResponse,
  stopForecastResponse
} from './helpers'

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

function getRequiredParams (options) {
  return API[options.type].required
}

function hasRequiredParams (options) {
  const requiredParams = getRequiredParams(options)
  if (!requiredParams) return options

  const optionsHasParam = param => !(param in options)
  const missingParams = requiredParams.filter(optionsHasParam)
  missingParams.length === 0 || handleError(`Required parameter(s): "${missingParams}".`)

  return options
}

function buildParams (options) {
  const requiredParams = getRequiredParams(options)
  if (!requiredParams) return options

  const build = (obj, current) => {
    const paramName = API[options.type].proxyParams[current]
    const paramValue = options[current]
    if (paramValue instanceof Array) {
      return paramValue.map(value => ({ [paramName]: value }))
    }

    return Object.assign({}, obj, { [paramName]: paramValue })
  }

  const params = requiredParams.reduce(build, {})

  return Object.assign(options, { params })
}

function validateHttpStatus (res) {
  res.status === 200 || handleError(`Error ${res.status} when connecting to the SPTrans service.`)
  return res
}

function handleResponse (res, options) {
  if (options.terms === '*') return res.data

  const data = res.data
  const type = options.type
  let response

  if (type === 'lines') response = linesResponse
  if (type === 'shapes') response = shapesResponse
  if (type === 'stops') response = stopsResponse
  if (type === 'stopsByCorridor') response = stopsResponse
  if (type === 'stopsByLine') response = stopsResponse
  if (type === 'corridors') response = corridorsResponse
  if (type === 'vehiclesPosition') response = vehiclesPositionResponse
  if (type === 'arrivalForecast') response = arrivalForecastResponse
  if (type === 'lineForecast') response = lineForecastResponse
  if (type === 'stopForecast') response = stopForecastResponse

  return response(data)
}

function fetchData (options) {
  const buildPromise = params => {
    let url = API.sptrans + API[options.type].route
    let headers = {
      Cookie: options.auth
    }

    if (isBrowser && params) {
      headers = null
      url = `${API.server}/find`
      Object.assign(params, {
        auth: options.auth,
        type: options.type,
        route: API[options.type].route
      })
    }

    if (options.type === 'shapes') {
      headers = null
      url = `${API.server}/shapes/${options.shapeId}`
    }

    if (options.type === 'lines' && options.terms === '*') {
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
      .then(responses => responses.map(validateHttpStatus))
      .then(responses => responses.map(res => handleResponse(res, options)))
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
