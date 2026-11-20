import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Axon Ivy Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Die Benutzererfahrung hat bei Projekten zur Prozessautomatisierung höchste Priorität. Deshalb wurde das Axon Ivy Portal umfassend erweitert.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Anpassbares Dashboard`,
          text: `Endbenutzer können zwischen verschiedenen Layouts wählen, Standardspalten ein- und ausblenden und beliebige eigene Spalten hinzufügen.`,
        },
        {
          term: `Standard-Widgets`,
          text: `Das Axon Ivy Portal bietet ein ausgefeiltes Konzept mit Standard-Widgets für Prozessstarts, Aufgabenlisten und Case-Listen.`,
        },
        {
          term: `Benutzerdefinierte Widgets`,
          text: `Individualität zählt. Endbenutzer können im Dashboard ganz einfach eigene Widgets erstellen.`,
        },
        {
          term: `Anpassbare Prozessliste`,
          text: `Wechseln Sie zwischen Bild-, Raster- und Kompaktansicht, um verfügbare Prozesse darzustellen.`,
        },
      ],
    },
  ],
  linkLabels: [`Neues und Wissenswertes zum Portal`],
};

export default section;
