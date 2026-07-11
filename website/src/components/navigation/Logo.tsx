interface Props {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: "w-6 h-6", iconText: "!text-base", text: "text-sm" },
  md: { icon: "w-8 h-8", iconText: "!text-lg", text: "text-base" },
  lg: { icon: "w-10 h-10", iconText: "!text-xl", text: "text-lg" },
};

export default function Logo({ size = "md" }: Props) {
  const s = sizes[size];
  return (
    <div className="flex items-center gap-xs">
      <div
        className={`${s.icon} bg-brand-yellow border-2 border-on-background rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]`}
      >
        <span className={`material-symbols-outlined ${s.iconText}`}>extension</span>
      </div>
      <span className={`font-headline-md text-headline-md font-black ${s.text}`}>
        Claude Skills
      </span>
    </div>
  );
}
