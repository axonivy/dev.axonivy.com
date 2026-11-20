import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engineCockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Unlock the full potential of your engine with our latest update! Introducing three brand new views in the Engine Cockpit, designed to help you analyze and troubleshoot any issues with your search engine, sessions, and threads. With these powerful new tools, you can take control of your engine and optimize its performance like never before. Try it out today and see the difference for yourself!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Search Engine`,
          text: `Easily browse indexed documents and configure options with our intuitive view. Plus, enjoy the added convenience of reindexing your index in one place.`,
        },
        {
          term: `Threads`,
          text: `Create thread dumps like a pro with our easy-to-use view. Discover detected deadlocks, current locks, and stack traces all in one place.`,
        },
        {
          term: `Sessions`,
          text: `Take control of your sessions with our powerful management view. Get all the necessary information, including session creation and user authentication details.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Cockpit`,
      url: `/doc/11.1/engine-guide/reference/engine-cockpit`,
    },
  ],
  images: [
    `11.1/engine-cockpit/01-cockpit-elastic.png`,
    `11.1/engine-cockpit/02-cockpit-elastic-doc.png`,
    `11.1/engine-cockpit/03-cockpit-threads.png`,
    `11.1/engine-cockpit/04-cockpit-sessions.png`,
  ],
};

export default section;
