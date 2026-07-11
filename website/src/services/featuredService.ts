import type { FeaturedSkill } from "../types/skills";
import { featuredSkills } from "../data/skills";

/**
 * Get all featured skills
 */
export function getAllFeaturedSkills(): FeaturedSkill[] {
  return featuredSkills;
}

/**
 * Get a featured skill by ID
 */
export function getFeaturedSkillById(id: string): FeaturedSkill | undefined {
  return featuredSkills.find((skill) => skill.id === id);
}

/**
 * Get top-rated featured skills
 */
export function getTopFeaturedSkills(limit: number = 4): FeaturedSkill[] {
  return [...featuredSkills]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
