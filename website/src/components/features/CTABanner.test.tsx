import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CTABanner from "./CTABanner";

describe("CTABanner", () => {
  it("renders the Publish Your Own Skill heading", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    expect(screen.getByText("Publish Your Own Skill")).toBeInTheDocument();
  });

  it("renders the Read the Docs button", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    expect(screen.getByText("Read the Docs")).toBeInTheDocument();
  });

  it("renders the bug report section", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    expect(screen.getByText("Found a Bug?")).toBeInTheDocument();
    expect(screen.getByText(/Help us improve by filing an issue/)).toBeInTheDocument();
  });

  it("renders the Open an Issue link to GitHub", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    const link = screen.getByText("Open an Issue");
    expect(link).toHaveAttribute("href", "https://github.com/anthropics/claude-code/issues");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("links the publish section to the docs page", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    const link = screen.getByText("Publish Your Own Skill").closest("a");
    expect(link).toHaveAttribute("href", "/docs");
  });
});
