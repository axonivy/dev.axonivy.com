import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Internationalisierung`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 erweitert die Internationalisierungsunterstützung auf der gesamten Plattform und schafft eine bessere Grundlage für mehrsprachige Anwendungen und Plattformoberflächen.`,
    },
    { type: `paragraph`, text: `**Wichtige Verbesserungen:**` },
    {
      type: `list`,
      items: [
        { text: `Weitere Texte für Benutzeroberflächen sind übersetzbar` },
        {
          text: `Unterstützung zusätzlicher Sprachen, darunter Deutsch und Japanisch`,
        },
        {
          text: `Einheitlichere Internationalisierung über alle Plattformkomponenten hinweg`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Dadurch eignet sich Axon Ivy besser für Anwendungen und Teams, die in verschiedenen Sprachen und Regionen arbeiten.`,
    },
  ],
};

export default section;
