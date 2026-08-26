import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Growing Market`,
  anchor: `market`,
  paragraphs: [
    `Our Axon Ivy Market is growing and offering more goods from the shelf. These products are compatible with LTS 10. So there's no need to join the leading-edge train to use these powerful products in your daily work.`,
    `AI and Robotics: Let's delegate the tedious work to the machines!`,
    `Swissness: Local goods built in our headquarters`,
    `Infrastructure: Powerful and simple to integrate`,
    `Low Code Extensions: Making beginners and professionals more productive`,
  ],
  features: [
    { term: null, description: `Axon Ivy RPA` },
    { term: null, description: `Chat GPT Connector` },
    { term: null, description: `DeepL Connector` },
    { term: null, description: `SBB` },
    { term: null, description: `SRF Meteo` },
    { term: null, description: `Threema` },
    { term: null, description: `Docker` },
    { term: null, description: `Kafka` },
    { term: null, description: `Graph QL` },
    { term: null, description: `Chat GPT Assistant` },
    { term: null, description: `Excel Dialog Importer` },
  ],
  links: [
    { label: `Browse the Market`, url: `/market` },
    {
      label: `Market docs`,
      url: `/doc/11.2/market/index.html`,
    },
    {
      label: `Contribution Wiki`,
      url: `https://github.com/axonivy/market/wiki`,
    },
  ],
  images: [`11.2/market/01-market.png`],
  code_sample: null,
};

export default section;
