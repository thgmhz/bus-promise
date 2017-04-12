import test from 'ava'
import sptrans from '../../src'

test('sptrans should has the find method', t => {
  t.is(typeof sptrans.find, 'function')
})

test('when send no param should return error', async t => {
  await sptrans.find().catch(err => {
    t.true(err instanceof Error)
  })
})

test.serial('when send a not allowed type param should return error', async t => {
  await sptrans.find({ type: 'not-allowed' }).catch(err => {
    t.true(err instanceof Error)
  })
})

test.serial('when send no term for linhas type should return error', async t => {
  await sptrans.find({ type: 'linhas' }).catch(err => {
    t.true(err instanceof Error)
  })
})

test.serial('when send no term for paradas type should return error', async t => {
  await sptrans.find({ type: 'paradas' }).catch(err => {
    t.true(err instanceof Error)
  })
})
