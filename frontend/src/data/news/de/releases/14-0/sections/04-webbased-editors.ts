import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Webbasierte Editoren`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 erweitert die Architektur der webbasierten Editoren erheblich. Weitere Aufgaben der Anwendungsmodellierung und -konfiguration sind nun verfügbar.`,
    },
    { type: `paragraph`, text: `**Zu den Editoren und Werkzeugen gehören:**` },
    {
      type: `list`,
      items: [
        {
          text: `Form Editor mit wiederverwendbaren Komponenten, bearbeitbaren Datentabellen, Validierung und Vorschau`,
        },
        {
          text: `Data Class Editor mit Beziehungsmodellierung und Annotation-Validierung`,
        },
        { text: `Database & SQL Editor mit Verbindungstest` },
        { text: `REST Client Editor mit OpenAPI-Generierung` },
        { text: `Web Service Client Editor mit SOAP-Client-Generierung` },
        { text: `User & Role Editors` },
        { text: `Persistence Editor und Schema-Generierung` },
        { text: `Case Map Editor und Viewer` },
      ],
    },
  ],
};

export default section;
