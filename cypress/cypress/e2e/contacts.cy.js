const isFirstAttempt = () => Number(Cypress.env('GITHUB_RUN_ATTEMPT') ?? 1) === 1

// A second failing spec, so the run summary lists more than one file. Cypress
// prints failures twice — a live line and an end-of-run summary — and the two
// disagree about how much of the describe path they show.
describe('Contacts', () => {
  describe('business list', () => {
    it('sorts by name', () => {
      expect('acme').to.be.a('string')
    })

    it('filters by tag', () => {
      if (isFirstAttempt()) {
        throw new Error('Timed out retrying after 4000ms: expected 3 rows, found 0')
      }
    })
  })
})
