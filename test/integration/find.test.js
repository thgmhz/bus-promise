import test from 'ava'
import sptrans from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('when find "linhas" as string should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    tipo: 'linhas',
    termosBusca: 'Sta. Mônica'
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
    tipo: 'linhas',
    termosBusca: ['Sta. Mônica', 'Jaragua', 'Lapa']
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
    tipo: 'paradas',
    termosBusca: 'Av. Paulista'
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
    tipo: 'paradas',
    termosBusca: ['Av. Paulista', 'Av. Mutinga', 'Av. Faria Lima']
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
    tipo: 'paradasPorLinha',
    codigoLinha: 34041
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
    tipo: 'paradasPorLinha',
    codigoLinha: [34041, 34042, 34043]
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
    tipo: 'corredores'
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
    tipo: 'paradasPorCorredor',
    codigoCorredor: 8
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
    tipo: 'paradasPorCorredor',
    codigoCorredor: [8, 9]
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

test('when find "posicaoVeiculos" should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    tipo: 'posicaoVeiculos',
    codigoLinha: 34041
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hr',
    'vs'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "posicaoVeiculos" should return the expected keys', async t => {
  const auth = await sptrans.auth(TOKEN)
  const response = await sptrans.find({
    auth,
    tipo: 'posicaoVeiculos',
    codigoLinha: [34041, 34042]
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'hr',
    'vs'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})
