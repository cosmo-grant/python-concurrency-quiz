.PHONY: format questions

format:
	uv tool run ruff format .
	npx prettier --write .

questions:
	uv run ./make_questions.py
