import type { Category } from "../types/skills";
import { categories } from "../data/categories";

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Get a category by ID
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

/**
 * Get category by name (case-insensitive)
 */
export function getCategoryByName(name: string): Category | undefined {
  const lowerName = name.toLowerCase();
  return categories.find((cat) => cat.name.toLowerCase() === lowerName);
}
