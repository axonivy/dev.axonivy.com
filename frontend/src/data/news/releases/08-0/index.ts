import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `8.0`,
  version_title: `Axon.ivy Digital Business Platform 8.0`,
  slogan: `Smart, smarter, Axon.ivy Digital Business Platform`,
  release_date: new Date(`2019-12-04`),
  migration_guide_url: `/doc/8.0/migration-notes`,
  overview: [
    "New Engine Cockpit replaces AdminUI with a rich, fully web-based feature set accessible from any browser or mobile device.",
    "Deployment becomes far easier and highly configurable, eliminating manual installation steps.",
    "Portal completely re-styled with many new features.",
    "Also includes a Setup Wizard, Debian Engine Installer, container support, and native Mac/GTK3 development.",
  ],
  sections: sections,
};

export default release;
