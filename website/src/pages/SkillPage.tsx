import { useParams, Link } from "react-router-dom";
import SkillDetail from "../components/SkillDetail";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import type { SkillMeta } from "../types";

const mockSkills: SkillMeta[] = [
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

  async upsert(id: string, content: string, meta object) {
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
  },
  {
    slug: "svg-designer",
    name: "SVG Designer",
    description:
      "Instantly convert hand-drawn sketches or natural language descriptions into production-ready SVG code. Supports icons, illustrations, and logos with pixel-perfect precision.",
    tags: ["prompts", "design", "svg"],
    files: ["SKILL.md", "prompts/system.md", "examples/", "README.md"],
  },
  {
    slug: "ghostwriter-agent",
    name: "Ghostwriter Agent",
    description:
      "Advanced storytelling tool that maintains complex narrative consistency across long chapters, tracks character arcs, and suggests plot developments based on established lore.",
    tags: ["agents", "writing", "creative"],
    files: ["SKILL.md", "src/agent.ts", "config/narrative.json", "package.json"],
  },
];

export default function SkillPage() {
  const { slug } = useParams<{ slug: string }>();
  const skill = mockSkills.find((s) => s.slug === slug);

  if (!skill) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white border-2 border-on-background rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-center">
          <span className="material-symbols-outlined !text-6xl text-on-background/30 mb-4">
            search_off
          </span>
          <h1 className="font-headline-lg text-headline-lg mb-4">
            Skill not found
          </h1>
          <Link to="/skills">
            <ButtonSecondary size="md">Back to Library</ButtonSecondary>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        to="/skills"
        className="inline-flex items-center gap-1 font-label-bold text-secondary hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined !text-base">arrow_back</span>
        Back to Library
      </Link>
      <SkillDetail skill={skill} />
    </div>
  );
}
