import test from 'ava'
import spbus from '../../src'

test('spbus should has the auth method', t => {
  t.is(typeof spbus.auth, 'function')
})

test('should return error when receive no token', t => {
  t.throws(spbus.auth)
})
