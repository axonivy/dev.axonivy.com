import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Assistent zur Projektkonvertierung`,
  content: [
    {
      type: `paragraph`,
      text: `Ein Axon Ivy-Projekt auf die neueste Version und aktuelle Technologien umzustellen war noch nie so einfach.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Assistent zur Projektkonvertierung`,
          text: `Der überarbeitete Assistent konvertiert Axon Ivy-Projekte auf die neueste Version. Außerdem unterstützt er jetzt die Umstellung von PrimeFaces 7 auf 11 und von Webservice-Clients von Axis auf CXF.`,
        },
        {
          term: `Automatische Konvertierung`,
          text: `Die Axon Ivy Engine konvertiert alle bereitgestellten Projekte automatisch auf die neueste Version.`,
        },
        {
          term: `Java 17`,
          text: `Nutzen Sie nach der Konvertierung Ihrer Projekte die leistungsstarken neuen Funktionen von Java 17.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Projekte konvertieren`,
    `PrimeFaces 11 – Migration`,
    `Axis entfernen`,
    `Java 17`,
  ],
};

export default section;
