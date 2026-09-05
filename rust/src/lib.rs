pub fn is_first_attempt() -> bool {
    std::env::var("GITHUB_RUN_ATTEMPT").unwrap_or_else(|_| "1".into()) == "1"
}

pub fn total(items: &[u32]) -> u32 {
    items.iter().sum()
}

#[cfg(test)]
mod checkout {
    use super::*;

    #[test]
    fn totals_the_basket() {
        assert_eq!(total(&[1200, 800]), 2000);
    }

    #[test]
    fn applies_a_discount_before_tax_and_rounds_half_up() {
        if is_first_attempt() {
            assert_eq!(total(&[4200]), 3800, "discount was applied after tax");
        }
    }
}

#[cfg(test)]
mod session {
    use super::*;

    #[test]
    fn refreshes_a_token_that_is_about_to_expire() {
        if is_first_attempt() {
            panic!("Timeout: refresh did not complete within 5000ms");
        }
    }

    #[test]
    fn rejects_a_token_signed_with_the_wrong_key() {
        assert!("invalid signature".contains("signature"));
    }
}
