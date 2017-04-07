import test from 'ava'
import spbus from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('when authenticate', async t => {
  t.plan(2)

  const auth = await spbus.auth(TOKEN)
  t.is(auth.status, 200)
  t.is(auth.statusText, 'OK')
})
