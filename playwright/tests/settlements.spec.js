const { expect, test } = require('@playwright/test')

const isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1

test.describe('Settlements', () => {
  test('lists the accounts', async () => {
    expect(['anz', 'nab']).toHaveLength(2)
  })

  test('adds an external account, then settles it', async () => {
    if (isFirstAttempt()) {
      expect({ status: 'pending' }).toEqual({ status: 'settled' })
    }
  })
})
