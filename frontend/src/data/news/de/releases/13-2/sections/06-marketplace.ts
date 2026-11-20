import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Marketplace`,
  content: [
    { type: `paragraph`, text: `Neue Market-Erweiterungen` },
    {
      type: `list`,
      items: [
        {
          term: `Case Process Viewer`,
          text: `Eine neue UI-Komponente visualisiert den aktuellen Prozessschritt direkt in der Axon Ivy UI und lässt sich mit einer einzigen Codezeile integrieren.`,
        },
        {
          term: `Chaptcha Utils`,
          text: `Ein sofort einsatzbereiter CAPTCHA-Helfer ermöglicht die einfache Integration einer menschlichen Verifizierung in Axon Ivy UIs und erhöht so die Sicherheit.`,
        },
        {
          term: `Überarbeitete Dokumentenverarbeitung`,
          text: `Die Dokumentenverarbeitung ist jetzt als leichtgewichtige, modulare Komponenten (Axon Ivy Cells, Axon Ivy Words, ...) statt als einzelnes großes SDK verfügbar. Die aktuellen Module richten sich an PRO-Entwickler; Unterstützung für Textverarbeitung sowie PDF- und Bildgenerierung ist geplant.`,
        },
        {
          term: `Verbesserungen am Process Analyser`,
          text: `Der Process Analyzer lässt sich jetzt einfacher ohne zusätzliche Zählelemente verwenden und bietet verbesserte Datenanalysen, eine neue Heatmap, zusammengefasste Analysen von Prozessstarts sowie die direkte Integration als Portal-Widget.`,
        },
        {
          term: `Neuer Mail-Connector`,
          text: `Ein neuer Email Connector ermöglicht das Senden und Empfangen fallbezogener E-Mails mit automatischer Verknüpfung zum Fall für eine lückenlose Kommunikationsverfolgung. Über eine intuitive UI unterstützt er das Senden, Empfangen, Beantworten, Weiterleiten und erneute Senden.`,
        },
        {
          term: `Azure Service Bus Connector`,
          text: `Die neue Unterstützung für Azure Service Bus ermöglicht das Senden und Empfangen von Nachrichten über Queues und Topics mit mehreren konfigurierbaren Verbindungen.`,
        },
        {
          term: `IBM Db2 LUW`,
          text: `Dieser Connector stellt einen JDBC-Treiber für die IBM-Datenbank DB2 (Linux, Unix, Windows) bereit.`,
        },
      ],
    },
    { type: `paragraph`, text: `Verbesserungen an der Marketplace-Website` },
    {
      type: `list`,
      items: [
        { text: `Verbesserte Monitoring-UI für mehr Transparenz` },
        {
          text: `Vereinfachte Veröffentlichung über einen GitHub-Workflow mit wenigen Klicks`,
        },
        { text: `Neue Drag-and-drop-Vorschau für Artefakte` },
        {
          text: `Übersichtlichere und besser lesbare Änderungsprotokolle der Erweiterungen`,
        },
      ],
    },
  ],
  linkLabels: [
    `Case Process Viewer`,
    `Captcha Utils`,
    `Axon Ivy Cells`,
    `Axon Ivy Words`,
    `Process Analyser`,
    `Case Mail Component`,
    `Azure Service Bus`,
    `IBM DB2 LUW`,
    `Zum Axon Ivy Market beitragen`,
    `Market Monitoring`,
  ],
};

export default section;
