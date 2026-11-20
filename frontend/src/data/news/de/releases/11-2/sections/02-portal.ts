import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Axon Ivy Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Das Portal bietet neue Funktionen wie Benachrichtigungen, Erweiterungen für Portal-Dashboards und zahlreiche Verbesserungen für ein reibungsloseres und effizienteres Benutzererlebnis.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Benachrichtigungen`,
          text: `Das Portal integriert nahtlos den überarbeiteten Benachrichtigungsdienst der Axon Ivy Engine. Die Benachrichtigungen werden prominent in der Portaloberfläche angezeigt. Benutzer können sie filtern, als gelesen markieren und ihre Einstellungen effizient verwalten. Außerdem können sie verschiedene Benachrichtigungskanäle abonnieren oder abbestellen und so ihr persönliches Benachrichtigungserlebnis gestalten.`,
        },
        {
          term: `Lazy Loading für Aufgaben- und Falllisten`,
          text: `Wir haben die Aufgaben- und Falllisten optimiert und die Seitennummerierung durch Lazy Loading ersetzt.`,
        },
        {
          term: `KI-Übersetzungen`,
          text: `Dank der Möglichkeit, DeepL in das Portal zu integrieren, lassen sich mehrsprachige Dashboards besonders einfach erstellen. Widget-Titel und veröffentlichte Nachrichten im News-Widget können mithilfe von KI mühelos übersetzt werden.`,
        },
        {
          term: `Import, Export und Freigabe von Portal-Dashboards`,
          text: `Mit Import- und Exportfunktionen können Sie Dashboards nahtlos zwischen verschiedenen Umgebungen verschieben und duplizieren. Durch die Freigabe individueller Dashboards per Link können Teams außerdem einfacher zusammenarbeiten.`,
        },
        {
          term: `Verbesserte Zugänglichkeit benutzerdefinierter Dashboard-Widgets`,
          text: `Das benutzerdefinierte Widget kann einen vordefinierten Ivy-Prozess direkt eingebettet in einem Dashboard-Widget anzeigen. Wenn Sie diese Funktion verwenden, können Sie verfügbare benutzerdefinierte Widgets jetzt viel einfacher auswählen und zum Dashboard hinzufügen.`,
        },
      ],
    },
    { type: `paragraph`, text: `Und vieles mehr:` },
    {
      type: `list`,
      items: [
        {
          text: `Benutzerdefinierte Reihenfolge der Prozesse im Prozess-Widget des Dashboards`,
        },
        {
          text: `Weitere geschäftliche Aufgaben- und Fallstatus aus Sicht der Endbenutzer`,
        },
        { text: `Skeleton Loading im Portal` },
      ],
    },
  ],
  linkLabels: [`Portal`],
};

export default section;
