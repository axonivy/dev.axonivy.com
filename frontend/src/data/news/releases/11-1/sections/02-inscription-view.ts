import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Inscription View (Preview)`,
  anchor: `inscriptionView`,
  paragraphs: [
    `Introducing our revolutionary new web-based Inscription Editor - the first of many exciting updates to come! Say goodbye to the old SWT-based software and experience the future of inscription editing. While it may not yet support all configurations, this powerful tool is just a preview of what's to come, and with ongoing development, the possibilities are endless. Don't miss out on this exciting glimpse into the future of inscription editing - try it out today!`,
  ],
  features: [
    {
      term: `Browser compatible`,
      description: `The new inscription view runs on native web technologies.`,
    },
    {
      term: `View`,
      description: `Implemented as a View, our tool eliminates the need for pop-up dialogs and dynamically updates the content as you select different elements.`,
    },
    {
      term: `Immediate feedback`,
      description: `New technology, faster feedback - our goal is to enhance your user experience.`,
    },
    {
      term: `IvyScript editor`,
      description: `Experience IvyScript like never before with our use of the Monaco editor, complete with auto-completion and an improved writing interface.`,
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/11.1/designer-guide/process-modeling/process-modeling/process-inscription-editor-view.html`,
    },
  ],
  images: [
    `11.1/inscription-view/01-inscription-view.gif`,
    `11.1/inscription-view/02-dark-mode.png`,
  ],
  code_sample: null,
};

export default section;
