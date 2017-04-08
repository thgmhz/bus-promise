import test from 'ava'
import spbus from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('when authenticate should return true', async t => {
  const auth = await spbus.auth(TOKEN)
  t.true(auth)
})
