---
name: init-github-io-claude-skills
description: Scaffold a GitHub Pages website that showcases Claude skills from a GitHub repo. Use this skill when the user wants to build a github.io site, a GitHub Pages site, a skills website, a skills showcase, a skill gallery, or a claude skills site. Also trigger when the user mentions "skills browser", "skills catalog", "skill directory", "skill explorer", or wants to display a collection of skills in a web UI powered by a GitHub repo. Covers React + Vite + TypeScript + Tailwind with auto-deploy via GitHub Actions.
---

# Init GitHub.io Claude Skills Site

Scaffold a React-based GitHub Pages site that automatically showcases Claude skills stored in a GitHub repository. The site is powered entirely by the repo — skill data comes from the folder structure, and deployment is automatic on push.

## What this creates

- **Vite + React + TypeScript** project
- **Tailwind CSS** for styling
- **GitHub Actions** workflow for auto-deploy to `*.github.io`
- **Manifest generator** (`scripts/generate-manifest.js`) that scans `skills/` folders and produces `public/skills-manifest.json`
- **React app** with routing, landing page, and skill detail page (placeholder components — the user has their own UI mocks)
- **Package.json scripts** for `dev`, `build`, `preview`, and `generate-manifest`

## How to run

Execute the scaffold script from the project root where you want the site created:

```bash
node <skill-dir>/scripts/scaffold.js <target-directory> [options]
```

If no arguments are given, scaffold into the current directory using directory name as repo name and prompt for the GitHub owner.

### Arguments

| Arg | Description |
|-----|-------------|
| `target-directory` | Where to create the project. Created if it doesn't exist. |
| `--repo-owner` | GitHub org or username (used in GitHub Actions workflow) |
| `--repo-name` | GitHub repo name (defaults to target directory name) |
| `--port` | Dev server port (default: 5173) |
| `--monorepo` | **Monorepo mode**: skills at workspace root, website in subdirectory |
| `--skills-dir` | Custom skills path relative to workspace root (default: `skills`) |

## Modes: Single-repo vs Monorepo

### Single-repo mode (default)

```
project/
├── skills/           # Skills live here (inside the project)
│   └── skill-name/
│       └── SKILL.md
└── package.json      # Website files
```

- Skills live inside the project directory
- Manifest generator looks at `./skills/` (relative to website)
- GitHub Actions runs `npm run build` in the project root

**Usage:**
```bash
node scaffold.js my-project
```

### Monorepo mode

```
workspace/
├── skills/           # Skills at workspace root
│   └── skill-name/
│       └── SKILL.md
├── website/          # Website in subdirectory
│   └── package.json
└── README.md
```

- Skills live at workspace root (or a custom path)
- Website lives in a subdirectory (e.g., `website/`)
- Manifest generator uses default path resolution (`../skills` relative to `website/scripts/`)
- GitHub Actions uses `working-directory: website` to build from subdirectory
- Creates root README.md and .gitignore automatically

**Usage:**
```bash
node scaffold.js workspace/website --monorepo
# Or with custom skills path:
node scaffold.js workspace/website --monorepo --skills-dir my-skills
```

**Post-scaffold setup for monorepo:**
```bash
cd workspace
npm install
cd website
npm run generate-manifest  # Scans ../skills/ for SKILL.md files
npm run dev
```

## After scaffolding

1. `cd <target-directory>`
2. `npm install`
3. `npm run generate-manifest` — scans `skills/` and writes `public/skills-manifest.json`
4. `npm run dev` — starts the dev server

To add skills, create folders under `skills/` with a `SKILL.md` that has YAML frontmatter:

```markdown
---
name: my-skill
description: What this skill does
tags: [web, api, data]
---

# My Skill

Skill documentation here...
```

Run `npm run generate-manifest` again to pick up new skills.

## GitHub Pages Deployment

Push to `main` and GitHub Actions will automatically:
1. Scan `skills/` and generate the manifest
2. Build the React app
3. Deploy to GitHub Pages

### How the deployment works

The workflow uses `peaceiris/actions-gh-pages@v4` which pushes the built `dist/` output to a dedicated `gh-pages` branch. GitHub Pages serves from that branch.

**Workflow file:** `.github/workflows/deploy.yml`

### Setting up GitHub Pages (one-time)

1. Push to GitHub:
   ```bash
   git remote add origin git@github.com:<owner>/<repo>.git
   git push -u origin main
   ```

2. Create the `gh-pages` branch (required before enabling Pages):
   ```bash
   git checkout --orphan gh-pages
   echo "deploying" > index.html
   git add index.html && git commit -m "init" && git push origin gh-pages
   git checkout main
   ```

3. Enable Pages in repo settings:
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**, Folder: **/ (root)**
   - Click Save

4. Wait ~2 minutes for first deployment, then your site is live at:
   `https://<owner>.github.io/<repo>/`

### Important: Vite base path

The `base` in `vite.config.ts` must match your repo name:
```ts
base: "/<repo-name>/",  // e.g., "/powerup/" for ljlabs/powerup
```

If this is wrong, assets will 404 on GitHub Pages.

### What NOT to do

- **Don't set Pages source to `main` branch** — the website needs to be built first, and it lives in `website/`. Serving raw `main` gives you source code, not a working site.
- **Don't use "GitHub Actions" as Pages source** unless you're using `actions/upload-pages-artifact` + `actions/deploy-pages`. The `peaceiris/actions-gh-pages` approach pushes to a branch, so use "Deploy from a branch".
- **Don't use Windows backslashes in npm scripts** — CI runs on Linux. Let the script use its own default path resolution.

## Customization

The scaffolded components are intentionally minimal — clean structure with TODO comments marking where the user's UI mock designs should go. Key files to customize:

- `src/components/SkillCard.tsx` — card layout for each skill in the gallery
- `src/components/SkillDetail.tsx` — full skill detail view
- `src/components/Layout.tsx` — page layout, header, footer
- `src/pages/HomePage.tsx` — landing page
- `src/pages/GalleryPage.tsx` — skill gallery/listing
- `src/styles/` — Tailwind theme and custom styles

## Troubleshooting

**If the website directory is empty after running the skill:**
1. Ensure you're in the correct directory (project root)
2. For monorepo mode, use: `node <skill-dir>/scripts/scaffold.js <website-dir> --monorepo`
3. Verify the target directory exists or will be created by the script
4. Check that npm is available in your PATH

**If manifest generation fails:**
- Ensure the `skills/` directory contains skill folders with `SKILL.md` files
- For monorepo mode, verify the skills path is correct (default: `../skills` relative to website)

**If GitHub Pages shows 404 after first deploy:**
- Check that the `gh-pages` branch exists and has the built files
- Verify Pages source is set to `gh-pages` branch in repo settings
- Check that `base` in `vite.config.ts` matches your repo name exactly
