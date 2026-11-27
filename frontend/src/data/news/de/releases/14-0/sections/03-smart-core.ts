import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Smart Core`,
  content: [
    {
      type: `paragraph`,
      text: `KI-gestützter Assistent zur Erstellung von Axon Ivy-Prozessen, Formularen und Datenklassen aus natürlichsprachlichen Eingaben. Basiert auf Ivy MCP und nativen LLM-Befehlen in der Axon Ivy Engine.`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Generiert Prozessmodelle, Datenklassen und Formulare aus Texteingaben`,
        },
        {
          text: `Verwendet ein JSON-basiertes Axon Ivy-Schema sowie Development MD Instructions und Skills`,
        },
        { text: `Integration mit GitHub Copilot und Claude Code` },
        {
          text: `Vorgefertigte, token-effiziente Befehle, nativ im VS Code Designer`,
        },
        {
          text: `Wird durch Feedback und einen agentischen Engineering-Ansatz kontinuierlich verbessert`,
        },
      ],
    },
  ],
};

export default section;
