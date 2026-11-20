import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Agentische Orchestrierung & KI-Prozessgenerierung`,
  content: [
    {
      type: `paragraph`,
      text: `Version 13.2 erweitert das KI-Portfolio (IDP, Portal Assistant, LLM-Connectoren) um zwei tief integrierte Plattformkomponenten: Smart Workflow und Smart Core.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Smart Workflow`,
          text: `Smart Workflow integriert Agenten direkt in Axon Ivy und verbindet deterministische BPMN-Schritte mit adaptiver KI-gestützter Entscheidungsfindung. So wird eine flexible Orchestrierung ermöglicht, bei der Prozesse nahtlos mit der Intelligenz von Agenten interagieren.`,
        },
        {
          term: `Smart Core`,
          text: `Smart Core ergänzt die Axon Ivy Engine um einen nativen MCP-Server, mit dem sich Ivy-Artefakte, Prozesse, Datenklassen, Formulare und Connectoren direkt aus natürlichsprachlichen Eingaben generieren lassen.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Smart Workflow`,
    `Smart Core`,
    `KI-gestützte Prozess-Orchestrierung für Unternehmen`,
  ],
};

export default section;
