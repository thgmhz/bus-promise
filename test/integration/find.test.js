import test from 'ava'
import sptrans from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('when find linhas should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth: auth.credentials,
    type: 'linhas',
    term: 'Term. Lapa Sta. Mônica'
  })
  t.true(response.length > 0)
  t.true(response instanceof Array)
})

test('when find paradas should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth: auth.credentials,
    type: 'paradas',
    term: 'Av. Paulista'
  })
  t.true(response.length > 0)
  t.true(response instanceof Array)
})

test('when find paradasPorLinha should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth: auth.credentials,
    type: 'paradasPorLinha',
    code: 34041
  })
  t.true(response.length > 0)
  t.true(response instanceof Array)
})
