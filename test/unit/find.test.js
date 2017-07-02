import test from 'ava'
import bus from '../../src'

// token for tests
const TOKEN = '2d5a4ee1443cb4047633305bf371c72213f6c3aefc9fe3362e42bccb3c01ebf4'

test('bus should has the find method', t => {
  t.is(typeof bus.find, 'function')
})

test('when send no param should return error', async t => {
  await bus.find().catch(err => {
    t.is(err.message, 'The "find" method should receive an object with options.')
  })
})

test('when send no auth param should return error', async t => {
  await bus.find({ auth: '' }).catch(err => {
    t.is(err.message, 'The "find" method should receive the "auth" parameter.')
  })
})

test('when send a not allowed param should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'not-allowed'
  }).catch(err => {
    t.is(err.message, 'The "not-allowed" type does not exist.')
  })
})

test('when send no termosBusca to paradas should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'paradas'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "terms".')
  })
})

test('when send no codigoLinha to paradasPorLinha should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'paradasPorLinha'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "lineId".')
  })
})

test('when send no codigoCorredor to paradasPorCorredor should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'paradasPorCorredor'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "corridorId".')
  })
})

test('when send no codigoLinha to posicaoVeiculos should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'posicaoVeiculos'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "lineId".')
  })
})

test('when send no param value to previsaoChegada should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'previsaoChegada'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "stopId,lineId".')
  })
})

test('when send no codigoLinha to previsaoLinha should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'previsaoLinha'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "lineId".')
  })
})

test('when send no codigoParada to previsaoLinha should return error', async t => {
  const auth = bus.auth(TOKEN)
  await bus.find({
    auth,
    tipo: 'previsaoParada'
  }).catch(err => {
    t.is(err.message, 'Required parameter(s): "stopId".')
  })
})
