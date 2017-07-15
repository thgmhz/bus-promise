import test from 'ava'
import * as bus from '../../src'

// token for tests
const TOKEN = '2d5a4ee1443cb4047633305bf371c72213f6c3aefc9fe3362e42bccb3c01ebf4'

test('when authenticate should return credentials', async t => {
  const auth = await bus.auth(TOKEN)
  t.true(typeof auth === 'string')
  t.true(auth.length > 0)
})
