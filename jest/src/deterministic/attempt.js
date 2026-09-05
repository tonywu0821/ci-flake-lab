// The whole fixture rests on this. A test that flakes at random has to be waited
// for and cannot be asserted on; a test that fails on the first attempt of a run
// and passes on the second manufactures the interesting case — same commit, failed,
// then green on a rerun — on every push, reliably.
//
// GITHUB_RUN_ATTEMPT is set by Actions and is 1 on the first attempt. Locally it is
// unset, so these tests fail locally too. That is deliberate: `npm test` here is
// meant to be red.
const isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1

module.exports = { isFirstAttempt }
