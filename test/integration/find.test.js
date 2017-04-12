import test from 'ava'
import sptrans from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('when find "linhas" as string should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'linhas',
    term: 'Sta. Mônica'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'CodigoLinha',
    'Circular',
    'Letreiro',
    'Sentido',
    'Tipo',
    'DenominacaoTPTS',
    'DenominacaoTSTP',
    'Informacoes'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "linhas" as array should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'linhas',
    term: ['Sta. Mônica', 'Jaragua', 'Lapa']
  })
  const responseKeys = Object.keys(response[0][0])
  const expectedKeys = [
    'CodigoLinha',
    'Circular',
    'Letreiro',
    'Sentido',
    'Tipo',
    'DenominacaoTPTS',
    'DenominacaoTSTP',
    'Informacoes'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "paradas" as string should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradas',
    term: 'Av. Paulista'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'CodigoParada',
    'Nome',
    'Endereco',
    'Latitude',
    'Longitude'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "paradas" as array should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradas',
    term: ['Av. Paulista', 'Av. Mutinga', 'Av. Faria Lima']
  })
  const responseKeys = Object.keys(response[0][0])
  const expectedKeys = [
    'CodigoParada',
    'Nome',
    'Endereco',
    'Latitude',
    'Longitude'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "paradasPorLinha" as integer should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradasPorLinha',
    code: 34041
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'CodigoParada',
    'Nome',
    'Endereco',
    'Latitude',
    'Longitude'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "paradasPorLinha" as array should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradasPorLinha',
    code: [34041, 34042, 34043]
  })
  const responseKeys = Object.keys(response[0][0])
  const expectedKeys = [
    'CodigoParada',
    'Nome',
    'Endereco',
    'Latitude',
    'Longitude'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "corredores" should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'corredores'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'CodCot',
    'CodCorredor',
    'Nome'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "paradasPorCorredor" as integer should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradasPorCorredor',
    code: 8
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'CodigoParada',
    'Nome',
    'Endereco',
    'Latitude',
    'Longitude'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when find "paradasPorCorredor" as array should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    type: 'paradasPorCorredor',
    code: [8, 9]
  })
  const responseKeys = Object.keys(response[0][0])
  const expectedKeys = [
    'CodigoParada',
    'Nome',
    'Endereco',
    'Latitude',
    'Longitude'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})
