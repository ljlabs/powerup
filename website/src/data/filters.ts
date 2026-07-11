import type { FilterOptions } from "../types/skills";

export const filterOptions: FilterOptions = {
  types: ["Tools", "Prompts", "Configs"],
  complexities: ["Beginner", "Intermediate", "Advanced"],
  runtimes: [
    { name: "TypeScript", color: "bg-[#C3E8FF]" },
    { name: "Python", color: "bg-[#D1FADF]" },
    { name: "JSON", color: "bg-[#FEE4E2]" },
  ],
};
