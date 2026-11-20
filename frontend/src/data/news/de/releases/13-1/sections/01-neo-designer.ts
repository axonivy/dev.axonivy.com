import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `NEO Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Der NEO Designer entwickelt sich als moderne, webbasierte Low-Code-Plattform kontinuierlich weiter. In Version 13.1 stehen Verbesserungen bei Feedback, Barrierefreiheit und Content-Management im Mittelpunkt.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Diagrammansichten`,
          text: `Grafische Darstellungen von Data-Class-Hierarchien und Projektabhängigkeiten helfen dabei, umfangreiche Projektstrukturen zu verstehen und darin zu navigieren.`,
        },
        {
          term: `Dialogvorschau`,
          text: `Eine überarbeitete Dialogvorschau rendert Formulare und Komponenten live und ermöglicht die sofortige Navigation zu den Quelldefinitionen.`,
        },
        {
          term: `CMS Editor`,
          text: `Die Unterstützung mehrsprachiger Inhalte wurde erweitert: Sprachen lassen sich hinzufügen, entfernen und verwalten. Verbesserungen bei Validierung, Filterung und Bearbeitung vereinfachen die Konfiguration von Inhalten.`,
        },
        {
          term: `Tastaturunterstützung`,
          text: `Die vollständige Navigation per Tastenkombination ist jetzt in der gesamten Benutzeroberfläche verfügbar und beschleunigt die Formularbearbeitung, Kachelverwaltung und Prozessmodellierung.`,
        },
        {
          term: `Internationalisierung`,
          text: `Die Benutzeroberfläche ist jetzt auf Englisch und Deutsch verfügbar. Alle Beschriftungen sind externalisiert und für künftige Übersetzungen vorbereitet.`,
        },
        {
          term: `Verbesserte Simulationssteuerung`,
          text: `Das Verhalten der Prozesssimulation wurde verbessert. Die eingebettete Engine kann jetzt zurückgesetzt oder angehalten werden, ohne die Benutzeroberfläche zu verlassen.`,
        },
        {
          term: `Ansicht für Laufzeitprotokolle`,
          text: `Ein integrierter Protokollbetrachter unterstützt Entwickler dabei, Laufzeitprotokolle direkt im Workspace nach Level, Quelle oder Projekt zu filtern und zu untersuchen.`,
        },
        {
          term: `Validierung beim Erstellen`,
          text: `Benutzer erhalten jetzt sofortiges Feedback, wenn sie neue Formulare oder Prozesse benennen. So lassen sich Konfigurationsfehler frühzeitig vermeiden.`,
        },
      ],
    },
  ],
  linkLabels: [`NEO Designer`],
};

export default section;
