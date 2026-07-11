import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import TopNavBar from "./TopNavBar";

describe("TopNavBar", () => {
  it("renders Home and Library links", () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
  });

  it("renders the Sign In button", () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders the hamburger menu on mobile", () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );
    expect(screen.getByText("menu")).toBeInTheDocument();
  });

  it("highlights Home when currentPage is home", () => {
    render(
      <MemoryRouter>
        <TopNavBar currentPage="home" />
      </MemoryRouter>
    );
    const homeLink = screen.getByText("Home");
    expect(homeLink.className).toContain("border-tertiary-fixed-dim");
  });

  it("highlights Library when currentPage is library", () => {
    render(
      <MemoryRouter>
        <TopNavBar currentPage="library" />
      </MemoryRouter>
    );
    const libraryLink = screen.getByText("Library");
    expect(libraryLink.className).toContain("border-tertiary-fixed-dim");
  });
});
