// Not a failing test — a suite that cannot even be loaded. Jest reports it with the
// same bullet as a test failure ("Test suite failed to run"), and findings from it
// are marked suiteLevel.
if (Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1) {
  throw new Error("Cannot find module './notThereOnTheFirstTry' from 'src/deterministic/suiteFailure.spec.js'")
}

describe('module that loads on a rerun', () => {
  it('should load', () => {
    expect(true).toBe(true)
  })
})
