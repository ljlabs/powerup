import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SkillPage from "./SkillPage";

function renderWithRoute(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/skills/${slug}`]}>
      <Routes>
        <Route path="/skills/:slug" element={<SkillPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("SkillPage", () => {
  it("renders the vector-store skill detail", () => {
    renderWithRoute("vector-store");
    expect(screen.getAllByText("Vector Store")).toHaveLength(2);
    expect(screen.getByText("anthropic-labs")).toBeInTheDocument();
    expect(screen.getByText("v1.2.4")).toBeInTheDocument();
  });

  it("renders tabs for a detailed skill", () => {
    renderWithRoute("vector-store");
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Files & Code")).toBeInTheDocument();
  });

  it("renders overview content with features", () => {
    renderWithRoute("vector-store");
    expect(screen.getAllByText("Key Features")).toHaveLength(2);
    expect(screen.getByText("Semantic search across large document collections")).toBeInTheDocument();
  });

  it("renders the web-search-mcp skill", () => {
    renderWithRoute("web-search-mcp");
    expect(screen.getAllByText("Web Search MCP")).toHaveLength(2);
  });

  it("shows the 404 page for unknown slugs", () => {
    renderWithRoute("nonexistent-skill");
    expect(screen.getByText("Skill not found")).toBeInTheDocument();
    expect(screen.getByText("Back to Library")).toBeInTheDocument();
  });

  it("shows the back to library link", () => {
    renderWithRoute("vector-store");
    expect(screen.getByText("Back to Library")).toBeInTheDocument();
  });
});
