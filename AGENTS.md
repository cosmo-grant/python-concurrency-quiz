# AGENTS.md

This file provides guidelines for agents working on this codebase.

## Project Overview

This is a Python concurrency quiz application. It generates a JavaScript quiz from Python code snippets that demonstrate Python concurrency concepts (threading, multiprocessing, asyncio, etc.).

## Build/Lint/Test Commands

### Formatting (linting)

Format all files (Python + HTML/JS):

```bash
make format
```

This runs:

- `uv tool run ruff format .` - Formats Python files
- `npx prettier --write .` - Formats HTML/JS files

### Running Python scripts

Generate quiz questions:

```bash
make questions
```

This runs:

```bash
uv run ./make_questions.py
```

### Running a single Python file

To run any Python file in the project:

```bash
uv run <path/to/file.py>
```

### Running ruff directly

```bash
uv tool run ruff check .
uv tool run ruff format --check .
```

## Code Style Guidelines

### Python Version

- Requires Python >= 3.14 (see `make_questions.py` header)

### Imports

- Standard library imports first, then third-party
- Use explicit imports (e.g., `from time import sleep` not `import time`)
- Group imports with blank lines between groups

### Formatting

- Follows ruff defaults (PEP 8)
- 4 spaces for indentation
- Line length: 88 characters (ruff default)
- Use blank lines sparingly to group related code

### Types

- Use type hints for function signatures
- Return type annotations required (e.g., `def main() -> None:`)
- Use built-in types (e.g., `list[str]`, not `List[str]`)

### Naming Conventions

- `snake_case` for functions, variables
- `PascalCase` for classes
- `SCREAMING_SNAKE_CASE` for constants

### Code Examples

From the codebase:

```python
from time import sleep


def main() -> None:
    dirs = [path for path in Path("questions").iterdir() if path.is_dir()]
    dirs.sort()
    # ...
```

### Error Handling

- Use explicit exception types
- Let exceptions propagate unless specific handling is needed

### Question Snippet Files

Each question has a `questions/NN/snippet.py` file containing Python code that demonstrates a concurrency concept. These are executed to generate quiz answers.

### Scripts Structure

- `make_questions.py` - Main script that reads question files and generates `questions.js`
- `questions/NN/snippet.py` - Python code snippets for each question
- Templates use Jinja2 (see `templates/`)

## File Organization

```
.
├── make_questions.py       # Main script
├── questions.js            # Generated output
├── questions/              # Individual question directories (01, 02, ...)
│   └── snippet.py          # Code snippet for the quiz
├── templates/              # Jinja2 templates
│   └── questions.jinja
├── index.html
├── quiz.js
├── questions.js
└── Makefile
```

## Development Workflow

1. Edit question files in `questions/NN/` directory
2. Run `make questions` to regenerate `questions.js`
3. Run `make format` before committing

## Key Dependencies

- Python >= 3.14
- jinja2 (for template rendering)
- ruff (for Python formatting)
- prettier (for HTML/JS formatting)
