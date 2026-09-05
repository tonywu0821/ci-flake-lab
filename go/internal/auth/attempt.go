package auth

import "os"

// IsFirstAttempt reports whether this is the first attempt of a CI run. See the
// jest fixture's attempt.js for why the flakiness is manufactured this way.
func IsFirstAttempt() bool {
	a := os.Getenv("GITHUB_RUN_ATTEMPT")
	return a == "" || a == "1"
}
