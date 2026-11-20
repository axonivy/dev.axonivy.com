import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `NEO Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Wir freuen uns, den neuen NEO Designer vorzustellen – eine optimierte, webbasierte Low-Code-Plattform für die schnelle Anwendungsentwicklung. Er bietet wichtige Funktionen, die die Automatisierung von Aufgaben vereinfachen, die Komplexität verringern und eine effiziente Bereitstellung skalierbarer Anwendungen ermöglichen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Erweiterte Formular- und Prozesseditoren`,
          text: `Ein verbesserter Form Editor für intuitives Design und ein Process Editor mit Echtzeit-Animation zur Visualisierung von Workflows. Ein integrierter Browser unterstützt außerdem die Überprüfung und Simulation von Anwendungen vor der Bereitstellung.`,
        },
        {
          term: `Data-Class- und Variableneditoren`,
          text: `Der Data Class Editor visualisiert Daten; der Variable Editor unterstützt den projektübergreifenden Import von Variablen und vereinfacht so die Verwaltung komplexer Konfigurationen.`,
        },
        {
          term: `Integration von Deployment und Market`,
          text: `Stellen Sie Projekte direkt auf der Axon Ivy Engine bereit und rufen Sie den Axon Ivy Market auf, um Connectors und Demo-Workflows direkt in der Plattform zu entdecken und zu installieren.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Dank besserer Benutzerfreundlichkeit, nahtloser Workspace-Verwaltung und leistungsstarker Integrationsmöglichkeiten können Business-Benutzer mit dem NEO Designer skalierbare Anwendungen einfach erstellen und verwalten.`,
    },
  ],
  linkLabels: [`NEO Designer`],
};

export default section;
