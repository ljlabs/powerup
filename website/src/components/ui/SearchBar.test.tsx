import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder", () => {
    render(<SearchBar placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<SearchBar onChange={onChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledWith("test");
  });

  it("calls onSearch when pressing Enter", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("query");
  });

  it("shows search button only on lg size with showButton", () => {
    render(<SearchBar size="md" showButton />);
    expect(screen.queryByRole("button", { name: /search/i })).not.toBeInTheDocument();

    render(<SearchBar size="lg" showButton />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("renders search icon", () => {
    render(<SearchBar />);
    expect(screen.getByText("search")).toBeInTheDocument();
  });
});