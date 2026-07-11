---
name: Web Search MCP
description: Web search capability for MCP servers
tags: [tools, mcp]
category: tools
language: TypeScript
complexity: Intermediate
author: anthropic-labs
version: 1.0.0
icon: search
color: "bg-[#E8D1FF]"
stars: 85
downloads: 1800
rating: 4.6
featured: true
backgroundColor: bg-accent-lilac
features:
  - Real-time web search via MCP
  - Multiple search provider support
  - Caching for performance
  - Rate limiting built-in
useCommand: "npx @anthropic-labs/web-search-mcp start"
---

# Web Search MCP

Web Search MCP provides real-time web search capabilities for MCP servers.

## Key Features

- **Real-time web search** - Search the web directly from your MCP client
- **Multiple providers** - Support for Google, Bing, DuckDuckGo
- **Caching** - Built-in caching for repeated queries
- **Rate limiting** - Automatic rate limiting to respect API limits

## Usage

```bash
npx @anthropic-labs/web-search-mcp start
```

## How It Works

This skill demonstrates the structure that all skills in this collection follow:

1. A `SKILL.md` file with YAML frontmatter and markdown body
2. Optional source files in subdirectories
3. A manifest generated at build time that the website renders