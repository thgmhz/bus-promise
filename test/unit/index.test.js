import test from 'ava'
import spbus from '../../src'

test('when spbus is imported should return an object', t => {
  t.is(typeof spbus, 'object')
})

test('auth should return an error when not receiving a token', async t => {
  const error = await t.throws(spbus.auth)
  t.is(error.message, 'O token é obrigatório para autenticação.')
})
