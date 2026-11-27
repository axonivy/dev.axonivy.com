import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Developer Workflow UI`,
  content: [
    {
      type: `paragraph`,
      text: `Die völlig neue Developer Workflow UI erleichtert Entwicklern das Erstellen und Bearbeiten von Workflows und Prozessen. Sie basiert auf JSF und ersetzt die bisherige JSP Designer Workflow UI.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Informationen leicht zugänglich`,
          text: `Das moderne Design erleichtert das Auffinden von Informationen zu Aufgaben, Cases und mehr.`,
        },
        {
          term: `Zuletzt gestartete Elemente`,
          text: `Zuletzt gestartete Prozesse und Case Maps werden auf der Homepage aufgelistet und lassen sich von dort einfach erneut starten.`,
        },
        {
          term: `Iframe-Unterstützung`,
          text: `Prozesse und Aufgaben werden in einem Iframe gestartet.`,
        },
      ],
    },
  ],
};

export default section;
