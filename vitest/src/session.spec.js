import { describe, expect, it } from 'vitest'
import { isFirstAttempt } from './attempt.js'

// A second failing file, and a nested suite, so the reported name has more than
// one level to it.
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
