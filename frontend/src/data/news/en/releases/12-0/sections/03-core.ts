import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Core`,
  anchor: `core`,
  content: [
    {
      type: `paragraph`,
      text: `The Axon Ivy Core also has some great new features:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Notification`,
          text: `Task and business notifications can now be delivered through multiple channels, including the Portal, email, or Microsoft Teams. A new API has been introduced for sending custom business notifications, and users can configure which notifications they want to receive and through which channels.`,
        },
        {
          term: `CRON`,
          text: `Periodic jobs, start, and intermediate events can now be scheduled using CRON expressions. This allows for flexible configurations, ranging from once a minute to daily, weekly, monthly, or yearly schedules, providing more control over automated tasks.`,
        },
        {
          term: `Developer Workflow UI`,
          text: `Improved developer workflow UI with new features like task and case notes, simple statistics, notifications, and enhanced task, case, and process start lists to make the developer experience more efficient.`,
        },
        {
          term: `S3 Document Storage`,
          text: `Workflow documents can now be stored in S3-compatible storage systems, offering many advantages over traditional local storage.`,
        },
        {
          term: `Keycloak Identity Provider`,
          text: `Users and roles can now be managed in Keycloak, a popular open-source identity and access management system. With Keycloak you can integrate the security features of your choice like multi-factor authentication.`,
        },
        {
          term: `Java 21`,
          text: `Use the latest Java 21 language features in your projects and take advantage of all the new Java 21 performance optimizations when running your engine.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Notifications`,
      url: `/doc/12.0/concepts/notification/index.html`,
    },
    {
      label: `CRON Configuration`,
      url: `/doc/12.0/en/engine-guide/configuration/advanced-configuration.html#cron-expression`,
    },
    {
      label: `CRON API`,
      url: `/doc/12.0/en/public-api/ch/ivyteam/ivy/process/beans/IPoller.html`,
    },
    {
      label: `Developer Workflow UI`,
      url: `/doc/12.0/en/designer-guide/how-to/workflow/dev-workflow-ui.html`,
    },
    {
      label: `S3 Document Storage`,
      url: `/doc/12.0/en/engine-guide/configuration/document/s3.html`,
    },
    {
      label: `Keycloak`,
      url: `/doc/12.0/en/engine-guide/integration/identity-provider/keycloak/index.html`,
    },
    {
      label: `Java 21`,
      url: `https://inside.java/2023/09/19/the-arrival-of-java-21/`,
    },
  ],
  images: [
    `12.0/core/01-notification-portal.png`,
    `12.0/core/02-notification-mail.png`,
    `12.0/core/03-notification-channels.png`,
    `12.0/core/04-notification-user-subscribe.png`,
    `12.0/core/05-cron-user-synch.gif`,
    `12.0/core/06-cron-timer-bean.png`,
    `12.0/core/07-dev-wf-ui-notes.png`,
    `12.0/core/08-dev-wf-ui-stats.png`,
    `12.0/core/09-dev-wf-ui-list.png`,
    `12.0/core/10-s3.png`,
    `12.0/core/11-keycloak.png`,
  ],
};

export default section;
