import test from 'ava'
import * as bus from '../../src'

test('when sending no token should return error', async t => {
  await bus.auth().catch(err => {
    t.true(err instanceof Error)
  })
})

test('when sending a invalid token should return error', async t => {
  await bus.auth('some-invalid-token').catch(err => {
    t.true(err instanceof Error)
  })
})
