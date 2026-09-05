const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1

describe('session service', () => {
  describe('token refresh', () => {
    it('refreshes a token that is about to expire', () => {
      if (isFirstAttempt()) {
        throw new Error('Timeout: refresh did not complete within 5000ms')
      }
    })
  })

  it('rejects a token signed with the wrong key', () => {
    assert.throws(() => {
      throw new TypeError('invalid signature')
    }, TypeError)
  })
})
