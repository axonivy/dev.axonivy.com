import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit`,
  anchor: `engineCockpit`,
  content: [
    {
      type: `paragraph`,
      text: `The Cockpit includes new features to ease your secure operations.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Binaries`,
          text: `The Config File Editor also lists binary key- and trust-store files now. Using the new up-/download functionality, you can edit them locally with a tool of your preference and put the modified version back in charge later on.`,
        },
        {
          term: `TLS Tester`,
          text: `Secure TLS connections from the engine to remote services can now be tested directly in the cockpit. We list supported ciphers and used certificates. You get that feature not only on REST and SOAP WebServices but for LDAPS connections too.`,
        },
        {
          term: `Focused`,
          text: `To simplify configurations onto HTTP connectors, we integrated the documentation for configurable properties into the System Configuration editor. We list defaults, descriptive docs, and valid examples to keep you focused in the cockpit, having all information in sight.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Cockpit`,
      url: `https://developer.axonivy.com/doc/11.3/engine-guide/reference/engine-cockpit`,
    },
  ],
  images: [
    `11.3/engine-cockpit/01-binary-up-down-load.png`,
    `11.3/engine-cockpit/02-ldaps-connection-test.png`,
    `11.3/engine-cockpit/03-rest-tls-test.png`,
    `11.3/engine-cockpit/04-property-with-examples.png`,
  ],
};

export default section;
