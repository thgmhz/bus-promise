import test from 'ava'
import sptrans from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('find linhas passing a string should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'linhas',
    term: 'Sta. Mônica'
  })
  t.true(response.length === 4)
  t.true(response instanceof Array)
})

test('find linhas passing an array should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'linhas',
    term: ['Sta. Mônica', 'Jaragua', 'Lapa']
  })
  t.true(response.length === 3)
  t.true(response instanceof Array)
})

test('find paradas passing a string should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradas',
    term: 'Av. Paulista'
  })
  t.true(response.length === 2)
  t.true(response instanceof Array)
})

test('find paradas passing an array should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradas',
    term: ['Av. Paulista', 'Av. Mutinga', 'Av. Faria Lima']
  })
  t.true(response.length === 3)
  t.true(response instanceof Array)
})

test('find paradasPorLinha passing an integer should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradasPorLinha',
    code: 34041
  })
  t.true(response.length === 13)
  t.true(response instanceof Array)
})

test('find paradasPorLinha passing an array of integers should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradasPorLinha',
    code: [34041, 34042, 34043]
  })
  t.true(response.length === 3)
  t.true(response instanceof Array)
})

test('find corredores should return a populated array', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'corredores'
  })
  t.true(response.length > 0)
  t.true(response instanceof Array)
})
