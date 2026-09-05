using Xunit;

namespace Lab;

// `dotnet test` names a failure with its fully qualified name,
// `Namespace.Class.Method`, and a theory carries its arguments in brackets after
// it — two cases of one test differing only inside those brackets.
public class CheckoutTests
{
    [Fact]
    public void TotalsTheBasket()
    {
        Assert.Equal(2000, 1200 + 800);
    }

    [Fact]
    public void AppliesADiscountBeforeTaxAndRoundsHalfUp()
    {
        if (Attempt.IsFirst)
        {
            Assert.Equal(3800, 4200);
        }
    }

    [Theory]
    [InlineData("AUD", 100)]
    [InlineData("GBP", 100)]
    [InlineData("USD", 100)]
    public void ConvertsMinorUnits(string currency, int expected)
    {
        var actual = Attempt.IsFirst && currency == "GBP" ? 99 : 100;
        Assert.Equal(expected, actual);
    }
}
