---
name: manifest-generator-debugging
description: Debugging the manifest generator — frontmatter parsing, path resolution, binary file handling, Windows vs Linux
type: feedback
updated: 2026-07-11
---

# Manifest Generator Debugging

## What We Learned

The manifest generator (`website/scripts/generate-manifest.js`) had several tricky issues during development.

### 1. Frontmatter parsing is fragile with multi-line values

The original parser only handled simple `key: value` and `key: [array]` patterns. When skills added features as a YAML list:
```yaml
features:
  - Feature one
  - Feature two
```
The parser treated each `- Feature` line as a new key, breaking the output.

**Fix:** Add a state machine that detects `key:` followed by indented `- ` lines and collects them as an array.

**Rule:** YAML frontmatter in markdown is NOT standard YAML. You need a custom parser that handles the common patterns: simple values, inline arrays, and multi-line lists. Don't try to parse full YAML — it's overkill and error-prone.

### 2. Binary file detection needs a comprehensive extension list

Early versions missed `.svg`, `.ico`, `.woff`, `.woff2`, `.ttf`, `.eot` — all common web assets. The generator tried to read these as UTF-8, producing garbled output.

**Fix:** Use a Set of known binary extensions:
```js
const BINARY_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
  ".woff", ".woff2", ".ttf", ".eot",
  ".mp3", ".mp4", ".pdf", ".zip",
]);
```

**Rule:** When reading files in a build script, ALWAYS check the extension first. Assume anything non-text is binary until proven otherwise.

### 3. Path resolution differs between Windows and Linux

The script uses `path.join()` which produces Windows paths on Windows (`C:\Users\...\skills`) and Unix paths on Linux (`/home/user/skills`). This is fine for the script itself, but explicit `--skills-dir` arguments with Windows backslashes (`..\\skills`) break on Linux CI.

**Fix:** Remove explicit path arguments from npm scripts. Let the script use its own default resolution, which uses `path.join()` correctly for the current platform.

**Rule:** Never hardcode path separators in npm scripts. Use the script's own path logic instead.

### 4. File sizes need human-readable formatting

The manifest includes file sizes for display. Raw bytes are useless to users. But `formatFileSize()` needs to handle edge cases:
- 0 bytes → "0 B"
- 512 bytes → "512 B"
- 1.5 KB → "1.5 KB" (not "1.536 KB")
- 2.3 MB → "2.3 MB"

**Fix:** Use a simple threshold function:
```js
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
```

**Rule:** For display purposes, round to one decimal place. Nobody needs "1.536 KB" — "1.5 KB" is fine.

### 5. Undefined values create messy JSON

If a skill doesn't have `author`, `version`, `icon`, etc., the manifest includes `"author": undefined` which serializes to nothing or causes issues.

**Fix:** After building the skill object, delete undefined keys:
```js
for (const key of Object.keys(skill)) {
  if (skill[key] === undefined) delete skill[key];
}
```

**Rule:** Clean up objects before serializing. `undefined` values in JSON are technically invalid and cause confusion.

## Testing the Generator

Always test with a real skill folder that has:
1. Full frontmatter (all fields)
2. Markdown body with tables, code blocks, lists
3. Source files (`.ts`, `.js`, `.json`)
4. Binary files (`.png`, `.svg`)
5. Nested directories (`src/`, `examples/`)

```bash
cd website
node scripts/generate-manifest.js
cat public/skills-manifest.json | jq '.[0]'  # Inspect first skill
```

**Signal:** When the manifest looks wrong, check: (1) is the frontmatter parser handling the format, (2) are binary files being skipped, (3) are undefined values cleaned up, (4) are paths resolving correctly.
