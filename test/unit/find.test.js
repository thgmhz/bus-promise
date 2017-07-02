import test from 'ava'
import bus from '../../src'

// token for tests
const TOKEN = '2d5a4ee1443cb4047633305bf371c72213f6c3aefc9fe3362e42bccb3c01ebf4'

test('bus should has the find method', t => {
  t.is(typeof bus.find, 'function')
})

test('when sending no param should return error', async t => {
  await bus.find().catch(err => {
    t.is(err.message, 'The "find" method should receive an object with options.')
  })
})

test('when sending no auth param should return error', async t => {
  await bus.find({ auth: '' }).catch(err => {
    t.is(err.message, 'The "find" method should receive the "auth" parameter.')
  })
})

test('when sending a not allowed param should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'not-allowed'
  }).catch(err => {
    t.is(err.message, 'The "not-allowed" type does not exist.')
  })
})

test('when sending no terms to stops should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'paradas'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "terms".')
  })
})

test('when sending no lineId to stopsByLine should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'paradasPorLinha'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "lineId".')
  })
})

test('when sending no corridorId to stopsByCorridor should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'paradasPorCorredor'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "corridorId".')
  })
})

test('when sending no lineId to vehiclesPosition should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'posicaoVeiculos'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "lineId".')
  })
})

test('when sending no param value to arrivalForecast should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'previsaoChegada'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "stopId,lineId".')
  })
})

test('when sending no lineId to lineForecast should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'previsaoLinha'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "lineId".')
  })
})

test('when sending no stopId to stopForecast should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'previsaoParada'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "stopId".')
  })
})
