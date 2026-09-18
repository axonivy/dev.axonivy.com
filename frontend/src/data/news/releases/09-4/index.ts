import type { NewsRelease, NewsSection } from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSection }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSection[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsRelease = {
  id: `9.4`,
  version_title: `Axon Ivy 9.4`,
  slogan: `New process editor`,
  tag: `Archived`,
  release_date: new Date(`2022-09-13`),
  download_url: `/download`,
  release_notes_url: `/doc/9.4/en/axonivy/release-notes`,
  migration_guide_url: `/doc/9.4/en/axonivy/migration/index.html`,
  overview: [
    "New Process Editor makes drawing business processes significantly easier.",
    "Individual Dashboards let users personalize the Portal with custom welcome screens and task/case lists.",
    "Multiple Applications Context allows defining security boundaries across applications.",
    "Also includes a new CMS, Azure AD support, multi-lingual workflows, and a new process file format.",
  ],
  sections: sections,
};

export default release;
