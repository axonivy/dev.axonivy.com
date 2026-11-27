import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Business Notification API`,
  content: [
    {
      type: `paragraph`,
      text: `Die mit Version 11.2 eingeführte Benachrichtigungsfunktion wurde weiter ausgebaut.`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Halten Sie Benutzer eines Prozesses mit der neuen API durch Business-Benachrichtigungen auf dem Laufenden.`,
        },
        {
          text: `Benachrichtigungen wurden optimiert und verbessert und sehen besser aus als je zuvor.`,
        },
        {
          text: `Mit dem neuen Link zu Aufgaben- oder Falldetails in Benachrichtigungen sind alle Informationen für die tägliche Arbeit nur einen Klick entfernt.`,
        },
        {
          text: `Passen Sie die Benachrichtigung zu einer Aufgabe mit selbst erstellten Vorlagen an die Anforderungen Ihres Prozesses an.`,
        },
      ],
    },
  ],
  linkLabels: [`Konzeptkapitel`, `Enginehandbuch`],
};

export default section;
