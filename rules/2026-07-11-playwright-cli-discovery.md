---
name: playwright-cli-workflow
description: Debugging session discovering playwright-cli as the correct tool for taking screenshots and interacting with pages
type: feedback
updated: 2026-07-11
---

## Playwright Tool Discovery

**Symptom**: User asked to take screenshot using `/playwright-cli` but I initially tried wrong approaches (Python script, npx playwright).

**Failed Approaches**:
1. **Python playwright API**: Created inline Python script to take screenshots — rejected by user
2. **npx playwright**: Tried to use `npx playwright screenshot` but:
   - Wrong working directory (Windows path issues)
   - Browser not installed (needed `npx playwright install firefox`)
   - User had already installed Firefox via `playwright-cli install-browser firefox`
3. **Assumed wrong CLI**: Didn't ask what tool was installed, guessed based on common patterns

**Fix/Discovery**:
- User clarified: "i installed the playwright cli, dont write a python script"
- User clarified: "dont use npx use playwright-cli"
- Found `playwright-cli` is a separate npm package (`@playwright/cli`) that wraps Playwright MCP commands

**What Went Well**:
1. Once I used the right tool (`playwright-cli`), it worked seamlessly
2. The workflow was: `open <url>` → `screenshot` → `snapshot` (to get element refs) → `click <ref>` → `screenshot`
3. Element refs from `snapshot` made clicking on specific elements easy and reliable
4. Could navigate to pages, take full-page screenshots, and verify UI state

**What Could Be Improved**:
1. **Should ask first**: When user mentions a tool, ask "is this X or Y?" rather than guessing
2. **Check CLI help early**: Run `playwright-cli --help` to understand available commands before trying approaches
3. **User already said "playwright-cli"**: I should have used that exact tool name from the start, not tried alternatives
4. **Check if browser is installed**: User had already run `playwright-cli install-browser firefox` — I should verify before trying to install
5. **Never use custom paths for screenshots**: Screenshots save to `.playwright-cli/` by default with auto-generated filenames (e.g., `page-2026-07-11T04-43-45-980Z.png`). Do NOT specify `--filename` or custom paths — use the default unless user explicitly asks otherwise. I saved screenshots to `powerup/skills_screenshot_fixed.png` and `powerup/skill_page.png` instead of the correct `.playwright-cli/` location.

**Key Commands**:
```bash
playwright-cli open <url>           # Opens browser to URL
playwright-cli screenshot           # Takes screenshot of current page
playwright-cli screenshot --full-page  # Takes full scrollable page screenshot
playwright-cli snapshot             # Gets page snapshot with element refs
playwright-cli click <ref>          # Clicks element by ref (from snapshot)
playwright-cli reload               # Reloads current page
```

**Signal**: When user says "use X", check if X is available on PATH first (`which X`), read its help, then use it exactly as named. Don't substitute alternatives.
