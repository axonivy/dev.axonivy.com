import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `10.0`,
  version_title: `Axon Ivy 10.0`,
  slogan: `All new user experience`,
  tag: `Long Term Support`,
  release_date: new Date(`2022-10-17`),
  download_url: `/download`,
  release_notes_url: `/doc/10.0/en/axonivy/release-notes`,
  migration_guide_url: `/doc/10.0/en/axonivy/migration/index.html`,
  overview: [
    "LTS release consolidating all new features introduced across the 9.x Leading Edge releases.",
    "Delivers a fully refreshed, all-new user experience.",
  ],
  sections: sections,
};

export default release;
