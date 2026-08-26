import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `13.1`,
  version_title: `Axon Ivy 13.1`,
  slogan: `Improved editors and views, multilingual tooling, and a fully previewable UI experience`,
  release_date: new Date(`2025-06-06`),
  migration_guide_url: `/doc/13.1/en/axonivy/migration/index.html`,
  overview: [
    "Dialog Preview returns with a more stable, accurate implementation for real-time rendering and direct navigation to elements.",
    "NEO Designer is now fully available in German, broadening accessibility for more users.",
    "Portal gains Japanese language support alongside new statistics capabilities.",
    "Also includes CMS Editor and keyboard support improvements, multiple task responsibles, and Marketplace updates.",
  ],
  sections: sections,
};

export default release;
