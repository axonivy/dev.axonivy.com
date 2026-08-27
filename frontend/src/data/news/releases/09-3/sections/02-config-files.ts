import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Config files`,
  anchor: `project93`,
  content: [
    {
      type: `paragraph`,
      text: `The entire configuration in Axon Ivy projects has been revised and consolidated. This will make the daily life for all developers much easier.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `GIT/SCM`,
          text: `The new file formats are lightweight text formats, less prone to errors than XML files.`,
        },
        {
          term: `Streamlining`,
          text: `Ready to customize by coping into <code>app.yaml</code> on the Axon Ivy Engine. The configuration of rest clients, web service clients, databases and variables now looks exactly the same in your Axon Ivy project as on the Axon Ivy Engine.`,
        },
        {
          term: `Well-known file extensions`,
          text: `All configuration files now have standard file extensions which gives you code highlighting in all other tools and also when sending a pull request to a friend.`,
        },
        {
          term: `Project Tree`,
          text: `All configuration files in the Axon Ivy project are located under the <code>Config</code> folder both in Axon Ivy Designer and physically on the file system - full transparency.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Project Config`,
      url: `/doc/9.3/designer-guide/configuration/index.html`,
    },
    {
      label: `app.yaml`,
      url: `/doc/9.3/engine-guide/configuration/files/app-yaml.html`,
    },
  ],
  images: [
    `9.3/config-files/01-config-file-editor.png`,
    `9.3/config-files/02-config-files-project-tree.png`,
  ],
};

export default section;
