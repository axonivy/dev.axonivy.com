import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Setup Wizard`,
  content: [
    {
      type: `paragraph`,
      text: `Mit dem neuen Theme und der Einführung des Engine Cockpit passt die Engine Config UI nicht mehr zu unseren Produktwerkzeugen. Deshalb haben wir diese Ersteinrichtung als neuen Setup Wizard vollständig neu entwickelt.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `YAML schreiben`,
          text: `Da unsere neue Konfiguration in <code>yaml</code>-Dateien abgelegt wird, speichert der neue Wizard Ihre Einstellungen korrekt.`,
        },
        {
          term: `Bessere Integration`,
          text: `Der Setup Wizard ist Teil des Engine Cockpit, sodass alle seine Bestandteile dort integriert sind.`,
        },
        {
          term: `Verbesserte Oberfläche`,
          text: `Die Benutzeroberfläche entspricht dem Theme der Version 8.0.`,
        },
        {
          term: `Bessere Anleitung`,
          text: `Sie erhalten nun hilfreicheres Feedback, damit Sie Ihr Engine reibungslos konfigurieren können.`,
        },
      ],
    },
  ],
  linkLabels: [`Engine-Handbuch: Setup Wizard`],
};

export default section;
