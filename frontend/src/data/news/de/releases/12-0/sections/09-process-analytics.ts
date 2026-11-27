import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Process Analytics`,
  content: [
    {
      type: `paragraph`,
      text: `Die Nutzung Ihrer Prozesse lässt sich jetzt visualisieren. So können Sie Engpässe leichter erkennen und die wichtigsten Einflussfaktoren bestimmen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `KPI`,
          text: `Häufigkeit und Dauer eines Prozesslaufs lassen sich analysieren.`,
        },
        {
          term: `Zeitintervall`,
          text: `Sie können das Zeitintervall für die Auswertung festlegen.`,
        },
        {
          term: `Benutzerdefinierter Filter`,
          text: `Sie können die Daten filtern.`,
        },
        {
          term: `Export`,
          text: `Analysieren Sie die Daten anhand benutzerdefinierter Filter für einzelne Prozesse, beispielsweise nach juristischen Einheiten, Abteilungen oder ähnlichen Kriterien – je nachdem, welche Daten für den jeweiligen Prozess verfügbar sind.`,
        },
      ],
    },
  ],
};

export default section;
