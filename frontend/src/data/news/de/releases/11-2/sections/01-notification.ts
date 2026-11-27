import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Benachrichtigungen`,
  content: [
    {
      type: `paragraph`,
      text: `Benutzerbenachrichtigungen wurden vollständig neu gestaltet, um ein ganzheitliches Benutzererlebnis zu bieten. Endbenutzer profitieren von transparenten Benachrichtigungsabläufen, während Systemadministratoren die vereinfachte Verwaltung schätzen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Kanäle`,
          text: `Die Axon Ivy Engine verfügt über drei integrierte Kanäle: Web, E-Mail und Microsoft Teams.`,
        },
        {
          term: `Vorlagen`,
          text: `Der Inhalt der Benutzerbenachrichtigungen lässt sich über einen standardisierten Vorlagenmechanismus anpassen.`,
        },
        {
          term: `Abonnements`,
          text: `Administratoren können Standardabonnements festlegen, die Benutzer in ihren Profilen selbst anpassen können.`,
        },
        {
          term: `Überwachung`,
          text: `Benachrichtigungen werden protokolliert und können im Axon Ivy Engine Cockpit überwacht werden.`,
        },
      ],
    },
  ],
  linkLabels: [`Konzeptkapitel`, `Enginehandbuch`],
};

export default section;
