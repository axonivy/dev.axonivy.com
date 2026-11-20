import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Wünschen Sie sich ein aufgefrischtes Erscheinungsbild für Ihr vertrautes und beliebtes Engine Cockpit? Möchten Sie Ihre laufenden Services live im Blick behalten? Das wünschen wir uns auch – hier sind die Neuerungen:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Live-Statistiken`,
          text: `Öffnen Sie die neue Seitenleiste, um sich einfach einen Überblick über laufende Services und das System zu verschaffen.`,
        },
        {
          term: `Frisches Erscheinungsbild`,
          text: `Neue Icons, angepasste Farben und einige Feinschliffe lassen das Engine Cockpit noch besser aussehen.`,
        },
        {
          term: `Neue Funktionen`,
          text: `Neue Ansichten wie Backend API, Licence und Web Server geben Ihnen mehr Kontrolle über Ihr laufendes Engine.`,
        },
        {
          term: `Weitere Verbesserungen`,
          text: `Viele weitere Verbesserungen, etwa die optimierte Anwendungsübersicht, erleichtern Ihnen den Alltag.`,
        },
      ],
    },
  ],
  linkLabels: [`Engine Cockpit-Leitfaden`],
};

export default section;
