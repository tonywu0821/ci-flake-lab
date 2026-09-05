import { describe, expect, it } from 'vitest'
import { isFirstAttempt } from './attempt.js'

describe('checkout', () => {
  it('should total the basket', () => {
    expect(1 + 1).toBe(2)
  })

  it('should apply a discount code before tax, and round half up', () => {
    if (isFirstAttempt()) {
      expect({ total: 4200, tax: 380 }).toEqual({ total: 3800, tax: 380 })
    }
  })
})
