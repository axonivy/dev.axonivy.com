import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Core`,
  content: [
    {
      type: `paragraph`,
      text: `Rollen und Benutzer als Verantwortliche für Aufgaben und Prozessstarts:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Startrollen`,
          text: `Für ein Startelement können jetzt mehrere Rollen konfiguriert werden. Jede dieser Rollen kann den entsprechenden Prozess starten.`,
        },
        {
          term: `Aufgabenverantwortliche`,
          text: `Aufgaben können jetzt gleichzeitig mehreren Rollen und Benutzern zugewiesen werden. Dynamische temporäre Rollen müssen nicht mehr eigens erstellt werden, um eine Aufgabe mehreren Beteiligten zuzuweisen.`,
        },
        {
          term: `Aufgabenlisten`,
          text: `Sowohl das Portal als auch die Developer Workflow UI zeigen jetzt in der Aufgabenliste alle verantwortlichen Benutzer und Rollen für jede Aufgabe an.`,
        },
        {
          term: `API für Verantwortliche`,
          text: `Neue APIs ermöglichen die Verwaltung und Abfrage der mehreren Rollen und Benutzer, die einer Aufgabe zugewiesen sind.`,
        },
        {
          term: `Leistung`,
          text: `Das Schema der Axon Ivy System Database wurde optimiert und die Implementierungen von TaskQuery und CaseQuery wurden verbessert. Dadurch reagieren Abfragen deutlich schneller.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Startrollen`,
    `Aufgabenverantwortliche`,
    `API für Aufgabenverantwortliche`,
  ],
};

export default section;
