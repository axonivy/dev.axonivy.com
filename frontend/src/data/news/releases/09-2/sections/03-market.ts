import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Market`,
  anchor: `marketConnectors`,
  paragraphs: [
    `Big and small brands are all gathered in our refreshed Market. We offer connectors to frequently used services such as Microsoft Office, DocuSign, Twitter and more. Our products are free of charge, gifts to empower your solutions. Furthermore, it's not a closed eco-system, far from it. We are eager to see new powerful, installable components from you.`,
  ],
  features: [
    {
      term: `Connectors`,
      description: `: Ready to use REST connectors to establish third-party communications to popular brands in the web.`,
    },
    {
      term: `Ivy Components`,
      description: `: Products in the Market are built with Ivy and solve a common problem. Wrapped in a functional SubProcess, they can be installed and re-used anywhere.`,
    },
    {
      term: `Demos`,
      description: `: Our products are enriched with Demos that expose a valid use-case for the chosen technical infrastructure.`,
    },
    {
      term: `Open`,
      description: `: The Market lives on Github, anyone can contribute new products and build momentum around a developed solution.`,
    },
    {
      term: `Installable`,
      description: `: Simple install formulas allow connector developers to contribute Maven dependencies, Rest clients, processes, dialogs and more to existing projects.`,
    },
    {
      term: `Custom sources`,
      description: `: Not only can the Designer install products from the official Market, but from custom sources as well. If your connector contains confidential information, feel free to maintain and install it from your custom repository.`,
    },
  ],
  links: [
    {
      label: `Market docs`,
      url: `/doc/9.2/market/index.html`,
    },
    { label: `Browse the Market`, url: `/market` },
  ],
  images: [
    `9.2/market-connectors/01-market-browse.png`,
    `9.2/market-connectors/02-embedded-market.png`,
    `9.2/market-connectors/03-connector-installer.png`,
    `9.2/market-connectors/04-insert-connector.png`,
    `9.2/market-connectors/05-rest-client-wizard-market-choice.png`,
  ],
  code_sample: null,
};

export default section;
