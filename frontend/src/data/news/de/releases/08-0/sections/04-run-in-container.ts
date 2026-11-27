import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `In einem Container ausführen`,
  content: [
    {
      type: `paragraph`,
      text: `Das Axon.ivy Engine lässt sich jetzt viel einfacher in einem isolierten Container betreiben.`,
    },
    {
      type: `paragraph`,
      text: `Damit werden die Grenzen zwischen Docker, Kubernetes, OpenShift und allen anderen Container-Orchestrierungsplattformen überwunden!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Vollständig isoliert`,
          text: `In einem Container ausgeführte Software ist vollständig von der Außenwelt isoliert.`,
        },
        {
          term: `Reproduzierbare Systeme`,
          text: `Ihre Systemeinrichtung lässt sich vollständig reproduzieren, da die gesamte Systemkonfiguration in einem sogenannten Image definiert ist.`,
        },
        {
          term: `Portabel`,
          text: `Einmal erstellen, überall ausführen! Ein Docker-Image kann auf jedem System ausgeführt werden, das Docker unterstützt.`,
        },
        {
          term: `Dokumentierte Infrastruktur`,
          text: `Die gesamte Axon.ivy Engine-Systemeinrichtung ist Bestandteil eines Images und damit vollständig dokumentiert.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Erste Schritte`,
    `Docker-Image des Axon.ivy Engine`,
    `Docker-Beispiele`,
  ],
};

export default section;
