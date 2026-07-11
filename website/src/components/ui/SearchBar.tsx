import { useState } from "react";

interface Props {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  showButton?: boolean;
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void;
}

const sizes = {
  sm: {
    wrapper: "h-10",
    input: "pl-9 pr-4 text-body-md flex-1",
    icon: "left-2.5 !text-lg",
    button: "hidden",
  },
  md: {
    wrapper: "h-12",
    input: "pl-10 pr-4 text-body-md flex-1",
    icon: "left-3 !text-xl",
    button: "hidden",
  },
  lg: {
    wrapper: "h-16",
    input: "pl-14 pr-4 text-headline-md flex-1",
    icon: "left-4 !text-3xl",
    button: "",
  },
};

export default function SearchBar({
  placeholder = "Search skills...",
  size = "md",
  showButton = false,
  onSearch,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const s = sizes[size];

  const border = size === "lg" ? "border-4" : "border-2";
  const rounding = size === "lg" ? "rounded-2xl" : "rounded-xl";
  const shadow =
    size === "lg"
      ? "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] focus:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]"
      : "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]";

  const containerClasses = size === "lg" ? "flex items-center" : "";

  return (
    <div className={`relative w-full ${containerClasses}`}>
      <span
        className={`material-symbols-outlined absolute ${s.icon} top-1/2 -translate-y-1/2 text-on-background pointer-events-none`}
      >
        search
      </span>
      <input
        className={`w-full ${s.wrapper} ${s.input} bg-white ${border} border-on-background ${rounding} font-headline-md focus:ring-0 focus:border-on-background ${shadow} transition-all outline-none`}
        placeholder={placeholder}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch?.(query);
        }}
      />
      {showButton && size === "lg" && (
        <button
          className="bg-brand-yellow px-6 py-2 border-2 border-on-background rounded-xl font-label-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 transition-all active:translate-y-0.5 active:shadow-none ml-3 flex-shrink-0"
          onClick={() => onSearch?.(query)}
        >
          Search
        </button>
      )}
    </div>
  );
}