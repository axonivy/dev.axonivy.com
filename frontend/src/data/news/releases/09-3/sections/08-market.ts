import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Updated Market`,
  anchor: `marketConnectors93`,
  paragraphs: [
    `The Axon Ivy Market is gaining momentum, becoming a powerful ecosystem for all digital transformation projects.`,
  ],
  features: [
    {
      term: `Growing`,
      description: `more connectors are ready to be taken from the shelf. To name a few, the community partnered with us to supply new connectors for SFTP, the Swiss Phone Directory and Amazon's Natural Language Processing services.`,
    },
    {
      term: `Templates`,
      description: `our template repository empowers you to develop your own product in no time. In fact, everything is pre-configured to make your contribution as simple as possible.`,
    },
    {
      term: `Compatible`,
      description: `pre-defined build pipelines, and secure versioned maven repositories are waiting to serve your product. Therefore, maintaining a widely used Market product over time, while the Designer feature set evolves, becomes a simple and convenient task.`,
    },
  ],
  links: [
    { label: `Browse the Market`, url: `/market` },
    {
      label: `Market docs`,
      url: `/doc/9.3/market/index.html`,
    },
    {
      label: `Contribution Wiki`,
      url: `https://github.com/axonivy/market/wiki`,
    },
  ],
  images: [`9.3/market-connectors/01-market-selection.png`],
  code_sample: null,
};

export default section;
