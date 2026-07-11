import { Link } from "react-router-dom";
import type { SkillMeta } from "../types";

interface Props {
  skill: SkillMeta;
}

export default function SkillCard({ skill }: Props) {
  return (
    <Link
      to={`/skills/${skill.slug}`}
      className="block rounded-2xl border-2 border-on-background p-6 bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all"
    >
      <h3 className="font-headline-md text-headline-md">{skill.name}</h3>
      <p className="mt-2 text-on-surface-variant font-body-md text-body-md line-clamp-2">
        {skill.description}
      </p>
      {skill.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="text-label-sm bg-surface-container px-2 py-1 rounded-full border border-on-background font-label-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
