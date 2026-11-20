import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `PRO Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Der PRO Designer entwickelt sich als primäre Arbeitsumgebung für professionelle Entwickler kontinuierlich weiter. Version 13.1 bietet Verbesserungen für die Entwicklung robusterer und wartungsfreundlicherer Anwendungen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Dialogvorschau`,
          text: `Die Vorschau ist mit einer stabileren Implementierung zurück. Sie rendert Formulare und XHTML-Dialoge live und ermöglicht die direkte Navigation zu Elementdefinitionen.`,
        },
        {
          term: `Verbesserungen am Form Editor`,
          text: `Bearbeitbare Datentabellen, wiederverwendbare Formularbausteine (einschließlich Fieldsets und Panels) sowie visuelle Verbesserungen wie bessere Ausrichtung, Drag-and-drop und neue Schaltflächenstile bieten mehr Gestaltungsfreiheit. Attributvalidierung und Tastaturunterstützung verbessern Genauigkeit und Geschwindigkeit.`,
        },
        {
          term: `Process Editor`,
          text: `Der jetzt von GLSP v2.3.0 unterstützte Editor bietet flüssigere Interaktionen und Darstellung. Erweiterte Tastenkombinationen vereinfachen Navigation und Bearbeitung.`,
        },
        {
          term: `Inscription-Ansicht`,
          text: `IvyScript-Hinweise, ein verbesserter Function Browser und ein integrierter Condition Builder erleichtern Skripterstellung und Konfiguration. Auch die Stabilität wurde verbessert, insbesondere beim Wechseln zwischen Tabs und beim Fokussieren des Editors.`,
        },
        {
          term: `Data Class Editor`,
          text: `Die Validierung von Annotationen und die Konfiguration von Beziehungen wurden verbessert. Feld-Badges und Tastaturbedienbarkeit sorgen für mehr Übersicht und Effizienz.`,
        },
        {
          term: `Variable Editor`,
          text: `Der Editor ist jetzt schneller und einfacher zu bedienen, auch bei großen Variablenmengen. Inline-Validierung und vollständige Tastatursteuerung werden unterstützt.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Alle neuen Funktionen des PRO Designers sind auch im NEO Designer verfügbar.`,
    },
  ],
  linkLabels: [`PRO Designer`],
};

export default section;
