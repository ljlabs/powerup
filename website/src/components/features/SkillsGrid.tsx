import SkillCardLibrary from "../cards/SkillCardLibrary";

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

const defaultSkills: Skill[] = [
  {
    id: "python-sandbox",
    name: "Python Sandbox",
    description:
      "Execute complex Python scripts directly within the console environment with full library support.",
    version: "2.4.1",
    icon: "code",
    stars: 1200,
    downloads: 8500,
    language: "Python",
    color: "bg-[#D1FADF]",
  },
  {
    id: "vector-store",
    name: "Vector Store Connect",
    description:
      "Connect your Pinecone or Weaviate indices for semantic search across large documentation sets.",
    version: "1.0.0",
    icon: "database",
    stars: 842,
    downloads: 4100,
    language: "TypeScript",
    color: "bg-[#C3E8FF]",
  },
  {
    id: "svg-designer-lib",
    name: "SVG Designer",
    description:
      "Advanced prompting for generating pixel-perfect icons and illustrations in SVG format.",
    version: "1.2.0",
    icon: "brush",
    stars: 2500,
    downloads: 12000,
    language: "Prompt",
    color: "bg-[#EBE9FE]",
  },
  {
    id: "deepl",
    name: "DeepL Global",
    description:
      "Seamless translation integration for real-time multilingual conversation support.",
    version: "0.9.4",
    icon: "translate",
    stars: 431,
    downloads: 1800,
    language: "JSON",
    color: "bg-[#FFE4E1]",
  },
  {
    id: "data-viz",
    name: "Data Visualizer",
    description:
      "Transforms raw CSV and JSON data into beautiful interactive charts using D3.js and Recharts.",
    version: "3.1.0",
    icon: "auto_graph",
    stars: 3100,
    downloads: 24000,
    language: "TypeScript",
    color: "bg-[#FFF9C4]",
  },
  {
    id: "security-auditor",
    name: "Security Auditor",
    description:
      "Automated vulnerability scanner for smart contracts and modern web application codebases.",
    version: "2.0.2",
    icon: "security",
    stars: 6800,
    downloads: 15200,
    language: "Python",
    color: "bg-[#B9F6CA]",
  },
];

interface Props {
  skills?: Skill[];
  onClick?: (id: string) => void;
  onLoadMore?: () => void;
}

export default function SkillsGrid({ skills = defaultSkills, onClick, onLoadMore }: Props) {
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
        {skills.map((skill) => (
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
