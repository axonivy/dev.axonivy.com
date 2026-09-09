import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `14.0`,
  version_title: `Axon Ivy 14.0`,
  slogan: `Development, Application model, Deployment, Technology, Operations and AI & developer enablement`,
  tag: `Long Term Support`,
  release_date: new Date(`2026-09-28`),
  download_url: `/download`,
  release_notes_url: `/doc/14.0/en/axonivy/release-notes`,
  migration_guide_url: `/doc/14.0/en/axonivy/migration/index.html`,
  overview: [
    "Development: VS Code PRO Designer, web-based editors, improved HTML Dialog tooling, and unified validation.",
    "Application model: modernized YAML/JSON configuration and more tooling-friendly project formats.",
    "Technology: Java 25, Jakarta EE 11, CDI, PrimeFaces 15, MyFaces 4, Tomcat 11, Jersey 4, Apache CXF 4.2  and updated integration libraries.",
    "AI & developer enablement: AI-assisted tooling, MCP integration, and improved technical documentation.",
  ],
  sections: sections,
};

export default release;
