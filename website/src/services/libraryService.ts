import type { SkillCard } from "../types/skills";
import { librarySkills } from "../data/skills";

/**
 * Get all library skills for the browse page
 */
export function getAllLibrarySkills(): SkillCard[] {
  return librarySkills;
}

/**
 * Get a library skill by ID
 */
export function getLibrarySkillById(id: string): SkillCard | undefined {
  return librarySkills.find((skill) => skill.id === id);
}

/**
 * Search library skills
 */
export function searchLibrarySkills(query: string): SkillCard[] {
  if (!query || query.trim().length === 0) {
    return librarySkills;
  }

  const lowerQuery = query.toLowerCase();

  return librarySkills.filter((skill) => {
    const searchableText = [skill.name, skill.description, skill.language]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

/**
 * Get library skills by category
 */
export function getLibrarySkillsByCategory(category: string): SkillCard[] {
  if (!category) {
    return librarySkills;
  }

  return librarySkills.filter((skill) => skill.category === category);
}

/**
 * Filter library skills based on multiple criteria
 */
export function filterLibrarySkills(
  skills: SkillCard[],
  filters: {
    type?: string | null;
    complexity?: string[];
    runtime?: string | null;
  }
): SkillCard[] {
  return skills.filter((skill) => {
    // Filter by type/category
    if (filters.type && skill.category !== filters.type.toLowerCase()) {
      return false;
    }

    // Filter by runtime/language
    if (filters.runtime && skill.language !== filters.runtime) {
      return false;
    }

    // Note: complexity is not in the SkillCard type, so we'd need to extend it
    // For now, we just skip complexity filtering
    return true;
  });
}

/**
 * Sort skills by various criteria
 */
export function sortLibrarySkills(
  skills: SkillCard[],
  sortBy: "stars" | "downloads" | "name" = "stars",
  order: "asc" | "desc" = "desc"
): SkillCard[] {
  const sorted = [...skills];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "stars":
        comparison = a.stars - b.stars;
        break;
      case "downloads":
        comparison = a.downloads - b.downloads;
        break;
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Paginate library skills
 */
export function paginateLibrarySkills(
  skills: SkillCard[],
  page: number,
  pageSize: number = 12
): {
  skills: SkillCard[];
  total: number;
  page: number;
  totalPages: number;
} {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedSkills = skills.slice(start, end);

  return {
    skills: paginatedSkills,
    total: skills.length,
    page,
    totalPages: Math.ceil(skills.length / pageSize),
  };
}
