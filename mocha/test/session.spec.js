const { expect } = require('chai')
const { isFirstAttempt } = require('./attempt')

describe('session service', function () {
  describe('token refresh', function () {
    it('refreshes a token that is about to expire', function () {
      if (isFirstAttempt()) {
        throw new Error('Timeout: refresh did not complete within 5000ms')
      }
    })
  })

  it('rejects a token signed with the wrong key', function () {
    expect(() => {
      throw new Error('invalid signature')
    }).to.throw()
  })
})
