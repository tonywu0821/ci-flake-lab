const { isFirstAttempt } = require('./attempt')

// A long title, and one with the separator jest uses between ancestors, because
// the title is half the ticket key and both have broken parsers before.
describe('sms engine cost management system tests', () => {
  describe('when the account has an outstanding balance carried over from the previous billing period', () => {
    it('should bill the parent account rather than the child, and prorate to the day', () => {
      if (isFirstAttempt()) {
        expect('billed: child').toBe('billed: parent')
      }
    })
  })
})
