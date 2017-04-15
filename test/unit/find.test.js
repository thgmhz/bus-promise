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
    type: 'not-allowed'
  }).catch(err => {
    t.is(err.message, 'Error: O "tipo" "not-allowed" não existe.')
  })
})

test('when send no term for linhas should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    type: 'linhas'
  }).catch(err => {
    t.is(err.message, 'Error: O parâmetro "term" é obrigatório para este "type".')
  })
})

test('when send no term for paradas should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    type: 'paradas'
  }).catch(err => {
    t.is(err.message, 'Error: O parâmetro "term" é obrigatório para este "type".')
  })
})

test('when send no code for paradasPorLinha should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    type: 'paradasPorLinha'
  }).catch(err => {
    t.is(err.message, 'Error: O parâmetro "code" é obrigatório para este "type".')
  })
})

test('when send no code for paradasPorCorredor should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    type: 'paradasPorCorredor'
  }).catch(err => {
    t.is(err.message, 'Error: O parâmetro "code" é obrigatório para este "type".')
  })
})

test('when send no code for posicaoVeiculos should return error', async t => {
  const auth = sptrans.auth(TOKEN)
  await sptrans.find({
    auth,
    type: 'posicaoVeiculos'
  }).catch(err => {
    t.is(err.message, 'Error: O parâmetro "code" é obrigatório para este "type".')
  })
})
