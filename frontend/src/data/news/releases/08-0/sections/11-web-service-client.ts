import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `New Web Service Client Tooling`,
  anchor: `ws-client`,
  content: [
    {
      type: `paragraph`,
      text: `The tooling to call remote Web Services has been completely re-worked and is more powerful than ever.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Simple`,
          text: `Clean and intuitive configuration mask on the Web Service Call activity`,
        },
        {
          term: `Secure`,
          text: `Integrated authentication features for HTTP-BASIC, HTTP-DIGEST, NTLM and WS-Security.`,
        },
        {
          term: `Compliant`,
          text: `A huge set of Web Service specifications (WS-*) are supported and ready to use`,
        },
        {
          term: `Reliable`,
          text: `Logs and monitoring capabilities let you easily identify fragile Web Service communications`,
        },
        {
          term: `Open`,
          text: `Additional client features can easily be contributed by process developers`,
        },
      ],
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
};

export default section;
