import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Marketplace Website`,
  anchor: `market`,
  content: [
    {
      type: `list`,
      items: [
        {
          term: `Roles concept for marketplace community`,
          text: `We have introduced a role concept to ensure clear responsibilities for collaboration in the community: **OWNER, CODEOWNER, and CONTRIBUTOR** - for futher insights check out <a href="https://github.com/axonivy-market/market/wiki">this</a>.`,
        },
        {
          term: `German translations`,
          text: `We have provided German translations for the new <a href="https://github.com/axonivy-market/market/wiki">Market Website</a> well as for the Description section of each connector.`,
        },
        {
          term: `Handling of deprecated market extensions`,
          text: `Deprecated extensions are now displayed without the plus-sign in the “Compatibility” field.`,
        },
        {
          term: `Improve UX for search experience`,
          text: `The search experience on the website has been improved.`,
        },
        {
          term: `Approval step for feedback comments`,
          text: `A new approval process is being introduced for feedback management of the connectors.`,
        },
      ],
    },
  ],
  links: [{ label: `Axon Ivy Market`, url: `https://market.axonivy.com/` }],
  images: [
    `13.1/market/01-deprecation.png`,
    `13.1/market/02-german.png`,
    `13.1/market/03-plus.png`,
  ],
};

export default section;
