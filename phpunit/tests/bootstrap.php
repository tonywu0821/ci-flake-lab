<?php

function is_first_attempt(): bool
{
    return (getenv('GITHUB_RUN_ATTEMPT') ?: '1') === '1';
}
