import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `9.1`,
  version_title: `Axon.ivy Digital Business Platform 9.1`,
  slogan: `Efficient user scaling and simplified Testing`,
  release_date: new Date(`2020-08-05`),
  migration_guide_url: `/doc/9.1/en/axonivy/migration/index.html`,
  overview: [
    "Numerous memory, performance, UI, and API improvements let the engine efficiently serve hundreds of thousands of users.",
    "Simplified testing supports stable rollouts of large changesets with minimal manual effort via CI pipelines.",
    "Portal receives various user experience and UI improvements.",
    "Also includes an isolated web app context and an LDAP & JMX Browser in the Engine Cockpit.",
  ],
  sections: sections,
};

export default release;
