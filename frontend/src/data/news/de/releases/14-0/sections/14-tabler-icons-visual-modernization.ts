import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Tabler Icons & visuelle Modernisierung`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 führt **Tabler Icons** als modernes plattformweites Icon-Set ein und ersetzt damit die veralteten Streamline- und Font-Awesome-Icons.`,
    },
    { type: `paragraph`, text: `**Wichtige Verbesserungen:**` },
    {
      type: `list`,
      items: [
        { text: `Tabler Icons sind in die Core-Plattform integriert` },
        { text: `Aktualisierte Icons in Editoren und Auswahlfeldern` },
        { text: `Aktualisierte Icons in Projekt- und Dateiansichten` },
      ],
    },
    {
      type: `paragraph`,
      text: `So entsteht eine einheitlichere und modernere Bildsprache in Entwicklungs- und Administrationsoberflächen.`,
    },
  ],
};

export default section;
