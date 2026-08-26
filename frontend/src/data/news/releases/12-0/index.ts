import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `12.0`,
  version_title: `Axon Ivy 12.0`,
  slogan: `NEO - The all new Low Code Editor`,
  release_date: new Date(`2024-11-28`),
  migration_guide_url: `/doc/12.0/en/axonivy/migration/index.html`,
  overview: [
    "Introduces the NEO Designer, a streamlined, web-based low-code platform for rapid application development.",
    "New AI Assistant in the Portal supports document search, task, and process management as a virtual partner.",
    "Adds Process Analytics and Axon Ivy IDP (Intelligent Document Processing).",
    "Also includes a new Form/Data Class/Variable Editor, enhanced CORE functionality, and a mobile app.",
  ],
  sections: sections,
};

export default release;
