import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Tabler Icons & Visual Modernization`,
  anchor: `tabler-icons-visual-modernization`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 introduces **Tabler Icons** as the modern icon set across the platform, replacing deprecated Streamline and Font Awesome icons.`,
    },
    { type: `paragraph`, text: `**Key improvements include:**` },
    {
      type: `list`,
      items: [
        { text: `Tabler Icons integrated into the core platform` },
        { text: `Updated icons across editors and selectors` },
        { text: `Updated icons in project and file views` },
      ],
    },
    {
      type: `paragraph`,
      text: `This provides a more consistent and modern visual language across development and administration interfaces.`,
    },
  ],
  images: [
    `14.0/tabler-icons-visual-modernization/01-icon-showcase.png`,
    `14.0/tabler-icons-visual-modernization/02-icon-overview.png`,
  ],
};

export default section;
