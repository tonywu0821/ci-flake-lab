package pairing

import (
	"os"
	"testing"
)

func statusOf(deviceUUID string) string {
	if deviceUUID == "" {
		return "UNKNOWN"
	}
	return "ACTIVE"
}

// A second failing package, so the summary carries more than one and the parser
// has to attribute each failure to the right one.
func TestFetchPairingByDeviceUuid(t *testing.T) {
	if a := os.Getenv("GITHUB_RUN_ATTEMPT"); a == "" || a == "1" {
		t.Fatalf("no pairing found for device fa91ec26-6bba-4921-9011-d6ff16c3e2a6")
	}
}

func TestPairingStatus(t *testing.T) {
	if got := statusOf("fa91ec26"); got != "ACTIVE" {
		t.Errorf("status = %q, want ACTIVE", got)
	}
}
