import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Visual Studio Code PRO Designer Extension (Preview)`,
  anchor: `vsCodeDesigner`,
  paragraphs: [
    `The Visual Studio Code PRO Designer Extension continues to expand as the future platform for Ivy application development offering a modern, extensible, and developer-friendly alternative to the Eclipse-based PRO Designer. With version 13.1, the extension introduces key additions while continuing to support essential modeling features such as the Process Editor, Form Editor, and Variable Editor.`,
    `New in 13.1:`,
    `The extension remains in preview, and your feedback plays a central role in shaping its evolution. The goal is a modern, focused, and flexible IDE that preserves the strengths of the Eclipse-based PRO Designer while aligning with today’s development expectations.`,
  ],
  features: [
    {
      term: `Data Class Editor`,
      description: `Manage field structures, annotations, and relationships in a visual interface.`,
    },
    {
      term: `CMS Editor`,
      description: `Create and edit multilingual content (cms.yaml) with built-in validation`,
    },
    {
      term: `Improved Java Support`,
      description: `Java-based Ivy projects can now be developed and built using standard Maven tooling, without relying on Eclipse-specific configurations.`,
    },
  ],
  links: [
    {
      label: `PRO Designer`,
      url: `/doc/13.1/designer-guide/index.html`,
    },
  ],
  images: [
    `13.1/vscode-designer/01-vs-code-extension.png`,
    `13.1/vscode-designer/02-dataclass-editor.png`,
    `13.1/vscode-designer/03-cms-editor.png`,
  ],
  code_sample: null,
};

export default section;
