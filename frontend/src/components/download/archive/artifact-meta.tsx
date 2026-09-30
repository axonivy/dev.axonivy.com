import {
  IconBrandApple,
  IconBrandDebian,
  IconBrandDocker,
  IconBrandUbuntu,
  IconBrandVscode,
  IconBrandWindows,
  IconDeviceLaptop,
  IconDownload,
  type Icon,
} from "@tabler/icons-react";
import type { ArchiveArtifact } from "@/components/download/archive/archive";

export type ArtifactCategory =
  | "all"
  | "deb"
  | "docker"
  | "windows"
  | "macos"
  | "linux"
  | "slim"
  | "vscode"
  | "other";

type ArtifactMeta = {
  category: ArtifactCategory;
  label: string;
  icon: React.ReactNode;
};

type ArtifactRule = {
  category: ArtifactCategory;
  label: string;
  icon: Icon;
  matches: (artifact: ArchiveArtifact) => boolean;
};

const artifactCategoryOrder: ArtifactCategory[] = [
  "all",
  "slim",
  "deb",
  "docker",
  "linux",
  "macos",
  "windows",
  "vscode",
  "other",
];

function nameIncludes(text: string) {
  return (artifact: ArchiveArtifact) =>
    artifact.name.toLowerCase().includes(text);
}

export function isDockerArtifact(artifact: ArchiveArtifact) {
  return artifact.name.includes("/");
}

export const isVscodeArtifact = nameIncludes("vscode");

// Order matters: the first matching rule wins.
const artifactRules: ArtifactRule[] = [
  {
    category: "docker",
    label: "Docker",
    icon: IconBrandDocker,
    matches: isDockerArtifact,
  },
  {
    category: "windows",
    label: "Windows",
    icon: IconBrandWindows,
    matches: nameIncludes("windows"),
  },
  {
    category: "macos",
    label: "macOS",
    icon: IconBrandApple,
    matches: nameIncludes("mac"),
  },
  {
    category: "slim",
    label: "All Slim¹",
    icon: IconBrandUbuntu,
    matches: nameIncludes("slim"),
  },
  {
    category: "deb",
    label: "Debian",
    icon: IconBrandDebian,
    matches: (artifact) => artifact.name.toLowerCase().endsWith(".deb"),
  },
  {
    category: "linux",
    label: "Linux",
    icon: IconBrandUbuntu,
    matches: nameIncludes("linux"),
  },
  {
    category: "all",
    label: "All",
    icon: IconDeviceLaptop,
    matches: nameIncludes("all"),
  },
  {
    category: "vscode",
    label: "VS Code",
    icon: IconBrandVscode,
    matches: isVscodeArtifact,
  },
];

export function getArtifactMeta(artifact: ArchiveArtifact): ArtifactMeta {
  const rule = artifactRules.find((rule) => rule.matches(artifact));
  if (!rule) {
    return {
      category: "other",
      label: artifact.filename,
      icon: <IconDownload className="size-4" aria-hidden="true" />,
    };
  }

  return {
    category: rule.category,
    label: rule.label,
    icon: <rule.icon className="size-4" aria-hidden="true" />,
  };
}

export function inCategory(...categories: ArtifactCategory[]) {
  return (artifact: ArchiveArtifact) =>
    categories.includes(getArtifactMeta(artifact).category);
}

function categoryRank(artifact: ArchiveArtifact) {
  return artifactCategoryOrder.indexOf(getArtifactMeta(artifact).category);
}

export function sortArtifacts(artifacts: ArchiveArtifact[]) {
  return [...artifacts].sort(
    (a, b) =>
      categoryRank(a) - categoryRank(b) ||
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
}
