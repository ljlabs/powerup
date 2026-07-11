import type { FilterOptions, FilterState } from "../types/skills";
import { filterOptions } from "../data/filters";

/**
 * Get all available filter options
 */
export function getFilterOptions(): FilterOptions {
  return filterOptions;
}

/**
 * Get type filter options
 */
export function getTypeFilters(): string[] {
  return filterOptions.types;
}

/**
 * Get complexity filter options
 */
export function getComplexityFilters(): string[] {
  return filterOptions.complexities;
}

/**
 * Get runtime filter options
 */
export function getRuntimeFilters(): { name: string; color: string }[] {
  return filterOptions.runtimes;
}

/**
 * Create a default filter state
 */
export function createDefaultFilterState(): FilterState {
  return {
    type: null,
    complexity: [],
    runtime: null,
  };
}

/**
 * Validate and normalize a filter state
 */
export function normalizeFilterState(filters: FilterState): FilterState {
  return {
    type: filters.type || null,
    complexity: Array.isArray(filters.complexity) ? filters.complexity : [],
    runtime: filters.runtime || null,
  };
}

/**
 * Check if filters are active (non-default)
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.type !== null ||
    filters.complexity.length > 0 ||
    filters.runtime !== null
  );
}
