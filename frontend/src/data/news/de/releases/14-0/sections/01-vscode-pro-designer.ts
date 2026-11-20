import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `VS Code PRO Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Visual Studio Code ist die Entwicklungsumgebung für die PRO-Entwicklung mit Axon Ivy. Der VS Code PRO Designer integriert den gesamten Entwicklungsworkflow in eine moderne IDE.`,
    },
    { type: `paragraph`, text: `**Wichtige Funktionen:**` },
    {
      type: `list`,
      items: [
        { text: `Projekt- und Workspace-Verwaltung` },
        { text: `Import und Export von Ivy Archives und Anwendungs-ZIPs` },
        { text: `Abhängigkeitsverwaltung` },
        { text: `Engine starten, anhalten und konfigurieren` },
        {
          text: `Die Statusleiste zeigt den aktuellen Status von Engine und Designer an`,
        },
        { text: `Prozess-Debugging, Prozessverlauf und Runtime-Log` },
        { text: `Anwendungsvorschau` },
        { text: `Workspace-Diagnose und Problems-Ansicht` },
        { text: `Maven-Build-Integration` },
      ],
    },
  ],
};

export default section;
