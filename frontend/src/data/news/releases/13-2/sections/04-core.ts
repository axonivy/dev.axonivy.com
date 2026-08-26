import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Core`,
  anchor: `core`,
  paragraphs: [
    `The platform foundation is strengthened with improved cloud capabilities, better integration, and future-ready technology updates:`,
  ],
  features: [
    {
      term: `Internationalization`,
      description: `Expanded multi-language support across the Developer Workflow UI, Engine Cockpit, notifications, and error messages.`,
    },
    {
      term: `Cluster Deployment & Observability`,
      description: `Enhanced deployment options, improved IdP support for administrators, and expanded Docker and Kubernetes examples improve cloud and enterprise readiness.`,
    },
    {
      term: `Developer Workflow UI`,
      description: `Improved navigation and new filtering simplify handling large projects.`,
    },
    {
      term: `Public API & Maven Artifacts`,
      description: `Public APIs are now available as Maven artifacts, simplifying integration, automation, and extension development.`,
    },
    {
      term: `Database, Runtime & Jakarta`,
      description: `Support for SQL Server 2025, Windows Server 2025, runtime improvements, and the first step toward Jakarta EE ensure long-term Java compatibility.`,
    },
    {
      term: `Engine Cockpit`,
      description: `SSL key import simplifies secure configuration and reduces manual setup.`,
    },
    {
      term: `Mail API & IIS Script`,
      description: `A new Mail API and updated IIS deployment script streamline communication and Windows installations.`,
    },
  ],
  links: [
    {
      label: `Cluster Deployment`,
      url: `/doc/13.2/engine-guide/integration/cluster/deployment/index.html`,
    },
    {
      label: `Jakarta Migration`,
      url: `/doc/13.2/axonivy/migration/migration-notes-131-132.html#persistence-api-hibernate`,
    },
    {
      label: `Engine Cockpit - SSL Settings`,
      url: `/doc/13.2/engine-guide/reference/engine-cockpit/system.html#ssl-settings`,
    },
    {
      label: `Mail API`,
      url: `/doc/13.2/public-api/ch/ivyteam/ivy/mail/package-summary.html`,
    },
    {
      label: `IIS Script`,
      url: `https://github.com/axonivy-market/iis-proxy`,
    },
  ],
  images: [
    `13.2/core/01-internationalisation.png`,
    `13.2/core/02-dev-wf-ui.png`,
    `13.2/core/03-windows-server-2025.png`,
    `13.2/core/04-jakarta.png`,
    `13.2/core/05-engine-cockpit-ssl.png`,
  ],
  code_sample: null,
};

export default section;
