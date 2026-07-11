---
name: init-react-firebase-project
description: Scaffold a brand-new greenfield React website project using Vite + TypeScript, backed by Firebase (Firestore/Auth/Functions/Hosting) with local emulators, and a full test pyramid (Jest unit tests for frontend and functions, Playwright e2e). Use this whenever the user wants to start a new website, web app, or React frontend from scratch — especially if it mentions Firebase, hosting, auth, or a database-backed site. Do NOT use for a purely local-first tool with a Node/Python server and no Firebase (use init-local-first-node-project instead), and NOT for plain scripts/CLIs (use init-python-project).
---

# Init React + Firebase Project

Scaffolds a hosted-website-style project: Vite/React/TypeScript frontend, Firebase Functions backend, Firestore, emulators for local dev, and a full Jest + Playwright test setup — so a fresh Claude Code session starts with a working skeleton instead of an empty directory.

## When to use

- User wants a new website / web app and it's going to be deployed (as opposed to a purely local tool).
- Mentions of Firebase, hosting, auth, database-backed site, "a website like X" strongly suggest this skill.
- If the user instead describes a tool that only runs locally on their machine with no hosting/deploy need, prefer `init-local-first-node-project`.

## Workflow

1. **Clarify minimally, then proceed.** You need: project name, one-line description, and whether they want Auth/Firestore wired up now or added later (default: yes, scaffold both — empty but present, since it's cheap and this is the standard shape they use).
2. **Run the scaffold script**:
   ```bash
   bash /mnt/skills/user/init-react-firebase-project/scripts/scaffold.sh <project-dir> "<short description>"
   ```
   This creates the monorepo layout below, installs dependencies, and git-inits.
3. **Tailor CLAUDE.md**: rewrite the "Project Purpose" and "Architecture Notes" sections in the generated `CLAUDE.md` to reflect the actual product the user described — what pages/collections/functions it will likely need — don't leave it generic. Keep "Working Rules" and "Debugging Log Protocol" intact.
4. **Write `HANDOFF.md`** (~10 lines): what was scaffolded, how to run dev (`npm run dev`), how to run emulators, how to run all tests, what to do next.
5. **Tell the user** the project is ready and to restart their session in that directory so the fresh CLAUDE.md loads.

## Project shape

```
<project>/
├── firebase.json           # emulator ports + hosting/functions config
├── .firebaserc              # placeholder project alias (user fills in real project id)
├── firestore.rules
├── firestore.indexes.json
├── functions/                # Firebase Functions backend (TypeScript)
│   ├── src/index.ts
│   ├── src/index.test.ts     # unit test
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── web/                       # Vite + React + TypeScript frontend
│   ├── src/App.tsx
│   ├── src/App.test.tsx      # frontend unit test (Jest + Testing Library)
│   ├── src/main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── e2e/                        # Playwright e2e, runs against emulators
│   ├── playwright.config.ts
│   └── tests/example.spec.ts
├── package.json               # root: npm workspaces + top-level scripts
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Key conventions baked in

- **Jest everywhere** (not Vitest) for both `web/` and `functions/` — kept deliberately uniform per the user's preference for simplicity.
- **Playwright** for e2e, configured to boot the Firebase emulator suite + Vite dev server together (`e2e` npm script handles orchestration).
- Root `package.json` scripts:
  - `npm run dev` — Vite dev server only
  - `npm run emulators` — Firebase emulator suite (Firestore/Auth/Functions/Hosting)
  - `npm run test` — runs Jest in both `web/` and `functions/`
  - `npm run test:e2e` — Playwright, against emulators
  - `npm run build` — builds `web/` and `functions/`
- `.firebaserc` has a placeholder project id — user must run `firebase use --add` once they have a real Firebase project, or edit it directly.

## Notes

- Never `git commit` automatically unless asked.
- Don't attempt to actually deploy or create a live Firebase project — this skill only scaffolds local structure + emulator config.
