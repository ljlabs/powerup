import type { SkillMeta, SkillCard, FeaturedSkill } from "../types/skills";

/**
 * Detailed skill data for the skill detail page
 */
export const detailedSkills: SkillMeta[] = [
  {
    slug: "vector-store",
    name: "Vector Store",
    description:
      "A high-performance vector storage and retrieval skill for Claude. Enables semantic search, similarity matching, and efficient indexing over large document collections using local or remote vector databases.",
    tags: ["tools", "search", "mcp"],
    files: ["SKILL.md", "src/index.ts", "src/store.ts", "package.json"],
    author: "anthropic-labs",
    version: "1.2.4",
    icon: "database",
    readme:
      "The Vector Store Model Context Protocol (MCP) server enables Claude to store, index, and retrieve documents using vector embeddings. Perfect for building semantic search, RAG pipelines, and knowledge-base workflows.\n\nBuilt on top of industry-standard embedding models with support for local SQLite-backed storage or remote Pinecone/Weaviate deployments.",
    features: [
      "Semantic search across large document collections",
      "Automatic embedding generation with configurable models",
      "Support for local SQLite and remote vector databases",
      "Incremental indexing with change detection",
    ],
    useCommand: "npx @anthropic-labs/vector-store start",
    skillFiles: [
      {
        name: "SKILL.md",
        size: "1.8 KB",
        lastModified: "3 days ago",
        content: "# Vector Store MCP\n\nSemantic document storage and retrieval.\n\n## Installation\nnpx @anthropic-labs/vector-store start\n\n## Features\n- Semantic search\n- Auto-embedding\n- Local & remote backends",
      },
      {
        name: "src/index.ts",
        size: "12.4 KB",
        lastModified: "1 day ago",
        content: `import { Server } from "@modelcontextprotocol/sdk";
import { VectorStore } from "./store";

const server = new Server({
  name: "vector-store",
  version: "1.2.4"
});

server.tool("search", {
  description: "Semantic search across stored documents",
  params: {
    query: { type: "string" },
    topK: { type: "number", default: 5 }
  }
}, async ({ query, topK }) => {
  const store = VectorStore.getInstance();
  const results = await store.search(query, topK);
  return { content: results };
});

server.tool("index", {
  description: "Index a document into the vector store",
  params: {
    id: { type: "string" },
    content: { type: "string" },
    metadata: { type: "object" }
  }
}, async ({ id, content, metadata }) => {
  const store = VectorStore.getInstance();
  await store.upsert(id, content, metadata);
  return { content: { status: "indexed", id } };
});

server.start();`,
      },
      {
        name: "src/store.ts",
        size: "8.2 KB",
        lastModified: "1 day ago",
        content: `import Database from "better-sqlite3";
import { embed } from "./embedding";

export class VectorStore {
  private static instance: VectorStore;
  private db: Database.Database;

  private constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.db.exec(\`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        content TEXT,
        embedding BLOB,
        metadata TEXT
      )
    \`);
  }

  static getInstance(path = "./vectors.db"): VectorStore {
    if (!VectorStore.instance) {
      VectorStore.instance = new VectorStore(path);
    }
    return VectorStore.instance;
  }

  async upsert(id: string, content: string, metadata: object) {
    const embedding = await embed(content);
    this.db.prepare(
      "INSERT OR REPLACE INTO documents (id, content, embedding, metadata) VALUES (?, ?, ?, ?)"
    ).run(id, content, Buffer.from(embedding), JSON.stringify(metadata));
  }

  async search(query: string, topK = 5) {
    const queryEmbedding = await embed(query);
    const rows = this.db.prepare("SELECT * FROM documents").all() as any[];
    const scored = rows.map(row => ({
      ...row,
      score: cosineSimilarity(queryEmbedding, Array.from(new Float32Array(row.embedding)))
    }));
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}`,
      },
      {
        name: "package.json",
        size: "612 B",
        lastModified: "1 week ago",
        content: `{
  "name": "@anthropic-labs/vector-store",
  "version": "1.2.4",
  "description": "Vector storage MCP server for Claude",
  "main": "dist/index.js",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "better-sqlite3": "^11.0.0"
  }
}`,
      },
    ],
    category: "tools",
  },
  {
    slug: "web-search-mcp",
    name: "Web Search MCP",
    description:
      "Enables Claude to search the live web, cite sources, and verify facts in real-time. Built on DuckDuckGo with intelligent result ranking and source citation.",
    tags: ["tools", "search", "mcp"],
    files: ["SKILL.md", "src/index.ts", "src/search.ts", "package.json"],
    author: "anthropic-labs",
    version: "1.2.4",
    icon: "travel_explore",
    readme:
      "The Web Search Model Context Protocol (MCP) server enables Claude to browse the real-time web, fetch content from URLs, and summarize search results with precision. Perfect for research-heavy workflows.",
    features: [
      "Google & DuckDuckGo Search Integration",
      "Smart HTML-to-Markdown content extraction",
      "Rate-limit handling and session caching",
    ],
    useCommand: "npx @anthropic-labs/web-search-mcp start",
    category: "tools",
  },
  {
    slug: "svg-designer",
    name: "SVG Designer",
    description:
      "Instantly convert hand-drawn sketches or natural language descriptions into production-ready SVG code. Supports icons, illustrations, and logos with pixel-perfect precision.",
    tags: ["prompts", "design", "svg"],
    files: ["SKILL.md", "prompts/system.md", "examples/", "README.md"],
    author: "design-labs",
    version: "2.0.0",
    icon: "brush",
    category: "prompts",
  },
  {
    slug: "ghostwriter-agent",
    name: "Ghostwriter Agent",
    description:
      "Advanced storytelling tool that maintains complex narrative consistency across long chapters, tracks character arcs, and suggests plot developments based on established lore.",
    tags: ["agents", "writing", "creative"],
    files: ["SKILL.md", "src/agent.ts", "config/narrative.json", "package.json"],
    author: "creative-ai",
    version: "3.1.0",
    icon: "auto_stories",
    category: "agents",
  },
];

/**
 * Skills data for the library grid
 */
export const librarySkills: SkillCard[] = [
  {
    id: "python-sandbox",
    name: "Python Sandbox",
    description:
      "Execute complex Python scripts directly within the console environment with full library support.",
    version: "2.4.1",
    icon: "code",
    stars: 1200,
    downloads: 8500,
    language: "Python",
    color: "bg-[#D1FADF]",
    category: "tools",
  },
  {
    id: "vector-store",
    name: "Vector Store Connect",
    description:
      "Connect your Pinecone or Weaviate indices for semantic search across large documentation sets.",
    version: "1.0.0",
    icon: "database",
    stars: 842,
    downloads: 4100,
    language: "TypeScript",
    color: "bg-[#C3E8FF]",
    category: "tools",
  },
  {
    id: "svg-designer-lib",
    name: "SVG Designer",
    description:
      "Advanced prompting for generating pixel-perfect icons and illustrations in SVG format.",
    version: "1.2.0",
    icon: "brush",
    stars: 2500,
    downloads: 12000,
    language: "Prompt",
    color: "bg-[#EBE9FE]",
    category: "prompts",
  },
  {
    id: "deepl",
    name: "DeepL Global",
    description:
      "Seamless translation integration for real-time multilingual conversation support.",
    version: "0.9.4",
    icon: "translate",
    stars: 431,
    downloads: 1800,
    language: "JSON",
    color: "bg-[#FFE4E1]",
    category: "tools",
  },
  {
    id: "data-viz",
    name: "Data Visualizer",
    description:
      "Transforms raw CSV and JSON data into beautiful interactive charts using D3.js and Recharts.",
    version: "3.1.0",
    icon: "auto_graph",
    stars: 3100,
    downloads: 24000,
    language: "TypeScript",
    color: "bg-[#FFF9C4]",
    category: "tools",
  },
  {
    id: "security-auditor",
    name: "Security Auditor",
    description:
      "Automated vulnerability scanner for smart contracts and modern web application codebases.",
    version: "2.0.2",
    icon: "security",
    stars: 6800,
    downloads: 15200,
    language: "Python",
    color: "bg-[#B9F6CA]",
    category: "tools",
  },
];

/**
 * Skills data for the featured section
 */
export const featuredSkills: FeaturedSkill[] = [
  {
    id: "web-search",
    name: "Web Search MCP",
    description:
      "Enables Claude to search the live web, cite sources, and verify facts in real-time.",
    rating: 4.9,
    version: "1.2",
    backgroundColor: "bg-accent-sky",
  },
  {
    id: "svg-designer",
    name: "SVG Designer",
    description:
      "Instantly convert hand-drawn sketches or descriptions into production-ready SVG code.",
    rating: 4.7,
    version: "2.0",
    backgroundColor: "bg-accent-mint",
  },
  {
    id: "ghostwriter",
    name: "Ghostwriter Agent",
    description:
      "Advanced storytelling tool that maintains complex narrative consistency across long chapters.",
    rating: 5.0,
    version: "3.1",
    backgroundColor: "bg-accent-lavender",
  },
  {
    id: "python-viz",
    name: "Python Data Visualizer",
    description:
      "Generates beautiful Matplotlib and Seaborn charts from messy CSV files in seconds.",
    rating: 4.8,
    version: "1.5",
    backgroundColor: "bg-accent-apricot",
  },
];
