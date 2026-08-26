import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Marketplace`,
  anchor: `marketplace`,
  paragraphs: [
    `The Axon Ivy Marketplace is rapidly expanding, continually enriching its collection with innovative artifacts each day.`,
    `Discover how the Axon Ivy Marketplace can transform your business processes today!`,
  ],
  features: [
    {
      term: `Artificial Intelligence`,
      description: `AI has come to stay. The Axon Ivy Market also offers numerous AI-driven connectors and assistance. The ChatGPT Assistant extends the Axon Ivy Designer for code completion, code analysis, and BPMN modeling. With AWS AI Services, NLP and chatbots become child's play.`,
    },
    {
      term: `Microsoft 365`,
      description: `Unleash the full potential of Microsoft 365 within your business processes. The Microsoft Graph API connector allows seamless interaction with any Microsoft service directly from Axon Ivy.`,
    },
    {
      term: `E-Signatures`,
      description: `Streamline document handling with our reliable e-signature connectors. Send and sign documents effortlessly using solutions like DocuSign eSignature and Adobe Acrobat Sign, enhancing the efficiency and reducing the costs of your business operations.`,
    },
    {
      term: `Miscellaneous Tools`,
      description: `But that's not all! Little helpers such as parcel tracking with UPS, the Salesforce connector, Apache Kafka for event streaming, the weather service from OpenWeather or the simple integration of Google Maps help enormously with the automation of business processes.`,
    },
  ],
  links: [{ label: `Axon Ivy Market`, url: `https://market.axonivy.com/` }],
  images: [
    `11.3/marketplace/01-market.png`,
    `11.3/marketplace/02-market.png`,
    `11.3/marketplace/03-market.png`,
    `11.3/marketplace/04-market.png`,
    `11.3/marketplace/05-market.png`,
  ],
  code_sample: null,
};

export default section;
