---
name: Vector Store
description: A vector storage skill for semantic search
tags: [tools]
category: tools
language: TypeScript
complexity: Intermediate
author: anthropic-labs
version: 1.2.4
icon: database
color: "bg-[#D1FADF]"
stars: 120
downloads: 2500
rating: 4.8
featured: true
backgroundColor: bg-accent-sky
features:
  - Semantic search across large document collections
  - Multiple embedding model support
  - Filter by metadata
  - Hybrid search with keyword matching
useCommand: "npx @anthropic-labs/vector-store start"
---

# Vector Store

Vector Store enables semantic search across large document collections.

## Key Features

- **Semantic search** - Find documents by meaning, not just keywords
- **Multiple embedding models** - Support for OpenAI, Cohere, and local models
- **Metadata filtering** - Filter results by custom metadata fields
- **Hybrid search** - Combine semantic and keyword search for best results

## Usage

```bash
npx @anthropic-labs/vector-store start
```

## How It Works

This skill demonstrates the structure that all skills in this collection follow:

1. A `SKILL.md` file with YAML frontmatter and markdown body
2. Optional source files in subdirectories
3. A manifest generated at build time that the website renders