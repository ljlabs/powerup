---
name: Init Python Project
description: Scaffold a greenfield Python project with venv, pyproject.toml, src-layout, pytest tests, git init, and a tailored CLAUDE.md.
tags: [scaffold, python, pytest, pyproject]
category: tools
language: Python
complexity: Beginner
author: anthropic
version: 1.0.0
icon: code
color: "bg-[#FFF9C4]"
stars: 110
downloads: 700
rating: 4.5
featured: false
backgroundColor: bg-accent-apricot
features:
  - pyproject.toml (PEP 621) — no legacy setup.py
  - src-layout package structure
  - pytest test runner
  - Virtual environment setup
  - Tailored CLAUDE.md
useCommand: "bash <skill-dir>/scripts/scaffold.sh <project-dir> <package_name> <description>"
---

# Init Python Project

Scaffolds a clean, opinionated Python project skeleton so a fresh Claude Code session starts with working structure.

## What this creates

- pyproject.toml (PEP 621)
- src-layout package
- tests/ with pytest
- venv setup
- CLAUDE.md with project-specific content
- git init (no automatic commit)

## Usage

```bash
bash <skill-dir>/scripts/scaffold.sh my-tool "A CLI tool for X"
```

## Key conventions

- Uses pyproject.toml, not setup.py
- Install: pip install -e ".[dev]" inside venv
- Test runner: pytest
- Never git commit automatically — just git init
