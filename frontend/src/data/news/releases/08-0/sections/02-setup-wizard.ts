import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Setup Wizard`,
  anchor: `setup-wizard`,
  content: [
    {
      type: `paragraph`,
      text: `With the new theme and the introduction of the Engine Cockpit, the Engine Config UI doesn't really fit in our product toolset any longer. Because of that, we decided to reengineer this initial setup as a new Setup Wizard.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Write Yaml`,
          text: `As our new configuration lives in <code>yaml</code> files, the new wizard saves your settings correctly.`,
        },
        {
          term: `Better integration`,
          text: `The Setup Wizard is part of the Engine Cockpit, so all parts of the wizard are integrated in the cockpit as well.`,
        },
        {
          term: `Improved Interface`,
          text: `The user interface matches the theme of the 8.0 release.`,
        },
        {
          term: `Better guidance`,
          text: `We are now giving you better feedback to smoothly configure your engine.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/8.0/engine-guide/tool-reference/setup-wizard.html`,
    },
  ],
  images: [
    `8.0/setup-wizard/01-setup-lic.png`,
    `8.0/setup-wizard/02-setup-admins.png`,
    `8.0/setup-wizard/03-setup-systemdb.png`,
    `8.0/setup-wizard/04-setup-webserver.png`,
  ],
};

export default section;
