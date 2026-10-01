import { detect } from "detect-browser";

export type Artifacts = {
  name: string;
  url: string;
  filename: string;
  permalink: string;
};

export type OperatingSystem = "windows" | "mac" | "linux" | "unknown";

export type Product = "designer" | "engine";

export type DownloadRelease = {
  version: string;
  versionShort: string;
  releaseDate: string;
  releaseNotesLink: string;
  docLink: string;
  designerArtifacts: Artifacts[];
  engineArtifacts: Artifacts[];
};

export type ArtifactOption = { artifact: Artifacts; label: string };

export function operatingSystemFromText(value: string): OperatingSystem {
  const normalizedValue = value.toLowerCase();
  if (normalizedValue.includes("windows")) {
    return "windows";
  }
  if (
    normalizedValue.includes("macintosh") ||
    normalizedValue.includes("mac os") ||
    normalizedValue.includes("macos") ||
    normalizedValue.includes("apple")
  ) {
    return "mac";
  }
  if (normalizedValue.includes("linux")) {
    return "linux";
  }
  return "unknown";
}

export function isDockerArtifact(artifact?: Artifacts): boolean {
  return artifact?.name.toLowerCase().includes("docker") ?? false;
}

export function isVsCodeExtensionArtifact(artifact?: Artifacts): boolean {
  return artifact?.name === "VS Code Extension";
}

export function engineGuideDocLink(docLink: string, os: OperatingSystem) {
  const majorVersion = Number(/^\/doc\/(\d+)/.exec(docLink)?.[1]);
  const section = majorVersion < 14 ? "getting-started" : "installation";
  const osPath = os === "windows" || os === "linux" ? `${os}/` : "";
  return `${docLink}/engine-guide/${section}/${osPath}index.html`;
}

export function installationGuideHref(
  product: Product,
  userOs: OperatingSystem,
  artifact?: Artifacts,
  docLink?: string,
) {
  const isDocker = product === "engine" && isDockerArtifact(artifact);

  const selectedOs = artifact ? artifactOperatingSystem(artifact) : userOs;
  const guideOs = selectedOs === "unknown" ? userOs : selectedOs;

  const detectGuidePath = () => {
    if (product === "designer" && isVsCodeExtensionArtifact(artifact)) {
      return "/download/installation/designer-vscode";
    }
    if (isDocker) {
      return "/download/installation/docker";
    }
    if (product === "engine") {
      return "/download/installation/engine";
    }
    return `/download/installation/designer-${guideOs === "unknown" ? "windows" : guideOs}`;
  };

  const guidePath = detectGuidePath();

  const query = new URLSearchParams();
  if (artifact?.url) {
    query.set("downloadUrl", artifact.url);
  }
  if (product === "engine" && !isDocker) {
    query.set("docLink", engineGuideDocLink(docLink || "/doc/latest", guideOs));
  }

  return query.toString() ? `${guidePath}?${query.toString()}` : guidePath;
}

export function detectOperatingSystem(): OperatingSystem {
  const detectedOs = detect()?.os;

  if (typeof detectedOs !== "string") {
    return "unknown";
  }
  if (detectedOs.startsWith("Windows")) {
    return "windows";
  }
  if (detectedOs === "Mac OS") {
    return "mac";
  }
  if (detectedOs === "Linux") {
    return "linux";
  }
  return "unknown";
}

function artifactOperatingSystem(artifact: Artifacts): OperatingSystem {
  return operatingSystemFromText(artifact.name);
}

function engineArtifactOption(artifact: Artifacts): ArtifactOption {
  const os = artifactOperatingSystem(artifact);
  if (os === "linux") {
    return { artifact, label: "Linux / macOS" };
  }
  return { artifact, label: artifact.name };
}

export function artifactOption(
  artifact: Artifacts,
  isDesigner: boolean,
): ArtifactOption {
  return isDesigner
    ? { artifact, label: artifact.name }
    : engineArtifactOption(artifact);
}

export function artifactMatchesOperatingSystem(
  artifact: Artifacts,
  os: OperatingSystem,
  isDesigner: boolean,
): boolean {
  if (!isDesigner && os === "mac") {
    return artifactOperatingSystem(artifact) === "linux";
  }
  return artifactOperatingSystem(artifact) === os;
}
