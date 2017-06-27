import test from 'ava'
import bus from '../../src'

test('bus-promise should has the auth method', t => {
  t.is(typeof bus.auth, 'function')
})

test('when send no token should return error', async t => {
  await bus.auth().catch(err => {
    t.true(err instanceof Error)
  })
})

test('when send a invalid token should return error', async t => {
  await bus.auth('some-invalid-token').catch(err => {
    t.true(err instanceof Error)
  })
})
