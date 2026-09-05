const { expect } = require('chai')
const { isFirstAttempt } = require('./attempt')

// Mocha's spec reporter numbers its failures and prints the suite path across
// several indented lines rather than on one, which is a shape of its own:
//
//   1) checkout
//        should apply a discount code before tax:
//      AssertionError: expected 4200 to equal 3800
describe('checkout', function () {
  it('totals the basket', function () {
    expect(1 + 1).to.equal(2)
  })

  it('applies a discount code before tax, and rounds half up', function () {
    if (isFirstAttempt()) {
      expect(4200).to.equal(3800)
    }
  })
})
