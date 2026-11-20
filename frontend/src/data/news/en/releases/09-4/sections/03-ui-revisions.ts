import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `UI Revisions`,
  anchor: `ui-revision`,
  content: [
    {
      type: `paragraph`,
      text: `We refurbished our general look and feel with a new PrimeFaces version, a new default theme and a completely new way to brand an Axon Ivy Engine for your company.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `PrimeFaces 11`,
          text: `We updated from PrimeFaces 7 to 11, which means a lot of new and updated widgets. Be aware of our separate <a href="/doc/9.4/en/axonivy/migration/migration-notes-94.html#primefaces-11">PrimeFaces Migration-Guide</a>.`,
        },
        {
          term: `Freya Theme`,
          text: `We also provide the <a href="https://primeui.store/templates/vue/freya">Freya Theme</a> as the new default theme for your HTML Dialogs. Its fresh look also supports dark mode and of course we updated the <code>Dev-Workflow-UI</code> and the <code>Engine Cockpit</code> to use this new theme.`,
        },
        {
          term: `Branding`,
          text: `There is a completely new way to <a href="/doc/9.4/en/designer-guide/user-interface/branding/index.html">brand</a> an Axon Ivy Engine with the colors and logo of your company, without the need to change the <code>Axon Ivy Portal</code> standard.`,
        },
      ],
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
};

export default section;
