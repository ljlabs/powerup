interface Props {
  icon: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "p-2 !text-xl",
  md: "p-3 !text-2xl",
  lg: "p-4 !text-3xl",
};

export default function ButtonIcon({
  icon,
  onClick,
  size = "md",
  className = "",
}: Props) {
  return (
    <button
      className={`bg-surface-container-high border-2 border-on-background rounded-xl ${sizes[size]} shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all ${className}`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
