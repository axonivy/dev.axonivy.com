import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Modern Platform`,
  anchor: `modern-platform`,
  content: [
    {
      type: `paragraph`,
      text: `We updated the platform of the Designer in order to bring even more fun and productivity into your daily work. Stay ahead!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Dark`,
          text: `Modern themes of the Eclipse platform can be used. You may give the new dark theme a try during your next nightly coding session.`,
        },
        {
          term: `HDPI`,
          text: `High resolution displays are now supported. Feel free to use a brand new device to work with Axon.ivy.`,
        },
        {
          term: `Scripting`,
          text: `Scripting editors now support linking and quick navigation to referenced classes and methods. Use the <code>F3</code>-Button or <code>Ctrl + click</code> to jump instantly to a resource.`,
        },
        {
          term: `Marketplace`,
          text: `The now included Eclipse Marketplace allows you to access the universe of Eclipse tools. This will make you even more efficient.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Eclipse 2019-09`,
      url: `https://www.eclipse.org/downloads/`,
    },
    { label: `Marketplace`, url: `https://marketplace.eclipse.org/` },
  ],
  images: [
    `8.0/modern-platform/01-eclipse-2019-09.png`,
    `8.0/modern-platform/02-script-step.png`,
    `8.0/modern-platform/03-dark-theme-workbench.png`,
  ],
};

export default section;
