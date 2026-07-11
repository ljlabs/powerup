import { useState } from "react";
import { getFilterOptions } from "../../services/filterService";
import type { FilterState } from "../../types/skills";

interface Props {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onClearAll?: () => void;
}

const defaultFilters: FilterState = {
  type: null,
  complexity: [],
  runtime: null,
};

export default function FilterSidebar({
  initialFilters = defaultFilters,
  onFilterChange,
  onClearAll,
}: Props) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const filterOptions = getFilterOptions();

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    onFilterChange?.(next);
  };

  const clearAll = () => {
    const next = { type: null, complexity: [], runtime: null };
    setFilters(next);
    onClearAll?.();
  };

  const toggleComplexity = (c: string) => {
    const next = filters.complexity.includes(c)
      ? filters.complexity.filter((x) => x !== c)
      : [...filters.complexity, c];
    update({ complexity: next });
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 space-y-10 h-fit sticky top-32">
      <div className="p-6 bg-surface-container border-2 border-on-background rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
        <h3 className="font-headline-md text-headline-md mb-6">Filters</h3>

        <div className="space-y-6">
          {/* Type */}
          <div>
            <span className="font-label-bold text-label-bold block mb-4">Type</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.types.map((t) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-full border-2 border-on-background font-label-sm text-label-sm transition-all ${
                    filters.type === t
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : "bg-surface-container-lowest hover:bg-tertiary-container"
                  }`}
                  onClick={() => update({ type: filters.type === t ? null : t })}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <span className="font-label-bold text-label-bold block mb-4">Complexity</span>
            <div className="flex flex-col gap-2">
              {filterOptions.complexities.map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-2 border-on-background text-tertiary accent-tertiary"
                    checked={filters.complexity.includes(c)}
                    onChange={() => toggleComplexity(c)}
                  />
                  <span className="font-body-md text-body-md">{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Runtime */}
          <div>
            <span className="font-label-bold text-label-bold block mb-4">Runtime</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.runtimes.map((r) => (
                <button
                  key={r.name}
                  className={`px-3 py-1 rounded-full border-2 border-on-background font-label-sm text-label-sm hover:-translate-y-0.5 transition-all ${
                    filters.runtime === r.name ? r.color : "bg-surface-container-lowest"
                  }`}
                  onClick={() => update({ runtime: filters.runtime === r.name ? null : r.name })}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="w-full mt-10 py-3 bg-brand-yellow border-2 border-on-background rounded-xl font-label-bold text-label-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] active:translate-y-0.5 active:shadow-none transition-all"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
