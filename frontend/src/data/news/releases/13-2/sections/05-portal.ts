import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Portal`,
  anchor: `portal`,
  paragraphs: [
    `Portal 13.2 introduces faster navigation, stronger analytics and more flexible process handling. Improved accessibility, new statistics features and Side Step Processes make daily work smoother, clearer and more efficient.`,
    `And more`,
  ],
  features: [
    {
      term: `Statistics`,
      description: `With the Portal Statistics Widget Configurator, you can create meaningful insights into your process and business data in just a few clicks. Condition-based coloring for instant KPI visibility KPI-based charts using custom fields for tailored analysis Drill-down from charts directly to tasks and cases Preconfigured sample dashboards for fast setup`,
    },
    {
      term: `Accessibility`,
      description: `Improved focus order, enhanced keyboard navigation, optimized ARIA landmarks and better screen reader compatibility. Stronger contrasts, consistent labels and complete alt-text support ensure a modern, WCAG-aligned experience.`,
    },
    {
      term: `Side Step Process`,
      description: `Pause or branch from an active workflow without interrupting the main case. Perfect for clarifications, additional information requests or parallel sub-processes. Fully multilingual and ready for global teams.`,
    },
    {
      term: `Static Pages`,
      description: `Add custom info or help pages directly into the Portal navigation. Fully styled, localizable, permission-controlled and seamlessly integrated into the Portal layout.`,
    },
    {
      term: null,
      description: `Improved stability for inactive browser tabs`,
    },
    { term: null, description: `Fixes for multilingual inconsistencies` },
    {
      term: null,
      description: `Better shortcut handling in info widgets`,
    },
    { term: null, description: `More robust user menu and filters` },
    { term: null, description: `Faster loading for large UI elements` },
    { term: null, description: `Improved case detail handling` },
    {
      term: null,
      description: `Safer streamed content and file deletion workflows`,
    },
  ],
  links: [
    {
      label: `Statistic Chart`,
      url: `https://market.axonivy.com/market-cache/portal/portal-guide/13.2.0-m284/doc/en/portal-user-guide/statistic-chart/index.html`,
    },
    {
      label: `Accessibility`,
      url: `https://market.axonivy.com/market-cache/portal/portal-guide/13.2.0-m284/doc/en/portal-user-guide/accessibility/index.html`,
    },
    {
      label: `Static Pages`,
      url: `https://market.axonivy.com/market-cache/portal/portal-guide/13.2.0-m284/doc/en/portal-developer-guide/static-page/index.html`,
    },
    {
      label: `Portal`,
      url: `/doc/13.2/portal-guide/index.html`,
    },
  ],
  images: [
    `13.2/portal/01-light.png`,
    `13.2/portal/02-dark.png`,
    `13.2/portal/03-statistic-config.png`,
    `13.2/portal/04-statistc-config-colors.png`,
    `13.2/portal/05-statistic-example1.png`,
    `13.2/portal/06-statistic-examples2.png`,
  ],
  code_sample: null,
};

export default section;
