import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `HTML Dialog-Entwicklung`,
  content: [
    {
      type: `paragraph`,
      text: `Die Entwicklung von HTML Dialogs wird durch eine bessere IDE-Unterstützung ergänzt. Dadurch verkürzt sich die Feedbackschleife zwischen Implementierung, Validierung und Vorschau.`,
    },
    { type: `paragraph`, text: `**Wichtige Funktionen:**` },
    {
      type: `list`,
      items: [
        { text: `EL-Vervollständigung und -Validierung` },
        { text: `Attributvervollständigung und -validierung` },
        { text: `Quick Fixes für CMS, Daten und Logik` },
        { text: `Direktnavigation` },
        { text: `Gezieltes Unterdrücken der Validierung` },
        { text: `Integrierte HTML Dialog-Vorschau` },
      ],
    },
  ],
};

export default section;
