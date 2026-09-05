const { expect, test } = require('@playwright/test')

const isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1

// Playwright skips the rest of a file after a failure only when configured to; by
// default it carries on, so this file contributes a second failure and a pass.
test.describe('Contacts', () => {
  test.describe('business list', () => {
    test('sorts by name', async () => {
      expect('acme' < 'zeta').toBe(true)
    })

    test('filters by tag', async () => {
      if (isFirstAttempt()) {
        throw new Error('Timed out 4000ms waiting for expect(locator).toBeVisible()')
      }
    })
  })
})
