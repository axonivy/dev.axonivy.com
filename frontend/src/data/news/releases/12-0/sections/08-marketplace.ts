import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Marketplace`,
  anchor: `market`,
  content: [
    {
      type: `paragraph`,
      text: `The marketplace has been revamped with a fresh design and a variety of new features have been added. Many exciting connectors have been added, which we offer to you as open-source.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Feedback`,
          text: `It is now possible and encouraged for you to provide feedback on each connector so that we can understand which features you like, need, and want to be added.`,
        },
        {
          term: `Features`,
          text: `We've added a range of modern features, such as dark mode and German translations. Additionally, the documentation for the connectors has been thoroughly revised.`,
        },
        {
          term: `New connectors`,
          text: `Many new connectors and utilities have been created, let us introduce some exciting new features:`,
          items: [
            {
              term: `<a href="https://market.axonivy.com/vertexai-google?version=13.2.0#description">Vertexai-google</a>`,
              text: `This connector is focusing on the Gemini model, specifically designed for advanced multimodal tasks involving visual and textual inputs.`,
            },
            {
              term: `<a href="https://market.axonivy.com/skribble-connector?version=13.1.1#description">Skribble-connector</a>`,
              text: `Skribble is a modern digital signature platform that provides legally binding electronic signatures that are compliant with European laws.`,
            },
            {
              term: `<a href="https://market.axonivy.com/process-inspector?version=13.2.0#description">Process-inspector</a>`,
              text: `Axon Ivy’s Process Inspector tool helps you to calculate the duration to finish a workflow case.`,
            },
          ],
        },
      ],
    },
    {
      type: `paragraph`,
      text: `You can find these and many other supporting tools on the Axon Ivy Market website.`,
    },
  ],
  links: [
    { label: `Axon Ivy Market`, url: `https://market.axonivy.com/` },
    {
      label: `Market`,
      url: `/doc/12.0/market/index.html`,
    },
  ],
  images: [`12.0/market/01-market.png`],
};

export default section;
