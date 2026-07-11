---
name: Example Skill
description: A sample skill to demonstrate the site structure
tags: [demo, example]
category: tools
language: TypeScript
complexity: Beginner
author: jorda
version: 1.0.0
icon: extension
color: "bg-[#D1FADF]"
stars: 42
downloads: 150
rating: 4.5
featured: true
backgroundColor: bg-accent-mint
features:
  - Simple setup and configuration
  - Full TypeScript support
  - Works out of the box
useCommand: "claude install example-skill"
---

# Example Skill

This is a sample skill. Replace it with your own.

## Usage

```bash
echo "Hello from example-skill"
```

## Configuration

The skill can be configured via the `settings.json` file in your `.claude/` directory:

```json
{
  "example-skill": {
    "enabled": true
  }
}
```

## How It Works

This skill demonstrates the structure that all skills in this collection follow:

1. A `SKILL.md` file with YAML frontmatter and markdown body
2. Optional source files in subdirectories
3. A manifest generated at build time that the website renders
