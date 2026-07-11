import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DocsPage from "./DocsPage";

describe("DocsPage", () => {
  it("renders the back to home link", () => {
    render(
      <MemoryRouter>
        <DocsPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("renders the contributor guide heading", () => {
    render(
      <MemoryRouter>
        <DocsPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Contributor Guide")).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(
      <MemoryRouter>
        <DocsPage />
      </MemoryRouter>
    );
    // Each heading appears twice: once in the nav pills, once as the h2
    expect(screen.getAllByText("What are Skills?").length).toBe(2);
    expect(screen.getAllByText("Skill Package Structure").length).toBe(2);
    expect(screen.getAllByText("The SKILL.md File").length).toBe(2);
    expect(screen.getAllByText("How to Publish").length).toBe(2);
    expect(screen.getAllByText("Submission Guidelines").length).toBe(2);
  });

  it("renders the publishing steps", () => {
    render(
      <MemoryRouter>
        <DocsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Fork the Claude Skills repository/)).toBeInTheDocument();
    expect(screen.getByText(/Open a pull request/)).toBeInTheDocument();
  });

  it("renders the submission guidelines", () => {
    render(
      <MemoryRouter>
        <DocsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Do not include sensitive data/)).toBeInTheDocument();
    expect(screen.getByText(/one skill should do one thing well/)).toBeInTheDocument();
  });

  it("renders the Browse Skills and Report an Issue buttons", () => {
    render(
      <MemoryRouter>
        <DocsPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Browse Skills")).toBeInTheDocument();
    expect(screen.getByText("Report an Issue")).toBeInTheDocument();
  });
});
