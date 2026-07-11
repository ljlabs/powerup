import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  it("renders children", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Page content</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders the navbar", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByText(/2024 Claude Skills Storefront/)).toBeInTheDocument();
  });

  it("passes currentPage to TopNavBar", () => {
    render(
      <MemoryRouter>
        <Layout currentPage="library">
          <div />
        </Layout>
      </MemoryRouter>
    );
    const libraryLink = screen.getByText("Library");
    expect(libraryLink.className).toContain("border-tertiary-fixed-dim");
  });
});
