const config = require('./config')
const fetch = require('isomorphic-fetch')

const spbus = {
  auth (token) {
    return fetch(`${config.endpoint}${config.auth}?token=${token}`, { method: 'POST' })
  }
}

module.exports = spbus
