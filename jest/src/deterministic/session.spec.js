const { isFirstAttempt } = require('./attempt')

// A second failing file in the same run. Under the github-actions reporter both
// files' failure messages are printed together at the end, so a parser that tracks
// the current file only from FAIL lines files both of these under whichever failed
// last — the bug this fixture exists to catch.
describe('session service', () => {
  describe('token refresh', () => {
    it('should refresh a token that is about to expire', () => {
      if (isFirstAttempt()) {
        throw new Error('Timeout: refresh did not complete within 5000ms')
      }
    })
  })

  it('should reject a token signed with the wrong key', () => {
    expect(() => {
      throw new Error('invalid signature')
    }).toThrow()
  })
})
