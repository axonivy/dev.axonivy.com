import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `New Web Service Client Tooling`,
  anchor: `ws-client`,
  paragraphs: [
    `The tooling to call remote Web Services has been completely re-worked and is more powerful than ever.`,
  ],
  features: [
    {
      term: `Simple`,
      description: `Clean and intuitive configuration mask on the Web Service Call activity`,
    },
    {
      term: `Secure`,
      description: `Integrated authentication features for HTTP-BASIC, HTTP-DIGEST, NTLM and WS-Security.`,
    },
    {
      term: `Compliant`,
      description: `A huge set of Web Service specifications (WS-*) are supported and ready to use`,
    },
    {
      term: `Reliable`,
      description: `Logs and monitoring capabilities let you easily identify fragile Web Service communications`,
    },
    {
      term: `Open`,
      description: `Additional client features can easily be contributed by process developers`,
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/8.0/designer-guide/3rd-party-integration/index.html#web-services`,
    },
    {
      label: `Tutorial Video`,
      url: `/tutorial`,
    },
  ],
  images: [`8.0/new-webservice-client-tooling/01-ws-client-cxf.png`],
  code_sample: null,
};

export default section;
