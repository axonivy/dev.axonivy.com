import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `HTML Dialog Development`,
  anchor: `html-dialog-development`,
  content: [
    {
      type: `paragraph`,
      text: `HTML Dialog development receives stronger IDE support, providing a shorter feedback loop between implementation, validation, and preview.`,
    },
    {
      type: `paragraph`,
      text: `**Key capabilities:**`,
    },
    {
      type: `list`,
      items: [
        { text: `EL completion and validation` },
        { text: `Attribute completion and validation` },
        { text: `Quick fixes for CMS, data, and logic` },
        { text: `Jump-to actions` },
        { text: `Selective validation suppression` },
        { text: `Integrated HTML Dialog preview` },
      ],
    },
  ],
  links: [],
  images: [
    `14.0/html-dialog-development/01-property-overview.png`,
    `14.0/html-dialog-development/02-property-proposal.png`,
    `14.0/html-dialog-development/03-quickfix.png`,
    `14.0/html-dialog-development/04-dialog-preview.png`,
  ],
};

export default section;
