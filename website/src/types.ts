export interface SkillFile {
  name: string;
  size: string;
  lastModified: string;
  content: string;
}

export interface SkillMeta {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  files: string[];
  author?: string;
  version?: string;
  icon?: string;
  readme?: string;
  features?: string[];
  useCommand?: string;
  skillFiles?: SkillFile[];
}
