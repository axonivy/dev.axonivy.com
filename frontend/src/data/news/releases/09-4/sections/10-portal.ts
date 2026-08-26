import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Portal`,
  anchor: `portal93`,
  paragraphs: [
    `More power for the end user. The Axon Ivy Portal appears in a new look and is completely customizable.`,
  ],
  features: [
    {
      term: `Welcome screen`,
      description: `You never get a second chance for a first impression. Create your own welcome screen for your end-users.`,
    },
    {
      term: `Freya theme`,
      description: `Check out the new state-of-the-art PrimeFaces theme featuring dark-mode and many more.`,
    },
    {
      term: `Avatars`,
      description: `Put your own personal touch to the Axon Ivy Portal by using avatars.`,
    },
    {
      term: `Dashboard configuration`,
      description: `An intuitive step-by-step wizard guides you through the configuration of your dashboards.`,
    },
    {
      term: `Password validation`,
      description: `Define your own password policies globally and at a granular level.`,
    },
  ],
  links: [
    {
      label: `Portal New & Noteworthy`,
      url: `/portal/9.4/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-4`,
    },
  ],
  images: [
    `9.4/portal/01-light-mode.png`,
    `9.4/portal/02-dark-mode.png`,
    `9.4/portal/03-dashboard.png`,
    `9.4/portal/04-admin.png`,
  ],
  code_sample: null,
};

export default section;
