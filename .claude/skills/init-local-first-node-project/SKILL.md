---
name: init-local-first-node-project
description: Scaffold a brand-new greenfield local-first application with a Vite+React+TypeScript frontend, a Node/Express+TypeScript backend serving both the API and the built UI on a single configurable port, a shared TypeScript types package used by both sides, and a Dockerfile for easy deployment. Use this whenever the user wants a tool that runs primarily on their own machine (not hosted on Firebase/cloud), especially phrases like "local tool", "local-first", "runs on my machine", "single port", or "dockerize this". Do NOT use for hosted websites with Firebase (use init-react-firebase-project) or plain non-web Python scripts (use init-python-project).
---

# Init Local-First Node Project

Scaffolds a local-first app: one Node/Express server that serves the built React UI and the API on a single port, a shared types package so frontend and backend never drift on their contract, and Docker for packaging — so a fresh Claude Code session starts with working structure instead of an empty directory.

## When to use

- User describes a tool meant to run locally on their machine (dashboards, internal tools, utilities with a UI) rather than a publicly hosted website.
- Mentions of "single port", "local server", "dockerize", or explicitly says this isn't going on Firebase/cloud hosting.
- If it needs real hosting/auth/Firestore-style backend-as-a-service, prefer `init-react-firebase-project` instead.

## Workflow

1. **Clarify minimally, then proceed.** You need: project name, one-line description, and a default port number (pick 3000 if unstated — it's overridable via `.env` anyway).
2. **Run the scaffold script**:
   ```bash
   bash /mnt/skills/user/init-local-first-node-project/scripts/scaffold.sh <project-dir> "<short description>" <default-port>
   ```
3. **Tailor CLAUDE.md**: rewrite "Project Purpose" and "Architecture Notes" in the generated `CLAUDE.md` to reflect what the user is actually building — likely shared types, routes, and UI views — don't leave it generic. Keep "Working Rules" and "Debugging Log Protocol" intact.
4. **Write `HANDOFF.md`** (~10 lines): what was scaffolded, how to run dev, how to change the port, how to build the Docker image, what to do next.
5. **Tell the user** it's ready and to restart their session in the project directory.

## Project shape

```
<project>/
├── packages/
│   ├── shared-types/       # TS types imported by both web and server — the contract
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── server/              # Node + Express + TS
│   │   ├── src/index.ts     # serves API under /api/* AND the built web/dist as static files
│   │   ├── src/index.test.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                  # Vite + React + TS
│       ├── src/App.tsx
│       ├── src/App.test.tsx
│       ├── vite.config.ts    # dev-mode proxy: /api -> server, port read from .env
│       ├── package.json
│       └── tsconfig.json
├── Dockerfile                # multi-stage: build web, build server, run single container
├── docker-compose.yml
├── .env.example              # PORT=3000 (copy to .env and change per-project to avoid collisions)
├── package.json               # root workspaces + orchestration scripts
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Key conventions baked in

- **Single port, always.** `npm run start` builds the web app and the server, then runs the server, which serves the static UI build AND the `/api/*` routes on the one port from `.env` (`PORT`). This is a hard requirement — never split UI/API onto separate ports for the packaged app.
- **Port is `.env`-driven** (`PORT=3000` by default) specifically because the user runs many of these locally at once and needs to avoid collisions.
- **Dev mode** still uses the Vite dev server for hot reload, but its proxy config forwards `/api` requests to the Express server (reading the same `.env` port) — so behavior matches prod even in dev.
- **Shared types package** (`packages/shared-types`) is a real local npm workspace package — both `web` and `server` depend on it (`"shared-types": "*"` via npm workspaces), so API request/response shapes are defined once and imported on both sides. Never duplicate interface definitions between web and server — extend `shared-types` instead.
- **Docker**: multi-stage build (deps → build → slim runtime image), single container, single exposed port, reads `PORT` from env at runtime.

## Notes

- Never `git commit` automatically unless asked.
- Don't build a Python server here — per the user's standing preference, local-first projects with a server are always Node; Python is reserved for CLI-only tools (use `init-python-project` for those).
