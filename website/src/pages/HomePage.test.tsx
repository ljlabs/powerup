import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the hero section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Give Claude New/)).toBeInTheDocument();
  });

  it("renders the categories section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText("Browse Categories")).toBeInTheDocument();
  });

  it("renders the featured skills section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText("Featured Skills")).toBeInTheDocument();
  });

  it("renders the CTA banner", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText("Publish Your Own Skill")).toBeInTheDocument();
  });
});
