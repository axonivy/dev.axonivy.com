import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Meet Your New AI Assistant`,
  anchor: `ai-assistant`,
  paragraphs: [
    `With LTS 12, the portal experience reaches new heights with the introduction of the AI Assistant, acting as your virtual partner. The AI Assistant dynamically supports a range of tasks, from document searches to task and process management.`,
  ],
  features: [
    {
      term: `Portal Support`,
      description: `The AI Assistant has knowledge of the Axon Ivy documentation and allows you to add custom documentation.`,
    },
    {
      term: `Task and Process Management`,
      description: `The AI Assistant can start tasks and processes.`,
    },
    {
      term: `Search and Filter`,
      description: `It can search and filter tasks and cases.`,
    },
    {
      term: `Multilingual Support`,
      description: `Assistance in multiple languages.`,
    },
    {
      term: `Customizable Assistants`,
      description: `Create theme-based and personalized assistants.`,
    },
    {
      term: `Model-Based AI`,
      description: `Assistants are created and managed using custom models.`,
    },
    {
      term: `Custom Ivy AI Flows`,
      description: `Build custom AI logic that adds value within the Axon Ivy environment.`,
    },
  ],
  links: [],
  images: [
    `12.0/ai-assistant/01-portal-assistant.png`,
    `12.0/ai-assistant/02-ai-management.png`,
  ],
  code_sample: null,
};

export default section;
