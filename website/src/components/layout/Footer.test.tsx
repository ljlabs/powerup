import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getAllByText("Claude Skills").length).toBeGreaterThanOrEqual(1);
  });

  it("renders copyright text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/2024 Claude Skills Storefront/)).toBeInTheDocument();
  });

  it("renders GitHub and Documentation links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });
});
