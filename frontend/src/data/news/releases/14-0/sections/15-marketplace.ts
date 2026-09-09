import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Marketplace`,
  anchor: `marketplace`,
  content: [
    {
      type: `paragraph`,
      text: `The Axon Ivy Marketplace expands with new connectors, components, demos, and a major update to the CMS Live Editor, making it easier to connect Ivy with the tools your business already relies on.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `New connectors`,
          text: `New integrations for Stripe, Slack, IBM MQ, Keycloak, GitHub, Sproof digital signatures, and email handling linked to Ivy cases.`,
        },
        {
          term: `CMS Live Editor 2.0`,
          text: `Business users can edit and translate content directly at runtime, with instant publishing, validation, undo and reset, file uploads, and export to ZIP, Excel, or YAML.`,
        },
        {
          term: `New components and demos`,
          text: `New building blocks and examples include case-progress visualization, CAPTCHA protection, ready-made patterns, and modern Java-based load testing.`,
        },
        {
          term: `Connector improvements`,
          text: `Kafka and DocuWare connectors receive additional capabilities.`,
        },
        {
          term: `Marketplace website`,
          text: `Smarter search, clearer categories, refreshed logos, full German localization, and a smoother workflow for building and publishing extensions.`,
        },
      ],
    },
  ],
  links: [],
  images: [
    `14.0/marketplace/01-cms-editor.png`,
    `14.0/marketplace/02-market.png`,
  ],
};

export default section;
