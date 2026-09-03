import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Marketplace`,
  anchor: `marketplace`,
  content: [
    {
      type: `paragraph`,
      text: `The Axon Ivy Marketplace is rapidly expanding, continually enriching its collection with innovative artifacts each day.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Artificial Intelligence`,
          text: `AI has come to stay. The Axon Ivy Market also offers numerous AI-driven connectors and assistance. The <a href="https://market.axonivy.com/openai-assistant?version=13.2.1#description">ChatGPT Assistant</a> extends the Axon Ivy Designer for code completion, code analysis, and BPMN modeling. With <a href="https://market.axonivy.com/amazon-lex?version=13.1.1#description">AWS AI Services</a>, NLP and chatbots become child's play.`,
        },
        {
          term: `Microsoft 365`,
          text: `Unleash the full potential of Microsoft 365 within your business processes. The <a href="https://market.axonivy.com/msgraph?version=13.2.0#description">Microsoft Graph API</a> connector allows seamless interaction with any Microsoft service directly from Axon Ivy.`,
        },
        {
          term: `E-Signatures`,
          text: `Streamline document handling with our reliable e-signature connectors. Send and sign documents effortlessly using solutions like <a href="https://market.axonivy.com/docusign-connector?version=13.2.0#description">DocuSign eSignature</a> and <a href="https://market.axonivy.com/adobe-acrobat-connector?version=13.2.0#description">Adobe Acrobat Sign</a>, enhancing the efficiency and reducing the costs of your business operations.`,
        },
        {
          term: `Miscellaneous Tools`,
          text: `But that's not all! Little helpers such as parcel tracking with <a href="https://market.axonivy.com/ups-connector?version=13.2.0#description">UPS</a>, the <a href="https://market.axonivy.com/salesforce-connector?version=13.2.0#description">Salesforce connector</a>, <a href="https://market.axonivy.com/kafka-connector?version=13.2.0#description">Apache Kafka</a> for event streaming, the weather service from <a href="https://market.axonivy.com/open-weather-connector?version=13.2.0#description">OpenWeather</a> or the simple integration of <a href="https://market.axonivy.com/google-maps-connector?version=13.2.0#description">Google Maps</a> help enormously with the automation of business processes.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Discover how the Axon Ivy Marketplace can transform your business processes today!`,
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
};

export default section;
