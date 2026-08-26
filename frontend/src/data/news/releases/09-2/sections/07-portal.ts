import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Portal`,
  anchor: `portal92`,
  paragraphs: [
    `The Portal-Team has been working hard to give you a better user experience, supporting:`,
  ],
  features: [
    {
      term: `Forgot password`,
      description: `Simply reset your password using the new built-in feature on the login screen.`,
    },
    {
      term: `Simplified tasks and cases export`,
      description: `Exporting tasks and cases is now even more powerful and easier.`,
    },
    {
      term: `Redesigned process list`,
      description: `The new grid layout gives you a new refreshed overview of your available processes.`,
    },
    {
      term: `Configurable detail pages`,
      description: `The task and case detail pages can now be customized to your needs without a single line of code.`,
    },
    {
      term: `Advanced user specific settings`,
      description: `There are now even more options to configure the Portal to your wishes and preferences. So take a look at the new settings in the My Profile section.`,
    },
  ],
  links: [
    {
      label: `Portal New & Noteworthy`,
      url: `/portal/9.2/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-2`,
    },
  ],
  images: [
    `9.2/portal/01-password.png`,
    `9.2/portal/02-task-case-export.png`,
    `9.2/portal/03-grid-layout.png`,
    `9.2/portal/04-task-detail.png`,
    `9.2/portal/05-case-detail.png`,
    `9.2/portal/06-my-profile.png`,
  ],
  code_sample: null,
};

export default section;
