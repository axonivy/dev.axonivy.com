import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Smart Workflow`,
  content: [
    {
      type: `paragraph`,
      text: `Agentische KI für die durchgängige Prozessausführung. Verbindet deterministische Prozessmodellierung mit dynamischer, zielorientierter Orchestrierung durch adaptive KI-gestützte Entscheidungsfindung – basierend auf dem LLM Ihrer Wahl.`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Agent Node als Gehirn des Workflows: verarbeitet Anweisungen, Ziele, Tools, Leitplanken und Modelle als Eingabe und liefert strukturierte, validierte Ergebnisse`,
        },
        {
          text: `Ivy-Prozesse, Java-Klassen, Dateien (z. B. PDF) und Websuche als Agenten-Tools verwenden`,
        },
        {
          text: `Leitplanken gegen Prompt Injection und zur PII-Erkennung sind nativ in den Workflow integriert; zusätzliche Infrastruktur ist nicht erforderlich`,
        },
        {
          text: `Governance auf drei Säulen: Governance by Design, Leitplanken, Monitoring & Nachvollziehbarkeit`,
        },
        {
          text: `Vollständiges Monitoring zur Designzeit (Tokens, Modellleistung) und zur Laufzeit (detaillierte Task-/Interaktionsanalyse)`,
        },
        {
          text: `AI Governance Center und AI History Analyzer für tiefgehende Einblicke und Empfehlungen`,
        },
        {
          text: `In realen Anwendungsfällen bewährt: HR-Chatbot für Urlaubsanträge und Beschaffungsassistent für die Baubranche`,
        },
      ],
    },
  ],
};

export default section;
