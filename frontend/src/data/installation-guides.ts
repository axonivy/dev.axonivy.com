import type { TFunction } from "i18next";

export type InstallationProduct = "Designer" | "Engine";

export type InstallationSubstep = { id: number; title: string; img?: string };

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
  hint?: { title: string; description: string };
  steps: InstallationStep[];
};

const getInstallationGuides = (currentVersion: string, t: TFunction) =>
  ({
    "designer-windows": {
      title: t("installation.guides.designerWindows.title"),
      type: "windows",
      product: "Designer",
      steps: [
        { id: 1, title: t("installation.guides.common.downloadDesigner") },
        {
          id: 2,
          title: t("installation.guides.common.extractZip"),
          img: "designer-windows/extract-axonivy-designer.png",
        },
        { id: 3, title: t("installation.guides.common.nextSteps") },
      ],
    },
    "designer-linux": {
      title: t("installation.guides.designerLinux.title"),
      type: "Linux",
      product: "Designer",
      steps: [
        { id: 1, title: t("installation.guides.common.downloadDesigner") },
        {
          id: 2,
          title: t("installation.guides.designerLinux.extract"),
          img: "designer-linux/ubuntu-extract.png",
        },
        {
          id: 3,
          title: t("installation.guides.designerLinux.installDependencies"),
          substeps: [
            {
              id: 3.1,
              title: t("installation.guides.designerLinux.runScript"),
              img: "designer-linux/ubuntu-run-install-deps.png",
            },
            {
              id: 3.2,
              title: t("installation.guides.designerLinux.sudoPassword"),
              img: "designer-linux/ubuntu-install-deps-terminal.png",
            },
          ],
        },
        {
          id: 4,
          title: t("installation.guides.designerLinux.xorg"),
          substeps: [
            {
              id: 4.1,
              title: t("installation.guides.designerLinux.xorgDescription"),
              img: "designer-linux/ubuntu-xorg.png",
            },
          ],
        },
        { id: 5, title: t("installation.guides.common.nextSteps") },
      ],
    },
    "designer-mac": {
      title: t("installation.guides.designerMac.title"),
      type: "macOs",
      product: "Designer",
      hint: {
        title: t("installation.guides.designerMac.hintTitle"),
        description: t("installation.guides.designerMac.hintDescription"),
      },
      steps: [
        { id: 1, title: t("installation.guides.designerMac.download") },
        {
          id: 2,
          title: t("installation.guides.designerMac.install"),
          substeps: [
            {
              id: 2.1,
              title: t("installation.guides.designerMac.openDownloads"),
              img: "designer-mac/open-downloads.png",
            },
            {
              id: 2.2,
              title: t("installation.guides.designerMac.copyToApplications"),
              img: "designer-mac/copy-to-applications.png",
            },
          ],
        },
        {
          id: 3,
          title: t("installation.guides.designerMac.launch"),
          substeps: [
            {
              id: 3.1,
              title: t("installation.guides.designerMac.open"),
              img: "designer-mac/open.png",
            },
            {
              id: 3.2,
              title: t("installation.guides.designerMac.confirmOpen"),
              img: "designer-mac/open-confirm.png",
            },
          ],
        },
        { id: 4, title: t("installation.guides.common.nextSteps") },
      ],
    },
    "designer-vscode": {
      title: t("installation.guides.designerVscode.title"),
      type: "VS Code",
      product: "Designer",
      steps: [
        {
          id: 1,
          title: t("installation.guides.designerVscode.installVscode"),
          url: "https://code.visualstudio.com/docs/getstarted/overview",
        },
        { id: 2, title: t("installation.guides.designerVscode.openExtension") },
        {
          id: 3,
          title: t("installation.guides.designerVscode.installExtension"),
          substeps: [
            {
              id: 3.1,
              title: t("installation.guides.designerVscode.clickInstall"),
              img: "designer-vscode/install-marketplace.png",
            },
            {
              id: 3.2,
              title: t("installation.guides.designerVscode.confirmBrowser"),
              img: "designer-vscode/confirm-open.png",
            },
            {
              id: 3.3,
              title: t("installation.guides.designerVscode.completeInstall"),
              img: "designer-vscode/install-vscode.png",
            },
          ],
        },
        { id: 4, title: t("installation.guides.common.nextSteps") },
      ],
    },
    engine: {
      title: t("installation.guides.engine.title"),
      type: "Engine",
      product: "Engine",
      steps: [
        { id: 1, title: t("installation.guides.engine.download") },
        {
          id: 2,
          title: t("installation.guides.common.extractZip"),
          img: "designer-windows/extract-axonivy-designer.png",
        },
        { id: 3, title: t("installation.guides.engine.start") },
      ],
    },
    docker: {
      title: t("installation.guides.docker.title"),
      type: "Docker",
      product: "Engine",
      steps: [
        {
          id: 1,
          title: t("installation.guides.docker.installDocker"),
          url: "https://docs.docker.com/get-started/get-docker/",
        },
        {
          id: 2,
          title: t("installation.guides.docker.run"),
          substeps: [
            {
              id: 2.1,
              title: `docker pull axonivy/axonivy-engine:${currentVersion} <br /> docker run -p 8080:8080 axonivy/axonivy-engine:${currentVersion}`,
            },
          ],
        },
        {
          id: 3,
          title: "Learn more about Axon Ivy with Docker",
          url: `https://developer.axonivy.com/doc/${currentVersion}/en/engine-guide/installation/docker/index.html`,
        },
      ],
    },
  }) satisfies Record<string, InstallationGuide>;

export default getInstallationGuides;
