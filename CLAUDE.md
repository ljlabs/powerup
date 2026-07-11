# CLAUDE.md - Powerup Skills Website

## Project Overview

This is a **free, open-source collection of Claude Code skills** showcased via a React + Vite + TypeScript + Tailwind CSS website deployed to GitHub Pages.

**Project Structure:**
```
powerup/
├── website/          # React + Vite website (deployed to GitHub Pages)
├── skills/           # Skill definitions (SKILL.md frontmatter + source files)
├── .github/workflows/deploy.yml  # GitHub Actions deployment
├── .claude/          # Claude Code skills and config
└── rules/            # Debugging lessons learned
```

---

## Architecture

### Data Pipeline (How Skills Get to the Website)

The pipeline has 3 stages: **skills/ folder → manifest → services → components**.

```
skills/
  _categories.json        ← global config (skipped by scanner)
  example-skill/
    SKILL.md              ← frontmatter (metadata) + body (readme)
    src/index.ts          ← source files (embedded in manifest)
    logo.png              ← binary assets (copied to public/)
    README.md
  vector-store/
    SKILL.md
    ...
        │
        ▼
  website/scripts/generate-manifest.js   ← Node.js build script
        │
        ▼
  website/public/skills-manifest.json    ← single JSON array, all skills
        │
        ▼
  website/src/data/skills.ts             ← imports manifest, transforms into 3 arrays
  │  ├─ detailedSkills: SkillMeta[]      ← for SkillPage (full detail)
  │  ├─ librarySkills: SkillCard[]       ← for GalleryPage (cards with stars/downloads)
  │  └─ featuredSkills: FeaturedSkill[]  ← for HomePage (featured grid)
        │
        ▼
  website/src/services/*.ts              ← import from data/skills.ts (unchanged)
  │  ├─ skillService.ts    → getSkillBySlug() → SkillPage.tsx
  │  ├─ libraryService.ts  → getAllLibrarySkills() → GalleryPage.tsx
  │  └─ featuredService.ts → getAllFeaturedSkills() → FeaturedSkillsGrid.tsx
        │
        ▼
  React components render the data
```

**Key insight:** The service layer never changed. We swapped the data source in one file (`data/skills.ts`) and the services, pages, and components all work automatically.

### Website (React + Vite + TypeScript + Tailwind)

**Stack:**
- React 19 + React Router 7 (HashRouter for GitHub Pages)
- Vite 6 with TypeScript
- Tailwind CSS 3.4 + `@tailwindcss/typography` for markdown prose
- `react-markdown` + `remark-gfm` for full GFM markdown rendering
- Vitest for testing

**Routes:**
| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero + Featured skills + Categories + CTA |
| `/skills` | GalleryPage | Searchable/filterable skills library |
| `/skills/:slug` | SkillPage | Detailed skill view with file browser |
| `/docs` | DocsPage | Documentation page |

**Key Files:**
| File | Purpose |
|------|---------|
| `website/scripts/generate-manifest.js` | Build script: skills/ → manifest |
| `website/src/types/skills.ts` | TypeScript interfaces (SkillMeta, SkillCard, etc.) |
| `website/src/data/skills.ts` | Manifest import + transformation to 3 arrays |
| `website/src/services/skillService.ts` | Detailed skill CRUD |
| `website/src/services/libraryService.ts` | Library grid filtering/search |
| `website/src/services/featuredService.ts` | Featured skills |
| `website/src/components/SkillDetail.tsx` | Skill detail view (markdown + code viewer) |

---

## Skills System

### SKILL.md Frontmatter Schema

Each skill lives in `skills/<skill-name>/SKILL.md`. The frontmatter supports these fields:

```yaml
---
# Identity (required)
name: "My Skill"
description: What this skill does
tags: [tools, mcp]

# Classification
category: tools              # tools | prompts | workflows | data
language: TypeScript         # TypeScript | Python | JSON | Prompt
complexity: Beginner         # Beginner | Intermediate | Advanced

# Attribution
author: your-name
version: 1.0.0
icon: extension              # Google Material Symbol name

# Display (library + featured cards)
color: "bg-[#D1FADF]"       # Tailwind bg for library card
stars: 120
downloads: 500

# Featured section
featured: true
rating: 4.9
backgroundColor: bg-accent-sky

# Detail page
features:
  - Feature one
  - Feature two
useCommand: "npx your-skill start"
---

# My Skill

Markdown body content becomes the readme on the detail page.
Supports full GFM: tables, task lists, code blocks, images, links.
```

### Manifest Generation

The build script reads skills/ and produces a rich manifest:

```bash
cd website
npm run generate-manifest    # generate manifest only
npm run build                # full build (manifest + vite build)
```

**What `generate-manifest.js` does:**
1. Scans `skills/` for folders containing `SKILL.md` (skips `_` prefixed dirs)
2. Parses full YAML frontmatter (all fields above)
3. Extracts SKILL.md body as `readme` field
4. Reads all files in skill dir — text files get content embedded, binary files get copied to `public/skills/{slug}/`
5. Computes file sizes and last-modified dates
6. Outputs `public/skills-manifest.json` — a single JSON array of all skills

**Binary file handling:**
- Detected by extension: `.png`, `.jpg`, `.gif`, `.svg`, `.ico`, etc.
- Content set to `null`, `isBinary: true`
- Copied to `public/skills/{slug}/` for serving

---

## Development Commands

```bash
cd website

# Install dependencies
npm install

# Dev server (with manifest generation)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Generate manifest manually
npm run generate-manifest
```

---

## Adding a New Skill

1. Create folder: `skills/my-new-skill/`
2. Add `SKILL.md` with full frontmatter (see schema above)
3. Add source files, images, etc. to the skill folder
4. Regenerate manifest: `cd website && npm run generate-manifest`
5. Run `npm run dev` to see it live
6. **No code changes needed** — the pipeline picks up new skills automatically

---

## Deployment (GitHub Pages)

**Base path:** `/powerup/` (configured in `vite.config.ts`)

**Workflow:** `.github/workflows/deploy.yml`
- Triggers on push to `main`
- Uses `peaceiris/actions-gh-pages@v4`
- Builds the site in `website/`, deploys `dist/` to the `gh-pages` branch
- GitHub Pages serves from the `gh-pages` branch

**Setup (one-time):**
1. Push to GitHub
2. Repo Settings → Pages → Source: "Deploy from a branch", Branch: `gh-pages`, Folder: `/ (root)`
3. Push triggers automatic deployment

**Live site:** https://ljlabs.github.io/powerup/

---

## Testing

```bash
cd website
npm run test          # Run all tests
npm run test -- --watch  # Watch mode
```

**Stack:** Vitest + React Testing Library + jsdom
**Test files:** Co-located `*.test.tsx` alongside components

---

## Code Style Notes

- TypeScript strict mode enabled
- Components use `function` declarations (not arrow)
- Material Symbols icons via `<span class="material-symbols-outlined">`
- Tailwind utility classes; custom colors in `tailwind.config.js`
- Tests colocated with components (`*.test.tsx`)

---

## Rules & Conventions

- **Rules folder**: `rules/` contains debugging lessons (see `rules/README.md`)
- **Skills**: Custom skills in `.claude/skills/`
- **Knowledge base**: Skip knowledge base per global CLAUDE.md
- **Python scripts**: Always write to file in project root, then execute