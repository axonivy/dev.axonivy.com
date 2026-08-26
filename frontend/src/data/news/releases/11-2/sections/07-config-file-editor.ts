import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Config File Editor`,
  anchor: `configEditor`,
  paragraphs: [
    `Reviewing and editing engine configuration files is simple and powerful with the new built-in Config File Editor.`,
    `While editing our prominent YAML files, you have a rich set of authoring features at hand:`,
  ],
  features: [
    {
      term: `Validation`,
      description: `Keys used within the YAML files are validated against the official schema. So, invalid values are being blamed with a warning marker.`,
    },
    {
      term: `Completion`,
      description: `By pressing CTRL + Space, the context completion helps you identify and select valid configuration values or keys.`,
    },
    {
      term: `Help`,
      description: `Hovering over keys lets you get context-specific documentation right where you are editing.`,
    },
    {
      term: `Formatting`,
      description: `YAML content has strict formatting rules, and the editor ensures whitespace indents are correct and in effect.`,
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
  code_sample: null,
};

export default section;
