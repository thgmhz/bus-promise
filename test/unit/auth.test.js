import test from 'ava'
import sptrans from '../../src'

test('sptrans should has the auth method', t => {
  t.is(typeof sptrans.auth, 'function')
})

test('should return error when send no token', async t => {
  await sptrans.auth().catch(err => {
    t.true(err instanceof Error)
  })
})

test('when send a invalid token should return error', async t => {
  await sptrans.auth('some-invalid-token').catch(err => {
    t.true(err instanceof Error)
  })
})
