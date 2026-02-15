.PHONY: format questions view

format:
	uv tool run ruff format .
	npx prettier --write .

questions:
	uv run ./make_questions.py

view:
	open https://cosmo-grant.github.io/python-concurrency-quiz/
