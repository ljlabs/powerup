---
name: Init GitHub.io Claude Skills
description: Scaffold a GitHub Pages website that showcases Claude skills from a GitHub repo. Creates a React + Vite + TypeScript + Tailwind site with auto-deploy via GitHub Actions.
tags: [scaffold, github-pages, react, vite]
category: tools
language: TypeScript
complexity: Intermediate
author: anthropic
version: 1.0.0
icon: deploy
color: "bg-[#BAE6FD]"
stars: 150
downloads: 800
rating: 4.7
featured: true
backgroundColor: bg-accent-sky
features:
  - Vite + React + TypeScript + Tailwind CSS setup
  - GitHub Actions auto-deploy to *.github.io
  - Manifest generator scans skills/ folders
  - Monorepo and single-repo modes
  - HashRouter for GitHub Pages compatibility
useCommand: "node <skill-dir>/scripts/scaffold.js <target-directory>"
---

# Init GitHub.io Claude Skills

Scaffold a React-based GitHub Pages site that automatically showcases Claude skills stored in a GitHub repository.

## What this creates

- Vite + React + TypeScript project
- Tailwind CSS for styling
- GitHub Actions workflow for auto-deploy
- Manifest generator (scripts/generate-manifest.js)
- React app with routing, landing page, and skill detail page

## Usage

```bash
# Single-repo mode
node <skill-dir>/scripts/scaffold.js my-project

# Monorepo mode
node <skill-dir>/scripts/scaffold.js workspace/website --monorepo
```

## Deployment

Push to main and GitHub Actions deploys automatically. Set Pages source to "Deploy from a branch" with the `gh-pages` branch.

See the full guide in the skill's SKILL.md file for detailed setup instructions.
