interface Skill {
  id: string;
  name: string;
  description: string;
  version: string;
  icon: string;
  stars: number;
  downloads: number;
  language: string;
  color: string;
}

interface Props {
  skill: Skill;
  onClick?: (id: string) => void;
}

const languageColors: Record<string, string> = {
  Python: "bg-[#D1FADF]",
  TypeScript: "bg-[#C3E8FF]",
  Prompt: "bg-[#EBE9FE]",
  JSON: "bg-[#FFE4E1]",
};

export default function SkillCardLibrary({ skill, onClick }: Props) {
  return (
    <div
      className={`${skill.color} border-2 border-on-background rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all cursor-pointer`}
      onClick={() => onClick?.(skill.id)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-white border-2 border-on-background rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
          <span className="material-symbols-outlined text-on-background">
            {skill.icon}
          </span>
        </div>
        <span className="px-2 py-1 bg-white border-2 border-on-background rounded-full font-label-sm text-label-sm">
          v{skill.version}
        </span>
      </div>

      <h3 className="font-headline-md text-headline-md mb-2">{skill.name}</h3>
      <p className="font-body-md text-body-md mb-6 text-on-surface-variant line-clamp-2">
        {skill.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-label-bold text-label-bold">
            <span className="material-symbols-outlined !text-sm">star</span>
            {skill.stars >= 1000
              ? `${(skill.stars / 1000).toFixed(1)}k`
              : skill.stars}
          </div>
          <div className="flex items-center gap-1 font-label-bold text-label-bold">
            <span className="material-symbols-outlined !text-sm">download</span>
            {skill.downloads >= 1000
              ? `${(skill.downloads / 1000).toFixed(1)}k`
              : skill.downloads}
          </div>
        </div>
        <span
          className={`px-2 py-1 border-2 border-on-background rounded-lg ${
            languageColors[skill.language] || "bg-white"
          } font-label-sm text-label-sm`}
        >
          {skill.language}
        </span>
      </div>
    </div>
  );
}
