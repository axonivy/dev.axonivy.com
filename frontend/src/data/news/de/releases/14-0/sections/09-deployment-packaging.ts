import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Deployment & Packaging`,
  content: [
    {
      type: `paragraph`,
      text: `Die Deployment-Funktionen sind auf das Application-Version-Modell abgestimmt und wurden für eine zuverlässigere Bereitstellung von Anwendungen verbessert.
`,
    },
    { type: `paragraph`, text: `**Wichtige Verbesserungen:**` },
    {
      type: `list`,
      items: [
        { text: `Zuverlässigere Deployments` },
        { text: `Deployment-Ziele auf Basis von Versionsmustern` },
        { text: `Verbesserte Verarbeitung von Ivy Archives` },
        { text: `Import und Export von Anwendungs-ZIPs` },
        { text: `Verbesserungen am Projektarchivierer` },
        { text: `Entpackungs- und Konvertierungsworkflows auf der Engine` },
      ],
    },
    {
      type: `paragraph`,
      text: `Bestehende Deployment-Skripte und CI/CD-Automatisierungen sollten bei der Migration auf LTS 14 überprüft werden.`,
    },
  ],
};

export default section;
