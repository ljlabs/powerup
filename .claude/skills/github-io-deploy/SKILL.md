---
name: github-io-deploy
description: Deploy a Vite React website to GitHub Pages. Use this when the user wants to deploy an existing website to GitHub Pages, set up GitHub Actions deployment, configure GitHub Pages settings, fix deployment issues, or troubleshoot 404 errors on github.io. Covers both the workflow setup and the repo configuration steps.
---

# GitHub.io Deploy

Deploy a Vite + React website to GitHub Pages using GitHub Actions. This skill handles the full deployment pipeline: creating the workflow, configuring the gh-pages branch, setting up repo settings, and troubleshooting common issues.

## When to use

- User wants to deploy an existing Vite/React site to GitHub Pages
- User needs to fix deployment issues (404s, build failures, wrong content)
- User asks how to set up GitHub Pages for their project
- User mentions "deploy to github.io", "set up GitHub Actions", or "GitHub Pages not working"

## How it works

The deployment uses `peaceiris/actions-gh-pages@v4` which:
1. Builds the Vite project
2. Pushes the built `dist/` output to a `gh-pages` branch
3. GitHub Pages serves from that branch

This is different from the "GitHub Actions" Pages source mode — we use "Deploy from a branch" with the `gh-pages` branch.

## Deployment steps

### Step 1: Update vite.config.ts

Set the `base` to match your repo name:

```ts
export default defineConfig({
  base: "/<repo-name>/",  // e.g., "/powerup/" for ljlabs/powerup
  // ...
});
```

### Step 2: Create the GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: website/package-lock.json

      - name: Install dependencies
        working-directory: website
        run: npm ci

      - name: Build
        working-directory: website
        run: npm run build

      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/dist
          force_orphan: true
```

Adjust `working-directory` and `publish_dir` to match your project structure. For a monorepo with website in `website/`, use `./website/dist`. For a single-repo project, use `./dist`.

### Step 3: Create the gh-pages branch

The `gh-pages` branch must exist before GitHub Pages can be enabled:

```bash
git checkout --orphan gh-pages
echo "deploying" > index.html
git add index.html
git commit -m "init gh-pages"
git push origin gh-pages
git checkout main
```

### Step 4: Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages**, Folder: **/ (root)**
5. Click Save

### Step 5: Push to trigger deployment

```bash
git add .
git commit -m "deploy to GitHub Pages"
git push origin main
```

Wait ~2 minutes for the first deployment. Your site will be live at:
`https://<owner>.github.io/<repo>/`

## Troubleshooting

### 404 on the deployed site

**Cause:** `base` in `vite.config.ts` doesn't match the repo name.

**Fix:** Update `base` to `"/<repo-name>/"` and redeploy.

### "Pages is already enabled" error when trying to enable

**Cause:** Pages was previously enabled with a different source.

**Fix:** Go to Settings → Pages, change the source to "Deploy from a branch" with `gh-pages`.

### Build fails in CI but works locally

**Cause:** Usually Windows-specific paths in npm scripts.

**Fix:** Remove explicit `--skills-dir` arguments from package.json scripts. Let the build script use its own default path resolution. Example:
```json
"build": "node scripts/generate-manifest.js && tsc -b && vite build"
// NOT:
"build": "node scripts/generate-manifest.js --skills-dir ..\\skills && tsc -b && vite build"
```

### GitHub Actions fails with "Get Pages site failed"

**Cause:** Pages isn't enabled yet in the repo settings.

**Fix:** Enable Pages (Step 4 above) before pushing. Or use the "GitHub Actions" source mode with `actions/upload-pages-artifact` + `actions/deploy-pages` instead.

### Wrong content being served

**Cause:** The `gh-pages` branch has stale content, or you're serving from the wrong branch.

**Fix:** The workflow uses `force_orphan: true` which replaces the branch content entirely. If you're still seeing old content, check that the workflow ran successfully and that Pages source is set to `gh-pages`.

### Windows backslash errors in CI

**Cause:** npm scripts with `..\\skills` work on Windows but fail on Linux CI.

**Fix:** Use forward slashes or remove explicit path arguments. The build script's default resolution works cross-platform.

## Alternative: GitHub Actions source mode

If you prefer not to use a `gh-pages` branch, you can use the GitHub Actions source mode instead. This requires a different workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
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
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: website/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Then set Pages source to **GitHub Actions** in repo settings. This mode doesn't need a `gh-pages` branch.
