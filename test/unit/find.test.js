import test from 'ava'
import spbus from '../../src'

test('spbus should has the find method', t => {
  t.is(typeof spbus.find, 'function')
})

test('should return error when send no param', async t => {
  await spbus.find().catch(err => {
    t.is(err.message, 'O método "find" deve receber parâmetros.')
  })
})

test('should return error when send a not allowed type param', async t => {
  await spbus.find({ type: 'not-allowed' }).catch(err => {
    t.is(err.message, 'Parâmetro "type" não encontrado.')
  })
})
