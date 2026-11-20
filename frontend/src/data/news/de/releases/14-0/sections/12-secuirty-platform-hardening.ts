import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Sicherheit & Plattformhärtung`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 enthält Sicherheitsverbesserungen, die über einzelne Fehlerkorrekturen hinausgehen und zusätzliche Kontrollen auf Plattformebene einführen.`,
    },
    { type: `paragraph`, text: `**Wichtige Bereiche:**` },
    {
      type: `list`,
      items: [
        {
          text: `Annotationsbasierte Steuerung des CSRF-Schutzes für ausgewählte Ressourcen`,
        },
        {
          text: `Konfigurierbare Verarbeitung von <code>X-Requested-By</code> für Engine-REST-APIs`,
        },
        { text: `PAAS-spezifische Einschränkungen im Cockpit` },
        { text: `Sicherere Verarbeitung von Weiterleitungen` },
        { text: `Verbesserter Schutz von Uploads` },
        { text: `Verbesserter Schutz beim XML-Parsing` },
        { text: `URL-Validierung` },
        { text: `Sicherere Standardwerte für die UI-Darstellung` },
        { text: `Performance-Optimierungen` },
      ],
    },
    {
      type: `paragraph`,
      text: `Diese Änderungen sind besonders relevant für gehostete, geclusterte und extern integrierte Umgebungen.`,
    },
  ],
};

export default section;
