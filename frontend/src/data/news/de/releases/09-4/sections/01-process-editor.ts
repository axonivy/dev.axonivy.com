import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Neuer Prozesseditor`,
  content: [
    {
      type: `paragraph`,
      text: `Version 9.4 ersetzt den alten AWT-basierten Prozesseditor durch eine neue, vollständig webbasierte Alternative. Mit dem neuen Editor können Sie Geschäftsprozesse noch schneller umsetzen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Browserkompatibel`,
          text: `Der neue Prozesseditor basiert auf nativen Webtechnologien.`,
        },
        {
          term: `Elementpalette`,
          text: `Die Elementpalette ist jetzt in verschiedene Kategorien unterteilt, damit Sie das gewünschte Element leichter finden.`,
        },
        {
          term: `Schnellaktionen`,
          text: `Neben dem neuen Erscheinungsbild der Editoransicht gibt es eine neue Möglichkeit, mit Prozesselementen zu interagieren. Die Schnellaktionsleiste bietet verschiedene Aktionen, die Sie auslösen können (z. B. eine Inscription-Maske öffnen oder ein neues Element hinzufügen).`,
        },
        {
          term: `Prozess-Viewer auf der Engine`,
          text: `Die <code>Dev-Workflow-UI</code> und das <code>Axon Ivy Portal</code> stellen jetzt einen Prozess-Viewer bereit.`,
        },
      ],
    },
  ],
  linkLabels: [`Designerhandbuch`],
};

export default section;
