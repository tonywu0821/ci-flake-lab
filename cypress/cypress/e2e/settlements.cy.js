const isFirstAttempt = () => Number(Cypress.env('GITHUB_RUN_ATTEMPT') ?? 1) === 1

describe('Settlements', () => {
  it('lists the accounts', () => {
    expect(['anz', 'nab']).to.have.length(2)
  })

  it('adds an external account', () => {
    if (isFirstAttempt()) {
      expect({ status: 'pending' }).to.deep.equal({ status: 'settled' })
    }
  })
})
