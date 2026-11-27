import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Marketplace`,
  content: [
    {
      type: `paragraph`,
      text: `Der Axon Ivy Marketplace wird um neue Connectoren, Komponenten und Demos sowie eine umfassend aktualisierte CMS Live Editor-Version erweitert. Dadurch lässt sich Ivy einfacher mit den Werkzeugen verbinden, auf die Ihr Unternehmen bereits setzt.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Neue Connectoren`,
          text: `Neue Integrationen für Stripe, Slack, IBM MQ, Keycloak, GitHub, digitale Signaturen mit Sproof und die Verknüpfung von E-Mails mit Ivy-Fällen.`,
        },
        {
          term: `CMS Live Editor 2.0`,
          text: `Geschäftsanwender können Inhalte direkt zur Laufzeit bearbeiten und übersetzen – mit sofortiger Veröffentlichung, Validierung, Rückgängig- und Zurücksetzen-Funktion, Datei-Uploads sowie Export nach ZIP, Excel oder YAML.`,
        },
        {
          term: `Neue Komponenten und Demos`,
          text: `Neue Bausteine und Beispiele umfassen die Visualisierung des Fallfortschritts, CAPTCHA-Schutz, sofort einsatzbereite Muster und modernes Java-basiertes Lasttesten.`,
        },
        {
          term: `Verbesserungen an Connectoren`,
          text: `Die Kafka- und DocuWare-Connectoren erhalten zusätzliche Funktionen.`,
        },
        {
          term: `Marketplace-Website`,
          text: `Intelligentere Suche, übersichtlichere Kategorien, aktualisierte Logos, vollständige deutsche Lokalisierung und ein reibungsloserer Workflow für die Entwicklung und Veröffentlichung von Erweiterungen.`,
        },
      ],
    },
  ],
};

export default section;
