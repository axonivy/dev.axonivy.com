import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `NEO Designer`,
  anchor: `neo`,
  content: [
    {
      type: `paragraph`,
      text: `The NEO Designer continues to evolve as a modern, web-based low-code platform. In version 13.1, key improvements focus on feedback, accessibility, and content management.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Graph Views`,
          text: `Visual diagrams of data class hierarchies and project dependencies help users understand and navigate large project structures.`,
        },
        {
          term: `Dialog Preview`,
          text: `A reworked dialog preview allows live rendering of forms and components, with instant navigation to source definitions.`,
        },
        {
          term: `CMS Editor`,
          text: `Enhanced support for multilingual content with the ability to add, remove, and manage languages. Improved validation, filtering, and editing make content configuration more efficient.`,
        },
        {
          term: `Keyboard Support`,
          text: `Full shortcut navigation is now available across the UI, speeding up form editing, tile management, and process modeling.`,
        },
        {
          term: `Internationalization`,
          text: `The interface is now available in English and German, with all labels externalized and ready for future translations.`,
        },
        {
          term: `Simulation Control Enhancements`,
          text: `Process simulation behavior has been improved. The embedded engine can be reset or stopped without leaving the UI.`,
        },
        {
          term: `Runtime Log View`,
          text: `A built-in log viewer helps developers filter and inspect runtime logs by level, source, or project directly within the workspace.`,
        },
        {
          term: `Validation on Creation`,
          text: `Users now get immediate feedback when naming new forms or processes, preventing configuration errors early.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `NEO Designer`,
      url: `/doc/13.1/designer-guide`,
    },
  ],
  images: [
    `13.1/neo-designer/01-project-dependencies.png`,
    `13.1/neo-designer/02-data-class-graph.png`,
    `13.1/neo-designer/03-dialog-preview.png`,
    `13.1/neo-designer/04-cms.png`,
    `13.1/neo-designer/05-keyboard.png`,
    `13.1/neo-designer/06-internationalization.png`,
    `13.1/neo-designer/07-simulation-control.png`,
    `13.1/neo-designer/08-runtime-log.png`,
    `13.1/neo-designer/09-validation.png`,
  ],
};

export default section;
