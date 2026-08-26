import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `PRO Designer`,
  anchor: `proDesigner`,
  paragraphs: [
    `The PRO Designer is the essential tool for professional developers. As a facelift version of the classic Designer, it integrates a range of modern, web-based features designed to enhance productivity and streamline the development experience:`,
    `PRO Designer offers an updated environment aimed at simplifying tasks and providing flexibility for professional developers.`,
  ],
  features: [
    {
      term: `Inscription View`,
      description: `The enhanced web-based Inscription Editor replaces the previous SWT-based version. It provides a more efficient, user-friendly approach to editing inscriptions, including a streamlined UI and improved navigation, making it easier to manage complex configurations.`,
    },
    {
      term: `Form Editor`,
      description: `The new Form Editor supports the design of HTML Dialogs with a more versatile and future-proof approach. Form definitions are stored in a technology-independent format for long-term compatibility. Currently, JSF-based UIs are automatically generated from these definitions, ensuring consistency across projects.`,
    },
    {
      term: `Data Class Editor`,
      description: `The new Data Class Editor now allows switching between regular data classes, business data classes, and persistence entity data classes. It also supports adding custom annotations to any data class or field, offering greater flexibility and control over data structures.`,
    },
    {
      term: `Variable Editor`,
      description: `Instead of navigating through large YAML files, the enhanced Variable Editor provides a user-friendly interface for managing variables more efficiently, reducing complexity and improving clarity during variable configuration.`,
    },
    {
      term: `Eclipse 2024/09`,
      description: `Use the greatest and latest features of the new Eclipse Platform 2024/09.`,
    },
  ],
  links: [
    {
      label: `PRO Designer`,
      url: `/doc/12.0/designer-guide/index.html`,
    },
  ],
  images: [
    `12.0/pro-designer/01-inscription-view.png`,
    `12.0/pro-designer/02-data-class-editor.png`,
    `12.0/pro-designer/03-form-editor.png`,
    `12.0/pro-designer/04-variable-editor.png`,
  ],
  code_sample: null,
};

export default section;
