import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Smart Core`,
  anchor: `smart-core`,
  content: [
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
        { text: `Integrates with GitHub Copilot and Claude Code` },
        {
          text: `Pre-built, token efficient commands native to the VS Code Designer`,
        },
        {
          text: `Continuously improves through feedback, an agentic engineering approach`,
        },
      ],
    },
  ],
  images: [`14.0/ai/05-github-dev-skills.png`, `14.0/ai/06-language-model.png`],
};

export default section;
