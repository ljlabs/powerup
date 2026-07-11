#!/usr/bin/env node

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
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split("\n")) {
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

console.log(`Scanning skills from: ${SKILLS_DIR}`);
const skills = scanSkills();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(skills, null, 2) + "\n");
console.log(`Wrote ${skills.length} skills to ${path.relative(process.cwd(), OUT)}`);
