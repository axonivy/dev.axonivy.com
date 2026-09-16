import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Portal`,
  anchor: `portal`,
  content: [
    {
      type: `paragraph`,
      text: `Ivy Portal 14 brings together everything from the 13.1 and 13.2 Leading Edge releases into one stable LTS version, and adds a modernized UI, central menu management, smarter task and case handling, configuration portability, and stronger enterprise readiness.`,
    },
    { type: `heading`, text: `From 13.1 and 13.2` },
    {
      type: `list`,
      items: [
        {
          text: `Custom statistics with condition based coloring, KPI charts and drill down`,
        },
        {
          text: `Pin tasks and cases, Navigation Widget with hidden dashboards`,
        },
        { text: `Side Step Processes and Static Pages` },
        {
          text: `Accessibility upgrades, hardened security, multiple task activators`,
        },
        { text: `Full multilingual and Japanese localization support` },
      ],
    },
    { type: `heading`, text: `New in LTS 14` },
    {
      type: `list`,
      items: [
        {
          term: `Modern UI`,
          text: `Reworked interface on Tabler Icons, PrimeFaces 15 and Jakarta EE`,
        },
        {
          term: `Central Menu Management`,
          text: `Manage navigation, dashboards, links and apps from one place, with grouping and embedding`,
        },
        {
          term: `Smarter Task/Case Handling`,
          text: `Bulk delegation, reworked absence management, Portal Chatbot, direct feedback, visible case IDs, sub-case support, drag and drop document upload`,
        },
        {
          term: `Configuration Portability`,
          text: `Standardized JSON export/import, translated values in multilingual custom charts`,
        },
        {
          term: `Enterprise Readiness`,
          text: `WCAG/VPAT compliance, deeper security scans, improved load testing, regular Portal snapshots`,
        },
        {
          term: `Global Ready`,
          text: `Expanded Japanese translations, reworked permissions and substitute documentation`,
        },
      ],
    },
  ],
  images: [
    `14.0/portal/01-home-darkmode.png`,
    `14.0/portal/02-home.png`,
    `14.0/portal/03-filters.png`,
    `14.0/portal/04-task-view.png`,
    `14.0/portal/05-portal-configuration-dashboard.png`,
    `14.0/portal/06-portal-configuration-sidebar.png`,
    `14.0/portal/07-home-tasks.png`,
    `14.0/portal/08-statistics-configuration.png`,
    `14.0/portal/09-portal-configuration-package-management.png`,
  ],
};

export default section;
