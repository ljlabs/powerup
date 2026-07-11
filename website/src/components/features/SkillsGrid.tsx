import SkillCardLibrary from "../cards/SkillCardLibrary";
import { getAllLibrarySkills } from "../../services/libraryService";
import type { SkillCard } from "../../types/skills";

interface Props {
  skills?: SkillCard[];
  onClick?: (id: string) => void;
  onLoadMore?: () => void;
}

export default function SkillsGrid({ skills, onClick, onLoadMore }: Props) {
  const defaultSkills = getAllLibrarySkills();
  const displaySkills = skills || defaultSkills;

  return (
    <>
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-headline-xl text-headline-xl">Skill Browse Ledger</h1>
          <p className="font-body-lg text-body-lg text-secondary">
            Discover and integrate powerful capabilities into your Claude workflows.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displaySkills.map((skill) => (
          <SkillCardLibrary key={skill.id} skill={skill} onClick={onClick} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button
          className="px-10 py-3 bg-surface-container-high border-2 border-on-background rounded-xl font-headline-md text-headline-md shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none transition-all"
          onClick={onLoadMore}
        >
          Load More Skills
        </button>
      </div>
    </>
  );
}
