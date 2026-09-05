package auth

import "testing"

func decode(token string) (string, bool) {
	if token == "" {
		return "", false
	}
	return "dashboard", true
}

func TestCheckTokenValid(t *testing.T) {
	if _, ok := decode("header.payload.signature"); !ok {
		t.Fatal("expected a well formed token to decode")
	}
}

func TestCheckTokenExpiry(t *testing.T) {
	if IsFirstAttempt() {
		t.Fatalf("expected 401, got 200")
	}
}

// A failing subtest fails its parent too, and Go reports both. Only the leaf
// should become a ticket — otherwise one flake opens two.
func TestCheckTokenClaims(t *testing.T) {
	t.Run("audience", func(t *testing.T) {
		aud, _ := decode("header.payload.signature")
		if aud != "dashboard" {
			t.Errorf("unexpected audience %q", aud)
		}
	})
	t.Run("no exp", func(t *testing.T) {
		if IsFirstAttempt() {
			t.Errorf("exp claim was absent")
		}
	})
}
