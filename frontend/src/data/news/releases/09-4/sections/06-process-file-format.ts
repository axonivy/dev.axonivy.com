import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `New Process File Format`,
  anchor: `jsonProcess`,
  content: [
    {
      type: `paragraph`,
      text: `The storage format of Axon Ivy processes has been rewritten to JSON.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `GIT friendly`,
          text: `Changes in a process can be easily reviewed and tracked without using the Axon Ivy Designer tooling.`,
        },
        {
          term: `Expressive`,
          text: `The new JSON format uses natural hierarchies and omits default values in order to be an effective communicator of the process configuration applied.`,
        },
        {
          term: `Quick`,
          text: `The JSON Inscription view assists you in quickly reviewing the currently selected process elements without opening the full blown inscription editor.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `JSON Inscription`,
      url: `/doc/9.4/designer-guide/process-modeling/process-modeling/process-inscription-view.html`,
    },
  ],
  images: [`9.4/json-process/01- json-inscription-view.png`],
};

export default section;
