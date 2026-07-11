import type { SkillMeta } from "../types";

interface Props {
  skill: SkillMeta;
}

export default function SkillDetail({ skill }: Props) {
  return (
    <div className="max-w-3xl">
      <div className="bg-white border-2 border-on-background rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
        <h1 className="font-headline-xl text-headline-xl">{skill.name}</h1>
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
          {skill.description}
        </p>

        {skill.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="text-label-sm bg-surface-container px-3 py-1 rounded-full border-2 border-on-background font-label-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="font-headline-md text-headline-md mb-3">Files</h2>
          <div className="bg-surface-container border-2 border-on-background rounded-xl p-4">
            <ul className="list-disc list-inside text-body-md text-on-surface-variant font-body-md">
              {skill.files.map((f) => (
                <li key={f} className="py-1">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
