import fetch from 'isomorphic-fetch'
import { API } from './constants'

const handleError = err => {
  throw Error(err)
}

const handleResponse = res => {
  if (!res.ok) handleError('Erro ao se conectar com o serviço da SPTrans.')
  return res.json()
}

export default token => {
  if (!token) handleError('O token é obrigatório para autenticação.')

  const url = `${API.endpoint}${API.auth.route}?${API.auth.param}=${token}`
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }

  return fetch(url, options)
    .then(handleResponse)
    .catch(handleError)
}
