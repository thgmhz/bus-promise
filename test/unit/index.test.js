import test from 'ava'
import spbus from '../../src'

test('when spbus is imported should return an object', t => {
  t.is(typeof spbus, 'object')
})
