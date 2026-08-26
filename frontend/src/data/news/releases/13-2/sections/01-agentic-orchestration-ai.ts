import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Agentic Orchestration & AI Process Generation`,
  anchor: `ai`,
  paragraphs: [
    `Version 13.2 expands the AI portfolio (IDP, Portal Assistant, LLM connectors) with two deeply integrated platform components: Smart Workflow and Smart Core.`,
  ],
  features: [
    {
      term: `Smart Workflow`,
      description: `Smart Workflow embeds agents directly into Axon Ivy, combining deterministic BPMN steps with adaptive AI decision-making. It enables flexible orchestration where processes interact seamlessly with agent intelligence.`,
    },
    {
      term: `Smart Core`,
      description: `Smart Core adds a native MCP server to the Axon Ivy Engine, enabling the generation of Ivy artifacts, processes, data classes, forms, connectors, directly from natural language.`,
    },
  ],
  links: [
    {
      label: `Smart Workflow`,
      url: `https://market.axonivy.com/smart-workflow?version=13.2.0-a6#description`,
    },
    {
      label: `Smart Core`,
      url: `https://github.com/axonivy/smart-core/tree/master`,
    },
    {
      label: `AI powered process orchestration for the enterprise`,
      url: `https://www.axonivy.com/ai-powered-process-orchestration-for-the-enterprise`,
    },
  ],
  images: [`13.2/ai/01-smart-workflow.png`, `13.2/ai/02-smart-core.png`],
  code_sample: null,
};

export default section;
