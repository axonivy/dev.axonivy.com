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
import { localePath } from "@/translation/language";
import type { Lang } from "@/translation/ui";
import { useTranslation } from "react-i18next";

type DownloadActionProps = {
  title: string;
  version: string;
  artifactLabel: string;
  artifact?: Artifacts;
  lang: Lang;
};

export function DownloadAction({
  title,
  version,
  artifactLabel,
  artifact,
  lang,
}: DownloadActionProps) {
  const { t } = useTranslation(undefined, { lng: lang });

  if (!artifact) {
    return null;
  }

  if (isVsCodeExtensionArtifact(artifact)) {
    return (
      <a
        href={`${localePath(lang, "/download/installation/designer-vscode")}?downloadUrl=${encodeURIComponent(artifact.url)}`}
        className={cn(
          buttonVariants({ className: "h-10 w-full justify-start" }),
        )}
      >
        <IconBrandVscode className="size-5 shrink-0" aria-hidden="true" />
        {t("download.actions.installVsCode")}
      </a>
    );
  }

  if (artifact.name === "Docker") {
    return (
      <a
        href={`${localePath(lang, "/download/installation/docker")}?downloadUrl=${artifact.url}`}
        className={cn(
          buttonVariants({ className: "h-10 w-full justify-start" }),
        )}
      >
        <IconTerminal className="size-5 shrink-0" aria-hidden="true" />
        {artifactLabel
          ? t("download.actions.installDockerForPlatform", {
              title,
              version,
              platform: artifactLabel,
            })
          : t("download.actions.installDocker", { title, version })}
      </a>
    );
  }

  return (
    <a
      href={artifact.url}
      className={cn(buttonVariants({ className: "h-10 w-full justify-start" }))}
    >
      <IconDownload className="size-5 shrink-0" aria-hidden="true" />
      {!artifactLabel
        ? t("download.actions.download", { title, version })
        : artifactLabel === "macOS"
          ? t("download.actions.downloadForBetaPlatform", {
              title,
              version,
              platform: artifactLabel,
            })
          : t("download.actions.downloadForPlatform", {
              title,
              version,
              platform: artifactLabel,
            })}
    </a>
  );
}
