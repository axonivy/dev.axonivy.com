import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Marketplace`,
  anchor: `market`,
  paragraphs: [
    `The marketplace has been revamped with a fresh design and a variety of new features have been added. Many exciting connectors have been added, which we offer to you as open-source.`,
    `You can find these and many other supporting tools on the Axon Ivy Market website.`,
  ],
  features: [
    {
      term: `Feedback`,
      description: `It is now possible and encouraged for you to provide feedback on each connector so that we can understand which features you like, need, and want to be added.`,
    },
    {
      term: `Features`,
      description: `We've added a range of modern features, such as dark mode and German translations. Additionally, the documentation for the connectors has been thoroughly revised.`,
    },
    {
      term: `New connectors`,
      description: `Many new connectors and utilities have been created, let us introduce some exciting new features: Vertexai-google: This connector is focusing on the Gemini model, specifically designed for advanced multimodal tasks involving visual and textual inputs. Skribble-connector: Skribble is a modern digital signature platform that provides legally binding electronic signatures that are compliant with European laws. Process-inspector: Axon Ivy’s Process Inspector tool helps you to calculate the duration to finish a workflow case.`,
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
  code_sample: null,
};

export default section;
