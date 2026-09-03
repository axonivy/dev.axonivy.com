import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `13.2`,
  version_title: `Axon Ivy 13.2`,
  slogan: `Agents, Statistics, Visual Studio Code Extension and Editors`,
  tag: `Leading Edge`,
  release_date: new Date(`2025-12-22`),
  download_url: `/download`,
  release_notes_url: `/doc/13.2/en/axonivy/release-notes`,
  migration_guide_url: `/doc/13.2/en/axonivy/migration/index.html`,
  overview: [
    "Smart Workflow and Smart Core deepen AI-powered process orchestration, extending the existing AI portfolio (IDP, Portal Assistant, LLM connectors).",
    "Portal Statistics Widget Configurator delivers meaningful insights into process and business data in just a few clicks.",
    "VS Code Extension becomes the primary PRO Designer, offering a modern, fast, and extensible development environment.",
    "Also includes a CMS Translation Wizard, database-driven form generation, improved BPMN 2 support, and new Market connectors.",
  ],
  sections: sections,
};

export default release;
