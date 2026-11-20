import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Editor für Konfigurationsdateien`,
  content: [
    {
      type: `paragraph`,
      text: `Mit dem neuen integrierten Editor für Konfigurationsdateien lassen sich Engine-Konfigurationsdateien einfach und komfortabel prüfen und bearbeiten.`,
    },
    {
      type: `paragraph`,
      text: `Beim Bearbeiten unserer wichtigsten YAML-Dateien steht Ihnen eine Vielzahl von Funktionen zur Verfügung:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Validierung`,
          text: `Die in YAML-Dateien verwendeten Schlüssel werden anhand des offiziellen Schemas validiert. Ungültige Werte werden mit einem Warnsymbol markiert.`,
        },
        {
          term: `Vervollständigung`,
          text: `Drücken Sie <code>CTRL</code> + <code>Space</code>, um mit der kontextbezogenen Vervollständigung gültige Konfigurationswerte oder Schlüssel zu finden und auszuwählen.`,
        },
        {
          term: `Hilfe`,
          text: `Wenn Sie auf einen Schlüssel zeigen, wird die passende kontextspezifische Dokumentation direkt im Editor angezeigt.`,
        },
        {
          term: `Formatierung`,
          text: `YAML-Inhalte unterliegen strengen Formatierungsregeln. Der Editor stellt sicher, dass Einrückungen mit Leerzeichen korrekt sind.`,
        },
      ],
    },
  ],
  linkLabels: [`Enginehandbuch`],
};

export default section;
