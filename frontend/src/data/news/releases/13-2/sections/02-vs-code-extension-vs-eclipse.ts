import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Visual Studio Code Extension vs. Eclipse-based PRO Designer`,
  anchor: `vscode`,
  content: [
    {
      type: `paragraph`,
      text: `The Visual Studio Code Extension is now the primary PRO Designer, offering a modern and actively evolving environment despite its beta status. The Eclipse-based PRO Designer is in maintenance mode with only essential bug fixes and no new features in 13.2.`,
    },
    {
      type: `paragraph`,
      text: `New Features in the VS Code Extension:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Project Conversion`,
          text: `Easily migrate existing projects into the VS Code–based PRO Designer.`,
        },
        {
          term: `IAR Support`,
          text: `Full handling of Ivy Archive (*.iar) files, including import and dependency management.`,
        },
        {
          term: `Integrated Test Execution`,
          text: `Run Ivy tests directly in VS Code with faster execution and tighter integration.`,
        },
        {
          term: `Engine Download & Maven Build`,
          text: `Automatic Engine management and simplified Maven builds using the standard compiler plugin.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Axon Ivy PRO Designer 13 Extension for Visual Studio Code`,
      url: `https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-13`,
    },
    {
      label: `Deprecation of the Eclipse-based PRO Designer`,
      url: `https://community.axonivy.com/d/1149-maintenance-mode-of-the-eclipse-based-pro-designer`,
    },
    {
      label: `Axon Ivy Maven Project Build Plugin`,
      url: `https://axonivy.github.io/project-build-plugin/release/13.2/index.html`,
    },
  ],
  images: [
    `13.2/vs-code-vs-eclipse/01-project-conversion.png`,
    `13.2/vs-code-vs-eclipse/02-testing.png`,
  ],
};

export default section;
