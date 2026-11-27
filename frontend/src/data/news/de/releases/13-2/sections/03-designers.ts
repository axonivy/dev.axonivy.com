import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Die neuesten Aktualisierungen verbessern das Designerlebnis in beiden Umgebungen deutlich:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `NEO Designer`,
          text: `das intuitive webbasierte Werkzeug für Business-Technologen`,
        },
        {
          term: `PRO Designer (VS Code Extension)`,
          text: `Entwicklungsumgebung für erfahrene Entwickler`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Alle neuen Funktionen sind in beiden Werkzeugen verfügbar und sorgen für ein einheitliches Erlebnis für alle Rollen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Verbesserungen am CMS Editor`,
          text: `Verbesserte mehrsprachige Bearbeitung mit integrierter Übersetzung.`,
        },
        {
          term: `Verbesserungen am Form Editor`,
          text: `Unterstützung für Lazy Data Models und Listener-Eigenschaften, Konvertierung von Komponenten unter Beibehaltung der Einstellungen, einheitliches Dialog-Framework und direkte Steuerung der Spaltenbreiten für umfangreichere, responsivere Benutzeroberflächen.`,
        },
        {
          term: `Neuer XHTML Editor`,
          text: `Intelligente Codevervollständigung, Validierung und kontextbezogene Hover-Informationen verbessern Geschwindigkeit und Zuverlässigkeit.`,
        },
        {
          term: `Aus Daten generieren`,
          text: `Die automatische Generierung von Entitätsformularen aus Datenbanken beschleunigt die Erstellung von Benutzeroberflächen und sorgt für visuelle Konsistenz.`,
        },
        {
          term: `Verbesserte Konfigurations- und Inscription-Erfahrung`,
          text: `Vereinfachte Konfiguration mit besseren Standardwerten, Einstellungen in Tabs und intuitiveren Steuerelementen.`,
        },
        {
          term: `Verbesserungen bei der Prozessmodellierung`,
          text: `Verbessertes Kopieren und Einfügen, flüssigere Einfügeaktionen sowie optimiertes Rückgängigmachen und Wiederherstellen sorgen für effizientere Modellierung.`,
        },
        {
          term: `Verbesserungen beim BPMN-2-Import`,
          text: `Zuverlässigere BPMN-2-Importe mit höherer semantischer Genauigkeit und Unterstützung für standardisierte BPMN-Symbole.`,
        },
        {
          term: `Aktualisierungen des NEO Designers`,
          text: `Verbesserungen der Benutzerfreundlichkeit und eine neue integrierte Runtime Log View ermöglichen schnellere Diagnosen während Design und Tests.`,
        },
      ],
    },
  ],
  linkLabels: [
    `NEO Designer`,
    `PRO Designer (abgekündigt)`,
    `PRO Designer (VS Code Extension)`,
    `CMS Editor`,
    `Form Editor`,
  ],
};

export default section;
