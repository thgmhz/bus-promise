import axios from 'axios'
import { API, ALLOWED_TYPES } from './constants'

const handleError = err => {
  throw new Error(err)
}

const validateHttpStatus = res => {
  if (res.status !== 200) handleError('Erro ao se conectar com o serviço da SPTrans.')
  return res
}

const handleResponse = res => res.data

const validateParams = params => {
  if (!params) {
    handleError('O método "find" deve receber parâmetros.')
  }

  if (!ALLOWED_TYPES.includes(params.type)) {
    handleError('Parâmetro "type" não permitido.')
  }

  if (params.type === 'linhas' || params.type === 'paradas') {
    if (!params.term) handleError('O parâmetro "term" é obrigatório para este "type".')
  }

  return params
}

const fetchData = params => {
  const { auth, type, term } = params

  const config = {
    method: 'get',
    url: API.endpoint + API[type].route,
    params: {
      [API[type].param]: term
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
    .then(validateParams)
    .then(fetchData)
