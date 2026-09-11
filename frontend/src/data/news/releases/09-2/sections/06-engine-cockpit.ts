import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engine-cockpit92`,
  content: [
    {
      type: `paragraph`,
      text: `You want a refreshed look of your well-known and beloved Engine Cockpit? You want to have a live overview of your running services? That's what we want too, so here we go:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Live Stats`,
          text: `An easy way to get an overview of your running services and system, by opening the new sidebar.`,
        },
        {
          term: `Fresh Look`,
          text: `New icons, some adjusted colors and a few polished edges make the Engine Cockpit look even better.`,
        },
        {
          term: `New Features`,
          text: `New views (like Backend API, Licence, Web Server), give you more power over your running Engine.`,
        },
        {
          term: `Other Improvements`,
          text: `Many other improvements, like the improved Applications overview, make your live easier.`,
        },
      ],
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
};

export default section;
