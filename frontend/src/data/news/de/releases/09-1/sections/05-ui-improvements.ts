import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Allgemeine Verbesserungen der Benutzeroberfläche und UX`,
  content: [
    {
      type: `paragraph`,
      text: `Als wir damit begannen, unser Theme anpassbar zu machen, haben wir zahlreiche Verbesserungen an unseren internen Seiten vorgenommen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Farben anpassen`,
          text: `Unser Serenity-ivy-Theme bietet CSS-Variablen, mit denen sich Farben einfach ändern lassen.`,
        },
        {
          term: `Benutzerfreundliche Fehlerseiten`,
          text: `Ein übersichtliches und benutzerfreundliches Design für unsere internen Fehlerseiten.`,
        },
        {
          term: `Übersichtliche Infoseite`,
          text: `Eine neue, klare und moderne Server-Infoseite.`,
        },
      ],
    },
  ],
  linkLabels: [`Farben anpassen`],
};

export default section;
