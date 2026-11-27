import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Java 11 LTS`,
  content: [
    {
      type: `paragraph`,
      text: `Axon.ivy läuft jetzt mit Java 11, der neuesten LTS-Laufzeitumgebung für Java.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Modern`,
          text: `Nutzen Sie die neuesten Sprachfunktionen wie <code>var</code> und moderne, auf Java 11 basierende Bibliotheken.`,
        },
        {
          term: `Sicher`,
          text: `Verlassen Sie sich beim Betrieb Ihrer Lösung auf die neuesten Wartungsupdates.`,
        },
        {
          term: `Schlank`,
          text: `Die Java-Laufzeitumgebung ist schnell wie ein Fuchs: Optionale Funktionen werden separat veröffentlicht und der verbleibende Kern wurde konsequent verschlankt.`,
        },
      ],
    },
  ],
  linkLabels: [`Migrationshinweise zu Java 11`],
};

export default section;
