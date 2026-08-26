import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `PRO Designer`,
  anchor: `proDesigner`,
  paragraphs: [
    `The PRO Designer continues to evolve as the primary environment for professional developers, with version 13.1 introducing enhancements for the development of more robust and maintainable applications.`,
    `All new features introduced in the PRO Designer are also available in the NEO Designer.`,
  ],
  features: [
    {
      term: `Dialog Preview`,
      description: `Reintroduced with a more stable implementation, the preview enables live rendering of forms and XHTML dialogs with direct navigation to element definitions.`,
    },
    {
      term: `Form Editor Enhancements`,
      description: `Editable Data Tables, reusable form components (including fieldsets and panels), and visual improvements like better alignment, drag-and-drop, and new button styles enhance design flexibility. Attribute validation and keyboard support improve accuracy and speed.`,
    },
    {
      term: `Process Editor`,
      description: `Now powered by GLSP v2.3.0, the editor delivers smoother interaction and rendering. Expanded keyboard shortcuts streamline navigation and editing.`,
    },
    {
      term: `Inscription View`,
      description: `IvyScript hints, a better Function Browser, and an embedded Condition Builder improve scripting and configuration. Improved stability, especially during tab switching and editor focus.`,
    },
    {
      term: `Data Class Editor`,
      description: `Improved annotation validation and relationship configuration. Field badges and keyboard accessibility increase clarity and efficiency.`,
    },
    {
      term: `Variable Editor`,
      description: `Now faster and easier to use with large sets of variables. Inline validation and full keyboard control are supported.`,
    },
  ],
  links: [
    {
      label: `PRO Designer`,
      url: `/doc/13.1/designer-guide/index.html`,
    },
  ],
  images: [
    `13.1/pro-designer/01-dialog-preview.png`,
    `13.1/pro-designer/02-form-editor.png`,
    `13.1/pro-designer/03-process-editor.png`,
    `13.1/pro-designer/04-function-browser.png`,
    `13.1/pro-designer/05-condition-builder.png`,
    `13.1/pro-designer/06-data-class-editor.png`,
  ],
  code_sample: null,
};

export default section;
