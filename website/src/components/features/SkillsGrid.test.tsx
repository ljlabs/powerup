import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SkillsGrid from "./SkillsGrid";

describe("SkillsGrid", () => {
  it("renders the page heading", () => {
    render(<SkillsGrid />);
    expect(screen.getByText("Skill Browse Ledger")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<SkillsGrid />);
    expect(screen.getByText(/Discover and integrate powerful capabilities/)).toBeInTheDocument();
  });

  it("renders all default skills", () => {
    render(<SkillsGrid />);
    expect(screen.getByText("Python Sandbox")).toBeInTheDocument();
    expect(screen.getByText("Vector Store Connect")).toBeInTheDocument();
    expect(screen.getByText("SVG Designer")).toBeInTheDocument();
  });

  it("renders custom skills when provided", () => {
    const custom = [
      { id: "c1", name: "My Skill", description: "desc", version: "1.0", icon: "star", stars: 10, downloads: 20, language: "Python", color: "bg-white" },
    ];
    render(<SkillsGrid skills={custom} />);
    expect(screen.getByText("My Skill")).toBeInTheDocument();
  });

  it("renders Load More button", () => {
    render(<SkillsGrid />);
    expect(screen.getByText("Load More Skills")).toBeInTheDocument();
  });

  it("calls onLoadMore when Load More is clicked", () => {
    const onLoadMore = vi.fn();
    render(<SkillsGrid onLoadMore={onLoadMore} />);
    fireEvent.click(screen.getByText("Load More Skills"));
    expect(onLoadMore).toHaveBeenCalledOnce();
  });
});
