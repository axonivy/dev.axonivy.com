export interface NewsListItem {
  term?: string;
  text: string;
  items?: NewsListItem[];
}

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: NewsListItem[] }
  | { type: "code"; code: string; language?: string }
  | { type: "heading"; text: string };

export interface NewsLink {
  label: string;
  url: string;
}

export interface NewsSection {
  heading: string;
  anchor: string | null;
  content: NewsBlock[];
  links: NewsLink[];
  images: string[];
}

export interface NewsRelease {
  id: string;
  version_title: string;
  slogan: string | null;
  tag: "Long Term Support" | "Leading Edge" | "Archived";
  release_date: Date;
  download_url: string;
  release_notes_url: string;
  migration_guide_url: string;
  overview: string[];
  sections: NewsSection[];
}

const modules = import.meta.glob<{ default: NewsRelease }>(
  "./releases/*/index.ts",
  {
    eager: true,
  },
);

export const news: NewsRelease[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => b.release_date.getTime() - a.release_date.getTime());
