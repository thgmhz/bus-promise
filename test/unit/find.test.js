import test from 'ava'
import sptrans from '../../src'

test('sptrans should has the find method', t => {
  t.is(typeof sptrans.find, 'function')
})

test('should return error when send no param', async t => {
  await sptrans.find().catch(err => {
    t.true(err instanceof Error)
  })
})

test.serial('should return error when send a not allowed type param', async t => {
  await sptrans.find({ type: 'not-allowed' }).catch(err => {
    t.true(err instanceof Error)
  })
})

test.serial('should return error when send no term for linhas type', async t => {
  await sptrans.find({ type: 'linhas' }).catch(err => {
    t.true(err instanceof Error)
  })
})

test.serial('should return error when send no term for paradas type', async t => {
  await sptrans.find({ type: 'paradas' }).catch(err => {
    t.true(err instanceof Error)
  })
})
