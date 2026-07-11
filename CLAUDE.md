# CLAUDE.md - Powerup Skills Website

## Project Overview

This is a **free, open-source collection of Claude Code skills** showcased via a React + Vite + TypeScript + Tailwind CSS website deployed to GitHub Pages.

**Project Structure:**
```
powerup/
├── website/          # React + Vite website (deployed to GitHub Pages)
├── skills/           # Skill definitions (SKILL.md frontmatter)
├── .claude/          # Claude Code skills and config
└── rules/            # Debugging lessons learned
```

---

## Architecture

### Website (React + Vite + TypeScript + Tailwind)

**Stack:**
- React 19 + React Router 7 (HashRouter for GitHub Pages)
- Vite 6 with TypeScript
- Tailwind CSS 3.4
- Vitest for testing

**Routes:**
| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero + Featured skills + Categories + CTA |
| `/skills` | GalleryPage | Searchable/filterable skills library |
| `/skills/:slug` | SkillPage | Detailed skill view with file browser |
| `/docs` | DocsPage | Documentation page |

**Key Services (website/src/services/):**
- `skillService.ts` - Detailed skill data (SkillPage)
- `libraryService.ts` - Library grid skills (GalleryPage)
- `featuredService.ts` - Featured skills (HomePage)
- `categoryService.ts` - Category grid (HomePage)
- `filterService.ts` - Filter logic (GalleryPage)

**Data Sources:**
- `detailedSkills` (website/src/data/skills.ts) - Full skill metadata for detail pages
- `librarySkills` (website/src/data/skills.ts) - Simplified cards for library grid
- `featuredSkills` (website/src/data/skills.ts) - Curated featured skills
- `skills-manifest.json` (generated at build) - Auto-generated from `skills/` folder

---

## Skills System

### Skill Definition Format

Each skill lives in `skills/<skill-name>/SKILL.md` with YAML frontmatter:

```markdown
---
name: my-skill
description: What this skill does
tags: [category1, category2]
---

# My Skill

Skill documentation here...
```

### Manifest Generation

The build pipeline auto-generates `public/skills-manifest.json` from `skills/`:

```bash
# Manual generation
cd website
npm run generate-manifest

# Full build (includes manifest generation)
npm run build
```

**Script:** `website/scripts/generate-manifest.js`
- Scans `skills/` for folders containing `SKILL.md`
- Parses YAML frontmatter (name, description, tags)
- Copies binary assets to `public/skills/<slug>/`
- Outputs `public/skills-manifest.json`

---

## Development Commands

```bash
# Install dependencies
cd website && npm install

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
2. Add `SKILL.md` with frontmatter:
   ```markdown
   ---
   name: my-new-skill
   description: Description here
   tags: [tools, mcp]
   ---
   
   # My New Skill
   
   Documentation...
   ```
3. Add any asset files (images, etc.) to the skill folder
4. Regenerate manifest: `cd website && npm run generate-manifest`
5. Add detailed data to `website/src/data/skills.ts` for the SkillPage

---

## Testing

```bash
cd website
npm run test          # Run tests once (vitest)
npm run test -- --ui  # Run with UI
```

**Stack:** Vitest + React Testing Library + jsdom

**Configuration:** `vite.config.ts` → `test` section
- `globals: true`
- `environment: "jsdom"`
- `setupFiles: "./src/test/setup.ts"`
- `include: ["src/**/*.{test,spec}.{ts,tsx}"]`

**Test files:** Co-located `*.test.tsx` alongside components

**Automatic:** Push to `main` → GitHub Actions builds & deploys to GitHub Pages.

**Setup (one-time):**
1. Push to GitHub
2. Repo Settings → Pages → Source: "GitHub Actions"
3. Workflow: `.github/workflows/deploy.yml`

**Workflow details (`.github/workflows/deploy.yml`):**
- Triggers: Push to `main`, manual dispatch
- Node 20, npm cache
- Runs `npm ci && npm run build` in `website/`
- Uploads `website/dist` as Pages artifact
- Deploys to `github-pages` environment

**Base path:** `/website/` (configured in `vite.config.ts`) for GitHub Pages subpath deployment

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `website/vite.config.ts` | Vite config (base: /website/ for GitHub Pages) |
| `website/src/App.tsx` | Route definitions with Layout wrapper |
| `website/src/services/skillService.ts` | Detailed skill CRUD operations |
| `website/src/services/libraryService.ts` | Library grid filtering/search |
| `website/scripts/generate-manifest.js` | Manifest generator from skills/ |
| `skills/README.md` | Skill authoring guide |

---

## Testing

```bash
cd website
npm run test          # Run all tests
npm run test -- --watch  # Watch mode
```

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