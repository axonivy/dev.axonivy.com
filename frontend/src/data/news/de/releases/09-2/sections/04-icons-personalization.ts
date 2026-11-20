import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Icons und Personalisierung`,
  content: [
    {
      type: `paragraph`,
      text: `Verleihen Sie Ihren Prozessdesigns das gewisse Etwas: Passen Sie Prozesselemente mit Dekorator-Icons Ihrer Wahl an.`,
    },
    {
      type: `paragraph`,
      text: `Passen Sie Ihre Prozessliste an das individuelle Profil Ihres Unternehmens an und kategorisieren Sie sie, indem Sie für jeden Start ein Icon und eine Kategorie festlegen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Icon und Kategorie für Prozessstarts`,
          text: `Legen Sie für jeden Prozessstart ein Icon fest und kategorisieren Sie ihn, um das Erscheinungsbild der Prozessliste anzupassen.`,
        },
        {
          term: `Dekorator-Icons für Prozesselemente`,
          text: `Verbessern Sie Ihre Prozessdesigns, indem Sie Icons für REST-Client-, Webservice- und Datenbankkonfigurationen festlegen. Diese Icons werden anschließend in allen Prozesselementen und Auswahlfenstern verwendet.`,
        },
        {
          term: `Dekorator-Icons für Call Sub`,
          text: `Ergänzen Sie Ihre Callable Sub Processes um benutzerdefinierte Icons. Diese werden in Call-Sub-Prozesselementen sowohl bei der Auswahl des Subprozesses als auch als Dekorator-Icon verwendet.`,
        },
        {
          term: `Dokumentation für Call Sub`,
          text: `Machen Sie Ihre Callable Sub Processes für andere Entwickler einfacher nutzbar, indem Sie Tags, Beschreibungen und Parameterbeschreibungen hinzufügen. Diese Informationen erscheinen im Call-Sub-Prozesselement bei der Auswahl von Starts und der Definition von Ein-/Ausgabemappings sowie im Attribute Browser.`,
        },
      ],
    },
  ],
};

export default section;
