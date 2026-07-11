import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/features/FilterSidebar";
import SkillsGrid from "../components/features/SkillsGrid";
import SearchBar from "../components/ui/SearchBar";
import type { FilterState } from "../components/features/FilterSidebar";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    type: null,
    complexity: [],
    runtime: null,
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <FilterSidebar
        initialFilters={filters}
        onFilterChange={setFilters}
        onClearAll={() =>
          setFilters({ type: null, complexity: [], runtime: null })
        }
      />
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <SearchBar placeholder="Search skills..." size="md" />
        </div>
        <SkillsGrid onClick={(id) => navigate(`/skills/${id}`)} />
      </div>
    </div>
  );
}
