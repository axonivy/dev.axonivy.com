import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `All 9.x LE features`,
  anchor: `all`,
  content: [
    {
      type: `paragraph`,
      text: `This new LTS release includes all latest 9.x LE features.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `<a href="/news/9.1">9.1</a>`,
          text: `Efficient user scaling and simplified testing`,
        },
        {
          term: `<a href="/news/9.2">9.2</a>`,
          text: `OpenAPI power and Axon Ivy Market`,
        },
        {
          term: `<a href="/news/9.3">9.3</a>`,
          text: `Grow with your business and simplified configuration files`,
        },
        {
          term: `<a href="/news/9.4">9.4</a>`,
          text: `New Process Editor and multiple application context`,
        },
      ],
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
};

export default section;
