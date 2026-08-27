import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Visual Studio Code Designer Extension (Alpha) 🧪`,
  anchor: `vsx-designer`,
  content: [
    {
      type: `paragraph`,
      text: `We're doing the first valiant explorative steps towards a web-based IDE.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Visual Studio Code`,
          text: `We publish the first simple citizen developer toolset for Visual Studio Code as an extension. Though we haven't decided yet about the final runtime environment, Visual Studio Code seems like a very promising base to serve the Designer of the future.`,
        },
        {
          term: `Editors`,
          text: `Important editors, for Variables, Forms, and Processes were developed to run natively in the Browser. Therefore, we already integrated these editors into our Designer extensions. This enables valiant early bird adopters to use the same feature set as within the classic Eclipse Designer.`,
        },
        {
          term: `Views`,
          text: `With our custom Projects-View and the integrated Browsers, we already provide a welcoming environment to build first projects and simulate runs of processes.`,
        },
        {
          term: `Workspaces`,
          text: `Exploring dev-containers, we already gained trust, that this is an easy and powerful stack to share complex workspace setups. Focusing developers to work instantly, without the need to run manual setups.`,
        },
        {
          term: `Cloud-ready`,
          text: `With Github Codespaces, the Designer runs natively in the cloud. This gives us many options, to build processes anywhere in no time.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `VS Marketplace`,
      url: `https://marketplace.visualstudio.com/items?itemName=axon-ivy.designer-11`,
    },
  ],
  images: [`11.3/vsx-designer/01-add-project.gif`],
};

export default section;
