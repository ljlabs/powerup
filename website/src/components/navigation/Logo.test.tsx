import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders the brand text", () => {
    render(<Logo />);
    expect(screen.getByText("Claude Skills")).toBeInTheDocument();
  });

  it("renders the extension icon", () => {
    render(<Logo />);
    expect(screen.getByText("extension")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Logo size="sm" />);
    const text = screen.getByText("Claude Skills");
    expect(text.className).toContain("text-sm");

    rerender(<Logo size="lg" />);
    expect(screen.getByText("Claude Skills").className).toContain("text-lg");
  });
});
