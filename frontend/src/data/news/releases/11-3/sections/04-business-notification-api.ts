import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Business Notification API`,
  anchor: `notificationAPI`,
  paragraphs: [
    `The notification feature introduced with 11.2, received further extensions.`,
  ],
  features: [
    {
      term: null,
      description: `Keep the users of a process up to date by sending business notifications with the new API.`,
    },
    {
      term: null,
      description: `Notification messages have been streamlined, improved, and look better than ever.`,
    },
    {
      term: null,
      description: `All the information needed to fulfill your daily work is only a click away with the new task or case detail link in notification messages.`,
    },
    {
      term: null,
      description: `Customize the task notification message to the needs of your process by using your self-crafted templates.`,
    },
  ],
  links: [
    {
      label: `Concept Chapter`,
      url: `/doc/11.3/concepts/notification/index.html`,
    },
  ],
  images: [
    `11.3/notification-api/01-notification.png`,
    `11.3/notification-api/02-notification.png`,
    `11.3/notification-api/03-notification.png`,
    `11.3/notification-api/04-notification.png`,
    `11.3/notification-api/05-notification.png`,
    `11.3/notification-api/06-notification.png`,
  ],
  code_sample: null,
};

export default section;
