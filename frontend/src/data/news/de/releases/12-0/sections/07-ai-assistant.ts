import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Lernen Sie Ihren neuen AI Assistant kennen`,
  content: [
    {
      type: `paragraph`,
      text: `Mit LTS 12 erreicht das Portal-Erlebnis durch die Einführung des AI Assistant eine neue Stufe. Als virtueller Partner unterstützt er Sie dynamisch bei einer Vielzahl von Aufgaben – von der Dokumentensuche bis hin zur Aufgaben- und Prozessverwaltung.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Portalunterstützung`,
          text: `Der AI Assistant kennt die Axon Ivy-Dokumentation; Sie können außerdem eigene Dokumentation hinzufügen.`,
        },
        {
          term: `Aufgaben- und Prozessverwaltung`,
          text: `Der AI Assistant kann Aufgaben und Prozesse starten.`,
        },
        {
          term: `Suche und Filter`,
          text: `Er kann Aufgaben und Fälle suchen und filtern.`,
        },
        {
          term: `Mehrsprachige Unterstützung`,
          text: `Unterstützung in mehreren Sprachen.`,
        },
        {
          term: `Anpassbare Assistenten`,
          text: `Erstellen Sie themenbezogene und personalisierte Assistenten.`,
        },
        {
          term: `Modellbasierte KI`,
          text: `Assistenten werden mit benutzerdefinierten Modellen erstellt und verwaltet.`,
        },
        {
          term: `Benutzerdefinierte Ivy AI Flows`,
          text: `Erstellen Sie eine eigene KI-Logik, die in der Axon Ivy-Umgebung einen Mehrwert bietet.`,
        },
      ],
    },
  ],
};

export default section;
