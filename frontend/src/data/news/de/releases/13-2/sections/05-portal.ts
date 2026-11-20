import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Portal 13.2 bietet schnellere Navigation, aussagekräftigere Analysen und flexiblere Prozessbearbeitung. Verbesserte Barrierefreiheit, neue Statistikfunktionen und Side Step Processes machen die tägliche Arbeit reibungsloser, übersichtlicher und effizienter.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Statistiken`,
          text: `Mit dem Portal Statistics Widget Configurator erstellen Sie mit wenigen Klicks aussagekräftige Einblicke in Ihre Prozess- und Geschäftsdaten.`,
          items: [
            {
              text: `Bedingungsbasierte Einfärbung für sofortige KPI-Übersicht`,
            },
            {
              text: `KPI-basierte Diagramme mit benutzerdefinierten Feldern für individuelle Analysen`,
            },
            { text: `Von Diagrammen direkt zu Tasks und Fällen navigieren` },
            {
              text: `Vorkonfigurierte Beispieldashboards für eine schnelle Einrichtung`,
            },
          ],
        },
        {
          term: `Barrierefreiheit`,
          text: `Verbesserte Fokusreihenfolge, optimierte Tastaturnavigation, optimierte ARIA-Landmarks und bessere Screenreader-Kompatibilität. Höhere Kontraste, einheitliche Beschriftungen und vollständige Unterstützung von Alternativtexten sorgen für ein modernes, WCAG-konformes Nutzungserlebnis.`,
        },
        {
          term: `Side Step Process`,
          text: `Pausieren Sie einen aktiven Workflow oder zweigen Sie davon ab, ohne den Hauptfall zu unterbrechen. Ideal für Rückfragen, zusätzliche Informationsanforderungen oder parallele Teilprozesse. Vollständig mehrsprachig und für globale Teams geeignet.`,
        },
        {
          term: `Statische Seiten`,
          text: `Fügen Sie eigene Informations- oder Hilfeseiten direkt in die Portalnavigation ein. Vollständig gestaltet, lokalisierbar, über Berechtigungen steuerbar und nahtlos in das Portal-Layout integriert.`,
        },
      ],
    },
    { type: `paragraph`, text: `Und vieles mehr` },
    {
      type: `list`,
      items: [
        { text: `Verbesserte Stabilität bei inaktiven Browser-Tabs` },
        { text: `Korrekturen bei Inkonsistenzen in mehrsprachigen Inhalten` },
        { text: `Bessere Verarbeitung von Tastenkürzeln in Info-Widgets` },
        { text: `Robusteres Benutzermenü und verbesserte Filter` },
        { text: `Schnelleres Laden großer UI-Elemente` },
        { text: `Verbesserte Verarbeitung von Falldetails` },
        {
          text: `Sicherere Workflows für gestreamte Inhalte und das Löschen von Dateien`,
        },
      ],
    },
  ],
  linkLabels: [
    `Statistikdiagramm`,
    `Barrierefreiheit`,
    `Statische Seiten`,
    `Portal`,
  ],
};

export default section;
