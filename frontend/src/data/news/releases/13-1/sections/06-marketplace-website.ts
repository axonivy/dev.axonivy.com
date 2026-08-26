import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Marketplace Website`,
  anchor: `market`,
  paragraphs: [],
  features: [
    {
      term: `Roles concept for marketplace community`,
      description: `We have introduced a role concept to ensure clear responsibilities for collaboration in the community: OWNER, CODEOWNER, and CONTRIBUTOR - for futher insights check out this.`,
    },
    {
      term: `German translations`,
      description: `We have provided German translations for the new Market Website well as for the Description section of each connector.`,
    },
    {
      term: `Handling of deprecated market extensions`,
      description: `Deprecated extensions are now displayed without the plus-sign in the “Compatibility” field.`,
    },
    {
      term: `Improve UX for search experience`,
      description: `The search experience on the website has been improved.`,
    },
    {
      term: `Approval step for feedback comments`,
      description: `A new approval process is being introduced for feedback management of the connectors.`,
    },
  ],
  links: [
    { label: `Axon Ivy Market`, url: `https://market.axonivy.com/` },
    {
      label: `Market`,
      url: `/doc/13.1/market/index.html`,
    },
  ],
  images: [
    `13.1/market/01-deprecation.png`,
    `13.1/market/02-german.png`,
    `13.1/market/03-plus.png`,
  ],
  code_sample: null,
};

export default section;
