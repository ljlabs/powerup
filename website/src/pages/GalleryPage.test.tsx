import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GalleryPage from "./GalleryPage";

describe("GalleryPage", () => {
  it("renders the filter sidebar", () => {
    render(
      <MemoryRouter>
        <GalleryPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders the skills grid heading", () => {
    render(
      <MemoryRouter>
        <GalleryPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Skill Browse Ledger")).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(
      <MemoryRouter>
        <GalleryPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Search skills...")).toBeInTheDocument();
  });

  it("renders skill cards", () => {
    render(
      <MemoryRouter>
        <GalleryPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Python Sandbox")).toBeInTheDocument();
  });
});
