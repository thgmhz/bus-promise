import test from 'ava'
import spbus from '../../src'

test('when imported should return a Function', t => {
  t.is(typeof spbus, 'object')
})
