import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engine-cockpit92`,
  paragraphs: [
    `You want a refreshed look of your well-known and beloved Engine Cockpit? You want to have a live overview of your running services? That's what we want too, so here we go:`,
  ],
  features: [
    {
      term: `Live Stats`,
      description: `An easy way to get an overview of your running services and system, by opening the new sidebar.`,
    },
    {
      term: `Fresh Look`,
      description: `New icons, some adjusted colors and a few polished edges make the Engine Cockpit look even better.`,
    },
    {
      term: `New Features`,
      description: `New views (like Backend API, Licence, Web Server), give you more power over your running Engine.`,
    },
    {
      term: `Other Improvements`,
      description: `Many other improvements, like the improved Applications overview, make your live easier.`,
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/9.2/engine-guide/tool-reference/engine-cockpit/index.html`,
    },
  ],
  images: [
    `9.2/engine-cockpit/01-applications.png`,
    `9.2/engine-cockpit/02-live-stats.png`,
    `9.2/engine-cockpit/03-licence.png`,
    `9.2/engine-cockpit/04-backend-api.png`,
  ],
  code_sample: null,
};

export default section;
