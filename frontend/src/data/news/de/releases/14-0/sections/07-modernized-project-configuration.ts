import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Modernisierte Projektkonfiguration`,
  content: [
    {
      type: `paragraph`,
      text: `Projektstruktur und Konfiguration werden konsistenter, werkzeugfreundlicher und für KI-gestützte Entwicklungswerkzeuge leichter verständlich und nutzbar.`,
    },
    { type: `paragraph`, text: `**Wichtige Formatänderungen:**` },
    {
      type: `list`,
      items: [
        { text: `Rollen: XML → YAML` },
        { text: `Benutzer: XML → YAML` },
        { text: `Persistence: XML → YAML` },
        { text: `JCase Maps: <code>.icm</code> → <code>.m.json</code>` },
        {
          text: `JSON-Schemas mit deterministischer Versionierung, damit KI-Modelle die Formate verstehen sowie Dateien generieren oder ändern können`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Diese Änderungen vereinfachen die automatisierte Verarbeitung und Validierung von Projektressourcen und stimmen die Konfigurationsformate auf die neuen webbasierten Editoren ab.`,
    },
  ],
};

export default section;
