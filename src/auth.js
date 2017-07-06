import axios from 'axios'
import { API } from './constants'

const sptrans = `${API.sptrans}${API.auth.route}`
const busServer = `${API.busServer}/auth`
const isBrowser = typeof window !== 'undefined'

const handleError = err => {
  throw Error(err)
}

const handleResponse = res =>
  isBrowser ? res.data : res

const checkIfHasToken = token =>
  token || handleError('Token is required for authentication.')

const validateHttpStatus = res =>
  res.status === 200 ? res :
  handleError(`Error ${res.status} when connecting to SPTrans service.`)

const validateToken = res =>
  res.data ? res : handleError('Invalid Token.')

const setCredentials = res =>
  isBrowser ? res.auth[0] : res.headers['set-cookie'][0]

const fetchData = token => {
  const url = isBrowser ? busServer : sptrans

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
