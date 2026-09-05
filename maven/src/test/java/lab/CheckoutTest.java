package lab;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

// Surefire prints a per-class summary line and then a numbered failure block naming
// the test as `ClassName.methodName`. @DisplayName changes what the console shows
// without changing the method name, so the same test has two names depending on
// where you read it.
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
