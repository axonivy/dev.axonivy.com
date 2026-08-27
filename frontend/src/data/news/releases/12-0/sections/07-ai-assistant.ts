import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Meet Your New AI Assistant`,
  anchor: `ai-assistant`,
  content: [
    {
      type: `paragraph`,
      text: `With LTS 12, the portal experience reaches new heights with the introduction of the AI Assistant, acting as your virtual partner. The AI Assistant dynamically supports a range of tasks, from document searches to task and process management.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Portal Support`,
          text: `The AI Assistant has knowledge of the Axon Ivy documentation and allows you to add custom documentation.`,
        },
        {
          term: `Task and Process Management`,
          text: `The AI Assistant can start tasks and processes.`,
        },
        {
          term: `Search and Filter`,
          text: `It can search and filter tasks and cases.`,
        },
        {
          term: `Multilingual Support`,
          text: `Assistance in multiple languages.`,
        },
        {
          term: `Customizable Assistants`,
          text: `Create theme-based and personalized assistants.`,
        },
        {
          term: `Model-Based AI`,
          text: `Assistants are created and managed using custom models.`,
        },
        {
          term: `Custom Ivy AI Flows`,
          text: `Build custom AI logic that adds value within the Axon Ivy environment.`,
        },
      ],
    },
  ],
  links: [],
  images: [
    `12.0/ai-assistant/01-portal-assistant.png`,
    `12.0/ai-assistant/02-ai-management.png`,
  ],
};

export default section;
