import fetch from 'isomorphic-fetch'
import config from './config'

export default {
  auth (token) {
    return fetch(`${config.endpoint}${config.auth}?token=${token}`, { method: 'POST' })
  }
}
