---
name: Init React + Firebase Project
description: Scaffold a React website with Vite + TypeScript, backed by Firebase (Firestore/Auth/Functions/Hosting) with local emulators, Jest unit tests, and Playwright e2e.
tags: [scaffold, react, firebase, vite, playwright]
category: tools
language: TypeScript
complexity: Advanced
author: anthropic
version: 1.0.0
icon: web
color: "bg-[#FED7AA]"
stars: 130
downloads: 900
rating: 4.8
featured: false
backgroundColor: bg-accent-apricot
features:
  - Vite + React + TypeScript frontend
  - Firebase Functions backend
  - Firestore with local emulators
  - Jest unit tests for web and functions
  - Playwright e2e tests
  - Firebase Auth scaffolding
useCommand: "bash <skill-dir>/scripts/scaffold.sh <project-dir> <description>"
---

# Init React + Firebase Project

Scaffolds a hosted-website-style project: Vite/React/TypeScript frontend, Firebase Functions backend, Firestore, emulators for local dev, and a full test setup.

## What this creates

- web/ — Vite + React + TypeScript
- functions/ — Firebase Functions (TypeScript)
- e2e/ — Playwright e2e tests
- firebase.json + .firebaserc
- firestore.rules + firestore.indexes.json

## Usage

```bash
bash <skill-dir>/scripts/scaffold.sh my-app "A dashboard app"
```

## Key conventions

- Jest everywhere (not Vitest) for uniformity
- Playwright for e2e against emulators
- .firebaserc has placeholder project ID — user runs firebase use --add
- Never deploy or create live Firebase project — scaffold only
