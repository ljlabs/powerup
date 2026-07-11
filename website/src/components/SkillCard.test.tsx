import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SkillCard from "./SkillCard";

const mockSkill = {
  slug: "test-skill",
  name: "Test Skill",
  description: "A test description",
  tags: ["tools", "search"],
  files: ["SKILL.md"],
};

describe("SkillCard", () => {
  it("renders skill name and description", () => {
    render(
      <MemoryRouter>
        <SkillCard skill={mockSkill} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Skill")).toBeInTheDocument();
    expect(screen.getByText("A test description")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(
      <MemoryRouter>
        <SkillCard skill={mockSkill} />
      </MemoryRouter>
    );
    expect(screen.getByText("tools")).toBeInTheDocument();
    expect(screen.getByText("search")).toBeInTheDocument();
  });

  it("links to the skill detail page", () => {
    render(
      <MemoryRouter>
        <SkillCard skill={mockSkill} />
      </MemoryRouter>
    );
    const link = screen.getByText("Test Skill").closest("a");
    expect(link).toHaveAttribute("href", "/skills/test-skill");
  });
});
