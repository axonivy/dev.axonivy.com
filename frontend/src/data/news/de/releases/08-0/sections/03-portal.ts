import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben die Portal-Anwendung vollständig neu gestaltet und zahlreiche neue Funktionen eingebaut.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Gruppenchat`,
          text: `Starten Sie sofort Chats mit anderen Workflow-Benutzern, auch mit Bezug zu einem Case.`,
        },
        {
          term: `Ankündigungen`,
          text: `Informieren Sie bequem und mehrsprachig über geplante Wartungsarbeiten und andere allgemeine Ankündigungen.`,
        },
        {
          term: `Express-Datenanbieter`,
          text: `Fügen Sie eigene Datenquellen hinzu, um Daten für Axon.ivy Express-Formular-Widgets bereitzustellen.`,
        },
      ],
    },
  ],
  linkLabels: [`Portal New & Noteworthy`],
};

export default section;
