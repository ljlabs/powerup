---
name: Playwright CLI
description: Automate browser interactions, test web pages, and work with Playwright tests. Use for taking screenshots, navigating pages, clicking elements, filling forms, and debugging web UIs.
tags: [testing, browser, playwright, automation, screenshots]
category: tools
language: TypeScript
complexity: Intermediate
author: anthropic
version: 1.0.0
icon: smart_toy
color: "bg-[#E9D5FF]"
stars: 320
downloads: 5000
rating: 4.9
featured: true
backgroundColor: bg-accent-lavender
features:
  - Take screenshots of any webpage
  - Navigate and interact with elements via refs
  - Fill forms, click buttons, check checkboxes
  - Console and network request monitoring
  - Multi-tab workflow support
  - Persistent browser sessions
useCommand: "playwright-cli open <url>"
---

# Playwright CLI

Automate browser interactions, test web pages, and debug web UIs with a simple command-line interface.

## Quick start

```bash
playwright-cli open https://example.com
playwright-cli snapshot
playwright-cli click e5
playwright-cli screenshot
playwright-cli close
```

## Core commands

```bash
playwright-cli open <url>          # Open browser to URL
playwright-cli goto <url>          # Navigate to URL
playwright-cli snapshot            # Get page snapshot with element refs
playwright-cli click <ref>         # Click element by ref
playwright-cli type <text>         # Type text
playwright-cli fill <ref> <text>   # Fill input field
playwright-cli screenshot          # Take screenshot
playwright-cli close               # Close browser
```

## How it works

1. `open` or `goto` — navigates to a URL
2. `snapshot` — captures the page structure with element refs (e1, e2, etc.)
3. `click e5` — interacts with elements using those refs
4. `screenshot` — captures the current state

## Full reference

See the SKILL.md file in `.claude/skills/playwright-cli/` for the complete command reference, including keyboard/mouse events, storage management, network mocking, and video recording.
