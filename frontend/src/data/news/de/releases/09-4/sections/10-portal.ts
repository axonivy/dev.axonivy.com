import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Axon Ivy Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Mehr Möglichkeiten für Endbenutzer: Das Axon Ivy Portal präsentiert sich in neuem Design und lässt sich vollständig anpassen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Willkommensseite`,
          text: `Für den ersten Eindruck gibt es keine zweite Chance. Gestalten Sie eine eigene Willkommensseite für Ihre Endbenutzer.`,
        },
        {
          term: `Freya-Theme`,
          text: `Entdecken Sie das neue, hochmoderne PrimeFaces-Theme mit Dark Mode und vielen weiteren Funktionen.`,
        },
        {
          term: `Avatare`,
          text: `Verleihen Sie dem Axon Ivy Portal mit Avataren eine persönliche Note.`,
        },
        {
          term: `Dashboard-Konfiguration`,
          text: `Ein intuitiver Assistent führt Sie Schritt für Schritt durch die Konfiguration Ihrer Dashboards.`,
        },
        {
          term: `Passwortvalidierung`,
          text: `Legen Sie globale Passwortrichtlinien fest und passen Sie diese bis ins Detail an.`,
        },
      ],
    },
  ],
  linkLabels: [`Neuigkeiten zum Portal`],
};

export default section;
