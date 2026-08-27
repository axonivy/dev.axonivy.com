import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Growing Market`,
  anchor: `market`,
  content: [
    {
      type: `paragraph`,
      text: `Our <a href="https://market.axonivy.com/">Axon Ivy Market</a> is growing and offering more goods from the shelf. These products are compatible with LTS 10. So there's no need to join the leading-edge train to use these powerful products in your daily work.`,
    },
    {
      type: `paragraph`,
      text: `AI and Robotics: Let's delegate the tedious work to the machines!`,
    },
    {
      type: `list`,
      items: [
        { text: `Axon Ivy RPA` },
        {
          text: `<a href="https://market.axonivy.com/openai-connector?version=13.2.1#description">Chat GPT Connector</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/deepl-connector?version=13.2.1#description">DeepL Connector</a>`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Swissness: Local goods built in our headquarters`,
    },
    {
      type: `list`,
      items: [
        {
          text: `<a href="https://market.axonivy.com/sbb-connector?version=13.1.1#description">SBB</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/srf-weather-connector?version=13.2.0#description">SRF Meteo</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/threema-connector?version=13.2.0#description">Threema</a>`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Infrastructure: Powerful and simple to integrate`,
    },
    {
      type: `list`,
      items: [
        {
          text: `<a href="https://market.axonivy.com/docker-connector?version=13.2.0#description">Docker</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/kafka-connector?version=13.2.0#description">Kafka</a>`,
        },
        { text: `Graph QL` },
      ],
    },
    {
      type: `paragraph`,
      text: `Low Code Extensions: Making beginners and professionals more productive`,
    },
    {
      type: `list`,
      items: [
        {
          text: `<a href="https://market.axonivy.com/openai-assistant?version=13.2.1#description">Chat GPT Assistant</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/excel-importer?version=13.1.1#description">Excel Dialog Importer</a>`,
        },
      ],
    },
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
};

export default section;
