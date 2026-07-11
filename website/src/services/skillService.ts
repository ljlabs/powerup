import type { SkillMeta } from "../types/skills";
import { detailedSkills } from "../data/skills";

/**
 * Get all detailed skills (for the skill detail pages)
 */
export function getAllDetailedSkills(): SkillMeta[] {
  return detailedSkills;
}

/**
 * Get a skill by its slug
 */
export function getSkillBySlug(slug: string): SkillMeta | undefined {
  return detailedSkills.find((skill) => skill.slug === slug);
}

/**
 * Search skills by query string
 * Searches across name, description, tags, and author
 */
export function searchSkills(query: string): SkillMeta[] {
  if (!query || query.trim().length === 0) {
    return detailedSkills;
  }

  const lowerQuery = query.toLowerCase();

  return detailedSkills.filter((skill) => {
    const searchableText = [
      skill.name,
      skill.description,
      skill.author,
      ...(skill.tags || []),
      ...(skill.features || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): SkillMeta[] {
  if (!category) {
    return detailedSkills;
  }

  return detailedSkills.filter((skill) => skill.category === category);
}

/**
 * Get featured skills (top-rated or curated)
 */
export function getFeaturedSkills(): SkillMeta[] {
  // Return a curated subset - in real app this would come from an API
  return detailedSkills.slice(0, 4);
}

/**
 * Filter skills based on filter criteria
 */
export function filterSkills(
  skills: SkillMeta[],
  filters: {
    type?: string | null;
    tags?: string[];
    author?: string;
  }
): SkillMeta[] {
  return skills.filter((skill) => {
    // Filter by type/category
    if (filters.type && skill.category !== filters.type) {
      return false;
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        skill.tags?.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Filter by author
    if (filters.author && skill.author !== filters.author) {
      return false;
    }

    return true;
  });
}
