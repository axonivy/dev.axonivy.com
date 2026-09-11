import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `11.2`,
  version_title: `Axon Ivy 11.2`,
  slogan: `Notifications and Inscriptions`,
  tag: `Archived`,
  release_date: new Date(`2023-12-01`),
  download_url: `/download`,
  release_notes_url: `/doc/11.2/en/axonivy/release-notes`,
  migration_guide_url: `/doc/11.2/en/axonivy/migration/index.html`,
  overview: [
    "New notification framework informs users about events like new tasks across channels (Portal, email, Microsoft Teams).",
    "Inscription view is now integrated directly into the process editor for easier configuration.",
    "Adds lazy loading of Task/Case lists in Portal and numerous Engine Cockpit features.",
    "Also includes CRON-triggered event starts, S3 document store, and JSON schema-based config editors.",
  ],
  sections: sections,
};

export default release;
