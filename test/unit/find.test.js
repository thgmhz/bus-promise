import test from 'ava'
import sptrans from '../../src'

test('sptrans should has the find method', t => {
  t.is(typeof sptrans.find, 'function')
})

test('should return error when send no param', async t => {
  await sptrans.find().catch(err => {
    t.is(err.message, 'O método "find" deve receber parâmetros.')
  })
})

test('should return error when send a not allowed type param', async t => {
  await sptrans.find({ type: 'not-allowed' }).catch(err => {
    t.is(err.message, 'Parâmetro "type" não encontrado.')
  })
})
