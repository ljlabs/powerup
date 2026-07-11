import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonSecondary from "./ButtonSecondary";

describe("ButtonSecondary", () => {
  it("renders children", () => {
    render(<ButtonSecondary>Click me</ButtonSecondary>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ButtonSecondary onClick={onClick}>Go</ButtonSecondary>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<ButtonSecondary disabled>Go</ButtonSecondary>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<ButtonSecondary size="sm">Sm</ButtonSecondary>);
    expect(screen.getByRole("button").className).toContain("px-4");

    rerender(<ButtonSecondary size="md">Md</ButtonSecondary>);
    expect(screen.getByRole("button").className).toContain("px-6");

    rerender(<ButtonSecondary size="lg">Lg</ButtonSecondary>);
    expect(screen.getByRole("button").className).toContain("px-8");
  });
});
