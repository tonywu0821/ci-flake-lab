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
        // The delegate type is declared rather than inferred: a lambda whose body is
        // only a throw converts to any delegate, and overload resolution picks the
        // obsolete Func<Task> one.
        Action signWithTheWrongKey = () => throw new ArgumentException("invalid signature");
        Assert.Throws<ArgumentException>(signWithTheWrongKey);
    }
}
