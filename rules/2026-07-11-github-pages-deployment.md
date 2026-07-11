---
name: github-pages-deployment-pitfalls
description: Lessons from deploying a Vite SPA to GitHub Pages — branch vs Actions, path issues, Windows vs Linux CI
type: feedback
updated: 2026-07-11
---

# GitHub Pages Deployment with Vite SPA

## What We Learned

Deploying a Vite SPA to GitHub Pages has several non-obvious gotchas. Here's what to watch for.

### 1. "Deploy from a branch" vs "GitHub Actions" — they're different workflows

GitHub Pages has two deployment modes. They are NOT interchangeable:

- **"GitHub Actions"** — workflow uploads built artifacts directly. No branch needed.
- **"Deploy from a branch"** — serves files from a specific branch/folder. Needs a branch with built output.

**Gotcha:** Setting "Deploy from branch" with the `main` branch and root folder will serve raw source code, not the built site. The Vite build outputs to `website/dist/`, not the repo root.

**Fix:** Use the `gh-pages` branch approach with `peaceiris/actions-gh-pages@v4`. It pushes the built `dist/` contents to a dedicated `gh-pages` branch. Set Pages source to that branch.

### 2. The `gh-pages` branch must exist before Pages can be enabled

If you try to set Pages source to `gh-pages` via the API before that branch exists, you get:
```
The gh-pages branch must exist before GitHub Pages can be built.
```

**Fix:** Create an orphan branch with a placeholder file first:
```bash
git checkout --orphan gh-pages
echo "deploying" > index.html
git add index.html && git commit -m "init" && git push origin gh-pages
git checkout main
```

### 3. Vite `base` path must match the repo name

Vite's `base` config determines asset URLs. For GitHub Pages at `https://user.github.io/repo-name/`:
- `base: "/repo-name/"` — correct
- `base: "/"` — assets 404 on GitHub Pages
- `base: "/website/"` — wrong unless that's your repo name

**Fix:** Set `base` in `vite.config.ts` to match your repo name exactly.

### 4. Windows backslashes break CI

Package.json scripts with Windows paths (`--skills-dir ..\\skills`) fail on Linux CI runners:
```
node:internal/modules/cjs/loader:1055
  throw err;
```

**Fix:** Use the script's default path resolution instead of passing explicit paths. The `generate-manifest.js` script already resolves `../skills` correctly via `path.join(WEBSITE_ROOT, "..", "skills")`.

### 5. `configure-pages` action fails if Pages isn't enabled

The `actions/configure-pages@v5` action returns `Not Found` if Pages isn't configured yet.

**Fix:** Either:
- Enable Pages in repo settings first (Settings → Pages → select source)
- Or skip `configure-pages` and use the `peaceiris/actions-gh-pages` approach instead

## Recommended Workflow Template

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: website/package-lock.json
      - run: npm ci
        working-directory: website
      - run: npm run build
        working-directory: website
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/dist
          force_orphan: true
```

Then set Pages source to `gh-pages` branch in repo settings.

**Signal:** When deploying Vite to GitHub Pages, always check: (1) is `base` set correctly, (2) is the deployment method "branch" or "Actions", (3) does the target branch exist, (4) are there Windows paths in npm scripts.
