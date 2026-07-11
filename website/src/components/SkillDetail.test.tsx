import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SkillDetail from "./SkillDetail";
import type { SkillMeta } from "../types";

const detailedSkill: SkillMeta = {
  slug: "vector-store",
  name: "Vector Store",
  description: "A vector storage skill",
  tags: ["tools"],
  files: ["SKILL.md"],
  author: "anthropic-labs",
  version: "1.2.4",
  icon: "database",
  readme: "Vector Store enables semantic search.",
  features: ["Feature one", "Feature two"],
  useCommand: "npx @anthropic-labs/vector-store start",
  skillFiles: [
    { name: "SKILL.md", size: "1.8 KB", lastModified: "3 days ago", content: "# Hello" },
    { name: "src/index.ts", size: "12.4 KB", lastModified: "1 day ago", content: "const x = 1;" },
  ],
};

const simpleSkill: SkillMeta = {
  slug: "simple",
  name: "Simple Skill",
  description: "Just a description",
  tags: ["prompts"],
  files: [],
};

describe("SkillDetail", () => {
  describe("header", () => {
    it("renders skill name", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("Vector Store")).toBeInTheDocument();
    });

    it("renders author and version", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("anthropic-labs")).toBeInTheDocument();
      expect(screen.getByText("v1.2.4")).toBeInTheDocument();
    });

    it("renders the icon", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("database")).toBeInTheDocument();
    });

    it("renders Install Skill and Star on GitHub buttons", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("Install Skill")).toBeInTheDocument();
      expect(screen.getByText("Star on GitHub")).toBeInTheDocument();
    });
  });

  describe("tabs", () => {
    it("renders Overview and Files tabs", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("Overview")).toBeInTheDocument();
      expect(screen.getByText("Files & Code")).toBeInTheDocument();
    });

    it("shows Overview content by default", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("README.md")).toBeInTheDocument();
      expect(screen.getByText("Vector Store enables semantic search.")).toBeInTheDocument();
    });

    it("shows Features list", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("Key Features")).toBeInTheDocument();
      expect(screen.getByText("Feature one")).toBeInTheDocument();
      expect(screen.getByText("Feature two")).toBeInTheDocument();
    });

    it("shows How to Use section", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("How to Use")).toBeInTheDocument();
      expect(screen.getByText("npx @anthropic-labs/vector-store start")).toBeInTheDocument();
    });

    it("switches to Files tab and shows file list", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByText("Files & Code"));
      expect(screen.getByText("SKILL.md")).toBeInTheDocument();
      expect(screen.getByText("src/index.ts")).toBeInTheDocument();
      expect(screen.getByText("1.8 KB")).toBeInTheDocument();
      expect(screen.getByText("12.4 KB")).toBeInTheDocument();
    });

    it("shows code viewer when a file row is clicked", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByText("Files & Code"));
      fireEvent.click(screen.getByText("src/index.ts").closest("tr")!);
      expect(screen.getByText("const x = 1;")).toBeInTheDocument();
      expect(screen.getByText("Copy Raw Code")).toBeInTheDocument();
    });

    it("hides code viewer when same file is clicked again", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={detailedSkill} />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByText("Files & Code"));
      const row = screen.getByText("src/index.ts").closest("tr")!;
      fireEvent.click(row);
      expect(screen.getByText("const x = 1;")).toBeInTheDocument();
      fireEvent.click(row);
      expect(screen.queryByText("const x = 1;")).not.toBeInTheDocument();
    });
  });

  describe("simple skill without detail data", () => {
    it("renders the description fallback", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={simpleSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("Just a description")).toBeInTheDocument();
    });

    it("renders tags", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={simpleSkill} />
        </MemoryRouter>
      );
      expect(screen.getByText("prompts")).toBeInTheDocument();
    });

    it("does not render tabs", () => {
      render(
        <MemoryRouter>
          <SkillDetail skill={simpleSkill} />
        </MemoryRouter>
      );
      expect(screen.queryByText("Overview")).not.toBeInTheDocument();
      expect(screen.queryByText("Files & Code")).not.toBeInTheDocument();
    });
  });
});
