import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Das Engine Cockpit wurde um neue Funktionen erweitert, die den Betrieb vereinfachen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Migrationsassistent`,
          text: `Der Migrationsassistent wurde neu gestaltet und unterstützt bei der Migration einer Engine zwischen Versionen – beispielsweise beim Wechsel von einer LTS-Version (Long-Term Support) zur nächsten oder zwischen Update-Releases.`,
        },
        {
          term: `Health Check`,
          text: `Der neue Health-Check-Service führt verschiedene Prüfungen durch, um den Zustand der Engine zu analysieren, und warnt bei potenziellen Problemen.`,
        },
        {
          term: `SSL-/TLS-Tester`,
          text: `Schlüssel und Zertifikate lassen sich jetzt in der SSL-Ansicht verwalten. Mit dem TLS-Tester überprüfen Sie Verbindungen zu Datenbanken sowie REST- und SOAP-Diensten und können fehlende Zertifikate importieren.`,
        },
        {
          term: `Monitoring`,
          text: `Die Monitoring-Funktionen umfassen jetzt elf neue Ansichten, darunter System Database Info, Class Histogram, Threads, Flight Recorder, Notifications, Session, Jobs, Health, Documents, Start Events und Intermediate Events. So erhalten Sie bessere Einblicke in den Betrieb.`,
        },
        {
          term: `Sicherheitsexport`,
          text: `Benutzer, Rollen, Benutzer-Rollen-Zuweisungen und Berechtigungen können zur Unterstützung von Audits oder Dokumentationen in Excel-Dateien exportiert werden.`,
        },
        {
          term: `Eigenschaften und Funktionen`,
          text: `Eigenschaften und Funktionen von REST-Clients oder SOAP-Webservices lassen sich direkt im Cockpit bearbeiten.`,
        },
        {
          term: `Weitere Verbesserungen`,
          text: `Verbesserte Browser für Active Directory und Entra ID, ein optimierter Konfigurationseditor, eine aktualisierte Suchmaschinenansicht, die Verwaltung von Benutzervertretungen und Abwesenheiten sowie Optionen zum Zusammenführen und Ändern des Sicherheitssystems einer Anwendung.`,
        },
      ],
    },
  ],
  linkLabels: [`Engine Cockpit`],
};

export default section;
