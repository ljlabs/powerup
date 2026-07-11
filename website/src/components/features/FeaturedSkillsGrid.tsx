import { Link } from "react-router-dom";
import SkillCardHome from "../cards/SkillCardHome";
import { getAllFeaturedSkills } from "../../services/featuredService";
import type { FeaturedSkill } from "../../types/skills";

interface Props {
  skills?: FeaturedSkill[];
  onAdd?: (id: string) => void;
}

export default function FeaturedSkillsGrid({ skills: overrideSkills, onAdd }: Props) {
  const allSkills = getAllFeaturedSkills();
  const skills = overrideSkills || allSkills;

  return (
    <section className="mb-16">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg">Featured Skills</h2>
          <p className="font-body-md text-secondary">
            Top picks by our expert curators.
          </p>
        </div>
        <Link
          to="/skills"
          className="font-label-bold text-on-background underline decoration-2 underline-offset-4 hover:text-tertiary transition-colors"
        >
          View All Skills
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <SkillCardHome key={skill.id} skill={skill} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
