import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Portal`,
  anchor: `portal`,
  content: [
    {
      type: `paragraph`,
      text: `We re-styled the Portal application completely and implemented a lot of new features.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Group Chat`,
          text: `Establish chats with other workflow users instantly, even case related`,
        },
        {
          term: `Announcements`,
          text: `Promote planned maintenance and other global announcements conveniently, in multiple languages`,
        },
        {
          term: `Express data providers`,
          text: `Add your custom data source to provide data for Axon.ivy Express form widgets`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Portal New & Noteworthy`,
      url: `/doc/8.0/en/portal-guide/portal-developer-guide/introduction/index.html#new-and-noteworthy`,
    },
  ],
  images: [
    `8.0/portal/01-portal-chat.png`,
    `8.0/portal/02-portal-announcement.png`,
    `8.0/portal/03-portal-data-provider.png`,
  ],
};

export default section;
