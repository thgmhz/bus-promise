import test from 'ava'
import spbus from '../../src'

test('spbus should has the find method', t => {
  t.is(typeof spbus.find, 'function')
})

test('should return error when receive no param', t => {
  t.throws(spbus.find)
})

test('should return error when receive a not allowed type param', t => {
  t.throws(() => spbus.find({ type: 'not-allowed' }))
})

test('should return error when receive no term for type linhas', t => {
  t.throws(() => spbus.find({ type: 'linhas', term: '' }))
})

test('should return error when receive no term for type paradas', t => {
  t.throws(() => spbus.find({ type: 'paradas', term: '' }))
})
