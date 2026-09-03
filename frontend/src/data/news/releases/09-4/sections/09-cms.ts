import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `CMS`,
  anchor: `cms`,
  content: [
    {
      type: `paragraph`,
      text: `We have renovated the content management system (CMS for short) completely. We changed the internal concept radically resulting in a smart CMS with many new features.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Small and Smart`,
          text: `Fewer files lead to better performance in day-to-day development as well as at runtime in the Axon Ivy Engine.`,
        },
        {
          term: `Standard`,
          text: `The CMS now does not consist of a properitary format. Files and folders reflect 1:1 the structure of the CMS.`,
        },
        {
          term: `cms.yaml`,
          text: `All texts are now in one file the <code>cms.yaml</code>. Single-line texts as well as multi-line texts are no longer distinguished.`,
        },
        {
          term: `Any files`,
          text: `We now support all file types out-of-the-box.`,
        },
        {
          term: `Change at runtime`,
          text: `With the application CMS, the CMS can now be customized at runtime.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/9.4/designer-guide/cms/index.html`,
    },
  ],
  images: [`9.4/cms/01-structure.png`, `9.4/cms/02-cms-yaml.png`],
};

export default section;
