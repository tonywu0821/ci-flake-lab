package lab;

final class Attempt {
    private Attempt() {}

    static boolean isFirst() {
        String a = System.getenv("GITHUB_RUN_ATTEMPT");
        return a == null || a.equals("1");
    }
}
