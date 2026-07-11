import { useParams, Link } from "react-router-dom";
import SkillDetail from "../components/SkillDetail";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import { getSkillBySlug } from "../services/skillService";

export default function SkillPage() {
  const { slug } = useParams<{ slug: string }>();
  const skill = slug ? getSkillBySlug(slug) : undefined;

  if (!skill) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white border-2 border-on-background rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-center">
          <span className="material-symbols-outlined !text-6xl text-on-background/30 mb-4">
            search_off
          </span>
          <h1 className="font-headline-lg text-headline-lg mb-4">
            Skill not found
          </h1>
          <Link to="/skills">
            <ButtonSecondary size="md">Back to Library</ButtonSecondary>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        to="/skills"
        className="inline-flex items-center gap-1 font-label-bold text-secondary hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined !text-base">arrow_back</span>
        Back to Library
      </Link>
      <SkillDetail skill={skill} />
    </div>
  );
}
