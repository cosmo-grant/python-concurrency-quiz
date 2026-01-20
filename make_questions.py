# /// script
# requires-python = ">=3.14"
# dependencies = [
#     "jinja2",
# ]
# ///

from pathlib import Path
from jinja2 import Environment, FileSystemLoader
import random


def main() -> None:
    dirs = [path for path in Path("questions").iterdir() if path.is_dir()]
    dirs.sort()
    questions = []
    for dir in dirs:
        with open(dir / "snippet.py") as f:
            code = f.read()
        with open(dir / "output.txt") as f:
            output = f.read()
        with open(dir / "wrong_0.txt") as f:
            wrong_0 = f.read()
        with open(dir / "wrong_1.txt") as f:
            wrong_1 = f.read()
        with open(dir / "explanation.html") as f:
            explanation = f.read()
        answers = [output, wrong_0, wrong_1]
        random.shuffle(answers)
        correct = answers.index(output)
        questions.append([code, answers, correct, explanation])

    env = Environment(loader=FileSystemLoader("templates/"))
    template = env.get_template("questions.jinja")
    rendered = template.render(questions=questions)

    with open("questions.js", "w") as f:
        f.write(rendered)


if __name__ == "__main__":
    main()
