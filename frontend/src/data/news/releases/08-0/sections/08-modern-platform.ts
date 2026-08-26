import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Modern Platform`,
  anchor: `modern-platform`,
  paragraphs: [
    `We updated the platform of the Designer in order to bring even more fun and productivity into your daily work. Stay ahead!`,
  ],
  features: [
    {
      term: `Dark`,
      description: `Modern themes of the Eclipse platform can be used. You may give the new dark theme a try during your next nightly coding session.`,
    },
    {
      term: `HDPI`,
      description: `High resolution displays are now supported. Feel free to use a brand new device to work with Axon.ivy.`,
    },
    {
      term: `Scripting`,
      description: `Scripting editors now support linking and quick navigation to referenced classes and methods. Use the F3-Button or Ctrl + click to jump instantly to a resource.`,
    },
    {
      term: `Marketplace`,
      description: `The now included Eclipse Marketplace allows you to access the universe of Eclipse tools. This will make you even more efficient.`,
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
  code_sample: null,
};

export default section;
