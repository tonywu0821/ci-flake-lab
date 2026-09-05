import pytest

from .attempt import is_first_attempt


def test_refreshes_a_token_that_is_about_to_expire():
    if is_first_attempt():
        raise TimeoutError("refresh did not complete within 5000ms")


def test_rejects_a_token_signed_with_the_wrong_key():
    with pytest.raises(ValueError):
        raise ValueError("invalid signature")


# Parametrised cases carry their argument in the reported name, in brackets. That
# is a real name, not noise, and two of them differ only inside those brackets.
@pytest.mark.parametrize("currency,expected", [("AUD", 100), ("GBP", 100), ("USD", 100)])
def test_converts_minor_units(currency, expected):
    if is_first_attempt() and currency == "GBP":
        assert 99 == expected
    else:
        assert 100 == expected
