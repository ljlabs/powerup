---
name: Init Local-First Node Project
description: Scaffold a local-first application with Vite+React+TypeScript frontend, Node/Express+TypeScript backend, shared types package, and Dockerfile for single-port deployment.
tags: [scaffold, node, react, docker, local-first]
category: tools
language: TypeScript
complexity: Intermediate
author: anthropic
version: 1.0.0
icon: terminal
color: "bg-[#D1FADF]"
stars: 95
downloads: 600
rating: 4.6
featured: false
backgroundColor: bg-accent-mint
features:
  - Single-port server (API + built UI)
  - Shared TypeScript types package
  - Vite dev server with API proxy
  - Multi-stage Dockerfile
  - .env-driven port configuration
useCommand: "bash <skill-dir>/scripts/scaffold.sh <project-dir> <description> <port>"
---

# Init Local-First Node Project

Scaffolds a local-first app: one Node/Express server that serves the built React UI and the API on a single port.

## What this creates

- packages/shared-types — TS types imported by both web and server
- packages/server — Node + Express + TypeScript
- packages/web — Vite + React + TypeScript
- Dockerfile — multi-stage build
- docker-compose.yml
- .env.example — PORT=3000

## Usage

```bash
bash <skill-dir>/scripts/scaffold.sh my-tool "A local dashboard" 3000
```

## Key conventions

- Single port, always (API + UI on one port)
- Port is .env-driven (default: 3000)
- Dev mode uses Vite proxy for /api requests
- Shared types package prevents contract drift
