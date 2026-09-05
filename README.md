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
| `vitest` | names a test `file > suite > test`, where jest uses `›` between suite levels only — close enough to look the same at a glance |
| `mocha` | numbers its failures and spreads the suite path over several indented lines rather than putting it on one |
| `playwright` | two projects, so one test failing is two reported lines; the numbered failure blocks are padded out to the terminal width with box-drawing characters, and the padding lands inside the title |
| `pytest` | `file::Class::test` — a third separator convention — plus parametrised cases carrying their argument in brackets, where two names differ only inside those brackets |
| `node-test` | node's built-in runner, in both of its formats: `tap` (`not ok N - <name>` with a YAML block) and `spec`, which looks much more like jest. Which one you get by default changed in Node 22 |
| `rust` | `cargo test`, which lists failures twice — once inline as `---- <path> stdout ----` and once as a bare list under `failures:` |
| `rspec` | joins the describe path with spaces and no separator at all, so nothing marks where the suite ends and the example begins |
| `phpunit` | names a failure `ClassName::methodName` under a numbered heading, with `--testdox` producing a completely different, prose-like rendering of the same run |
| `maven` | Surefire, naming the test `ClassName.methodName` — while `@DisplayName` gives the same test a second, human name that appears elsewhere in the same log |
| `gradle` | the same JUnit tests reported as `ClassName > methodName FAILED`, and only because `testLogging` was configured — by default Gradle says almost nothing, so two projects on the same runner can produce entirely different logs |
| `dotnet` | fully qualified `Namespace.Class.Method`, with theory cases carrying their arguments in brackets |

Every fixture has the same shape — a passing test, a test that fails only on the
first attempt, and a nested suite — so what differs between two logs is the format
and nothing else.

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
