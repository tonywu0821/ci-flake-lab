const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1

// Node's built-in runner needs no dependencies at all, which is why it turns up in
// small projects — and it has two output formats. `tap` is a format of its own: a
// `not ok N - <name>` line with a YAML block under it. `spec` looks much more like
// jest. Which one you get by default changed in Node 22, so both are pinned here
// rather than left to the runtime.
describe('checkout', () => {
  it('totals the basket', () => {
    assert.equal(1200 + 800, 2000)
  })

  it('applies a discount code before tax, and rounds half up', () => {
    if (isFirstAttempt()) {
      assert.deepEqual({ total: 4200, tax: 380 }, { total: 3800, tax: 380 })
    }
  })
})
