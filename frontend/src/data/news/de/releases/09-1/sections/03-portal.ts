import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Das neue glänzende Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Neben vielen Verbesserungen der Benutzerfreundlichkeit und Benutzeroberfläche bietet das Portal einige coole neue Funktionen!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Einführungsleitfaden`,
          text: `Willkommensleitfaden für neue Benutzer.`,
        },
        {
          term: `Mein Profil`,
          text: `Neue, vereinfachte Ansicht der Einstellungen für E-Mail und Sprache.`,
        },
        {
          term: `Neue Abwesenheitsverwaltung`,
          text: `Ein modernes Erscheinungsbild für die Verwaltung von Abwesenheiten mit verbesserten Stellvertretungsfunktionen und mehr Transparenz.`,
        },
      ],
    },
  ],
  linkLabels: [`Neues und Wissenswertes zum Portal`],
};

export default section;
