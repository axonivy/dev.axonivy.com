import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Cloud- und Managed-Umgebungen`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 stärkt Axon Ivy weiter für Cloud-, Container- und Managed-Umgebungen. Zusätzlich werden kleinere Alpine-basierte Docker-Images bereitgestellt.`,
    },
    {
      type: `paragraph`,
      text: `Eine wichtige Neuerung ist der **PAAS-Modus**, in dem potenziell risikoreiche Funktionen des Engine Cockpit in Managed-Umgebungen ausgeblendet oder deaktiviert werden können. So lässt sich besser steuern, worauf Administratoren zugreifen können, wenn ein Plattformanbieter die zugrunde liegende Infrastruktur verwaltet.`,
    },
    {
      type: `paragraph`,
      text: `Zusammen mit dem Application-Version-Modell, den Verbesserungen der Deployment-Zuverlässigkeit und zusätzlichen Betriebskontrollen stärkt dies die Grundlage für gehostete, geclusterte und cloudorientierte Axon-Ivy-Umgebungen.`,
    },
  ],
};

export default section;
