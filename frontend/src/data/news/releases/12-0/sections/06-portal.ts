import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Portal`,
  anchor: `portal`,
  content: [
    {
      type: `paragraph`,
      text: `Welcome to the next level of productivity and efficiency with the release of Axon Ivy Portal LTS 12! This version marks a significant milestone, combining all the powerful features and enhancements from the 11.x Leading Edge releases into one robust, stable LTS version. With LTS 12, we’re delivering the most intuitive, accessible, and customizable portal experience yet.`,
    },
    {
      type: `heading`,
      text: `Features Included from Leading Edge Versions`,
    },
    {
      type: `paragraph`,
      text: `LTS 12 builds upon the innovations and optimizations introduced in previous versions, including:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `<a href="/news/11.1#portal">Axon Ivy Portal 11.1</a>`,
          text: `Introduction of the News Widget, improved responsiveness across devices, and customizable external links based on permissions.`,
        },
        {
          term: `<a href="/news/11.2#portal">Axon Ivy Portal 11.2</a>`,
          text: `Notifications, lazy loading for task and case lists, AI translations, import and export functions for dashboards, and enhanced accessibility.`,
        },
        {
          term: `<a href="/news/11.3#portal">Axon Ivy Portal 11.3</a>`,
          text: `Enhanced complex filters, new statistic charts, quick search, and the full open-sourcing of the portal.`,
        },
      ],
    },
    {
      type: `heading`,
      text: `Further Improvements`,
    },
    {
      type: `paragraph`,
      text: `Beyond the well-known features from versions 11.1 to 11.3, LTS 12 brings additional enhancements:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Optimized Navigation and Interface`,
          text: `The user interface has been modernized for efficiency. Customizable top-level navigation allows direct access to personalized dashboards.`,
        },
        {
          term: `Advanced Widget Functionality`,
          text: `Real-time notifications, interactive widgets, and an expanded statistics system facilitate seamless task and case management in a structured environment.`,
        },
        {
          term: `Accessibility Upgrades`,
          text: `Improvements in contrast, layouts, and keyboard navigation increase usability for users of all abilities.`,
        },
        {
          term: `Expanded Statistics Widgets`,
          text: `LTS 12 includes a variety of new statistics widgets, offering insights into tasks, priorities, case categories, and more, powered by Elasticsearch.`,
        },
        {
          term: `Open Source`,
          text: `With LTS 12, we’re thrilled to announce that the Axon Ivy Portal is now fully open source, inviting developers worldwide to explore, innovate, and contribute to the portal’s evolution.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Portal`,
      url: `/doc/12.0/portal-guide/index.html`,
    },
  ],
  images: [
    `12.0/portal/01-new-design.png`,
    `12.0/portal/02-charts.png`,
    `12.0/portal/03-chart-config.png`,
  ],
};

export default section;
