import { useParams, Link } from "react-router-dom";
import SkillDetail from "../components/SkillDetail";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import type { SkillMeta } from "../types";

// Mock data — replace with real skill loading later
const mockSkills: SkillMeta[] = [
  {
    slug: "web-search-mcp",
    name: "Web Search MCP",
    description:
      "Enables Claude to search the live web, cite sources, and verify facts in real-time. Built on DuckDuckGo with intelligent result ranking and source citation.",
    tags: ["tools", "search", "mcp"],
    files: ["SKILL.md", "src/index.ts", "src/search.ts", "package.json"],
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
    <div className="max-w-3xl space-y-6">
      <Link
        to="/skills"
        className="inline-flex items-center gap-1 font-label-bold text-secondary hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined !text-base">arrow_back</span>
        Back to Library
      </Link>
      <SkillDetail skill={skill} />
      <div className="flex gap-4">
        <ButtonPrimary size="md">Install Skill</ButtonPrimary>
        <ButtonSecondary size="md">View Source</ButtonSecondary>
      </div>
    </div>
  );
}
