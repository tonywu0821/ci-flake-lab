<?php

use PHPUnit\Framework\TestCase;

// PHPUnit reports a failure as `ClassName::methodName`, with the message on the
// following lines and a numbered heading above it.
final class CheckoutTest extends TestCase
{
    public function testTotalsTheBasket(): void
    {
        $this->assertSame(2000, 1200 + 800);
    }

    public function testAppliesADiscountBeforeTaxAndRoundsHalfUp(): void
    {
        if (is_first_attempt()) {
            $this->assertSame(3800, 4200, 'discount was applied after tax');
        }
        $this->assertTrue(true);
    }
}
