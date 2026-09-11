import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Notification`,
  anchor: `notification`,
  content: [
    {
      type: `paragraph`,
      text: `User notifications have been completely redesigned to provide a holistic user experience. Not only end-users get a transparent notification journey, but also system administrators benefit from a simplified management experience.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Channels`,
          text: `With the Web, Mail, and Microsoft Teams channels, Axon Ivy Engine comes with three built-in channels.`,
        },
        {
          term: `Templating`,
          text: `The content of the user notifications can be changed via a standardized templating mechanism.`,
        },
        {
          term: `Subscription`,
          text: `Administrators can set the default subscriptions, and the users themselves can override these settings in their profiles.`,
        },
        {
          term: `Monitoring`,
          text: `Notifications will be traced and can be monitored in the Axon Ivy Engine Cockpit.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Concept Chapter`,
      url: `/doc/11.2/concepts/notification/index.html`,
    },
    {
      label: `Engine Guide`,
      url: `/doc/11.2/en/engine-guide/configuration/notification/index.html`,
    },
  ],
  images: [
    `11.2/notification/01-portal-notification.png`,
    `11.2/notification/02-engine-cockpit-notification-channels.png`,
    `11.2/notification/03-engine-cockpit-monitor-notifications.png`,
    `11.2/notification/04-engine-cockpit-monitor-notification-deliveries.png`,
  ],
};

export default section;
