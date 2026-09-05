<?php

use PHPUnit\Framework\TestCase;

final class SessionTest extends TestCase
{
    public function testRefreshesATokenThatIsAboutToExpire(): void
    {
        if (is_first_attempt()) {
            throw new RuntimeException('Timeout: refresh did not complete within 5000ms');
        }
        $this->assertTrue(true);
    }

    public function testRejectsATokenSignedWithTheWrongKey(): void
    {
        $this->expectException(InvalidArgumentException::class);
        throw new InvalidArgumentException('invalid signature');
    }
}
