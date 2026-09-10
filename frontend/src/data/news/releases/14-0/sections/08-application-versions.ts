import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Application Versions`,
  anchor: `application-versions`,
  content: [
    {
      type: `paragraph`,
      text: `Application Versions introduce a new foundation for application-level versioning and lifecycle management. Reducing the complexity of project dependencies.`,
    },
    { type: `paragraph`, text: `**Key capabilities:**` },
    {
      type: `list`,
      items: [
        { text: `Application-level version model` },
        { text: `Release-state handling` },
        { text: `Engine Cockpit version visibility` },
        { text: `Migration support for existing Engines` },
        { text: `Zero-downtime deployment foundations` },
      ],
    },
    {
      type: `paragraph`,
      text: `The new model provides a clearer relationship between an application, its deployed versions, its included projects, and their runtime states.`,
    },
  ],
  images: [
    `14.0/application-versions/01-application-version-overview.png`,
    `14.0/application-versions/02-application-version-status.png`,
    `14.0/application-versions/03-cockpit-applications.png`,
    `14.0/application-versions/04-cockpit-application.png`,
    `14.0/application-versions/05-cockpit-application-version.png`,
    `14.0/application-versions/06-cockpit-project.png`,
  ],
};

export default section;
