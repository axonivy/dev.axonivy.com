import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Application Versions`,
  content: [
    {
      type: `paragraph`,
      text: `Application Versions schaffen eine neue Grundlage für die Versionierung und das Lifecycle-Management auf Anwendungsebene. Dadurch werden Projektabhängigkeiten weniger komplex.`,
    },
    { type: `paragraph`, text: `**Wichtige Funktionen:**` },
    {
      type: `list`,
      items: [
        { text: `Versionsmodell auf Anwendungsebene` },
        { text: `Verwaltung von Release-Status` },
        { text: `Anzeige von Versionen im Engine Cockpit` },
        { text: `Migrationsunterstützung für bestehende Engines` },
        { text: `Grundlage für Deployments ohne Ausfallzeit` },
      ],
    },
    {
      type: `paragraph`,
      text: `Das neue Modell verdeutlicht die Beziehungen zwischen einer Anwendung, ihren deployten Versionen, den enthaltenen Projekten und deren Laufzeitstatus.`,
    },
  ],
};

export default section;
