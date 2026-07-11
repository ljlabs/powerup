# Claude Skills Website

A React + TypeScript + Vite + Tailwind CSS website for showcasing Claude Skills, built from Google Stitch designs.

## Quick Start

```bash
# From the website directory
cd website

# Install dependencies (first time only)
npm install

# Run dev server
npm run dev
```

This starts Vite on `http://localhost:5173` (or next available port).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run generate-manifest` | Generate skills manifest from `../skills` |

## Project Structure

```
website/
├── src/
│   ├── components/
│   │   ├── navigation/     # TopNavBar, Logo
│   │   ├── layout/         # Footer
│   │   ├── features/       # HeroSection, CategoryGrid, FeaturedSkillsGrid, SkillsGrid, FilterSidebar, CTABanner
│   │   ├── cards/          # SkillCardHome, SkillCardLibrary
│   │   └── ui/             # ButtonPrimary, ButtonSecondary, ButtonIcon, SearchBar
│   ├── pages/
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── GalleryPage.tsx # Skills library with filters
│   │   └── SkillPage.tsx   # Individual skill detail
│   ├── App.tsx             # Routing setup
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json
├── tailwind.config.js      # Tailwind config (needs Stitch color palette)
├── tsconfig.json
└── vite.config.ts
```

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Hero, categories, featured skills, CTA |
| `/skills` | GalleryPage | Filterable skills grid with sidebar |
| `/skills/:slug` | SkillPage | Skill detail with install button |

## Mock Data

Currently using inline mock data in:
- `FeaturedSkillsGrid.tsx` — 4 featured skills
- `SkillsGrid.tsx` — 6 library skills
- `SkillPage.tsx` — 3 detail skills (web-search-mcp, svg-designer, ghostwriter-agent)

Replace with real data from `skills-manifest.json` via `useSkills()` hook when ready.

## Styling Notes

Components reference Google Stitch design tokens (colors, spacing, fonts). For colors to render correctly, add the Stitch palette to `tailwind.config.js`:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      "on-background": "#1c1b1b",
      "surface-container": "#f1edec",
      "surface-variant": "#e5e2e1",
      "primary-container": "#faf9f6",
      "secondary-fixed": "#e5e2e1",
      "on-primary-fixed-variant": "#464745",
      "on-surface-variant": "#444844",
      "error": "#ba1a1a",
      "on-error": "#ffffff",
      "surface-container-high": "#ebe7e6",
      "primary-fixed-dim": "#c7c6c4",
      "surface-dim": "#ddd9d8",
      "on-secondary-container": "#636262",
      "on-primary-fixed": "#1a1c1a",
      "secondary-container": "#e2dfde",
      "on-secondary-fixed": "#1c1b1b",
      "surface-bright": "#fcf8f7",
      "tertiary-fixed-dim": "#ebc23e",
      "on-tertiary": "#ffffff",
      "on-tertiary-fixed": "#241a00",
      "on-surface": "#1c1b1b",
      "tertiary": "#735c00",
      "on-primary-container": "#727270",
      "outline": "#757874",
      "error-container": "#ffdad6",
      "primary-fixed": "#e3e2e0",
      "outline-variant": "#c5c7c3",
      "on-secondary-fixed-variant": "#474746",
      "secondary": "#5f5e5e",
      "on-primary": "#ffffff",
      "inverse-surface": "#313030",
      "secondary-fixed-dim": "#c8c6c5",
      "surface-tint": "#5e5f5d",
      "surface": "#fcf8f7",
      "on-secondary": "#ffffff",
      "inverse-primary": "#c7c6c4",
      "on-error-container": "#93000a",
      "background": "#fcf8f7",
      "primary": "#5e5f5d",
      "on-tertiary-fixed-variant": "#574500",
      "inverse-on-surface": "#f4f0ef",
      "surface-container-highest": "#e5e2e1",
      "surface-container-lowest": "#ffffff",
      "tertiary-container": "#fff8ef",
      "surface-container-low": "#f7f3f2",
      "on-tertiary-container": "#8b6f00",
      "tertiary-fixed": "#ffe087",
      "accent-mint": "#A7F3D0",
      "accent-sky": "#BAE6FD",
      "accent-lavender": "#E9D5FF",
      "accent-apricot": "#FED7AA",
      "brand-yellow": "#FFD54F",
    },
    fontFamily: {
      "headline-lg-mobile": ["Quicksand"],
      "label-bold": ["Quicksand"],
      "body-lg": ["Quicksand"],
      "headline-lg": ["Quicksand"],
      "headline-md": ["Quicksand"],
      "body-md": ["Quicksand"],
      "label-sm": ["Quicksand"],
      "headline-xl": ["Quicksand"],
    },
    fontSize: {
      "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
      "label-bold": ["14px", { lineHeight: "1.2", fontWeight: "700" }],
      "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "500" }],
      "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
      "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
      "body-md": ["16px", { lineHeight: "1.5", fontWeight: "500" }],
      "label-sm": ["12px", { lineHeight: "1.2", fontWeight: "600" }],
      "headline-xl": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
    },
  },
}
```

## Dependencies

- React 19 + React Router 7
- TypeScript 5.6
- Vite 6
- Tailwind CSS 3.4
- Material Symbols Outlined font (loaded via CDN in index.html)
- Quicksand font (loaded via CDN in index.html)

## Deployment

GitHub Actions workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to main.