import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the main heading", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Give Claude New/)).toBeInTheDocument();
    expect(screen.getByText("Superpowers")).toBeInTheDocument();
  });

  it("renders the NEW VERSION badge", () => {
    render(<HeroSection />);
    expect(screen.getByText("NEW VERSION 2.0")).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(<HeroSection />);
    expect(screen.getByPlaceholderText("Search for tools, prompts, or agents...")).toBeInTheDocument();
  });

  it("renders the robot illustration", () => {
    render(<HeroSection />);
    expect(screen.getByText("smart_toy")).toBeInTheDocument();
  });
});
