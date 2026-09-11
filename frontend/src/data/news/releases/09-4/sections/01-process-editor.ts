import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `New Process Editor`,
  anchor: `processEditor`,
  content: [
    {
      type: `paragraph`,
      text: `Version 9.4 replaces the old AWT-based Process Editor with a new, fully web-based alternative. The new editor allows you to implement business processes even faster.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Browser compatible`,
          text: `The new process editor runs on native web technologies.`,
        },
        {
          term: `Element palette`,
          text: `The element palette is now divided into different categories to facilitate your search for the desired element.`,
        },
        {
          term: `Quick Actions`,
          text: `Besides the new look and feel of the editor view, there is a new way to interact with process elements. The Quick Action Bar gives you a range of actions which can be triggered (e.g. open an inscription mask or append a new element).`,
        },
        {
          term: `Process viewer on engine`,
          text: `The <code>Dev-Workflow-UI</code> and the <code>Axon Ivy Portal</code> now provide a process viewer.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/9.4/designer-guide/process-modeling/process-modeling/process-editor.html`,
    },
  ],
  images: [
    `9.4/new-process-editor/01-run-quick-action.png`,
    `9.4/new-process-editor/02-element-palette.png`,
    `9.4/new-process-editor/03-dark-mode.png`,
    `9.4/new-process-editor/04-portal-process-viewer.png`,
  ],
};

export default section;
