const { defineConfig } = require('cypress')

// No server and no baseUrl: these specs assert on values rather than on a page, so
// the fixture stays fast and cannot fail for a reason of its own. The point is the
// console output cypress produces, not what it is testing.
module.exports = defineConfig({
  e2e: {
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
  },
})
