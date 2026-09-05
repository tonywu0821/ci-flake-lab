namespace Lab;

internal static class Attempt
{
    internal static bool IsFirst =>
        (Environment.GetEnvironmentVariable("GITHUB_RUN_ATTEMPT") ?? "1") == "1";
}
