import axios from 'axios'
import { API, ALLOWED_TYPES } from './constants'

const handleError = err => {
  throw new Error(err)
}

const hasParams = params =>
  params || handleError('O método find() deve receber parâmetros.')

const hasAllowedType = params => {
  ALLOWED_TYPES.includes(params.type) || handleError(`O valor "${params.type}" do parâmetro type está errado.`)
  return params
}

const hasLibParamNameForThisType = params => {
  const libParamName = API[params.type].libParamName
  params[libParamName] || handleError(`O parâmetro "${libParamName}" é obrigatório para o type "${params.type}".`)

  const updatedParams = params
  updatedParams.value = params[libParamName]

  return updatedParams
}

const fetchData = params => {
  const { auth, type, value } = params

  const validateHttpStatus = res => {
    res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.')
    return res
  }

  const handleResponse = res => res.data

  const buildPromise = paramValue => {
    const config = {
      method: 'get',
      url: API.endpoint + API[type].route,
      params: {
        [API[type].param]: paramValue
      },
      headers: {
        Cookie: auth
      }
    }
    return axios(config)
  }

  if (value instanceof Array) {
    const promises = value.map(buildPromise)
    return Promise.all(promises)
      .then(res => res.map(validateHttpStatus))
      .then(res => res.map(handleResponse))
  }

  return buildPromise(value)
    .then(validateHttpStatus)
    .then(handleResponse)
}

export default params =>
  Promise.resolve(params)
    .then(hasParams)
    .then(hasAllowedType)
    .then(hasLibParamNameForThisType)
    .then(fetchData)
