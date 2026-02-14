# /// script
# requires-python = ">=3.14"
# dependencies = []
# ///

from pathlib import Path


def main() -> None:
    questions = Path("questions")
    question_dirs = sorted(item for item in questions.iterdir() if item.is_dir())

    for question_dir in question_dirs:
        dest = question_dir.with_name(question_dir.name + "00")
        question_dir.move(dest)


if __name__ == "__main__":
    main()
