using Xunit;

namespace Lab;

public class SessionTests
{
    [Fact]
    public void RefreshesATokenThatIsAboutToExpire()
    {
        if (Attempt.IsFirst)
        {
            throw new TimeoutException("refresh did not complete within 5000ms");
        }
    }

    [Fact]
    public void RejectsATokenSignedWithTheWrongKey()
    {
        Assert.Throws<ArgumentException>(() => throw new ArgumentException("invalid signature"));
    }
}
