#!/usr/bin/env node

/**
 * Scans skills/ for folders containing SKILL.md, extracts frontmatter and
 * file contents, and writes public/skills-manifest.json.
 *
 * Usage:
 *   node generate-manifest.js [--skills-dir <path>]
 *
 * If --skills-dir is not provided, defaults to ../skills (relative to the website root).
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
  : path.join(WEBSITE_ROOT, "..", "skills");
const OUT = path.join(WEBSITE_ROOT, "public", "skills-manifest.json");
const PUBLIC_SKILLS = path.join(WEBSITE_ROOT, "public", "skills");

const BINARY_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
  ".woff", ".woff2", ".ttf", ".eot",
  ".mp3", ".mp4", ".pdf", ".zip",
]);

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const raw = match[1];
  const frontmatter = {};

  // Parse YAML-like frontmatter line by line
  const lines = raw.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) { i++; continue; }

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Handle multi-line arrays: features:\n  - item\n  - item
    if (val === "" && i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) {
      const arr = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        arr.push(lines[i].trim().replace(/^- /, "").trim());
        i++;
      }
      frontmatter[key] = arr;
      continue;
    }

    // Handle inline arrays: tags: [a, b, c]
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    }
    // Handle quoted strings
    else if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Handle booleans
    else if (val === "true") {
      val = true;
    } else if (val === "false") {
      val = false;
    }
    // Handle numbers
    else if (/^\d+(\.\d+)?$/.test(val)) {
      val = Number(val);
    }

    frontmatter[key] = val;
    i++;
  }

  // Extract body content (everything after the closing ---)
  const body = content.slice(match[0].length).trim();

  return { frontmatter, body };
}

function isBinaryFile(filePath) {
  return BINARY_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function scanSkillFiles(skillDir) {
  const files = fs.readdirSync(skillDir, { recursive: true, withFileTypes: true });
  const skillFiles = [];

  for (const entry of files) {
    if (!entry.isFile()) continue;

    const relativePath = entry.name.toString();
    const fullPath = path.join(skillDir, relativePath);
    const stats = fs.statSync(fullPath);
    const ext = path.extname(relativePath).toLowerCase();
    const binary = BINARY_EXTENSIONS.has(ext);

    skillFiles.push({
      name: relativePath,
      size: formatFileSize(stats.size),
      lastModified: formatDate(stats.mtime),
      content: binary ? null : fs.readFileSync(fullPath, "utf-8"),
      isBinary: binary || undefined,
    });
  }

  return skillFiles;
}

function copyBinaryAssets(skillDir, slug, skillFiles) {
  for (const file of skillFiles) {
    if (!file.isBinary) continue;

    const src = path.join(skillDir, file.name);
    const destDir = path.join(PUBLIC_SKILLS, slug);
    const dest = path.join(destDir, file.name);

    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function scanSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log("No skills/ directory found. Creating empty manifest.");
    return [];
  }

  const skills = [];
  for (const entry of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // Skip underscore-prefixed config dirs
    if (entry.name.startsWith("_")) continue;

    const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) continue;

    const content = fs.readFileSync(skillFile, "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);
    const skillDir = path.join(SKILLS_DIR, entry.name);
    const skillFiles = scanSkillFiles(skillDir);

    // Copy binary assets to public/skills/{slug}/
    copyBinaryAssets(skillDir, entry.name, skillFiles);

    // Build the full file list for the files array
    const fileList = skillFiles.map((f) => f.name);

    const skill = {
      slug: entry.name,
      name: frontmatter.name || entry.name,
      description: frontmatter.description || "",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      files: fileList,
      category: frontmatter.category || undefined,
      language: frontmatter.language || undefined,
      complexity: frontmatter.complexity || undefined,
      author: frontmatter.author || undefined,
      version: frontmatter.version || undefined,
      icon: frontmatter.icon || undefined,
      repo: frontmatter.repo || undefined,
      color: frontmatter.color || undefined,
      stars: frontmatter.stars || undefined,
      downloads: frontmatter.downloads || undefined,
      rating: frontmatter.rating || undefined,
      featured: frontmatter.featured || undefined,
      imageUrl: frontmatter.imageUrl || undefined,
      backgroundColor: frontmatter.backgroundColor || undefined,
      features: Array.isArray(frontmatter.features) ? frontmatter.features : undefined,
      useCommand: frontmatter.useCommand || undefined,
      readme: body || undefined,
      skillFiles: skillFiles.length > 0 ? skillFiles : undefined,
    };

    // Remove undefined keys
    for (const key of Object.keys(skill)) {
      if (skill[key] === undefined) delete skill[key];
    }

    skills.push(skill);
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

console.log(`Scanning skills from: ${SKILLS_DIR}`);
const skills = scanSkills();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(skills, null, 2) + "\n");
console.log(`Wrote ${skills.length} skills to ${path.relative(process.cwd(), OUT)}`);
