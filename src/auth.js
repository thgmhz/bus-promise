import axios from 'axios'
import { API } from './constants'

const handleError = err => {
  throw new Error(err)
}

const handleResponse = res => {
  if (res.status !== 200) handleError('Erro ao se conectar com o serviço da SPTrans.')

  const credentials = res.headers['set-cookie'][0]

  return {
    response: res.data,
    credentials
  }
}

const validateToken = token => {
  if (!token) handleError('O token é obrigatório para autenticação.')
  return token
}

const fetchData = token => {
  const config = {
    method: 'post',
    url: API.endpoint + API.auth.route,
    params: { token }
  }

  return axios(config).then(handleResponse)
}

export default token =>
  Promise.resolve(token)
    .then(validateToken)
    .then(fetchData)
