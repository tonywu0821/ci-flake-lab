// Kept apart from the deterministic fixtures on purpose: a genuinely random test
// can fail on the second attempt too, which leaves the run red and produces no
// rerun-green candidate at all. Mixing the two would poison the reliable ones.
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/random/**/*.spec.js'],
  reporters: ['default'],
}
