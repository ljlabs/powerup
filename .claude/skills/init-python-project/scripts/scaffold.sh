#!/usr/bin/env bash
# Usage: scaffold.sh <project-dir> <package_name> "<description>"
set -euo pipefail

PROJECT_DIR="${1:?project dir required}"
PACKAGE_NAME="${2:?package name required (snake_case)}"
DESCRIPTION="${3:-A new Python project.}"

if [ -e "$PROJECT_DIR" ]; then
  echo "Error: $PROJECT_DIR already exists. Refusing to overwrite." >&2
  exit 1
fi

mkdir -p "$PROJECT_DIR"/{src/"$PACKAGE_NAME",tests/unit,tests/integration,rules}
cd "$PROJECT_DIR"

# --- pyproject.toml ---
cat > pyproject.toml <<EOF
[build-system]
requires = ["setuptools>=68", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "${PACKAGE_NAME}"
version = "0.1.0"
description = "${DESCRIPTION}"
requires-python = ">=3.11"
readme = "README.md"
dependencies = []

[project.optional-dependencies]
dev = ["pytest>=8", "pytest-cov", "ruff", "mypy"]

[tool.setuptools.packages.find]
where = ["src"]

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
line-length = 100

[tool.mypy]
python_version = "3.11"
strict = true
EOF

# --- package hello world ---
cat > "src/${PACKAGE_NAME}/__init__.py" <<EOF
"""${DESCRIPTION}"""

__version__ = "0.1.0"
EOF

cat > "src/${PACKAGE_NAME}/main.py" <<'EOF'
def hello(name: str = "world") -> str:
    """Return a friendly greeting."""
    return f"Hello, {name}!"


def main() -> None:
    print(hello())


if __name__ == "__main__":
    main()
EOF

cat > "tests/unit/test_main.py" <<EOF
from ${PACKAGE_NAME}.main import hello


def test_hello_default():
    assert hello() == "Hello, world!"


def test_hello_name():
    assert hello("Claude") == "Hello, Claude!"
EOF

touch tests/unit/__init__.py tests/integration/__init__.py

# --- README ---
cat > README.md <<EOF
# ${PACKAGE_NAME}

${DESCRIPTION}

## Setup

\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
\`\`\`

## Test

\`\`\`bash
pytest
\`\`\`
EOF

# --- .gitignore ---
cat > .gitignore <<'EOF'
.venv/
__pycache__/
*.pyc
.pytest_cache/
.mypy_cache/
.ruff_cache/
*.egg-info/
dist/
build/
.env
EOF

# --- rules folder for debugging-loop tracking (see root CLAUDE.md rule) ---
cat > rules/README.md <<'EOF'
# Rules / Lessons Log

This folder tracks debugging loops, failed approaches, and how they were
resolved, per the standing rule in ~/.claude/CLAUDE.md. Append entries as
`YYYY-MM-DD-short-slug.md`. Don't pre-populate — let entries accumulate
as real issues occur.
EOF

# --- venv + install ---
python3 -m venv .venv
# shellcheck disable=SC1091
source .venv/bin/activate
pip install --quiet --upgrade pip
pip install --quiet -e ".[dev]"
deactivate

# --- CLAUDE.md from template ---
cp /mnt/skills/user/init-python-project/assets/CLAUDE.md.template CLAUDE.md
sed -i "s/{{PACKAGE_NAME}}/${PACKAGE_NAME}/g" CLAUDE.md
sed -i "s/{{DESCRIPTION}}/${DESCRIPTION}/g" CLAUDE.md

# --- git init ---
git init -q
git add -A

echo "Python project scaffolded at $(pwd)"
echo "Activate venv with: source ${PROJECT_DIR}/.venv/bin/activate"
