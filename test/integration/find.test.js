import test from 'ava'
import * as bus from '../../src'

// token for tests
const TOKEN = '2d5a4ee1443cb4047633305bf371c72213f6c3aefc9fe3362e42bccb3c01ebf4'

test('when finding "lines" should return the expected keys and values', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'lines',
    terms: 'Sta. Mônica'
  })
  const expected = {
    lineId: 34022,
    shapeId: '63468',
    circular: false,
    displaySign: '8004',
    direction: 2,
    type: 10,
    mainTerminal: 'TERM. LAPA',
    secondaryTerminal: 'STA. MÔNICA'
  }
  t.is(4, response.length)
  t.true(response instanceof Array)
  t.deepEqual(response[0], expected)
})

test('when finding "lines" with terms equal "*" should return the expected keys and values', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'lines',
    terms: '*'
  })
  const expected = {
    direction: '0',
    shapeId: '63442',
    mainTerminal: 'Jd. Monte Belo',
    displaySign: '1012',
    type: '10'
  }
  t.is(2296, response.length)
  t.true(response instanceof Array)
  t.deepEqual(response[0], expected)
})

test('when finding "shapes" should return the expected keys and values', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'shapes',
    shapeId: 63468
  })
  const expected = {
    shapeId: '63468',
    lat: '-23.519725',
    lng: '-46.700136',
    sequence: '1',
    traveled: '4.6839013'
  }
  t.is(375, response.length)
  t.true(response instanceof Array)
  t.deepEqual(response[0], expected)
})

test('when finding "stops" should return the expected keys and values', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'stops',
    terms: 'Av. Paulista'
  })
  const expected = {
    stopId: 260015039,
    name: 'PAULISTA B/C',
    address: 'AV PAULISTA/ AV REBOUCAS',
    lat: -23.555883,
    lng: -46.66306
  }
  t.is(2, response.length)
  t.true(response instanceof Array)
  t.deepEqual(response[0], expected)
})

test('when finding "stopsByLine" should return the expected keys and values', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'stopsByLine',
    lineId: 34041
  })
  const expected = {
    stopId: 7014416,
    name: 'ANGELICA C/B',
    address: 'R DR.  ALBUQUERQUE LINS',
    lat: -23.534368,
    lng: -46.654267
  }
  t.is(13, response.length)
  t.true(response instanceof Array)
  t.deepEqual(response[0], expected)
})

test('when finding "corridors" should return the expected keys and values', async t => {
  const auth = await bus.auth(TOKEN)
  const response = await bus.find({
    auth,
    type: 'corridors'
  })
  const expected = {
    corridorId: 8,
    name: 'Campo Limpo'
  }
  t.is(7, response.length)
  t.true(response instanceof Array)
  t.deepEqual(response[0], expected)
})

test('when finding "stopsByCorridor" should return the expected keys and values', async t => {
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
  t.is(34, response.length)
  t.true(response instanceof Array)
  t.deepEqual(responseKeys, expectedKeys)
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
    'vehicles'
  ]
  const responseVehicleKeys = Object.keys(response.vehicles[0])
  const expectedVehicleKeys = [
    'prefix',
    'accessible',
    'hour',
    'lat',
    'lng'
  ]
  t.deepEqual(responseKeys, expectedKeys)
  t.deepEqual(responseVehicleKeys, expectedVehicleKeys)
  t.true(response instanceof Object)
  t.true(response.vehicles instanceof Array)
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
