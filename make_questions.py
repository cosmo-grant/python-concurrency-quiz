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
    code_lines = []
    answer_lines = []

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
        with open(dir / "preface.html") as f:
            preface = f.read()
        answers = [output, wrong_0, wrong_1]
        random.shuffle(answers)
        correct = answers.index(output)
        questions.append([preface, code, answers, correct, explanation])
        code_lines.append(len(code.splitlines()))
        answer_lines.extend(
            [
                len(output.splitlines()),
                len(wrong_0.splitlines()),
                len(wrong_1.splitlines()),
            ]
        )

    env = Environment(loader=FileSystemLoader("templates/"))
    template = env.get_template("questions.jinja")
    rendered = template.render(questions=questions)

    with open("questions.js", "w") as f:
        f.write(rendered)

    with open("questions-vars.css", "w") as f:
        f.write(f":root {{ --max-snippet-lines: {max(code_lines)}; }}\n")
        f.write(f":root {{ --max-answer-lines: {max(answer_lines)}; }}\n")


if __name__ == "__main__":
    main()
