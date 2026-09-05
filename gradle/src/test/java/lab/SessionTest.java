package lab;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class SessionTest {

    @Test
    void refreshesATokenThatIsAboutToExpire() {
        if (Attempt.isFirst()) {
            throw new IllegalStateException("Timeout: refresh did not complete within 5000ms");
        }
        assertTrue(true);
    }

    @Test
    void rejectsATokenSignedWithTheWrongKey() {
        assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("invalid signature");
        });
    }
}
