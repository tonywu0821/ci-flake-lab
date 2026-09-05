package lab;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

// Gradle reports a test as `ClassName > methodName FAILED`, with nested classes
// adding another `>` level — the same separator vitest uses between a file and its
// suites, and nothing like Surefire's `ClassName.methodName` for the same code.
class CheckoutTest {

    @Test
    @DisplayName("totals the basket")
    void totalsTheBasket() {
        assertEquals(2000, 1200 + 800);
    }

    @Nested
    @DisplayName("with a discount code")
    class WithADiscountCode {
        @Test
        @DisplayName("applies it before tax, and rounds half up")
        void appliesItBeforeTax() {
            if (Attempt.isFirst()) {
                assertEquals(3800, 4200, "discount was applied after tax");
            }
            assertTrue(true);
        }
    }
}
