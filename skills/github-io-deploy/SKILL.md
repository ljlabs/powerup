---
name: GitHub.io Deploy
description: Deploy a Vite React website to GitHub Pages using GitHub Actions. Covers workflow setup, gh-pages branch configuration, repo settings, and troubleshooting 404 errors.
tags: [deploy, github-pages, vite, react, actions]
category: tools
language: TypeScript
complexity: Intermediate
author: anthropic
version: 1.0.0
icon: cloud_upload
color: "bg-[#BAE6FD]"
stars: 75
downloads: 400
rating: 4.4
featured: false
backgroundColor: bg-accent-sky
features:
  - GitHub Actions auto-deploy on push
  - peaceiris/actions-gh-pages integration
  - Vite base path configuration
  - gh-pages branch setup
  - Windows vs Linux CI path handling
  - Troubleshooting guide for common issues
useCommand: "See deployment steps in SKILL.md"
---

# GitHub.io Deploy

Deploy a Vite + React website to GitHub Pages using GitHub Actions.

## How it works

1. Build the Vite project
2. Push built `dist/` to `gh-pages` branch via `peaceiris/actions-gh-pages`
3. GitHub Pages serves from `gh-pages` branch

## Setup steps

### 1. Update vite.config.ts

```ts
base: "/<repo-name>/",  // e.g., "/powerup/" for ljlabs/powerup
```

### 2. Create workflow

`.github/workflows/deploy.yml` — see full template in SKILL.md.

### 3. Create gh-pages branch

```bash
git checkout --orphan gh-pages
echo "deploying" > index.html
git add index.html && git commit -m "init" && git push origin gh-pages
git checkout main
```

### 4. Enable Pages in repo settings

Settings → Pages → Deploy from a branch → `gh-pages` → `/ (root)`

### 5. Push to deploy

```bash
git push origin main
```

Site live at: `https://<owner>.github.io/<repo>/`

## Common issues

- **404 after deploy** — `base` in vite.config.ts doesn't match repo name
- **"Pages already enabled"** — change source to "Deploy from a branch"
- **Build fails in CI** — Windows backslashes in npm scripts; remove explicit paths
- **Wrong content served** — check Pages source is `gh-pages` branch, not `main`
