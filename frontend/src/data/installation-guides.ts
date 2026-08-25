export type InstallationProduct = "Designer" | "Engine";

export type InstallationSubstep = {
  id: number;
  title: string;
  img?: string;
};

export type InstallationStep = {
  id: number;
  title: string;
  url?: string;
  img?: string;
  substeps?: InstallationSubstep[];
};

export type InstallationGuide = {
  title: string;
  type: string;
  product: InstallationProduct;
  hint?: {
    title: string;
    description: string;
  };
  steps: InstallationStep[];
};

const installationGuides = {
  "designer-windows": {
    title: "Install Axon Ivy Designer for Windows",
    type: "windows",
    product: "Designer",
    steps: [
      {
        id: 1,
        title: "Download the Axon Ivy Designer to your desired location",
      },
      {
        id: 2,
        title: "Extract the downloaded zip file",
        img: "designer-windows/extract-axonivy-designer.png",
      },
      { id: 3, title: "Next steps" },
    ],
  },
  "designer-linux": {
    title: "Install Axon Ivy Designer for Linux",
    type: "Linux",
    product: "Designer",
    steps: [
      {
        id: 1,
        title: "Download the Axon Ivy Designer to your desired location",
      },
      {
        id: 2,
        title:
          "Extract the downloaded zip file and navigate into the extracted Axon Ivy Designer",
        img: "designer-linux/ubuntu-extract.png",
      },
      {
        id: 3,
        title: "Install dependencies",
        substeps: [
          {
            id: 3.1,
            title:
              "Run the install-dependencies.sh script in a terminal, in order to install crucial dependencies.",
            img: "designer-linux/ubuntu-run-install-deps.png",
          },
          {
            id: 3.2,
            title:
              "Supply your sudoer password in order to allow privileged installers to run.",
            img: "designer-linux/ubuntu-install-deps-terminal.png",
          },
        ],
      },
      {
        id: 4,
        title: "Switch to X.org on Ubuntu 20.04+",
        substeps: [
          {
            id: 4.1,
            title:
              "If you work on Ubuntu 20.04 or newer, switch to X.org Window system by logging out, clicking on the settings button and choosing Ubuntu on Xorg.",
            img: "designer-linux/ubuntu-xorg.png",
          },
        ],
      },
      { id: 5, title: "Next steps" },
    ],
  },
  "designer-mac": {
    title: "Install Axon Ivy Designer for Mac",
    type: "macOs",
    product: "Designer",
    hint: {
      title: "Mac Designer for Ventura and older",
      description:
        "This Axon Ivy Designer runs best on Macs with Intel processors (x64 architecture). If you have a newer Mac with Apple Chips/Silicon (ARM architecture) you can run the Designer with the Rosetta 2 software. However, the Designer might not work as well as on the x64 architecture.",
    },
    steps: [
      { id: 1, title: "Download the Axon Ivy Designer" },
      {
        id: 2,
        title: "Install the application",
        substeps: [
          {
            id: 2.1,
            title: "Open the Downloads folder in Finder",
            img: "designer-mac/open-downloads.png",
          },
          {
            id: 2.2,
            title: "Copy Axon Ivy Designer to the Applications folder",
            img: "designer-mac/copy-to-applications.png",
          },
        ],
      },
      {
        id: 3,
        title: "Launch Axon Ivy Designer",
        substeps: [
          {
            id: 3.1,
            title: "Open Axon Ivy Designer",
            img: "designer-mac/open.png",
          },
          {
            id: 3.2,
            title:
              "Give your consent to open the AxonIvyDesigner.app by clicking 'open'",
            img: "designer-mac/open-confirm.png",
          },
        ],
      },
      { id: 4, title: "Next steps" },
    ],
  },
  engine: {
    title: "Install Axon Ivy Engine",
    type: "Engine",
    product: "Engine",
    steps: [
      {
        id: 1,
        title: "Download the Axon Ivy Engine to your desired location",
      },
      {
        id: 2,
        title: "Extract the downloaded zip file",
        img: "designer-windows/extract-axonivy-designer.png",
      },
      { id: 3, title: "Start the Axon Ivy Engine" },
    ],
  },
  docker: {
    title: "Install Axon Ivy Engine for Docker",
    type: "Docker",
    product: "Engine",
    steps: [
      {
        id: 1,
        title: "Install Docker by following the official guide",
        url: "https://docs.docker.com/get-started/get-docker/",
      },
      {
        id: 2,
        title: "Run Axon Ivy Engine as Docker Image",
        substeps: [
          {
            id: 2.1,
            title:
              "docker pull axonivy/axonivy-engine:12.0 <br /> docker run -p 8080:8080 axonivy/axonivy-engine:12.0",
          },
        ],
      },
      {
        id: 3,
        title: "Learn more about Axon Ivy with Docker",
        url: "https://dev.axonivy.com/doc/12.0/en/engine-guide/getting-started/docker/index.html",
      },
    ],
  },
} satisfies Record<string, InstallationGuide>;

export default installationGuides;
