# website

A free, open-source collection of Claude Code skills. The website is built with React + Vite + TypeScript + Tailwind CSS and deployed to GitHub Pages.

## Project structure

```
website/
├── website/          # React + Vite website (deployed to GitHub Pages)
├── skills/           # Skill definitions (SKILL.md frontmatter)
└── README.md
```

## Skills

Skills live in `skills/`, each in its own folder with a `SKILL.md` file using YAML frontmatter. See `skills/README.md` for the format.

## Website (development)

```bash
cd website
npm install
npm run dev
```

## Building

```bash
cd website
npm run build
```

This automatically scans `../skills/` and generates `public/skills-manifest.json`, then builds the React app into `dist/`.

## Deployment

Push to `main` — GitHub Actions will build and deploy to GitHub Pages.

**Setup**: After pushing to a GitHub repo, enable GitHub Pages with the "GitHub Actions" source in repo settings.
