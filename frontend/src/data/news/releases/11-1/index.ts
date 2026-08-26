import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `11.1`,
  version_title: `Axon Ivy 11.1`,
  slogan: `Workflow Statistic API`,
  release_date: new Date(`2023-05-03`),
  migration_guide_url: `/doc/11.1/en/axonivy/migration/index.html`,
  overview: [
    "New blazing-fast REST API delivers workflow statistics with complex aggregations (buckets and metrics) over cases and tasks.",
    "Next Generation Inscription View streamlines process configuration.",
    "Adds Azure AD user property synchronization and a News widget for Portal Dashboards.",
    "Continued improvements to the Engine Cockpit.",
  ],
  sections: sections,
};

export default release;
