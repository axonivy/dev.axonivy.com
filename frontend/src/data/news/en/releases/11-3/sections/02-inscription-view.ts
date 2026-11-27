import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Inscription View`,
  anchor: `inscriptionView`,
  content: [
    {
      type: `paragraph`,
      text: `The new Inscription View is finally feature complete! You are able to configure all elements on the totally redesigned interface.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `UI update`,
          text: `Prepare to be amazed by the refreshed user interface! Thanks to the sleek new design, navigating through inscriptions has never been smoother, making oversight effortless. The UI update not only attends to the needs of advanced users but also makes the functionality more appealing for new users. Among other things, the redesign features collapsible sections for every subpart, improved tab naming, and overall interface streamlining.`,
        },
        {
          term: `Browsers`,
          text: `We added assisting browsers to search for CMS entries, DataClass attributes, Java-Types and the like. These browsers make element configurations an easy and swift user experience without the need to write any code.`,
        },
        {
          term: `Code Completion`,
          text: `A notable improvement in this version is the completion list within script/code fields. You now get more functions, types, and attributes auto-inserted whenever you ask for it.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/11.3/en/designer-guide/process-modeling/process-modeling/process-inscription-editor-view.html`,
    },
  ],
  images: [
    `11.3/inscription-view/01-inscription-view.png`,
    `11.3/inscription-view/02-inscription-view.png`,
    `11.3/inscription-view/03-inscription-view.png`,
    `11.3/inscription-view/04-inscription-view.png`,
    `11.3/inscription-view/05-inscription-view.png`,
  ],
};

export default section;
