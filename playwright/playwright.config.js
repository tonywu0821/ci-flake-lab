const { defineConfig } = require('@playwright/test')

// Two projects, because playwright prints the project name in every reported line
// and a failure in two projects is two lines for one test. No browser is launched
// — these assert on values rather than on a page — so nothing here needs
// `playwright install`, and the reported shape is the same either way.
module.exports = defineConfig({
  testDir: './tests',
  // Zero, deliberately. A retry that goes green is invisible from outside the run,
  // which is a different problem from the one this repository is about.
  retries: 0,
  reporter: 'list',
  projects: [{ name: 'chromium' }, { name: 'firefox' }],
})
