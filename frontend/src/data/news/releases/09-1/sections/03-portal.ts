import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `The new shiny Portal`,
  anchor: `portal`,
  content: [
    {
      type: `paragraph`,
      text: `Besides many improvements to the user experience and the user interface, there are some cool new features in the portal!`,
    },
    {
      type: `list`,
      items: [
        { term: `Overlay guide`, text: `Welcome guide for new users` },
        {
          term: `My profile`,
          text: `New simplified settings view for email and language`,
        },
        {
          term: `New absence management`,
          text: `A fresh new look to manage absences, with improved deputy features and more transparency`,
        },
      ],
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
};

export default section;
