import os


def is_first_attempt() -> bool:
    return os.environ.get("GITHUB_RUN_ATTEMPT", "1") == "1"
