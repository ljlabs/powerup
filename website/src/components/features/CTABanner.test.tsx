import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CTABanner from "./CTABanner";

describe("CTABanner", () => {
  it("renders the Build Your Own Skill heading", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    expect(screen.getByText("Build Your Own Skill")).toBeInTheDocument();
  });

  it("renders the Get Developer Docs button", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    expect(screen.getByText("Get Developer Docs")).toBeInTheDocument();
  });

  it("renders the Discord section", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    expect(screen.getByText("Join the Discord")).toBeInTheDocument();
    expect(screen.getByText(/50,000\+ creators/)).toBeInTheDocument();
  });

  it("renders the Launch Community link", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    const link = screen.getByText("Launch Community");
    expect(link).toHaveAttribute("href", "https://discord.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("links the skill builder to the gallery", () => {
    render(
      <MemoryRouter>
        <CTABanner />
      </MemoryRouter>
    );
    const link = screen.getByText("Build Your Own Skill").closest("a");
    expect(link).toHaveAttribute("href", "/skills");
  });
});
