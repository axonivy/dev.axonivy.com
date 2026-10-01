import {
  IconBrandVscode,
  IconDownload,
  IconTerminal,
} from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isVsCodeExtensionArtifact,
  type Artifacts,
} from "@/components/download/download-artifacts";

type DownloadActionProps = {
  title: string;
  version: string;
  artifactLabel: string;
  artifact?: Artifacts;
};

export function DownloadAction({
  title,
  version,
  artifactLabel,
  artifact,
}: DownloadActionProps) {
  if (!artifact) {
    return null;
  }

  if (isVsCodeExtensionArtifact(artifact)) {
    return (
      <a
        href={`/download/installation/designer-vscode?downloadUrl=${encodeURIComponent(artifact.url)}`}
        className={cn(
          buttonVariants({ className: "h-10 w-full justify-start" }),
        )}
      >
        <IconBrandVscode className="size-5 shrink-0" aria-hidden="true" />
        Install Designer using VS Code Marketplace
      </a>
    );
  }

  if (artifact.name === "Docker") {
    return (
      <a
        href={`/download/installation/docker?downloadUrl=${artifact.url}`}
        className={cn(
          buttonVariants({ className: "h-10 w-full justify-start" }),
        )}
      >
        <IconTerminal className="size-5 shrink-0" aria-hidden="true" />
        Install {title} {version} via Docker
        {artifactLabel && (
          <span className="hidden sm:inline"> for {artifactLabel}</span>
        )}
      </a>
    );
  }

  return (
    <a
      href={artifact.url}
      className={cn(buttonVariants({ className: "h-10 w-full justify-start" }))}
    >
      <IconDownload className="size-5 shrink-0" aria-hidden="true" />
      Download {title} {version}
      {artifactLabel && (
        <span className="hidden sm:inline">
          {" "}
          for {artifactLabel} {artifactLabel === "macOS" && "BETA"}
        </span>
      )}
    </a>
  );
}
