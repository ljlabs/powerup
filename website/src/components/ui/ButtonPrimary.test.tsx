import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonPrimary from "./ButtonPrimary";

describe("ButtonPrimary", () => {
  it("renders children", () => {
    render(<ButtonPrimary>Click me</ButtonPrimary>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ButtonPrimary onClick={onClick}>Go</ButtonPrimary>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    const onClick = vi.fn();
    render(<ButtonPrimary onClick={onClick} disabled>Go</ButtonPrimary>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<ButtonPrimary size="sm">Sm</ButtonPrimary>);
    expect(screen.getByRole("button").className).toContain("px-4");

    rerender(<ButtonPrimary size="md">Md</ButtonPrimary>);
    expect(screen.getByRole("button").className).toContain("px-6");

    rerender(<ButtonPrimary size="lg">Lg</ButtonPrimary>);
    expect(screen.getByRole("button").className).toContain("px-8");
  });
});
