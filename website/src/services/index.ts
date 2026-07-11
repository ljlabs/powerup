/**
 * Services layer for the Claude Skills Storefront
 *
 * This module exports all service functions for accessing and manipulating
 * skills data, categories, and filtering logic.
 */

// Types
export * from "../types/skills";

// Skill services
export {
  getAllDetailedSkills,
  getSkillBySlug,
  searchSkills,
  getSkillsByCategory,
  getFeaturedSkills,
  filterSkills,
} from "./skillService";

// Library services
export {
  getAllLibrarySkills,
  getLibrarySkillById,
  searchLibrarySkills,
  getLibrarySkillsByCategory,
  filterLibrarySkills,
  sortLibrarySkills,
  paginateLibrarySkills,
} from "./libraryService";

// Featured services
export {
  getAllFeaturedSkills,
  getFeaturedSkillById,
  getTopFeaturedSkills,
} from "./featuredService";

// Category services
export {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
} from "./categoryService";

// Filter services
export {
  getFilterOptions,
  getTypeFilters,
  getComplexityFilters,
  getRuntimeFilters,
  createDefaultFilterState,
  normalizeFilterState,
  hasActiveFilters,
} from "./filterService";
