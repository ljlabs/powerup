---
name: wiring-real-data-into-existing-services
description: Lessons from replacing mock data with real manifest data — finding the right integration point, not changing more than needed
type: feedback
updated: 2026-07-11
---

# Wiring Real Data Into an Existing Service Layer

## What We Learned

When the user asked to "render skills from the skills folder," the instinct was to rewire every page to use `useSkills()` hook directly. That was wrong — the service layer already existed and worked.

### 1. Find the integration point BEFORE planning changes

**Mistake:** The initial plan proposed changing 12 files — updating every page, every component, every grid to use `useSkills()`.

**Reality:** The service layer (`skillService.ts`, `libraryService.ts`, `featuredService.ts`) already imported from `data/skills.ts`. The pages already called those services. The components already used those types.

**Fix:** Only ONE file needed to change: `data/skills.ts`. Replace the hardcoded arrays with manifest imports. Everything downstream works automatically.

**Rule:** Before planning changes, trace the data flow from source to UI. Find the narrowest point where a swap gives you the most coverage. Don't change every consumer — change the producer.

### 2. The `useSkills` hook was NOT the integration point

The `useSkills` hook fetches the manifest at runtime. But the service layer already imports `data/skills.ts` synchronously. Using the hook would mean:
- Every page needs `useState` + `useEffect` for loading
- Every component needs loading/error states
- The hook fetches via network; the import is inlined by Vite at build time

**Fix:** Import the manifest directly in `data/skills.ts`:
```ts
import manifest from "../../public/skills-manifest.json";
```
Vite inlines this at build time — zero network requests, no loading states needed.

**Rule:** Static data that's generated at build time should be imported, not fetched. Save hooks for data that changes at runtime.

### 3. Don't change types unless you have to

**Mistake:** Initially proposed unifying all three Skill interfaces (`SkillMeta`, `SkillCard`, `FeaturedSkill`) into one.

**Reality:** The three interfaces serve different pages with different data needs. The service layer already maps between them. Adding optional fields to `SkillMeta` (for the data source) and keeping the output types separate was cleaner.

**Rule:** Extend the source type to carry more data. Don't collapse distinct output types — they exist for a reason.

### 4. Verify the build before declaring success

After updating `data/skills.ts`, the build failed with:
```
src/data/skills.ts(12,1): error TS2578: Unused '@ts-expect-error' directive.
```

The `@ts-expect-error` was added "just in case" the JSON import wouldn't type-check. But Vite handles JSON imports natively — the directive was unnecessary.

**Rule:** Don't add defensive code unless you've confirmed the problem exists. Vite imports JSON natively; no `@ts-expect-error` needed.

### 5. The manifest generator path resolution was tricky

The default `--skills-dir` path (`path.join(WEBSITE_ROOT, "..", "skills")`) resolves relative to the script's location (`website/scripts/`), so `..` goes to `website/`, then another `..` goes to `powerup/`. This is correct but confusing.

When the user said "i just set it as root" for GitHub Pages, the default path in the script was changed to `path.join(WEBSITE_ROOT, "skills")` which resolved to `website/skills` — wrong.

**Fix:** Keep the original path resolution. Remove the explicit `--skills-dir` argument from package.json scripts so the script uses its own default.

**Rule:** When a build script has a default path, test it without arguments before assuming it's broken. The script's own logic is usually correct; the explicit override was the problem.

## Summary: The Right Approach

1. **Read the data flow first** — trace from data source to UI before touching anything
2. **Find the narrowest swap point** — one file change that fixes everything downstream
3. **Use static imports for build-time data** — no hooks, no loading states, no network
4. **Extend source types, don't collapse output types** — add optional fields to the source, keep outputs separate
5. **Test the build after every change** — don't batch changes and hope

**Signal:** When wiring real data into an existing codebase, the first question should be "where does the data currently come from?" not "how do I add a new data source?"
