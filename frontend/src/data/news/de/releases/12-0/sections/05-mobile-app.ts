import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Mobile App`,
  content: [
    {
      type: `paragraph`,
      text: `Optimieren Sie Ihre Workflows unterwegs – Axon Ivy hat eine neue Version der Axon Ivy Mobile App veröffentlicht.`,
    },
    { type: `paragraph`, text: `Neuer Code, neues Design, mehr Funktionen!` },
    {
      type: `list`,
      items: [
        {
          term: `Native iOS- und Android-App`,
          text: `Auf beiden großen mobilen Plattformen profitieren Sie von reibungsloser Leistung und einem optimierten Design. Die Unterstützung von iOS und Android sorgt auf jedem Gerät für ein einheitliches, benutzerfreundliches Erlebnis.`,
        },
        {
          term: `Arbeiten außerhalb des Büros`,
          text: `Die App ist ideal für mobile Einsatzbereiche wie Baustellen, die Wartung von Aufzügen und andere Tätigkeiten vor Ort. Verwalten Sie Ihre Aufgaben von überall und arbeiten Sie flexibel dort, wo Sie gebraucht werden.`,
        },
        {
          term: `Nativer Zugriff auf Kamera und weitere mobile Funktionen`,
          text: `Die App nutzt integrierte Gerätefunktionen wie Kamera und GPS. So können Sie mobile Werkzeuge in der App einsetzen, die Funktionen erweitern und Ihre Workflows effizienter gestalten.`,
        },
        {
          term: `Offline-Aufgaben`,
          text: `Bleiben Sie auch ohne Internetverbindung produktiv. Dank der Offline-Funktion können Sie unabhängig von der Verbindung ununterbrochen an Aufgaben, Projekten und Prozessen weiterarbeiten.`,
        },
        {
          term: `Demomodus`,
          text: `Im Demomodus können Sie den gesamten Funktionsumfang der App entdecken und selbst ausprobieren, wie sich Ihre Prozesse damit verbessern lassen.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Installieren Sie jetzt die App für iOS und Android:`,
    },
  ],
  linkLabels: [`Android-App`, `iOS-App`],
};

export default section;
