import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy AI: Smart Workflow & Smart Core`,
  anchor: `axon-ivy-ai`,
  content: [
    {
      type: `heading`,
      text: `Smart Workflow`,
    },
    {
      type: `paragraph`,
      text: `Agentic AI for end to end process execution. Merges deterministic process modeling with dynamic, goal based orchestration controlled by adaptive AI decision-making, built on the LLM of your choice.`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Agent Node as the brain of the workflow: takes instructions, goals, tools, guardrails and models as input, delivers structured, validated output`,
        },
        {
          text: `Use Ivy processes, Java classes, files (e.g. PDF) and web search as agent tools`,
        },
        {
          text: `Guardrails for prompt injection and PII detection, native to the workflow, no extra infrastructure`,
        },
        {
          text: `Governance on three pillars: Governance by Design, Guardrails, Monitoring & Traceability`,
        },
        {
          text: `Full monitoring at design time (tokens, model performance) and runtime (task/interaction drill down)`,
        },
        {
          text: `AI Governance Center and AI History Analyzer for deep insights and recommendations`,
        },
        {
          text: `Proven in real use cases: HR vacation request chatbot, construction procurement assistant`,
        },
      ],
    },
    {
      type: `heading`,
      text: `Smart Core`,
    },
    {
      type: `paragraph`,
      text: `AI driven assistant for creating Axon Ivy processes, forms and data classes from natural language, powered by Ivy MCP and native LLM commands on the Axon Ivy Engine.`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Generates process models, data classes and forms from text prompts`,
        },
        {
          text: `Uses JSON based Axon Ivy schema plus Development MD Instructions and Skills`,
        },
        {
          text: `Integrates with GitHub Copilot and Claude Code`,
        },
        {
          text: `Pre-built, token efficient commands native to the VS Code Designer`,
        },
        {
          text: `Continuously improves through feedback, an agentic engineering approach`,
        },
      ],
    },
  ],
  links: [],
  images: [
    `14.0/ai/01-edit-agent.png`,
    `14.0/ai/02-agent-in-diagram.png`,
    `14.0/ai/03-ai-governance-center.png`,
    `14.0/ai/04-agent-pipeline.png`,
    `14.0/ai/05-github-dev-skills.png`,
    `14.0/ai/06-language-model.png`,
  ],
};

export default section;
