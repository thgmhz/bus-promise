import test from 'ava'
import sptrans from '../../src'

const TOKEN = '1e7c20905fe86990c5227e7e9f00002fe908d4d4dd4d7c0091032dacd2d0e07d'

test('sptrans should has the find method', t => {
  t.is(typeof sptrans.find, 'function')
})

test('when send no param should return error', async t => {
  await sptrans.find().catch(err => {
    t.is(err.message, 'Error: O método "find" deve receber um objeto com opções.')
  })
})

test('when send no auth param should return error', async t => {
  await sptrans.find({ auth: '' }).catch(err => {
    t.is(err.message, 'Error: O método "find" deve receber o parâmetro "auth".')
  })
})

test('when send a not allowed param should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    tipo: 'not-allowed'
  }).catch(err => {
    t.is(err.message, 'Error: O "tipo" "not-allowed" não existe.')
  })
})

test('when send no termosBusca for linhas should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    tipo: 'linhas'
  }).catch(err => {
    t.is(err.message, 'Error: Parâmetro(s) obrigatório(s): "termosBusca".')
  })
})

test('when send no termosBusca for paradas should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    tipo: 'paradas'
  }).catch(err => {
    t.is(err.message, 'Error: Parâmetro(s) obrigatório(s): "termosBusca".')
  })
})

test('when send no codigoLinha for paradasPorLinha should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    tipo: 'paradasPorLinha'
  }).catch(err => {
    t.is(err.message, 'Error: Parâmetro(s) obrigatório(s): "codigoLinha".')
  })
})

test('when send no codigoCorredor for paradasPorCorredor should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    tipo: 'paradasPorCorredor'
  }).catch(err => {
    t.is(err.message, 'Error: Parâmetro(s) obrigatório(s): "codigoCorredor".')
  })
})

test('when send no codigoLinha for posicaoVeiculos should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    tipo: 'posicaoVeiculos'
  }).catch(err => {
    t.is(err.message, 'Error: Parâmetro(s) obrigatório(s): "codigoLinha".')
  })
})
