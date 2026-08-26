import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engineCockpit`,
  paragraphs: [
    `The engine cockpit has been updated with new features designed to simplify operations.`,
  ],
  features: [
    {
      term: `Migration Wizard`,
      description: `The migration wizard has been redesigned to assist with migrating an Engine between versions, including upgrades from one LTS (Long-Term Support) version to the next or between update releases.`,
    },
    {
      term: `Health Check`,
      description: `The new health check service performs various checks to analyze the Engine's health, providing warnings if potential issues are detected.`,
    },
    {
      term: `SSL / TLS Tester`,
      description: `Keys and certificates can now be managed through the SSL view. The TLS tester helps verify connections to databases, REST, and SOAP services, with the option to import missing certificates.`,
    },
    {
      term: `Monitoring`,
      description: `The monitoring capabilities now include eleven new views, such as System Database Info, Class Histogram, Threads, Flight Recorder, Notifications, Session, Jobs, Health, Documents, Start Events, and Intermediate Events, for better operational insights.`,
    },
    {
      term: `Security Export`,
      description: `Users, roles, user-role assignments, and permissions can now be exported to Excel files to facilitate audits or documentation.`,
    },
    {
      term: `Properties and Features`,
      description: `The properties and features of REST clients or SOAP web services can be edited directly from the cockpit.`,
    },
    {
      term: `More Improvements`,
      description: `Enhanced Active Directory and Entra ID browsers, improved configuration file editor, updated search engine view, user substitute and absence management, and options for merging and changing the security system of an application.`,
    },
  ],
  links: [
    {
      label: `Engine Cockpit`,
      url: `/doc/12.0/engine-guide/reference/engine-cockpit/index.html`,
    },
  ],
  images: [
    `12.0/engine-cockpit/01-migration-wizard.gif`,
    `12.0/engine-cockpit/02-health.gif`,
    `12.0/engine-cockpit/03-tls-tester.gif`,
    `12.0/engine-cockpit/04-montoring-system-db-info.gif`,
    `12.0/engine-cockpit/05-montoring-java.gif`,
    `12.0/engine-cockpit/06-montoring-engine.gif`,
    `12.0/engine-cockpit/07-monitoring-workflow.gif`,
    `12.0/engine-cockpit/08-security-report.png`,
    `12.0/engine-cockpit/09-web-service-properties.png`,
    `12.0/engine-cockpit/10-other-azure-idp.png`,
    `12.0/engine-cockpit/11-other-ad-idp.png`,
    `12.0/engine-cockpit/12-other-config-editor.png`,
    `12.0/engine-cockpit/13-other-search.png`,
    `12.0/engine-cockpit/14-other-substitutes.png`,
    `12.0/engine-cockpit/15-other-merge-security-system.png`,
    `12.0/engine-cockpit/16-other-change-security-system.png`,
  ],
  code_sample: null,
};

export default section;
