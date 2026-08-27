import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engineCockpit`,
  content: [
    {
      type: `paragraph`,
      text: `We added fantastic world-class monitoring, user management, operations, and configuration features to the Engine Cockpit.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Configuration`,
          text: `The new System/SSL view to manage your certificates. The new System/Config File Editor helps you view and edit any configuration file.`,
        },
        {
          term: `User Management`,
          text: `The user details view shows a user's substitutes and absences. The security identity provider configuration view has been re-implemented and now features a directory browser for Microsoft Entra ID (formally known as Azure AD).`,
        },
        {
          term: `Operations`,
          text: `Restart the Axon Ivy Engine with the Engine Cockpit. Merge security contexts and move applications to help you migrate your Axon Ivy Engine from LTS 8`,
        },
        {
          term: `Monitoring`,
          text: `Use the new Class Histogram, Threads, Flight Recorder view to analyze memory leaks, performance bottlenecks, or endless loops. Also, the Notification, Documents, Start Events, and Intermediate Events view were added.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `The Engine Cockpit is now also available in the Axon Ivy Designer. The Preferences for SSL Client and Email were removed. Use the Engine Cockpit to configure these settings.`,
    },
  ],
  links: [
    {
      label: `Engine Cockpit`,
      url: `/doc/11.2/engine-guide/reference/engine-cockpit`,
    },
  ],
  images: [
    `11.2/engine-cockpit/01-ssl.png`,
    `11.2/engine-cockpit/02-substitutes-absences.png`,
    `11.2/engine-cockpit/03-azure-idp.png`,
    `11.2/engine-cockpit/04-ad-idp.png`,
    `11.2/engine-cockpit/05-restart.png`,
    `11.2/engine-cockpit/06-merge-security-system.png`,
    `11.2/engine-cockpit/07-change-security-system.png`,
    `11.2/engine-cockpit/08-class-histogram.png`,
    `11.2/engine-cockpit/09-jfr.png`,
  ],
};

export default section;
