import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Unser neues Engine Cockpit ist nun ein leistungsstarker Nachfolger der AdminUI mit einem umfangreichen Funktionsumfang. Es basiert vollständig auf Webtechnologien und lässt sich einfach im bevorzugten Browser oder sogar auf Mobilgeräten öffnen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Konfiguration`,
          text: `System- und Anwendungskonfigurationen lassen sich effizient prüfen und ändern.`,
        },
        {
          term: `Administration`,
          text: `Verwalten Sie Ihre Sicherheitssysteme im Cockpit. Benutzer hinzufügen, Rollen ändern und Eigenschaften bearbeiten – all das ist mit den neuen Sicherheitstools möglich.`,
        },
        {
          term: `Externe Dienste`,
          text: `Im Cockpit können die vom Engine verwendeten Datenbanken sowie SOAP- und REST-Webservices angezeigt, konfiguriert und getestet werden. Zusätzlich lassen sich der laufende Elasticsearch-Server anzeigen und Abfragen ausführen.`,
        },
        {
          term: `Lizenz`,
          text: `Die Engine-Lizenz lässt sich im Cockpit aktualisieren. Läuft Ihre Lizenz bald ab, können Administratoren den Verlängerungsprozess direkt im Cockpit starten.`,
        },
        {
          term: `Überwachung`,
          text: `Eine neue übersichtliche Ansicht ermöglicht die Prüfung aktueller Logs und deren Export als ZIP-Dateien. Der Dateizugriff auf das Engine ist dadurch nicht mehr erforderlich und die Datenerfassung wird sehr einfach.`,
        },
        {
          term: `Anwendungen`,
          text: `Verwalten Sie Ihre laufenden Anwendungen direkt im Cockpit. Starten, stoppen, freigeben und weitere Aktionen sind möglich. Auch *.iar- oder *.zip-Dateien lassen sich direkt über das Web bereitstellen.`,
        },
        {
          term: `System`,
          text: `Administratoren oder die Systemdatenbank zu verwalten war noch nie so einfach! Sie müssen Ihre Systemdatenbank migrieren? Erledigen Sie das direkt im Cockpit.`,
        },
        {
          term: `Mehr`,
          text: `Das Cockpit kann noch viel mehr. Probieren Sie es aus!`,
        },
      ],
    },
  ],
  linkLabels: [`Engine-Cockpit-Handbuch`],
};

export default section;
