// The reporter you get locally, and the one most parsers are written against:
//   FAIL src/rerunGreen.spec.js
//     ● suite › test
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/deterministic/**/*.spec.js'],
  reporters: ['default'],
}
