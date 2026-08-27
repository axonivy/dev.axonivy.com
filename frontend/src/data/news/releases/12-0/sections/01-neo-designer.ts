import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `NEO Designer`,
  anchor: `neo`,
  content: [
    {
      type: `paragraph`,
      text: `We are excited to introduce the new NEO Designer, a streamlined, web-based low-code platform for rapid application development. It provides essential features to simplify task automation, reduce complexity, and deploy scalable applications efficiently.`,
    },

    {
      type: `list`,
      items: [
        {
          term: `Enhanced Form and Process Editors`,
          text: `Upgraded Form Editor for intuitive design and a Process Editor with real-time animation for workflow visualization, along with an integrated browser for reviewing and simulating applications before deployment.`,
        },
        {
          term: `Data Class and Variable Editors`,
          text: `Includes a Data Class Editor for visualizing data and a Variable Editor that supports the import of variables across projects, streamlining complex management.`,
        },
        {
          term: `Deployment and Market Integration`,
          text: `Deploy projects directly to the Axon Ivy engine and access the Axon Ivy Market to browse and install connectors and demo workflows within the platform.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `With enhanced usability, seamless workspace management and robust integration capabilities, NEO Designer enables business users to build and maintain scalable applications with ease.`,
    },
  ],
  links: [
    {
      label: `NEO Designer`,
      url: `/doc/12.0/designer-guide`,
    },
  ],
  images: [
    `12.0/neo-designer/01-welcome-page.png`,
    `12.0/neo-designer/02-overview.png`,
    `12.0/neo-designer/03-processes.png`,
    `12.0/neo-designer/04-process.png`,
    `12.0/neo-designer/05-data-class.png`,
    `12.0/neo-designer/06-form.png`,
    `12.0/neo-designer/07-animation.gif`,
  ],
};

export default section;
