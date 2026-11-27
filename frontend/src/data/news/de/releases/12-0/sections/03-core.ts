import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Core`,
  content: [
    {
      type: `paragraph`,
      text: `Auch Axon Ivy Core bietet einige spannende neue Funktionen:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Benachrichtigungen`,
          text: `Aufgaben- und Business-Benachrichtigungen können jetzt über verschiedene Kanäle versendet werden, darunter das Portal, E-Mail und Microsoft Teams. Eine neue API ermöglicht den Versand benutzerdefinierter Business-Benachrichtigungen. Benutzer können konfigurieren, welche Benachrichtigungen sie über welche Kanäle erhalten möchten.`,
        },
        {
          term: `CRON`,
          text: `Periodische Jobs sowie Start- und Zwischenevents lassen sich jetzt mit CRON-Ausdrücken planen. Das ermöglicht flexible Zeitpläne – von einmal pro Minute bis hin zu täglichen, wöchentlichen, monatlichen oder jährlichen Abläufen – und bietet mehr Kontrolle über automatisierte Aufgaben.`,
        },
        {
          term: `Developer Workflow UI`,
          text: `Die verbesserte Benutzeroberfläche für Entwickler-Workflows bietet neue Funktionen wie Aufgaben- und Fallnotizen, einfache Statistiken und Benachrichtigungen sowie optimierte Listen für Aufgaben, Fälle und Prozessstarts. Das macht die Arbeit effizienter.`,
        },
        {
          term: `S3-Dokumentspeicher`,
          text: `Workflow-Dokumente können jetzt in S3-kompatiblen Speichersystemen abgelegt werden, die gegenüber herkömmlichem lokalem Speicher viele Vorteile bieten.`,
        },
        {
          term: `Keycloak Identity Provider`,
          text: `Benutzer und Rollen können jetzt in Keycloak verwaltet werden, einem beliebten Open-Source-System für Identity- und Access-Management. Mit Keycloak können Sie Sicherheitsfunktionen Ihrer Wahl wie Multi-Faktor-Authentifizierung integrieren.`,
        },
        {
          term: `Java 21`,
          text: `Nutzen Sie die neuesten Sprachfunktionen von Java 21 in Ihren Projekten und profitieren Sie beim Betrieb Ihrer Engine von allen neuen Leistungsoptimierungen in Java 21.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Benachrichtigungen`,
    `CRON-Konfiguration`,
    `CRON-API`,
    `Developer Workflow UI`,
    `S3-Dokumentspeicher`,
    `Keycloak`,
    `Java 21`,
  ],
};

export default section;
