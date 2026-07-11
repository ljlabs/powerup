import { Link } from "react-router-dom";
import SkillCardHome from "../cards/SkillCardHome";

interface Skill {
  id: string;
  name: string;
  description: string;
  rating: number;
  version: string;
  imageUrl?: string;
  backgroundColor: string;
}

const defaultSkills: Skill[] = [
  {
    id: "web-search",
    name: "Web Search MCP",
    description:
      "Enables Claude to search the live web, cite sources, and verify facts in real-time.",
    rating: 4.9,
    version: "1.2",
    backgroundColor: "bg-accent-sky",
  },
  {
    id: "svg-designer",
    name: "SVG Designer",
    description:
      "Instantly convert hand-drawn sketches or descriptions into production-ready SVG code.",
    rating: 4.7,
    version: "2.0",
    backgroundColor: "bg-accent-mint",
  },
  {
    id: "ghostwriter",
    name: "Ghostwriter Agent",
    description:
      "Advanced storytelling tool that maintains complex narrative consistency across long chapters.",
    rating: 5.0,
    version: "3.1",
    backgroundColor: "bg-accent-lavender",
  },
  {
    id: "python-viz",
    name: "Python Data Visualizer",
    description:
      "Generates beautiful Matplotlib and Seaborn charts from messy CSV files in seconds.",
    rating: 4.8,
    version: "1.5",
    backgroundColor: "bg-accent-apricot",
  },
];

interface Props {
  skills?: Skill[];
  onAdd?: (id: string) => void;
}

export default function FeaturedSkillsGrid({ skills = defaultSkills, onAdd }: Props) {
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
