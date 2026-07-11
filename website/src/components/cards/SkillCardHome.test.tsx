import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SkillCardHome from "./SkillCardHome";

const mockSkill = {
  id: "test-skill",
  name: "Test Skill",
  description: "A test skill description",
  rating: 4.5,
  version: "1.0",
  backgroundColor: "bg-accent-sky",
};

describe("SkillCardHome", () => {
  it("renders skill name and description", () => {
    render(<SkillCardHome skill={mockSkill} />);
    expect(screen.getByText("Test Skill")).toBeInTheDocument();
    expect(screen.getByText("A test skill description")).toBeInTheDocument();
  });

  it("renders the rating", () => {
    render(<SkillCardHome skill={mockSkill} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders the version", () => {
    render(<SkillCardHome skill={mockSkill} />);
    expect(screen.getByText("v1.0")).toBeInTheDocument();
  });

  it("renders the extension icon when no imageUrl", () => {
    render(<SkillCardHome skill={mockSkill} />);
    expect(screen.getByText("extension")).toBeInTheDocument();
  });

  it("renders an image when imageUrl is provided", () => {
    const skillWithImage = { ...mockSkill, imageUrl: "https://example.com/img.png" };
    render(<SkillCardHome skill={skillWithImage} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/img.png");
  });

  it("calls onAdd with skill id when add button is clicked", () => {
    const onAdd = vi.fn();
    render(<SkillCardHome skill={mockSkill} onAdd={onAdd} />);
    fireEvent.click(screen.getByText("add").closest("button")!);
    expect(onAdd).toHaveBeenCalledWith("test-skill");
  });
});
