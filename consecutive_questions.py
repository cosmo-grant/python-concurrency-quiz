# /// script
# requires-python = ">=3.14"
# dependencies = []
# ///

from pathlib import Path


def main() -> None:
    # avoid any clobbering
    questions = Path("questions")
    old_questions = Path("old_questions")
    questions.move(old_questions)
    questions.mkdir()

    # move the question dirs
    moves = []
    question_dirs = sorted(item for item in old_questions.iterdir() if item.is_dir())

    for i, question_dir in enumerate(question_dirs, start=1):
        dest = questions / format(i, "02d")
        moves.append((question_dir, dest))

    for current, dest in moves:
        current.move(dest)

    # move any remaining files
    remaining = [item for item in old_questions.iterdir()]
    for item in remaining:
        item.move_into(questions)

    # clean up
    old_questions.rmdir()  # errors if not empty


if __name__ == "__main__":
    main()
