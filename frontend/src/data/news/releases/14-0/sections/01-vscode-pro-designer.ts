import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `VS Code PRO Designer`,
  anchor: `vscode-pro-designer`,
  content: [
    {
      type: `paragraph`,
      text: `Visual Studio Code is the development environment for Axon Ivy PRO development. The VS Code PRO Designer integrates the complete development workflow into a modern IDE.`,
    },
    {
      type: `paragraph`,
      text: `**Key capabilities:**`,
    },
    {
      type: `list`,
      items: [
        { text: `Project and workspace management` },
        { text: `Import and export of Ivy Archives and application ZIPs` },
        { text: `Dependency management` },
        { text: `Engine start, stop, and configuration` },
        { text: `Status bar shows current status of the engine and designer` },
        { text: `Process debugging, process history and runtime log` },
        { text: `Application preview` },
        { text: `Workspace diagnostics and Problems view` },
        { text: `Maven build integration` },
      ],
    },
  ],
  images: [
    `14.0/vscode-pro-designer/01-extension.png`,
    `14.0/vscode-pro-designer/02-welcome-sample-dialog.png`,
  ],
};

export default section;
