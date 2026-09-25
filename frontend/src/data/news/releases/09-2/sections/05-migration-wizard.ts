import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Migration Wizard`,
  anchor: `migrationWizard`,
  content: [
    {
      type: `paragraph`,
      text: `Keeping Axon Ivy Engines up-to-date, stable and protected against security vulnerabilities has never been easier. The new Migration Wizard sets up a new Engine in seconds by re-using the configurations and data from a previously installed Engine.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Hotfix Update`,
          text: `Painful updates to the latest Engine are a thing of the past. Just download and unpack a new Engine, boot it, run the migration wizard and your done.`,
        },
        {
          term: `Guided Update`,
          text: `We just do what is best in your existing configuration and automatically apply internal format changes to your configuration files.`,
        },
        {
          term: `Users Choice`,
          text: `In some migration scenarios the best configuration updates depend on your running application. For crucial changes, we ask your consent or choice to proceed. In addition, a nice config diff viewer helps you to decide wisely.`,
        },
        {
          term: `Lean Docs`,
          text: `The Migration Notes document now contains tags to define the target audience of a change. Therefore, the relevant migration tasks for you can be much easier identified, and you may skip the other parts at large.`,
        },
        {
          term: `Major Update`,
          text: `Migrating from one major version (e.g. 8.0.4 LTS) to a newer (e.g. 9.2.0 LE) is supported, too. All necessary configuration changes are enforced and selected, based upon the version you are migrating from/to.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Migration Wizard docs`,
      url: `/doc/9.2/engine-guide/tool-reference/migration-wizard.html`,
    },
  ],
  images: [
    `9.2/migration-wizard/01-engine-cockpit-setup-intro.png`,
    `9.2/migration-wizard/02-migrate-select-old-engine.png`,
    `9.2/migration-wizard/03-migration-outline-scenario.png`,
    `9.2/migration-wizard/04-migrate-diff-config.png`,
  ],
};

export default section;
