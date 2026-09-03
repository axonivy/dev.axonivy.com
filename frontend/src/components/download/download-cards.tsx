import { useEffect, useId, useState, type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconArrowRight,
  IconBrandApple,
  IconBrandDocker,
  IconBrandUbuntu,
  IconBrandVscode,
  IconBrandWindows,
  IconDashboard,
  IconDownload,
  IconTerminal,
  IconTools,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { detect } from "detect-browser";
import { H6, P } from "@/components/ui/typography";

export type Artifacts = {
  name: string;
  url: string;
  filename: string;
  permalink: string;
};

export type OperatingSystem = "windows" | "mac" | "linux" | "unknown";

export type DownloadRelease = {
  version: string;
  versionShort: string;
  releaseDate: string;
  releaseNotesLink: string;
  docLink: string;
  vscodeExtensionLink: string;
  designerArtifacts: Artifacts[];
  engineArtifacts: Artifacts[];
};

type ArtifactOption = {
  artifact: Artifacts;
  label: string;
};

type DownloadCardsProps = {
  release: DownloadRelease;
  releaseLabel: string;
  badge: string;
};

type DownloadProductCardProps = {
  release: DownloadRelease;
  releaseLabel: string;
  product: "designer" | "engine";
  badge: string;
  userOs: OperatingSystem;
};

type DownloadActionProps = {
  title: string;
  version: string;
  artifactLabel: string;
  artifact?: Artifacts;
  vscodeExtensionLink?: string;
};

type ProductConfig = {
  title: string;
  badge: string;
  mode: string;
  description: string;
  icon: ReactNode;
  textClass: string;
  backgroundClass: string;
  badgeVariant: "green" | "orange";
  artifacts: Artifacts[];
  isDesigner: boolean;
};

function OsIcon({ os }: { os: string }) {
  const normalized = os.toLowerCase();
  if (normalized.includes("windows")) {
    return <IconBrandWindows className="size-6 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("macos")) {
    return <IconBrandApple className="size-6 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("linux")) {
    return <IconBrandUbuntu className="size-6 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("docker")) {
    return <IconBrandDocker className="size-6 shrink-0" aria-hidden="true" />;
  }
  return null;
}

function OsOptionLabel({ label }: { label: string }) {
  if (label !== "Linux / macOS") {
    return <span className="hidden font-medium sm:inline">{label}</span>;
  }

  return (
    <span className="flex items-center gap-1 font-medium">
      <IconBrandUbuntu className="size-6 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Linux</span>
      <span className="text-n600">/</span>
      <IconBrandApple className="size-6 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">macOS</span>
    </span>
  );
}

function operatingSystemFromText(value: string): OperatingSystem {
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

function isDockerArtifact(artifact?: Artifacts): boolean {
  return artifact?.name.toLowerCase().includes("docker") ?? false;
}

function installationGuideHref(
  product: DownloadProductCardProps["product"],
  userOs: OperatingSystem,
  artifact?: Artifacts,
  docLink?: string,
  vscodeExtensionLink?: string,
) {
  const isDocker = product === "engine" && isDockerArtifact(artifact);

  const selectedOs = artifact ? artifactOperatingSystem(artifact) : userOs;
  const guideOs = selectedOs === "unknown" ? userOs : selectedOs;

  const guidePath = vscodeExtensionLink
    ? "/download/installation/designer-vscode"
    : isDocker
      ? "/download/installation/docker"
      : product === "engine"
        ? "/download/installation/engine"
        : `/download/installation/designer-${guideOs === "unknown" ? "windows" : guideOs}`;

  const query = new URLSearchParams();
  if (vscodeExtensionLink) {
    query.set("vscodeExtensionLink", vscodeExtensionLink);
  }
  if (artifact?.url) {
    query.set("downloadUrl", artifact.url);
  }
  if (product === "engine" && !isDocker) {
    query.set("docLink", docLink || "/doc/latest");
  }

  return query.toString() ? `${guidePath}?${query.toString()}` : guidePath;
}

function detectOperatingSystem(): OperatingSystem {
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
    return {
      artifact,
      label: "Linux / macOS",
    };
  }
  return { artifact, label: artifact.name };
}

function artifactOption(
  artifact: Artifacts,
  isDesigner: boolean,
): ArtifactOption {
  return isDesigner
    ? { artifact, label: artifact.name }
    : engineArtifactOption(artifact);
}

function artifactMatchesOperatingSystem(
  artifact: Artifacts,
  os: OperatingSystem,
  isDesigner: boolean,
): boolean {
  if (!isDesigner && os === "mac") {
    return artifactOperatingSystem(artifact) === "linux";
  }
  return artifactOperatingSystem(artifact) === os;
}

function productConfig(
  release: DownloadRelease,
  product: DownloadProductCardProps["product"],
  releaseLabel: DownloadProductCardProps["releaseLabel"],
): ProductConfig {
  const isDesigner = product === "designer";
  const isLts = releaseLabel === "Long Term Support";

  return {
    title: isDesigner ? "Designer" : "Engine",
    badge: isDesigner ? "Design" : "Execute",
    mode: isDesigner ? "build" : "run",
    description: isDesigner
      ? "Model, design and test your business application locally."
      : "Deploy and run your application in a server environment.",
    icon: isDesigner ? (
      <IconTools className="h-8 w-8" />
    ) : (
      <IconDashboard className="h-8 w-8" />
    ),
    textClass: isLts ? "text-green" : "text-orange",
    backgroundClass: isLts ? "bg-green-bg" : "bg-orange-bg",
    badgeVariant: isLts ? "green" : "orange",
    artifacts: isDesigner ? release.designerArtifacts : release.engineArtifacts,
    isDesigner,
  };
}

function DownloadAction({
  title,
  version,
  artifactLabel,
  artifact,
  vscodeExtensionLink,
}: DownloadActionProps) {
  if (vscodeExtensionLink) {
    return (
      <a
        href={`/download/installation/designer-vscode?vscodeExtensionLink=${encodeURIComponent(vscodeExtensionLink)}`}
        className={buttonVariants({
          className: "h-10 w-full justify-start",
        })}
      >
        <IconBrandVscode className="size-5 shrink-0" aria-hidden="true" />
        Install Designer using VS Code Marketplace
      </a>
    );
  }

  if (!artifact) {
    return null;
  }

  if (artifact.name === "Docker") {
    return (
      <a
        href={`/download/installation/docker?downloadUrl=${artifact.url}`}
        className={buttonVariants({
          className: "h-10 w-full justify-start",
        })}
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
      className={buttonVariants({
        className: "h-10 w-full justify-start",
      })}
    >
      <IconDownload className="size-5 shrink-0" aria-hidden="true" />
      Download {title} {version}
      {artifactLabel && (
        <span className="hidden sm:inline"> for {artifactLabel}</span>
      )}
    </a>
  );
}

function DownloadProductCard({
  release,
  releaseLabel,
  product,
  badge,
  userOs,
}: DownloadProductCardProps) {
  const config = productConfig(release, product, releaseLabel);
  const { artifacts } = config;

  const hasVsCodeExtension =
    config.isDesigner &&
    artifacts.length === 0 &&
    Boolean(release.vscodeExtensionLink);

  const artifactOptions = artifacts.map((artifact) =>
    artifactOption(artifact, config.isDesigner),
  );

  const [selectedArtifactPermalink, setSelectedArtifactPermalink] = useState<
    string | null
  >(null);

  const [showPermalinks, setShowPermalinks] = useState(false);

  const defaultEngineArtifact = config.isDesigner
    ? undefined
    : artifacts.find(isDockerArtifact);

  const selectedArtifact =
    artifacts.find(
      (artifact) => artifact.permalink === selectedArtifactPermalink,
    ) ??
    defaultEngineArtifact ??
    artifacts.find((artifact) =>
      artifactMatchesOperatingSystem(artifact, userOs, config.isDesigner),
    ) ??
    artifacts[0];

  const permalinkId = useId();
  const artifactLabel = selectedArtifact?.permalink
    ? artifactOption(selectedArtifact, config.isDesigner).label
    : "";

  return (
    <Card data-user-os={userOs} className="h-fit">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex w-full flex-row items-start justify-between">
          <div
            className={`flex rounded-md p-2 ${config.backgroundClass} ${config.textClass}`}
          >
            {config.icon}
          </div>
          <div className="flex flex-row gap-4">
            <Badge variant={config.badgeVariant} className="uppercase">
              {badge}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold">
          Axon Ivy {config.title} {release.versionShort}
        </CardTitle>
        <CardDescription>
          <H6>{config.mode}</H6>
        </CardDescription>
        <CardDescription className="text-n800">
          {config.description}
          {release.docLink && (
            <>
              {" "}
              For more information, see the{" "}
              <a href={release.docLink} className="text-primary">
                documentation
              </a>
              .
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!hasVsCodeExtension && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {artifactOptions.map(({ artifact, label }) => {
              const isSelected =
                artifact.permalink === selectedArtifact?.permalink;

              return (
                <Button
                  key={`${product}-${artifact.name}`}
                  type="button"
                  aria-label={label}
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedArtifactPermalink(artifact.permalink)
                  }
                  variant={isSelected ? "accent" : "outline"}
                  className={`h-auto flex-row items-center justify-center gap-1 p-2 ${
                    isSelected ? "border-primary" : ""
                  }`}
                >
                  {label === "Linux / macOS" ? (
                    <OsOptionLabel label={label} />
                  ) : (
                    <OsIcon os={label} />
                  )}
                  {config.isDesigner && (
                    <span className="hidden font-medium sm:inline">
                      {artifact.name}
                    </span>
                  )}
                  {!config.isDesigner && label !== "Linux / macOS" && (
                    <OsOptionLabel label={label} />
                  )}
                </Button>
              );
            })}
          </div>
        )}
        <div className={hasVsCodeExtension ? "mt-4 md:mt-14" : "mt-auto"}>
          <DownloadAction
            title={config.title}
            version={release.versionShort}
            artifactLabel={artifactLabel}
            artifact={selectedArtifact}
            vscodeExtensionLink={
              hasVsCodeExtension ? release.vscodeExtensionLink : undefined
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <a
            href={installationGuideHref(
              product,
              userOs,
              selectedArtifact,
              product === "engine" ? release.docLink : undefined,
              hasVsCodeExtension ? release.vscodeExtensionLink : undefined,
            )}
            className="text-primary text-center"
          >
            Installation Guide
          </a>
          <Separator orientation="vertical" />
          <P className="text-n900 text-center">
            {release.releaseDate
              ? `Released: ${release.releaseDate}`
              : "Release date not available"}
          </P>
          <Separator orientation="vertical" />
          {hasVsCodeExtension ? (
            <a
              href={release.releaseNotesLink}
              className="text-primary text-center"
            >
              Release notes
            </a>
          ) : (
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 font-normal hover:no-underline"
              aria-expanded={showPermalinks}
              aria-controls={permalinkId}
              onClick={() => setShowPermalinks((current) => !current)}
            >
              <span className="flex w-full items-center gap-2">
                Permalinks
                <IconArrowRight
                  className={`size-4 shrink-0 transition-transform ${
                    showPermalinks ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Button>
          )}
        </div>
        {showPermalinks && (
          <ul
            id={permalinkId}
            className="border-n300 bg-n50 flex flex-col gap-2 rounded-lg border p-3"
          >
            {artifactOptions
              .filter(({ artifact }) => artifact.permalink)
              .map(({ artifact, label }) => (
                <li
                  key={`${product}-${artifact.name}`}
                  className="text-n900 text-sm"
                >
                  <span className="font-semibold">{label}:</span>{" "}
                  <a href={artifact.permalink} className="text-primary">
                    {artifact.permalink}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function DownloadCards({
  release,
  releaseLabel,
  badge,
}: DownloadCardsProps) {
  const [userOs, setUserOs] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    setUserOs(detectOperatingSystem());
  }, []);

  const showDesignerCard =
    release.designerArtifacts.length > 0 ||
    Boolean(release.vscodeExtensionLink);
  const showEngineCard = release.engineArtifacts.length > 0;

  if (!showDesignerCard && !showEngineCard) {
    return null;
  }

  return (
    <>
      {showDesignerCard && (
        <DownloadProductCard
          release={release}
          releaseLabel={releaseLabel}
          product="designer"
          badge={badge}
          userOs={userOs}
        />
      )}
      {showEngineCard && (
        <DownloadProductCard
          release={release}
          releaseLabel={releaseLabel}
          product="engine"
          badge={badge}
          userOs={userOs}
        />
      )}
    </>
  );
}
