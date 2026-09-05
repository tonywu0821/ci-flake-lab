// What a great many projects actually run in CI, and a different shape entirely:
// passing files are wrapped in a group, and every failure message is printed once
// at the end grouped per file, long after that file's FAIL line.
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/deterministic/**/*.spec.js'],
  reporters: [
    ['summary', { summaryThreshold: 1 }],
    ['github-actions', { silent: false }],
  ],
}
