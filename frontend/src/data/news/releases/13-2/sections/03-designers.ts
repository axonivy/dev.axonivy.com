import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Designers`,
  anchor: `designers`,
  content: [
    {
      type: `paragraph`,
      text: `The latest updates deliver significant improvements to the overall design experience across both environments:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `NEO Designer`,
          text: `the web-based, intuitive tool for business technologists`,
        },
        {
          term: `PRO Designer (VS Code Extension)`,
          text: `development environment for experienced developers`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `All new features are available in both tools, ensuring a consistent experience for all roles.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `CMS Editor Enhancements`,
          text: `Improved multilingual editing with integrated translation.`,
        },
        {
          term: `Form Editor Enhancements`,
          text: `Support for lazy data models, listener properties, component conversion with preserved settings, a unified dialog framework, and direct control of column widths for richer, more responsive UIs.`,
        },
        {
          term: `New XHTML Editor`,
          text: `Smart code completion, validation, and contextual hover information improve speed and reliability.`,
        },
        {
          term: `Generate from Data`,
          text: `Automatic entity form generation from databases accelerates UI creation and ensures visual consistency.`,
        },
        {
          term: `Improved Configuration & Inscription Experience`,
          text: `Streamlined configuration with better defaults, tab-based settings, and more intuitive controls.`,
        },
        {
          term: `Process Modeling Refinements`,
          text: `Enhanced copy/paste, smoother insert actions, and improved undo/redo for more efficient modeling.`,
        },
        {
          term: `BPMN-2 Import Improvements`,
          text: `More reliable BPMN-2 imports with better semantic accuracy and support for standard BPMN icons.`,
        },
        {
          term: `NEO Designer Updates`,
          text: `Usability improvements and a new integrated Runtime Log View for faster diagnostics during design and testing.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `NEO Designer`,
      url: `/doc/13.2/neo-designer/index.html`,
    },
    {
      label: `PRO Designer (Deprecated)`,
      url: `/doc/13.2/designer-guide/index.html`,
    },
    {
      label: `PRO Designer (VS Code Extension)`,
      url: `https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-13`,
    },
    {
      label: `CMS Editor`,
      url: `/doc/13.2/designer-guide/cms/cms-editor.html`,
    },
    {
      label: `Form Editor`,
      url: `/doc/13.2/designer-guide/user-interface/user-dialogs/form-editor.html`,
    },
  ],
  images: [
    `13.2/designers/01-cms.png`,
    `13.2/designers/02-cms-translation.png`,
    `13.2/designers/03-form-editor-data-table.gif`,
    `13.2/designers/04-form-editor-change-type.gif`,
    `13.2/designers/05-form-editor-change-listener.gif`,
    `13.2/designers/06-xhtml-editor.gif`,
    `13.2/designers/07-generate-data.png`,
    `13.2/designers/08-generate-wizard.png`,
    `13.2/designers/09-inscription-tabs.png`,
    `13.2/designers/10-inscriptions.gif`,
    `13.2/designers/11-process-editor-undo-redo.gif`,
    `13.2/designers/12-bpmn.png`,
    `13.2/designers/13-neo-workspaces.png`,
    `13.2/designers/14-neo-recently-open.png`,
    `13.2/designers/15-neo-filters.png`,
    `13.2/designers/16-neo-bpmn-import.png`,
    `13.2/designers/17-neo-runtimelog.png`,
  ],
};

export default section;
