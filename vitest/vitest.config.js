import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // The default reporter. Vitest names a test with `>` between the file and each
    // level of the suite, where jest uses `›` between suite levels only — close
    // enough to look the same at a glance and different enough to break anything
    // that assumes one of them.
    reporters: ['default'],
    include: ['src/**/*.spec.js'],
  },
})
