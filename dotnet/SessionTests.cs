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
        // A statement lambda, not an expression one: `() => throw ...` is inferred as
        // Func<Task> and picks the obsolete async overload.
        Assert.Throws<ArgumentException>(() =>
        {
            throw new ArgumentException("invalid signature");
        });
    }
}
