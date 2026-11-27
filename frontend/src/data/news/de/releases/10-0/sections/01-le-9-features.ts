import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Alle 9.x-LE-Funktionen`,
  content: [
    {
      type: `paragraph`,
      text: `Diese neue LTS-Version enthält alle aktuellen 9.x-LE-Funktionen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `<a href="/news/9.1">9.1</a>`,
          text: `Effiziente Benutzerskalierung und vereinfachtes Testen`,
        },
        {
          term: `<a href="/news/9.2">9.2</a>`,
          text: `OpenAPI-Funktionen und Axon Ivy Market`,
        },
        {
          term: `<a href="/news/9.3">9.3</a>`,
          text: `Mit Ihrem Unternehmen wachsen und Konfigurationsdateien vereinfachen`,
        },
        {
          term: `<a href="/news/9.4">9.4</a>`,
          text: `Neuer Prozesseditor und Kontext für mehrere Anwendungen`,
        },
      ],
    },
  ],
  linkLabels: [`Release 10.0`, `Neuigkeiten zu 9.x`],
};

export default section;
