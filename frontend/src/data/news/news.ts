interface NewsFeature {
  term: string | null;
  description: string;
}

interface NewsLink {
  label: string;
  url: string;
}

export interface NewsSection {
  heading: string;
  anchor: string | null;
  paragraphs: string[];
  features: NewsFeature[];
  links: NewsLink[];
  images: string[];
  code_sample: string | null;
}

export interface NewsRelease {
  id: string;
  version_title: string;
  slogan: string | null;
  release_date: Date;
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
