#!/usr/bin/env node

/**
 * Scaffold script for a GitHub Pages site that showcases Claude skills.
 *
 * Supports two modes:
 *   Single repo (default): skills/ lives inside the website directory
 *   Monorepo (--monorepo): skills/ lives at the workspace root, website in a subdirectory
 *
 * Usage:
 *   node scaffold.js <target-directory> [options]
 *
 * Options:
 *   --repo-owner OWNER    GitHub org or username
 *   --repo-name NAME      GitHub repo name (default: target directory name)
 *   --port PORT           Dev server port (default: 5173)
 *   --monorepo            Scaffold as monorepo (skills at workspace root)
 *   --skills-dir PATH     Custom skills path relative to workspace root (default: "skills")
 */

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Parse args
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { target: ".", repoOwner: "", repoName: "", port: 5173, monorepo: false, skillsDir: "skills" };
  const raw = argv.slice(2);
  let i = 0;
  while (i < raw.length) {
    if (raw[i] === "--repo-owner") { args.repoOwner = raw[++i]; }
    else if (raw[i] === "--repo-name") { args.repoName = raw[++i]; }
    else if (raw[i] === "--port") { args.port = parseInt(raw[++i], 10); }
    else if (raw[i] === "--monorepo") { args.monorepo = true; }
    else if (raw[i] === "--skills-dir") { args.skillsDir = raw[++i]; }
    else if (!raw[i].startsWith("--")) { args.target = raw[i]; }
    i++;
  }
  if (!args.repoName) { args.repoName = path.basename(path.resolve(args.target)); }
  return args;
}

const args = parseArgs(process.argv);

// If --repo-owner wasn't provided, try to detect from git remote
if (!args.repoOwner) {
  try {
    const { execSync } = require("child_process");
    const remote = execSync("git remote get-url origin", { encoding: "utf-8" }).trim();
    const match = remote.match(/github\.com[:/](.+?)\//);
    if (match) args.repoOwner = match[1];
  } catch {}
}
if (!args.repoOwner) args.repoOwner = "<GITHUB_OWNER>";

const targetDir = path.resolve(args.target);

// In monorepo mode, resolve where the skills dir will be relative to the workspace root.
// The website goes into <target>/, skills go into <target>/../skillsDir (workspace root).
const workspaceRoot = args.monorepo ? path.resolve(targetDir, "..") : targetDir;
const skillsAbsDir = path.resolve(workspaceRoot, args.skillsDir);

// How far the manifest generator (inside website/) must look to find skills.
// Single:  ./skills         (../skills relative to scripts/)
// Mono:    ../skillsDir     (../../skillsDir relative to scripts/)
const manifestSkillsRel = args.monorepo
  ? path.join("..", args.skillsDir)
  : path.join("..", "skills");

// ---------------------------------------------------------------------------
// File templates
// ---------------------------------------------------------------------------

function writeFile(relPath, content) {
  const fullPath = path.join(targetDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`  created ${relPath}`);
}

function writeFileAt(baseDir, relPath, content) {
  const fullPath = path.join(baseDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`  created ${relPath}`);
}

// -- package.json -----------------------------------------------------------

function pkgJson() {
  const buildScript = args.monorepo
    ? `node scripts/generate-manifest.js --skills-dir ${manifestSkillsRel} && tsc -b && vite build`
    : `node scripts/generate-manifest.js && tsc -b && vite build`;

  const genManifestScript = args.monorepo
    ? `node scripts/generate-manifest.js --skills-dir ${manifestSkillsRel}`
    : `node scripts/generate-manifest.js`;

  return JSON.stringify({
    name: args.repoName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: buildScript,
      preview: "vite preview",
      "generate-manifest": genManifestScript
    },
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "react-router-dom": "^7.1.0"
    },
    devDependencies: {
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
      "@vitejs/plugin-react": "^4.3.0",
      autoprefixer: "^10.4.0",
      postcss: "^8.4.0",
      tailwindcss: "^3.4.0",
      typescript: "^5.6.0",
      vite: "^6.0.0"
    }
  }, null, 2);
}

// -- vite.config.ts ---------------------------------------------------------

function viteConfig() {
  return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/${args.repoName}/",
});
`;
}

// -- tsconfig ---------------------------------------------------------------

function tsconfig() {
  return JSON.stringify({
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: "force",
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true
    },
    include: ["src", "vite-env.d.ts"]
  }, null, 2);
}

function tsconfigApp() {
  return JSON.stringify({
    extends: "./tsconfig.json",
    compilerOptions: {
      composite: true,
      tsBuildInfoFile: "./node_modules/.tmp/tsconfig.app.tsBuildInfoFile"
    },
    include: ["src"]
  }, null, 2);
}

function viteEnvDts() {
  return `/// <reference types="vite/client" />
`;
}

// -- tailwind ---------------------------------------------------------------

function tailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
}

function postcssConfig() {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

// -- index.html -------------------------------------------------------------

function indexHtml() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${args.repoName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

// -- src files --------------------------------------------------------------

function srcMain() {
  return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
`;
}

function srcApp() {
  return `import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SkillPage from "./pages/SkillPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<GalleryPage />} />
        <Route path="/skills/:slug" element={<SkillPage />} />
      </Routes>
    </Layout>
  );
}
`;
}

function srcTypes() {
  return `export interface SkillMeta {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  files: string[];
}
`;
}

function srcHooksUseSkills() {
  return `import { useState, useEffect } from "react";
import type { SkillMeta } from "../types";

export function useSkills() {
  const [skills, setSkills] = useState<SkillMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("skills-manifest.json")
      .then((r) => r.json())
      .then((data: SkillMeta[]) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { skills, loading };
}
`;
}

function srcComponentsLayout() {
  return `import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// TODO: Replace with your mock layout design
export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 px-6 py-4">
        <Link to="/" className="text-xl font-bold">
          Claude Skills
        </Link>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
      <footer className="border-t border-gray-200 px-6 py-4 text-sm text-gray-500">
        Built with GitHub Pages
      </footer>
    </div>
  );
}
`;
}

function srcComponentsSkillCard() {
  return `import { Link } from "react-router-dom";
import type { SkillMeta } from "../types";

interface Props {
  skill: SkillMeta;
}

// TODO: Replace with your mock card design
export default function SkillCard({ skill }: Props) {
  return (
    <Link
      to={\`/skills/\${skill.slug}\`}
      className="block rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold">{skill.name}</h3>
      <p className="mt-2 text-gray-600 text-sm">{skill.description}</p>
      {skill.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {skill.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 rounded px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
`;
}

function srcComponentsSkillDetail() {
  return `import type { SkillMeta } from "../types";

interface Props {
  skill: SkillMeta;
}

// TODO: Replace with your mock detail design
export default function SkillDetail({ skill }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{skill.name}</h1>
      <p className="mt-2 text-gray-600">{skill.description}</p>
      <div className="mt-4">
        <h2 className="text-sm font-semibold uppercase text-gray-500">Files</h2>
        <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
          {skill.files.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
`;
}

function srcPagesHomePage() {
  return `import { Link } from "react-router-dom";

// TODO: Replace with your mock landing page design
export default function HomePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Claude Skills</h1>
      <p className="mt-4 text-gray-600">
        A curated collection of skills for Claude.
      </p>
      <Link
        to="/skills"
        className="inline-block mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Browse Skills
      </Link>
    </div>
  );
}
`;
}

function srcPagesGalleryPage() {
  return `import SkillCard from "../components/SkillCard";
import { useSkills } from "../hooks/useSkills";

// TODO: Replace with your mock gallery design
export default function GalleryPage() {
  const { skills, loading } = useSkills();

  if (loading) {
    return <p className="text-gray-500">Loading skills...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </div>
    </div>
  );
}
`;
}

function srcPagesSkillPage() {
  return `import { useParams } from "react-router-dom";
import SkillDetail from "../components/SkillDetail";
import { useSkills } from "../hooks/useSkills";

// TODO: Replace with your mock detail page design
export default function SkillPage() {
  const { slug } = useParams<{ slug: string }>();
  const { skills, loading } = useSkills();

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  const skill = skills.find((s) => s.slug === slug);

  if (!skill) {
    return <p className="text-gray-500">Skill not found.</p>;
  }

  return <SkillDetail skill={skill} />;
}
`;
}

function srcStylesIndex() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
}

// -- GitHub Actions workflow ------------------------------------------------

function deployWorkflow() {
  const workingDir = args.monorepo ? "    working-directory: website\n" : "";
  const uploadPath = args.monorepo ? "      path: website/dist" : "      path: dist";

  return `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
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
${workingDir}
      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
${uploadPath}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
`;
}

// -- Generate manifest script -----------------------------------------------

function generateManifestScript() {
  return `#!/usr/bin/env node

/**
 * Scans skills/ for folders containing SKILL.md, extracts frontmatter,
 * and writes public/skills-manifest.json.
 *
 * Usage:
 *   node generate-manifest.js [--skills-dir <path>]
 *
 * If --skills-dir is not provided, defaults to ./skills (relative to the website root).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Parse --skills-dir argument
const args = process.argv.slice(2);
let skillsDirArg = "";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--skills-dir" && i + 1 < args.length) {
    skillsDirArg = args[++i];
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEBSITE_ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = skillsDirArg
  ? path.resolve(WEBSITE_ROOT, skillsDirArg)
  : path.join(WEBSITE_ROOT, "skills");
const OUT = path.join(WEBSITE_ROOT, "public", "skills-manifest.json");

function parseFrontmatter(content) {
  const match = content.match(/^---\\n([\\s\\S]*?)\\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split("\\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      let val = rest.join(":").trim();
      if (val.startsWith("[") && val.endsWith("]")) {
        val = val.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
      }
      meta[key.trim()] = val;
    }
  }
  return meta;
}

function scanSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log("No skills/ directory found. Creating empty manifest.");
    return [];
  }

  const skills = [];
  for (const entry of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) continue;

    const content = fs.readFileSync(skillFile, "utf-8");
    const meta = parseFrontmatter(content);

    const files = fs.readdirSync(path.join(SKILLS_DIR, entry.name), { recursive: true })
      .map((f) => f.toString());

    skills.push({
      slug: entry.name,
      name: meta.name || entry.name,
      description: meta.description || "",
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      files,
    });
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

console.log(\`Scanning skills from: \${SKILLS_DIR}\`);
const skills = scanSkills();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(skills, null, 2) + "\\n");
console.log(\`Wrote \${skills.length} skills to \${path.relative(process.cwd(), OUT)}\`);
`;
}

// -- Sample skill for demo --------------------------------------------------

function sampleSkill() {
  return `---
name: example-skill
description: A sample skill to demonstrate the site structure
tags: [demo, example]
---

# Example Skill

This is a sample skill. Replace it with your own.

## Usage

\`\`\`bash
echo "Hello from example-skill"
\`\`\`
`;
}

// -- .gitignore -------------------------------------------------------------

function gitignore() {
  return `node_modules/
dist/
public/skills-manifest.json
*.local
`;
}

// -- Root files (monorepo only) --------------------------------------------

function rootGitignore() {
  return `node_modules/
`;
}

function rootReadme(repoName) {
  return `# ${repoName}

A free, open-source collection of Claude Code skills. The website is built with React + Vite + TypeScript + Tailwind CSS and deployed to GitHub Pages.

## Project structure

\`\`\`
${repoName}/
├── website/          # React + Vite website (deployed to GitHub Pages)
├── skills/           # Skill definitions (SKILL.md frontmatter)
└── README.md
\`\`\`

## Skills

Skills live in \`skills/\`, each in its own folder with a \`SKILL.md\` file using YAML frontmatter. See \`skills/README.md\` for the format.

## Website (development)

\`\`\`bash
cd website
npm install
npm run dev
\`\`\`

## Building

\`\`\`bash
cd website
npm run build
\`\`\`

This automatically scans \`../skills/\` and generates \`public/skills-manifest.json\`, then builds the React app into \`dist/\`.

## Deployment

Push to \`main\` — GitHub Actions will build and deploy to GitHub Pages.

**Setup**: After pushing to a GitHub repo, enable GitHub Pages with the "GitHub Actions" source in repo settings.
`;
}

// ---------------------------------------------------------------------------
// Scaffold
// ---------------------------------------------------------------------------

const modeLabel = args.monorepo ? "monorepo" : "single-repo";
console.log(`\nScaffolding GitHub Pages skills site (${modeLabel}) in: ${targetDir}\n`);

// Core config files
writeFile("package.json", pkgJson());
writeFile("vite.config.ts", viteConfig());
writeFile("tsconfig.json", tsconfig());
writeFile("tsconfig.app.json", tsconfigApp());
writeFile("vite-env.d.ts", viteEnvDts());
writeFile("tailwind.config.js", tailwindConfig());
writeFile("postcss.config.js", postcssConfig());
writeFile("index.html", indexHtml());
writeFile(".gitignore", gitignore());

// Source files
writeFile("src/main.tsx", srcMain());
writeFile("src/App.tsx", srcApp());
writeFile("src/types.ts", srcTypes());
writeFile("src/hooks/useSkills.ts", srcHooksUseSkills());
writeFile("src/components/Layout.tsx", srcComponentsLayout());
writeFile("src/components/SkillCard.tsx", srcComponentsSkillCard());
writeFile("src/components/SkillDetail.tsx", srcComponentsSkillDetail());
writeFile("src/pages/HomePage.tsx", srcPagesHomePage());
writeFile("src/pages/GalleryPage.tsx", srcPagesGalleryPage());
writeFile("src/pages/SkillPage.tsx", srcPagesSkillPage());
writeFile("src/styles/index.css", srcStylesIndex());

// Build scripts
writeFile("scripts/generate-manifest.js", generateManifestScript());

// GitHub Actions
writeFile(".github/workflows/deploy.yml", deployWorkflow());

// Sample skill — always create in the skills directory
writeFileAt(skillsAbsDir, "example-skill/SKILL.md", sampleSkill());

// Monorepo extras: root README, root .gitignore, skills README
if (args.monorepo) {
  writeFileAt(workspaceRoot, "README.md", rootReadme(args.repoName));
  writeFileAt(workspaceRoot, ".gitignore", rootGitignore());
  writeFileAt(skillsAbsDir, "README.md", `# Skills\n\nThis folder contains the skills displayed on the ${args.repoName} website.\n\n## Adding a skill\n\nEach skill lives in its own folder with a \`SKILL.md\` file containing YAML frontmatter:\n\n\`\`\`markdown\n---\nname: my-skill\n description: What this skill does\ntags: [category1, category2]\n---\n\n# My Skill\n\nSkill documentation here...\n\`\`\`\n\nAfter adding or updating skills, regenerate the manifest:\n\n\`\`\`bash\ncd ../website\nnpm run generate-manifest\n\`\`\`\n`);
}

const cdPath = args.monorepo ? `${path.relative(process.cwd(), targetDir) || "."}` : path.relative(process.cwd(), targetDir) || ".";

console.log(`
Done! Next steps:

  cd ${cdPath}
  npm install
  npm run generate-manifest
  npm run dev
`);
