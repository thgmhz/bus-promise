import test from 'ava'
import spbus from '../../src'

test('spbus should has the auth method', t => {
  t.is(typeof spbus.auth, 'function')
})

test('should return error when send no token', async t => {
  await spbus.auth().catch(err => {
    t.is(err.message, 'O token é obrigatório para autenticação.')
  })
})
