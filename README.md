# ci-flake-lab

**This repository's CI is supposed to be red.** Nothing here is broken.

It exists to produce real GitHub Actions logs of flaky tests — one test runner and
one reporter configuration at a time, on demand, without waiting for a real project
to misbehave. The logs are the artefact; the tests are only a way to generate them.

Every runner formats its console output differently, changes that format when it
detects CI, and truncates or rewrites parts of it on the way into the stored log.
Reading those logs back is harder than it looks, and this is somewhere to see what
they actually contain.

## Why the flakiness is manufactured

The interesting case is a run that fails and then passes on a rerun of the same
commit — no code change, different result.

A test that flakes at random cannot produce that reliably: you wait, and when it
finally fails you cannot assert on what came out. So the flakiness here is keyed to
the attempt number instead.

```js
const isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1

it('should apply a discount code before tax', () => {
  if (isFirstAttempt()) {
    expect({ total: 4200 }).toEqual({ total: 3800 })
  }
})
```

A separate workflow reruns any failed run once, so every push produces exactly one
failed-then-green run per runner. A run cannot rerun itself while it is still in
progress, which is why that lives in `rerun.yml` behind `workflow_run` rather than
as an `if: failure()` step.

`jest/src/random/` holds tests that are genuinely non-deterministic. They are in
their own workflow because a random failure on the *second* attempt leaves the run
red and produces nothing useful — mixing them in would spoil the reliable ones.

## What each fixture shows

| Fixture | Output worth looking at |
|---|---|
| `jest-default` | the reporter you get locally: `FAIL <file>` then `● suite › test` |
| `jest-github-actions` | what a great many projects actually run in CI. Passing files are inside a group, and every failure message is printed once at the very end, grouped per file — nowhere near its own `FAIL` line |
| `jest-silent` | that reporter alone, silenced. `silent: true` does not silence the failures — the code that prints them sits outside the check — but it does remove the per-file headings, and with no other reporter there is no `Test Suites:` line either |
| `cypress` | failures printed twice, in two shapes, disagreeing about how much of the describe path they show |
| `go` | `gotestsum --format testname`, including a failing subtest, which fails its parent too so the same failure is reported at two levels |
| `jest-random` | the same thing when the flake is real rather than manufactured |

The specs also carry a long title, a title containing a comma, a title using jest's
`›` separator, and a suite that fails to load rather than a test that fails. Each of
those is formatted differently from an ordinary failure, and the comma one is
notable: GitHub's workflow-command parser splits properties on commas, so a test
name containing one arrives in the check-run annotation cut off at the first comma.

## Running it locally

These tests are red locally on purpose — `GITHUB_RUN_ATTEMPT` is unset, which counts
as the first attempt.

```bash
cd jest && npm install && npm run test:default        # red
GITHUB_RUN_ATTEMPT=2 npm run test:default             # green
```

## License

MIT
