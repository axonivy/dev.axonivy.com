import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Internationalization`,
  anchor: `internationalization`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 extends internationalization support across the platform, providing a stronger foundation for multilingual applications and platform interfaces.`,
    },
    { type: `paragraph`, text: `**Key improvements include:**` },
    {
      type: `list`,
      items: [
        { text: `More user-facing texts available for translation` },
        {
          text: `Support for additional languages, including German and Japanese`,
        },
        {
          text: `More consistent internationalization across platform components`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `These improvements make Axon Ivy better suited for applications and teams operating across different languages and regions.`,
    },
  ],
  images: [
    `14.0/internationalization/01-german-version.png`,
    `14.0/internationalization/02-japanese-version.png`,
  ],
};

export default section;
