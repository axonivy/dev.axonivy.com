import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `All 9.x LE features`,
  anchor: `all`,
  paragraphs: [`This new LTS release includes all latest 9.x LE features.`],
  features: [
    {
      term: `9.1`,
      description: `Efficient user scaling and simplified testing`,
    },
    { term: `9.2`, description: `OpenAPI power and Axon Ivy Market` },
    {
      term: `9.3`,
      description: `Grow with your business and simplified configuration files`,
    },
    {
      term: `9.4`,
      description: `New Process Editor and multiple application context`,
    },
  ],
  links: [
    { label: `Release 10.0`, url: `https://release.axonivy.com` },
    { label: `News 9.x`, url: `/news` },
  ],
  images: [
    `10.0/all-le-features/01-process-editor.png`,
    `10.0/all-le-features/02-market-browse.png`,
    `10.0/all-le-features/03-scaling.jpg`,
    `10.0/all-le-features/04-test-flavour-selection.png`,
  ],
  code_sample: null,
};

export default section;
