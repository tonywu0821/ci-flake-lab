from .attempt import is_first_attempt


class TestCheckout:
    def test_totals_the_basket(self):
        assert 1 + 1 == 2

    def test_applies_a_discount_before_tax_and_rounds_half_up(self):
        # pytest names this `tests/test_checkout.py::TestCheckout::test_...`, a
        # third separator convention on top of jest's `›` and vitest's `>`.
        if is_first_attempt():
            assert {"total": 4200, "tax": 380} == {"total": 3800, "tax": 380}
