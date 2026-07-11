import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const sizes = {
  sm: "px-4 py-2 text-label-bold",
  md: "px-6 py-3 text-label-bold",
  lg: "px-8 py-4 text-headline-md",
};

export default function ButtonPrimary({
  children,
  onClick,
  size = "md",
  disabled = false,
}: Props) {
  return (
    <button
      className={`bg-brand-yellow border-2 border-on-background rounded-xl font-label-bold ${sizes[size]} shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
