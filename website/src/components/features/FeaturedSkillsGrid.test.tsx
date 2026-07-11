import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FeaturedSkillsGrid from "./FeaturedSkillsGrid";

describe("FeaturedSkillsGrid", () => {
  it("renders the section heading", () => {
    render(
      <MemoryRouter>
        <FeaturedSkillsGrid />
      </MemoryRouter>
    );
    expect(screen.getByText("Featured Skills")).toBeInTheDocument();
  });

  it("renders the View All Skills link", () => {
    render(
      <MemoryRouter>
        <FeaturedSkillsGrid />
      </MemoryRouter>
    );
    expect(screen.getByText("View All Skills")).toBeInTheDocument();
  });

  it("renders all default featured skills", () => {
    render(
      <MemoryRouter>
        <FeaturedSkillsGrid />
      </MemoryRouter>
    );
    expect(screen.getByText("Web Search MCP")).toBeInTheDocument();
    expect(screen.getByText("SVG Designer")).toBeInTheDocument();
    expect(screen.getByText("Ghostwriter Agent")).toBeInTheDocument();
    expect(screen.getByText("Python Data Visualizer")).toBeInTheDocument();
  });

  it("renders custom skills when provided", () => {
    const custom = [
      { id: "custom", name: "Custom Skill", description: "desc", rating: 5, version: "1.0", backgroundColor: "bg-white" },
    ];
    render(
      <MemoryRouter>
        <FeaturedSkillsGrid skills={custom} />
      </MemoryRouter>
    );
    expect(screen.getByText("Custom Skill")).toBeInTheDocument();
  });
});
