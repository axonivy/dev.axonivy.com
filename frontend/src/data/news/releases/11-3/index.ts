import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `11.3`,
  version_title: `Axon Ivy 11.3`,
  slogan: `Variables Editor and Mobile App`,
  tag: `Archived`,
  release_date: new Date(`2024-05-23`),
  download_url: `/download`,
  release_notes_url: `/doc/11.3/en/axonivy/release-notes`,
  migration_guide_url: `/doc/11.3/en/axonivy/migration/index.html`,
  overview: [
    "New Variables Editor simplifies defining dynamic parts within highly configurable workflows.",
    "Completely rewritten Mobile App released for both Android and iOS.",
    "Adds a Business Notification API and a polished Inscription UI.",
    "Also includes a TLS Tester in the Engine Cockpit, plus alpha versions of the Form Editor and VS Code Extension.",
  ],
  sections: sections,
};

export default release;
