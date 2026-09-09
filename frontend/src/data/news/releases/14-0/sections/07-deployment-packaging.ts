import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Deployment & Packaging`,
  anchor: `deployment-packaging`,
  content: [
    {
      type: `paragraph`,
      text: `Deployment capabilities are aligned with the Application Version model and have been strengthened for more reliable application delivery.
`,
    },
    {
      type: `paragraph`,
      text: `**Key improvements:**`,
    },
    {
      type: `list`,
      items: [
        { text: `More reliable deployments` },
        { text: `Version-pattern-based deployment targets` },
        { text: `Improved Ivy Archive handling` },
        { text: `Application ZIP import/export` },
        { text: `Project archiver improvements` },
        { text: `Engine-side unpacking and conversion workflows` },
      ],
    },
    {
      type: `paragraph`,
      text: `Existing deployment scripts and CI/CD automation should be reviewed when migrating to LTS 14.`,
    },
  ],
  links: [],
  images: [
    `14.0/deployment-packaging/01-deployment-overview.png`,
    `14.0/deployment-packaging/02-deployment-configuration.png`,
  ],
};

export default section;
