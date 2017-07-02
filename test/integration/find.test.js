import test from 'ava'
import bus from '../../src'

// token for tests
const TOKEN = '2d5a4ee1443cb4047633305bf371c72213f6c3aefc9fe3362e42bccb3c01ebf4'

test('when finding "lines" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'linhas',
    termosBusca: 'Sta. Mônica'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'CodigoLinha',
    'CodigoTrajeto',
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

test('when finding "shapes" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'linhas',
    termosBusca: '*'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'route_id',
    'service_id',
    'trip_id',
    'trip_headsign',
    'direction_id',
    'shape_id',
    ''
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "stops" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'trajeto',
    codigoTrajeto: 63468
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'shape_id',
    'shape_pt_lat',
    'shape_pt_lon',
    'shape_pt_sequence',
    'shape_dist_traveled',
    ''
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "stopsByLine" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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

test('when finding "corridors" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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

test('when finding "stopsByCorridor" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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

test('when finding "vehiclesPosition" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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

test('when finding "arrivalForecast" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
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

test('when find "previsaoChegada" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'previsaoChegada',
    codigoParada: 260015039,
    codigoLinha: 34041
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hr',
    'p'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "lineForecast" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'previsaoLinha',
    codigoLinha: 34041
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hr',
    'ps'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "stopForecast" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'previsaoLinha',
    codigoLinha: [34041, 34042]
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'hr',
    'ps'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "previsaoParada" as integer should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'previsaoParada',
    codigoParada: 260015039
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hr',
    'p'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "previsaoParada" as array should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    tipo: 'previsaoParada',
    codigoParada: [260015039, 260015038]
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'hr',
    'p'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})
