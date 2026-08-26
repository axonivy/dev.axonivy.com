import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `CMS`,
  anchor: `cms`,
  paragraphs: [
    `We have renovated the content management system (CMS for short) completely. We changed the internal concept radically resulting in a smart CMS with many new features.`,
  ],
  features: [
    {
      term: `Small and Smart`,
      description: `Fewer files lead to better performance in day-to-day development as well as at runtime in the Axon Ivy Engine.`,
    },
    {
      term: `Standard`,
      description: `The CMS now does not consist of a properitary format. Files and folders reflect 1:1 the structure of the CMS.`,
    },
    {
      term: `cms.yaml`,
      description: `All texts are now in one file the cms.yaml. Single-line texts as well as multi-line texts are no longer distinguished.`,
    },
    {
      term: `Any files`,
      description: `We now support all file types out-of-the-box.`,
    },
    {
      term: `Change at runtime`,
      description: `With the application CMS, the CMS can now be customized at runtime.`,
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/9.4/designer-guide/cms/index.html`,
    },
  ],
  images: [`9.4/cms/01-structure.png`, `9.4/cms/02-cms-yaml.png`],
  code_sample: null,
};

export default section;
