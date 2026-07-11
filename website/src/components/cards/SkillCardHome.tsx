interface Skill {
  id: string;
  name: string;
  description: string;
  rating: number;
  version: string;
  imageUrl?: string;
  backgroundColor: string;
}

interface Props {
  skill: Skill;
  onAdd?: (id: string) => void;
}

export default function SkillCardHome({ skill, onAdd }: Props) {
  return (
    <div className="bg-white border-2 border-on-background rounded-2xl p-4 flex flex-col shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all">
      <div
        className={`relative w-full h-48 ${skill.backgroundColor} rounded-xl border-2 border-on-background overflow-hidden mb-4 flex items-center justify-center`}
      >
        {skill.imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={skill.imageUrl}
            alt={skill.name}
          />
        ) : (
          <span className="material-symbols-outlined !text-6xl text-on-background/30">
            extension
          </span>
        )}
        <div className="absolute top-2 right-2 bg-white border-2 border-on-background rounded-full px-3 py-1 font-label-sm shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center gap-1">
          <span
            className="material-symbols-outlined !text-sm text-tertiary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          {skill.rating}
        </div>
      </div>

      <h3 className="font-headline-md text-headline-md mb-2">{skill.name}</h3>
      <p className="font-body-md text-secondary line-clamp-2 mb-4">
        {skill.description}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-surface-variant">
        <div className="flex gap-2">
          <span className="bg-surface-container px-2 py-0.5 rounded-full text-label-sm border border-on-background">
            v{skill.version}
          </span>
        </div>
        <button
          className="bg-brand-yellow p-2 border-2 border-on-background rounded-xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center transition-all"
          onClick={() => onAdd?.(skill.id)}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
