# Skills

This folder contains the skills displayed on the website website.

## Adding a skill

Each skill lives in its own folder with a `SKILL.md` file containing YAML frontmatter:

```markdown
---
name: my-skill
 description: What this skill does
tags: [category1, category2]
---

# My Skill

Skill documentation here...
```

After adding or updating skills, regenerate the manifest:

```bash
cd ../website
npm run generate-manifest
```
