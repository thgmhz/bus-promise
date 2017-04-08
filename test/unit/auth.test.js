import test from 'ava'
import spbus from '../../src'

test('auth() should return an error when not receive a token', async t => {
  const error = await t.throws(spbus.auth)
  t.is(error.message, 'O token é obrigatório para autenticação.')
})
