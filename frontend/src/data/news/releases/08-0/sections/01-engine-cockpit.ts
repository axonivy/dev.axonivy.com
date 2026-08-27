import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engine-cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Our new Engine Cockpit has now become a mighty successor of the AdminUI with a rich feature set. It's completely based on web technologies and simply open in your favorite browser or even on mobile devices.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Configuration`,
          text: `System and app configurations can be reviewed and modified effectively.`,
        },
        {
          term: `Administration`,
          text: `Manage your security systems in the cockpit. Add Users, change roles, edit properties, all can be done with the new security tools.`,
        },
        {
          term: `External Services`,
          text: `Database, SOAP or REST web services used by the engine can be viewed, configured and even tested right within the Cockpit. Additionally, you can see your running elastic search server and run queries against it.`,
        },
        {
          term: `License`,
          text: `The Engine license can be updated in the Cockpit. Once your license is near its end of life, administrators can initiate the renewal process right out of the Cockpit.`,
        },
        {
          term: `Monitoring`,
          text: `A new expressive view allows to examine recent logs and offers an export functionality to download them as ZIP files. As a result, file access to the Engine is no longer necessary and data collection becomes very easy.`,
        },
        {
          term: `Applications`,
          text: `Simply manage your running Applications on the Cockpit. Start, stop, release and other actions are possible. Even the deployment of *.iar or *.zip files can be done directly over the web.`,
        },
        {
          term: `System`,
          text: `Managing your administrators or system database has never been never easier! You need to migrate your system database? Do it right from the Cockpit.`,
        },
        {
          term: `More`,
          text: `The Cockpit can do much, much more. Please give it a try!`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/8.0/engine-guide/tool-reference/engine-cockpit/index.html`,
    },
  ],
  images: [
    `8.0/engine-cockpit/01-cockpit-dashboard.png`,
    `8.0/engine-cockpit/02-cockpit-apps.png`,
    `8.0/engine-cockpit/03-cockpit-db.png`,
    `8.0/engine-cockpit/04-cockpit-log.png`,
    `8.0/engine-cockpit/05-cockpit-monitor.png`,
  ],
};

export default section;
