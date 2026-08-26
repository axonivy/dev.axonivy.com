import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Inscription View (Beta)`,
  anchor: `inscriptionView`,
  paragraphs: [
    `We are one step further on our path to finalizing our new web-based Inscription Views! We replaced default inscriptions from the old SWT-based software and experienced the future of inscription editing. Besides new features, we integrated it fully inside the process editor and gave it a big UI / UX update.`,
  ],
  features: [
    {
      term: `Process Editor integration`,
      description: `The new inscription view is fully integrated into the existing process editor to provide the best user experience. Implemented as a sidebar, a double click upon an element opens it, and subsequent selections will update the view.`,
    },
    {
      term: `Faster`,
      description: `The new UI lazy loads all data and additional information to improve the loading speed.`,
    },
    {
      term: `Undo`,
      description: `If you make changes and want to revert them, you can undo a complete section with one click.`,
    },
    {
      term: `Validations`,
      description: `Validation messages are now directly located to the configuration input to give you a better hint of what and where something is wrong.`,
    },
    {
      term: `UI update`,
      description: `We spent a big UI update to the inscription view to improve the overview of your configurations.`,
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/11.2/designer-guide/process-modeling/process-modeling/process-inscription-editor-view.html`,
    },
  ],
  images: [
    `11.2/inscription-view/01-integration.gif`,
    `11.2/inscription-view/02-validations.png`,
    `11.2/inscription-view/03-ui-update.png`,
  ],
  code_sample: null,
};

export default section;
