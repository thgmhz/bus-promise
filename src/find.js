import axios from 'axios'
import { API, ALLOWED_TYPES } from './constants'

const handleError = err => {
  throw new Error(err)
}

const hasParams = params =>
  params || handleError('O método "find" deve receber parâmetros.')

const hasAllowedType = params => {
  ALLOWED_TYPES.includes(params.type) || handleError('O parâmetro "type" está errado.')
  return params
}

const hasLibParamForThisType = params => {
  const libParam = API[params.type].libParam
  params[libParam] || handleError(`O parâmetro "${libParam}" é obrigatório para este "type".`)

  const updatedParams = params
  updatedParams.value = params[libParam]

  return updatedParams
}

const fetchData = params => {
  const { auth, type, value } = params

  const validateHttpStatus = res => {
    res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.')
    return res
  }

  const handleResponse = res => res.data

  const config = {
    method: 'get',
    url: API.endpoint + API[type].route,
    params: {
      [API[type].param]: value
    },
    headers: {
      Cookie: auth
    }
  }

  return axios(config)
    .then(validateHttpStatus)
    .then(handleResponse)
}

export default params =>
  Promise.resolve(params)
    .then(hasParams)
    .then(hasAllowedType)
    .then(hasLibParamForThisType)
    .then(fetchData)
