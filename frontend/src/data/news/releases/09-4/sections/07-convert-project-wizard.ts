import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Convert Project Wizard`,
  anchor: `migration`,
  content: [
    {
      type: `paragraph`,
      text: `Converting an Axon Ivy project to the latest version and technologies has never been easier.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Convert Project wizard`,
          text: `The revised Convert Project wizard converts Axon Ivy projects to the latest version. But now, it also helps to convert from PrimeFaces 7 to 11 and web service clients from Axis to CXF.`,
        },
        {
          term: `Auto Conversion`,
          text: `The Axon Ivy Engine auto-converts all deployed projects automatically to the latest version.`,
        },
        {
          term: `Java 17`,
          text: `After converting your projects, enjoy the new powerful features of Java 17.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Converting Projects`,
      url: `/doc/9.4/designer-guide/process-modeling/projects/converting.html#converting-projects`,
    },
    {
      label: `Primefaces 11 Migration`,
      url: `/doc/9.4/axonivy/migration/migration-notes-pf11.html#primefaces-11-migration`,
    },
    {
      label: `Drop Axis`,
      url: `/doc/9.4/axonivy/migration/migration-notes-93.html#migrate-93-axis`,
    },
    {
      label: `Java 17`,
      url: `https://docs.oracle.com/en/java/javase/17/`,
    },
  ],
  images: [
    `9.4/project-migration-wizards/01-convert-project.png`,
    `9.4/project-migration-wizards/02-convert-project.png`,
    `9.4/project-migration-wizards/03-convert-project.png`,
  ],
};

export default section;
