import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterSidebar from "./FilterSidebar";

describe("FilterSidebar", () => {
  it("renders the Filters heading", () => {
    render(<FilterSidebar />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders type filter buttons", () => {
    render(<FilterSidebar />);
    expect(screen.getByText("Tools")).toBeInTheDocument();
    expect(screen.getByText("Prompts")).toBeInTheDocument();
    expect(screen.getByText("Configs")).toBeInTheDocument();
  });

  it("renders complexity checkboxes", () => {
    render(<FilterSidebar />);
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });

  it("renders runtime filter buttons", () => {
    render(<FilterSidebar />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("JSON")).toBeInTheDocument();
  });

  it("calls onFilterChange when a type filter is clicked", () => {
    const onFilterChange = vi.fn();
    render(<FilterSidebar onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("Tools"));
    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ type: "Tools" })
    );
  });

  it("calls onFilterChange when a complexity checkbox is toggled", () => {
    const onFilterChange = vi.fn();
    render(<FilterSidebar onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("Beginner"));
    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ complexity: ["Beginner"] })
    );
  });

  it("calls onFilterChange when a runtime filter is clicked", () => {
    const onFilterChange = vi.fn();
    render(<FilterSidebar onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("TypeScript"));
    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ runtime: "TypeScript" })
    );
  });

  it("calls onClearAll when Clear All is clicked", () => {
    const onClearAll = vi.fn();
    render(<FilterSidebar onClearAll={onClearAll} />);
    fireEvent.click(screen.getByText("Clear All"));
    expect(onClearAll).toHaveBeenCalledOnce();
  });

  it("deselects a type filter when clicked again", () => {
    const onFilterChange = vi.fn();
    render(<FilterSidebar onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("Tools"));
    fireEvent.click(screen.getByText("Tools"));
    expect(onFilterChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: null })
    );
  });
});
