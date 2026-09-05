// Genuinely non-deterministic, unlike everything under deterministic/. These exist
// to show the tool works when the flake is real rather than manufactured, and they
// are in a separate jest project because a random failure on the *second* attempt
// leaves the run red and produces no rerun-green candidate at all.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('a race that usually wins', () => {
  it('should settle before the deadline', async () => {
    const started = Date.now()
    await sleep(Math.random() * 40)
    expect(Date.now() - started).toBeLessThan(20)
  })

  it('should agree with itself', () => {
    expect(Math.random() < 0.7).toBe(true)
  })
})
