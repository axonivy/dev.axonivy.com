import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Langsame Anfragen und Traffic-Graph`,
  content: [
    {
      type: `paragraph`,
      text: `Für eine Orchestrierungsplattform wie Axon Ivy sind Werkzeuge zur Problemanalyse entscheidend. Die neuen Ansichten für langsame Anfragen und den Traffic-Graph im Engine Cockpit liefern alle Informationen, die Sie benötigen, um die Ursachen von Problemen in Ihrer orchestrierten Lösung zu finden.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Langsame Anfragen`,
          text: `Sehen Sie sich die langsamsten Anfragen an. Öffnen Sie eine Anfrage, um zu sehen, welche Systeme sie aufruft.`,
        },
        {
          term: `Traffic-Graph`,
          text: `Erhalten Sie einen Überblick über den ein- und ausgehenden Datenverkehr. In einem Diagramm sehen Sie, welches System Fehler zurückgibt oder Anfragen nur langsam beantwortet.`,
        },
      ],
    },
  ],
  linkLabels: [`Langsame Anfragen`, `Traffic-Graph`],
};

export default section;
