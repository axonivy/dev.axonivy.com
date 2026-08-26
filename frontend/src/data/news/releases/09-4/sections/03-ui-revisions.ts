import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `UI Revisions`,
  anchor: `ui-revision`,
  paragraphs: [
    `We refurbished our general look and feel with a new PrimeFaces version, a new default theme and a completely new way to brand an Axon Ivy Engine for your company.`,
  ],
  features: [
    {
      term: `PrimeFaces 11`,
      description: `We updated from PrimeFaces 7 to 11, which means a lot of new and updated widgets. Be aware of our separate PrimeFaces Migration-Guide.`,
    },
    {
      term: `Freya Theme`,
      description: `We also provide the Freya Theme as the new default theme for your HTML Dialogs. Its fresh look also supports dark mode and of course we updated the Dev-Workflow-UI and the Engine Cockpit to use this new theme.`,
    },
    {
      term: `Branding`,
      description: `There is a completely new way to brand an Axon Ivy Engine with the colors and logo of your company, without the need to change the Axon Ivy Portal standard.`,
    },
  ],
  links: [
    {
      label: `PF 11 Migration Notes`,
      url: `/doc/9.4/axonivy/migration/migration-notes-94.html#primefaces-11`,
    },
    {
      label: `Freya Theme`,
      url: `/doc/9.4/designer-guide/user-interface/user-dialogs/html-dialog-themes.html#freya-themes`,
    },
    {
      label: `Branding`,
      url: `/doc/9.4/designer-guide/user-interface/branding/index.html`,
    },
  ],
  images: [
    `9.4/ui-revisions/01-cockpit.png`,
    `9.4/ui-revisions/02-cockpit-branding.png`,
    `9.4/ui-revisions/03-portal-branding.png`,
  ],
  code_sample: null,
};

export default section;
