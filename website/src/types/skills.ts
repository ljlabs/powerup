/**
 * Core types for the Claude Skills Storefront
 */

/** Basic skill metadata for listings */
export interface SkillMeta {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  files: string[];
  category?: string;
  language?: string;
  complexity?: string;
  author?: string;
  version?: string;
  icon?: string;
  repo?: string;
  color?: string;
  stars?: number;
  downloads?: number;
  rating?: number;
  featured?: boolean;
  imageUrl?: string;
  backgroundColor?: string;
  readme?: string;
  features?: string[];
  useCommand?: string;
  skillFiles?: SkillFile[];
}

/** File information for the code viewer */
export interface SkillFile {
  name: string;
  size: string;
  lastModified: string;
  content: string | null;
  isBinary?: boolean;
  url?: string;
}

/** Category for browsing */
export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
}

/** Skill card data for library */
export interface SkillCard {
  id: string;
  name: string;
  description: string;
  version: string;
  icon: string;
  stars: number;
  downloads: number;
  language: string;
  color: string;
  category?: string;
}

/** Skill card data for featured section */
export interface FeaturedSkill {
  id: string;
  name: string;
  description: string;
  rating: number;
  version: string;
  imageUrl?: string;
  backgroundColor: string;
}

/** Filter state for the gallery page */
export interface FilterState {
  type: string | null;
  complexity: string[];
  runtime: string | null;
}

/** Filter options available in the sidebar */
export interface FilterOptions {
  types: string[];
  complexities: string[];
  runtimes: { name: string; color: string }[];
}
