# Python Notes

- Note you need range(len(...)) to make iteration work
  `# m = [[1 for i in range(len(parsed_groups)) if i > 2 else 0] for j in range(len(values))]`

- Watch out, this is a reference!Q copy
  `# m = [[0] * cols] * rows   # WRONG!`

## To run

Use `python3` to run it.

Or actually, use `source .venv/bin/activate` to run virtual environment, then we can use regular `pip` and `python` commands
