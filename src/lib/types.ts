export type Project = {
  id: string;
  slug: string;
  title: string;
  role: string;
  timeline: string;
  year: string;
  team: string;
  company?: string | null;
  link?: string | null;
  cover: string;
  /** JSON string array of chips, e.g. '["Reviews","Widgets"]' */
  tags: string;
  description: string;
  sortOrder: number;
};

export function parseTags(tags: string): string[] {
  try {
    const arr = JSON.parse(tags);
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}
