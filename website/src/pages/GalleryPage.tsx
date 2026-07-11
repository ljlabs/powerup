import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/features/FilterSidebar";
import SkillsGrid from "../components/features/SkillsGrid";
import SearchBar from "../components/ui/SearchBar";
import { getAllLibrarySkills, filterLibrarySkills } from "../services/libraryService";
import type { FilterState, SkillCard } from "../types/skills";

function searchSkills(skills: SkillCard[], query: string): SkillCard[] {
  if (!query || query.trim().length === 0) return skills;
  const lower = query.toLowerCase();
  return skills.filter((skill) => {
    return [skill.name, skill.description, skill.language]
      .join(" ")
      .toLowerCase()
      .includes(lower);
  });
}

export default function GalleryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    type: null,
    complexity: [],
    runtime: null,
  });

  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const allSkills = getAllLibrarySkills();

  const filteredSkills = useMemo(() => {
    let result = allSkills;
    result = searchSkills(result, searchQuery);
    result = filterLibrarySkills(result, {
      type: filters.type,
      runtime: filters.runtime,
    });
    return result;
  }, [allSkills, filters, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

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
          <SearchBar
            placeholder="Search skills..."
            size="md"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <SkillsGrid
          skills={filteredSkills}
          onClick={(id) => navigate(`/skills/${id}`)}
        />
      </div>
    </div>
  );
}
