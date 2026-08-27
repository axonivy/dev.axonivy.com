import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Config File Editor`,
  anchor: `configEditor`,
  content: [
    {
      type: `paragraph`,
      text: `Reviewing and editing engine configuration files is simple and powerful with the new built-in Config File Editor.`,
    },
    {
      type: `paragraph`,
      text: `While editing our prominent YAML files, you have a rich set of authoring features at hand:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Validation`,
          text: `Keys used within the YAML files are validated against the official schema. So, invalid values are being blamed with a warning marker.`,
        },
        {
          term: `Completion`,
          text: `By pressing <code>CTRL</code> + <code>Space</code>, the context completion helps you identify and select valid configuration values or keys.`,
        },
        {
          term: `Help`,
          text: `Hovering over keys lets you get context-specific documentation right where you are editing.`,
        },
        {
          term: `Formatting`,
          text: `YAML content has strict formatting rules, and the editor ensures whitespace indents are correct and in effect.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/11.2/engine-guide/reference/engine-cockpit/system.html#engine-cockpit-config-editor`,
    },
  ],
  images: [
    `11.2/config-editor/01-config-file-editor.gif`,
    `11.2/config-editor/02-context-values.png`,
    `11.2/config-editor/03-context-keys.png`,
    `11.2/config-editor/04-validate-keys.png`,
    `11.2/config-editor/05-hover-help.png`,
  ],
};

export default section;
