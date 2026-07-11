import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
}

const defaultCategories: Category[] = [
  { id: "tools", name: "MCP Tools", icon: "robot_2", bgColor: "bg-accent-mint" },
  { id: "prompts", name: "Prompts", icon: "description", bgColor: "bg-accent-sky" },
  { id: "workflows", name: "Workflows", icon: "bolt", bgColor: "bg-accent-lavender" },
  { id: "data", name: "Data Agents", icon: "bar_chart", bgColor: "bg-accent-apricot" },
];

interface Props {
  categories?: Category[];
}

export default function CategoryGrid({
  categories = defaultCategories,
}: Props) {
  return (
    <section className="mb-16">
      <h2 className="font-headline-lg text-headline-lg mb-10">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/skills?category=${cat.id}`}
            className={`group flex flex-col items-center justify-center gap-4 p-10 ${cat.bgColor} border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none transition-all`}
          >
            <div className="w-16 h-16 bg-white border-2 border-on-background rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span
                className="material-symbols-outlined !text-4xl text-on-background"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {cat.icon}
              </span>
            </div>
            <span className="font-label-bold text-on-background">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
