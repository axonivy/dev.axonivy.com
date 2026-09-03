import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default)
  .filter((section): section is NewsSection => Boolean(section));

const release: NewsRelease = {
  id: `9.3`,
  version_title: `Axon Ivy 9.3`,
  slogan: `Scale on demand`,
  tag: `Archived`,
  release_date: new Date(`2021-12-10`),
  download_url: `/download`,
  release_notes_url: `/doc/9.3/en/axonivy/release-notes`,
  migration_guide_url: `/doc/9.3/en/axonivy/migration/index.html`,
  overview: [
    "Engines can now scale on demand, starting new instances to match client load on your preferred container or cloud provider.",
    "Project configuration revised and consolidated into simple, widely supported text formats.",
    "Adds a new dev.workflow.ui, role-based welcome page, and a powerful public API.",
    "Also includes performance and tracing enhancements and an updated Market.",
  ],
  sections: sections,
};

export default release;
