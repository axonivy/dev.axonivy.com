import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben das Engine Cockpit um erstklassige Funktionen für Überwachung, Benutzerverwaltung, Betrieb und Konfiguration erweitert.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Konfiguration`,
          text: `Die neue Ansicht „System/SSL“ dient zur Verwaltung Ihrer Zertifikate. Mit dem neuen Editor für Systemkonfigurationsdateien können Sie beliebige Konfigurationsdateien anzeigen und bearbeiten.`,
        },
        {
          term: `Benutzerverwaltung`,
          text: `In der Benutzeransicht werden Stellvertretungen und Abwesenheiten angezeigt. Die Konfigurationsansicht für Identity Provider wurde neu implementiert und enthält jetzt einen Verzeichnisbrowser für Microsoft Entra ID (früher als Azure AD bekannt).`,
        },
        {
          term: `Betrieb`,
          text: `Starten Sie die Axon Ivy Engine über das Engine Cockpit neu. Führen Sie Sicherheitskontexte zusammen und verschieben Sie Anwendungen, um Ihre Axon Ivy Engine von LTS 8 zu migrieren.`,
        },
        {
          term: `Überwachung`,
          text: `Analysieren Sie mit den neuen Ansichten für Class Histogram, Threads und Flight Recorder Speicherlecks, Leistungsengpässe oder Endlosschleifen. Außerdem wurden Ansichten für Benachrichtigungen, Dokumente, Start Events und Intermediate Events hinzugefügt.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Das Engine Cockpit ist jetzt auch im Axon Ivy Designer verfügbar. Die Einstellungen für SSL-Clients und E-Mail wurden entfernt. Verwenden Sie für diese Konfigurationen das Engine Cockpit.`,
    },
  ],
  linkLabels: [`Engine Cockpit`],
};

export default section;
