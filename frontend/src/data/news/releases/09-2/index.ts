import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `9.2`,
  version_title: `Axon Ivy 9.2`,
  slogan: `We are open!`,
  tag: `Archived`,
  release_date: new Date(`2021-04-06`),
  download_url: `/download`,
  release_notes_url: `/doc/9.2/en/axonivy/release-notes`,
  migration_guide_url: `/doc/9.2/en/axonivy/migration/index.html`,
  overview: [
    "REST services are now documented in OpenAPI format by default, easing cross-system integration.",
    "Refreshed Market offers connectors to popular services like Microsoft Office, DocuSign, and Twitter.",
    "New Migration Wizard simplifies running Engine updates.",
    "Also includes personalized process icons, a refreshed Engine Cockpit, and Mac OS Designer leaving beta.",
  ],
  sections: sections,
};

export default release;
