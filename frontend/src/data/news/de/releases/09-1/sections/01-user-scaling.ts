import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Effiziente Skalierung für Benutzer`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben große Anstrengungen unternommen, damit unser Engine Hunderttausende Benutzer schnell und effizient bedienen kann. Möglich wird dies durch zahlreiche Verbesserungen an Speicher, Leistung, Benutzeroberfläche und API. Außerdem können Benutzer aktiviert oder deaktiviert werden.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Deaktivierte Benutzer`,
          text: `Benutzer werden jetzt deaktiviert statt gelöscht. Dadurch ist der Aufgabenstatus UNASSIGNED nicht mehr relevant.`,
        },
        {
          term: `Benutzersynchronisierung`,
          text: `Die Benutzersynchronisierung ist deutlich schneller und bietet eine verbesserte Protokollierung.`,
        },
        {
          term: `Neue Benutzerabfrage`,
          text: `Eine neue API ermöglicht die einfache Suche nach Benutzern.`,
        },
        {
          term: `Verbesserungen der Benutzeroberfläche`,
          text: `Das Engine Cockpit kann sehr große Mengen an Benutzern und Rollen verwalten.`,
        },
        {
          term: `Aufgaben-/Case-Abfrage`,
          text: `Vereinfachte Datenbankschemata ermöglichen schnellere Datenbankabfragen.`,
        },
      ],
    },
  ],
};

export default section;
