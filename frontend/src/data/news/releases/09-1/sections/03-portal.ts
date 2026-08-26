import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `The new shiny Portal`,
  anchor: `portal`,
  paragraphs: [
    `Besides many improvements to the user experience and the user interface, there are some cool new features in the portal!`,
  ],
  features: [
    { term: `Overlay guide`, description: `Welcome guide for new users` },
    {
      term: `My profile`,
      description: `New simplified settings view for email and language`,
    },
    {
      term: `New absence management`,
      description: `A fresh new look to manage absences, with improved deputy features and more transparency`,
    },
  ],
  links: [
    {
      label: `Portal New & Noteworthy`,
      url: `/portal/9.1/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-1`,
    },
  ],
  images: [
    `9.1/portal/01-overlay-guide.png`,
    `9.1/portal/02-my-profile.png`,
    `9.1/portal/03-absences.png`,
  ],
  code_sample: null,
};

export default section;
