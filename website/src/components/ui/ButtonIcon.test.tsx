import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonIcon from "./ButtonIcon";

describe("ButtonIcon", () => {
  it("renders the icon text", () => {
    render(<ButtonIcon icon="star" />);
    expect(screen.getByText("star")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ButtonIcon icon="star" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<ButtonIcon icon="star" size="sm" />);
    expect(screen.getByRole("button").className).toContain("p-2");

    rerender(<ButtonIcon icon="star" size="md" />);
    expect(screen.getByRole("button").className).toContain("p-3");

    rerender(<ButtonIcon icon="star" size="lg" />);
    expect(screen.getByRole("button").className).toContain("p-4");
  });

  it("applies additional className", () => {
    render(<ButtonIcon icon="star" className="extra-class" />);
    expect(screen.getByRole("button").className).toContain("extra-class");
  });
});
