import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Visual Studio Code Extension im Vergleich zum Eclipse-basierten PRO Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Die Visual Studio Code Extension ist jetzt der primäre PRO Designer und bietet trotz ihres Beta-Status eine moderne, aktiv weiterentwickelte Umgebung. Der Eclipse-basierte PRO Designer befindet sich im Wartungsmodus und erhält in Version 13.2 nur wesentliche Fehlerkorrekturen, aber keine neuen Funktionen.`,
    },
    { type: `paragraph`, text: `Neue Funktionen der VS Code Extension:` },
    {
      type: `list`,
      items: [
        {
          term: `Projektkonvertierung`,
          text: `Bestehende Projekte lassen sich einfach in den VS-Code-basierten PRO Designer migrieren.`,
        },
        {
          term: `IAR-Unterstützung`,
          text: `Vollständige Verarbeitung von Ivy-Archive-Dateien (*.iar), einschließlich Import und Abhängigkeitsverwaltung.`,
        },
        {
          term: `Integrierte Testausführung`,
          text: `Führen Sie Ivy-Tests direkt in VS Code schneller und mit engerer Integration aus.`,
        },
        {
          term: `Engine-Download & Maven-Build`,
          text: `Automatische Engine-Verwaltung und vereinfachte Maven-Builds mit dem standardmäßigen Compiler-Plugin.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Axon Ivy PRO Designer Extension für Visual Studio Code`,
    `Abkündigung des Eclipse-basierten PRO Designers`,
    `Axon Ivy Maven Project Build Plugin`,
  ],
};

export default section;
