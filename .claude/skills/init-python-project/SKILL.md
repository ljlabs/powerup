---
name: init-python-project
description: Scaffold a brand-new greenfield Python project with venv, pyproject.toml, src-layout package, pytest tests, git init, and a tailored CLAUDE.md. Use this whenever the user wants to start a new Python project, script, CLI tool, library, or backend service from scratch (a "blank canvas" setup), or explicitly asks to scaffold/init/bootstrap a Python project. Do NOT use for adding Python code to an existing repo, or for React/Node/Firebase/full-stack projects — use init-react-firebase-project or init-local-first-node-project instead.
---

# Init Python Project

Scaffolds a clean, opinionated Python project skeleton so a fresh Claude Code session starts with working structure instead of an empty directory.

## When to use

- User wants a new Python project, script, library, or CLI tool from scratch.
- User is greenfield-starting something and Python is the obvious/stated choice (not a website, not local-first with a Node server).

## Workflow

1. **Clarify minimally, then proceed.** You need: project name (dir name + package name), and a one-line description of what it does. If the user's request already implies these, don't ask — infer sensible defaults (kebab-case directory, snake_case package name).
2. **Run the scaffold script**:
   ```bash
   bash /mnt/skills/user/init-python-project/scripts/scaffold.sh <project-dir> <package_name> "<short description>"
   ```
   This creates the full directory structure, `pyproject.toml`, venv, git init, and a placeholder hello-world module + test.
3. **Tailor CLAUDE.md**: The script drops a generic `CLAUDE.md` template into the project root (from `assets/CLAUDE.md.template`). Read it, then **rewrite the "Project Purpose" and "Architecture Notes" sections** to reflect what the user actually described they want to build — don't leave it generic. Keep the "Working Rules" and "Debugging Log Protocol" sections from the template intact; those are standing rules, not project-specific.
4. **Write a short handoff doc** at `<project-dir>/HANDOFF.md` summarizing: what was scaffolded, how to activate the venv, how to run tests, and what to do next. Keep it to ~10 lines — the user is about to restart their session and will read this first, then load the fresh CLAUDE.md.
5. **Tell the user** the project is ready, give the exact `cd` + venv-activate command, and remind them to restart their Claude Code session in that directory so CLAUDE.md loads fresh.

## Notes

- Uses `pyproject.toml` (PEP 621), not legacy `setup.py`.
- Dependency install: `pip install -e ".[dev]"` inside the venv.
- Test runner: `pytest`. Structure supports unit tests now, and room for integration tests under `tests/integration/` if the project grows.
- Never `git commit` automatically — just `git init` and leave the initial commit to the user (they may want to review first). If the user explicitly asks for an initial commit, that's fine to do.
