import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Smart Workflow`,
  anchor: `smart-workflow`,
  content: [
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
  ],
  images: [
    `14.0/ai/01-edit-agent.png`,
    `14.0/ai/02-agent-in-diagram.png`,
    `14.0/ai/03-ai-governance-center.png`,
    `14.0/ai/04-agent-pipeline.png`,
  ],
};

export default section;
