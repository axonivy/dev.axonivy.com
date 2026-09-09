import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Web-based Editors`,
  anchor: `web-based-editors`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 significantly expands the web-based editor architecture. More application modeling and configuration tasks are available.`,
    },
    {
      type: `paragraph`,
      text: `**Editors and tooling include:**`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Form Editor with reusable components, editable data tables, validation, and preview`,
        },
        {
          text: `Data Class Editor with relationship modeling and annotation validation`,
        },
        { text: `Database & SQL Editor with connection testing` },
        { text: `REST Client Editor with OpenAPI generation` },
        { text: `Web Service Client Editor with SOAP client generation` },
        { text: `User & Role Editors` },
        { text: `Persistence Editor and schema generation` },
        { text: `Case Map editor and viewer` },
      ],
    },
  ],
  links: [],
  images: [
    `14.0/webbased-editor/01-dialog.png`,
    `14.0/webbased-editor/02-data-class.png`,
    `14.0/webbased-editor/03-database-editor.png`,
    `14.0/webbased-editor/04-sql-executor.png`,
    `14.0/webbased-editor/05-rest-clients.png`,
    `14.0/webbased-editor/06-web-services.png`,
    `14.0/webbased-editor/07-roles.png`,
    `14.0/webbased-editor/08-users.png`,
    `14.0/webbased-editor/09-persistence-units.png`,
  ],
};

export default section;
