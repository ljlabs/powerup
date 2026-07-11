/**
 * Skills data — sourced from the generated manifest.
 *
 * The manifest is produced at build time by scripts/generate-manifest.js
 * and lives at public/skills-manifest.json. This module imports it
 * and exports the three arrays that the service layer consumes.
 */

import type { SkillMeta, SkillCard, FeaturedSkill } from "../types/skills";

// Vite inlines JSON imports at build time — no network fetch needed.
import manifest from "../../public/skills-manifest.json";

const manifestSkills: SkillMeta[] = manifest as SkillMeta[];

/**
 * Detailed skill data for the skill detail page.
 */
export const detailedSkills: SkillMeta[] = manifestSkills;

/**
 * Skills data for the library grid.
 * Maps SkillMeta fields to the SkillCard shape.
 */
export const librarySkills: SkillCard[] = manifestSkills.map((skill) => ({
  id: skill.slug,
  name: skill.name,
  description: skill.description,
  version: skill.version || "0.0.1",
  icon: skill.icon || "extension",
  stars: skill.stars ?? 0,
  downloads: skill.downloads ?? 0,
  language: skill.language || "Unknown",
  color: skill.color || "bg-surface-container",
  category: skill.category,
}));

/**
 * Skills data for the featured section.
 * Only includes skills marked as featured, sorted by rating.
 */
export const featuredSkills: FeaturedSkill[] = manifestSkills
  .filter((skill) => skill.featured)
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  .map((skill) => ({
    id: skill.slug,
    name: skill.name,
    description: skill.description,
    rating: skill.rating ?? 0,
    version: skill.version || "0.0.1",
    imageUrl: skill.imageUrl,
    backgroundColor: skill.backgroundColor || "bg-accent-sky",
  }));
