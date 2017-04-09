import test from 'ava'
import spbus from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('when find linhas should return a array', async t => {
  const auth = await spbus.auth(TOKEN)
  const response = await spbus.find({
    auth: auth.credentials,
    type: 'linhas',
    term: 'Term. Lapa Sta. Mônica'
  })
  t.true(response instanceof Array)
})
