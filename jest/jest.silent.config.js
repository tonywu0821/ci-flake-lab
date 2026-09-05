// The hostile case: the github-actions reporter on its own, silenced. No summary
// reporter alongside it, so the log carries no `PASS`/`FAIL` heading and no
// `Test Suites:` line — nothing that says which runner produced it.
//
// It does still carry the failures. `printFailedTestLogs` sits outside the reporter's
// own `silent` check, so the "Errors thrown in <file>" groups are printed whatever
// the setting. Worth pinning, because it is easy to read the
// reporter's source and conclude the opposite.
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/deterministic/**/*.spec.js'],
  reporters: [['github-actions', { silent: true }]],
}
