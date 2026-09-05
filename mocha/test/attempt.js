exports.isFirstAttempt = () => Number(process.env.GITHUB_RUN_ATTEMPT ?? 1) === 1
