import test from 'ava'
import spbus from '../../src'

test('spbus should has the find method', t => {
  t.is(typeof spbus.find, 'function')
})

test('should return error when send no param', t => {
  t.throws(() => spbus.find())
})

test('should return error when send a not allowed type param', t => {
  t.throws(() => spbus.find({ type: 'not-allowed' }))
})

test('should return error when send no term for type', t => {
  t.plan(2)

  t.throws(() => spbus.find({ type: 'linhas' }))
  t.throws(() => spbus.find({ type: 'paradas' }))
})
