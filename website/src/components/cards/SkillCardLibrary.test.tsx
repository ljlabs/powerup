import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SkillCardLibrary from "./SkillCardLibrary";

const mockSkill = {
  id: "test-lib",
  name: "Test Library Skill",
  description: "A library skill description",
  version: "2.0",
  icon: "code",
  stars: 1500,
  downloads: 8200,
  language: "TypeScript",
  color: "bg-[#C3E8FF]",
};

describe("SkillCardLibrary", () => {
  it("renders skill name and description", () => {
    render(<SkillCardLibrary skill={mockSkill} />);
    expect(screen.getByText("Test Library Skill")).toBeInTheDocument();
    expect(screen.getByText("A library skill description")).toBeInTheDocument();
  });

  it("renders the version", () => {
    render(<SkillCardLibrary skill={mockSkill} />);
    expect(screen.getByText("v2.0")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<SkillCardLibrary skill={mockSkill} />);
    expect(screen.getByText("code")).toBeInTheDocument();
  });

  it("formats stars >= 1000 with k suffix", () => {
    render(<SkillCardLibrary skill={mockSkill} />);
    expect(screen.getByText("1.5k")).toBeInTheDocument();
  });

  it("formats downloads >= 1000 with k suffix", () => {
    render(<SkillCardLibrary skill={mockSkill} />);
    expect(screen.getByText("8.2k")).toBeInTheDocument();
  });

  it("renders small numbers without k suffix", () => {
    const smallSkill = { ...mockSkill, stars: 500, downloads: 300 };
    render(<SkillCardLibrary skill={smallSkill} />);
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
  });

  it("renders the language badge", () => {
    render(<SkillCardLibrary skill={mockSkill} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("calls onClick with skill id when clicked", () => {
    const onClick = vi.fn();
    render(<SkillCardLibrary skill={mockSkill} onClick={onClick} />);
    fireEvent.click(screen.getByText("Test Library Skill").closest("div[class*='border-2']")!);
    expect(onClick).toHaveBeenCalledWith("test-lib");
  });
});
