import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Moderne Plattform`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben die Plattform des Designer aktualisiert, damit Ihre tägliche Arbeit noch mehr Freude macht und produktiver wird. Bleiben Sie auf dem neuesten Stand!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Dunkel`,
          text: `Die modernen Themes der Eclipse-Plattform können verwendet werden. Probieren Sie das neue dunkle Theme bei Ihrer nächsten nächtlichen Programmiersitzung aus.`,
        },
        {
          term: `HDPI`,
          text: `Hochauflösende Displays werden jetzt unterstützt. Verwenden Sie gerne ein neues Gerät für die Arbeit mit Axon.ivy.`,
        },
        {
          term: `Skripterstellung`,
          text: `Skript-Editoren unterstützen jetzt Verknüpfungen und die schnelle Navigation zu referenzierten Klassen und Methoden. Mit der Taste <code>F3</code> oder <code>Ctrl + click</code> springen Sie direkt zu einer Ressource.`,
        },
        {
          term: `Marketplace`,
          text: `Der integrierte Eclipse Marketplace bietet Zugriff auf die gesamte Welt der Eclipse-Werkzeuge und macht Sie noch effizienter.`,
        },
      ],
    },
  ],
  linkLabels: [`Eclipse 2019-09`, `Marketplace`],
};

export default section;
