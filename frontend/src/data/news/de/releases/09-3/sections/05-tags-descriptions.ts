import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Tags und Beschreibungen`,
  content: [
    {
      type: `paragraph`,
      text: `Ergänzen Sie Ihre Prozesselemente um Metainformationen, damit sie leichter zu finden und aufzurufen sind.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Tags`,
          text: `Kennzeichnen Sie Ihre Prozesselemente mit Tags, damit Sie sie in Ihren Projekten leicht finden. Einige Tags wie <code>Deprecated</code>, <code>Connector</code> oder <code>Demo</code> haben eine besondere Bedeutung.`,
        },
        {
          term: `Parameterbeschreibung`,
          text: `Beschreiben Sie die Parameter von Startelementen, um Aufrufern hilfreiche Hinweise zu geben.`,
        },
      ],
    },
  ],
  linkLabels: [`Tags`, `Start-Tab`],
};

export default section;
