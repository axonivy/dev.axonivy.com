import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Portal`,
  anchor: `portal`,
  paragraphs: [
    `Welcome to the next level of productivity and efficiency with the release of Axon Ivy Portal LTS 12! This version marks a significant milestone, combining all the powerful features and enhancements from the 11.x Leading Edge releases into one robust, stable LTS version. With LTS 12, we’re delivering the most intuitive, accessible, and customizable portal experience yet.`,
    `LTS 12 builds upon the innovations and optimizations introduced in previous versions, including:`,
    `Beyond the well-known features from versions 11.1 to 11.3, LTS 12 brings additional enhancements:`,
  ],
  features: [
    {
      term: `Axon Ivy Portal 11.1`,
      description: `Introduction of the News Widget, improved responsiveness across devices, and customizable external links based on permissions.`,
    },
    {
      term: `Axon Ivy Portal 11.2`,
      description: `Notifications, lazy loading for task and case lists, AI translations, import and export functions for dashboards, and enhanced accessibility.`,
    },
    {
      term: `Axon Ivy Portal 11.3`,
      description: `Enhanced complex filters, new statistic charts, quick search, and the full open-sourcing of the portal.`,
    },
    {
      term: `Optimized Navigation and Interface`,
      description: `The user interface has been modernized for efficiency. Customizable top-level navigation allows direct access to personalized dashboards.`,
    },
    {
      term: `Advanced Widget Functionality`,
      description: `Real-time notifications, interactive widgets, and an expanded statistics system facilitate seamless task and case management in a structured environment.`,
    },
    {
      term: `Accessibility Upgrades`,
      description: `Improvements in contrast, layouts, and keyboard navigation increase usability for users of all abilities.`,
    },
    {
      term: `Expanded Statistics Widgets`,
      description: `LTS 12 includes a variety of new statistics widgets, offering insights into tasks, priorities, case categories, and more, powered by Elasticsearch.`,
    },
    {
      term: `Open Source`,
      description: `With LTS 12, we’re thrilled to announce that the Axon Ivy Portal is now fully open source, inviting developers worldwide to explore, innovate, and contribute to the portal’s evolution.`,
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
  code_sample: null,
};

export default section;
