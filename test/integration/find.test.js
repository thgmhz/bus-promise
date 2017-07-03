import test from 'ava'
import bus from '../../src'

// token for tests
const TOKEN = '2d5a4ee1443cb4047633305bf371c72213f6c3aefc9fe3362e42bccb3c01ebf4'

test('when finding "lines" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'lines',
    terms: 'Sta. Mônica'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'lineId',
    'shapeId',
    'circular',
    'displaySign',
    'direction',
    'type',
    'mainTerminal',
    'secondaryTerminal'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "shapes" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'shapes',
    shapeId: 63468
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'shapeId',
    'lat',
    'lng',
    'sequence',
    'traveled'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "stops" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'stops',
    terms: 'Av. Paulista'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'stopId',
    'name',
    'address',
    'lat',
    'lng'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "stopsByLine" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'stopsByLine',
    lineId: 34041
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'stopId',
    'name',
    'address',
    'lat',
    'lng'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "corridors" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'corridors'
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'corridorId',
    'name'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "stopsByCorridor" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'stopsByCorridor',
    corridorId: 8
  })
  const responseKeys = Object.keys(response[0])
  const expectedKeys = [
    'stopId',
    'name',
    'address',
    'lat',
    'lng'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Array)
})

test('when finding "vehiclesPosition" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'vehiclesPosition',
    lineId: 34041
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hour',
    'lines'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when finding "arrivalForecast" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'arrivalForecast',
    stopId: 260015039,
    lineId: 34041
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hour',
    'stop'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "lineForecast" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'lineForecast',
    lineId: 34041
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hour',
    'stops'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})

test('when find "stopForecast" should return the expected keys', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'stopForecast',
    stopId: 260015039
  })
  const responseKeys = Object.keys(response)
  const expectedKeys = [
    'hour',
    'stop'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.true(response instanceof Object)
})
