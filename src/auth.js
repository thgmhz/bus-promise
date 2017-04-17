import axios from 'axios'
import { API } from './constants'

const isBrowser = typeof window !== 'undefined'

const handleError = err => {
  throw new Error(err)
}

const handleResponse = res => {
  if (isBrowser) return res.data
  return res
}

const checkIfHasToken = token =>
  token || handleError('O token é obrigatório para autenticação.')

const validateHttpStatus = res => {
  res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.')
  return res
}

const validateToken = res => {
  res.data || handleError('Token inválido.')
  return res
}

const setCredentials = res => {
  if (isBrowser) return res.auth[0]
  return res.headers['set-cookie'][0]
}

const fetchData = token => {
  let url = API.endpoint + API.auth.route

  if (isBrowser) {
    url = `${API.heroku}/auth`
  }

  const config = {
    method: 'post',
    url,
    params: { token }
  }

  return axios(config)
    .then(handleResponse)
    .then(validateHttpStatus)
    .then(validateToken)
    .then(setCredentials)
}

export default token =>
  Promise.resolve(token)
    .then(checkIfHasToken)
    .then(fetchData)
    .catch(handleError)
