import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Developer Workflow UI`,
  anchor: `devWfUi93`,
  paragraphs: [
    `The brand-new Developer Workflow UI will make it easier for developers to create and work with workflows and processes. It is made with JSF and is a replacement for the old JSP Designer Workflow UI.`,
  ],
  features: [
    {
      term: `Accessible Info`,
      description: `The modern design makes it easier to find any information about tasks, cases and more.`,
    },
    {
      term: `Last Starts`,
      description: `Last started Processes and Case Maps will be shown in a list on the Homepage where you can easily start them again.`,
    },
    {
      term: `Iframe Support`,
      description: `Processes and tasks start in an iframe.`,
    },
  ],
  links: [],
  images: [
    `9.3/dev-workflow-ui/01-starts.png`,
    `9.3/dev-workflow-ui/02-home.png`,
    `9.3/dev-workflow-ui/03-task.png`,
    `9.3/dev-workflow-ui/04-case.png`,
  ],
  code_sample: null,
};

export default section;
