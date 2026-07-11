import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CategoryGrid from "./CategoryGrid";

describe("CategoryGrid", () => {
  it("renders the section heading", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );
    expect(screen.getByText("Browse Categories")).toBeInTheDocument();
  });

  it("renders all default categories", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );
    expect(screen.getByText("MCP Tools")).toBeInTheDocument();
    expect(screen.getByText("Prompts")).toBeInTheDocument();
    expect(screen.getByText("Workflows")).toBeInTheDocument();
    expect(screen.getByText("Data Agents")).toBeInTheDocument();
  });

  it("renders category icons", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );
    expect(screen.getByText("robot_2")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByText("bolt")).toBeInTheDocument();
    expect(screen.getByText("bar_chart")).toBeInTheDocument();
  });

  it("links each category to the gallery with category param", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/skills?category=tools");
  });
});
