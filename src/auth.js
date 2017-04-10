import axios from 'axios'
import { API } from './constants'

const handleError = err => {
  throw new Error(err)
}

const checkIfHasToken = token =>
  token || handleError('O token é obrigatório para autenticação.')

const fetchData = token => {
  const validateHttpStatus = res => {
    res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.')
    return res
  }

  const validateToken = res => {
    res.data || handleError('Token inválido.')
    return res
  }

  const setCredentials = res => ({
    credentials: res.headers['set-cookie'][0]
  })

  const config = {
    method: 'post',
    url: API.endpoint + API.auth.route,
    params: { token }
  }

  return axios(config)
    .then(validateHttpStatus)
    .then(validateToken)
    .then(setCredentials)
}

export default token =>
  Promise.resolve(token)
    .then(checkIfHasToken)
    .then(fetchData)
