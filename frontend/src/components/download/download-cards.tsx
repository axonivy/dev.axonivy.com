import { useEffect, useId, useState, type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconArrowRight, IconDashboard, IconTools } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H6, P } from "@/components/ui/typography";
import {
  artifactMatchesOperatingSystem,
  artifactOption,
  detectOperatingSystem,
  installationGuideHref,
  isDockerArtifact,
  isVsCodeExtensionArtifact,
  type Artifacts,
  type DownloadRelease,
  type OperatingSystem,
  type Product,
} from "@/components/download/download-artifacts";
import { DownloadAction } from "@/components/download/download-action";
import { ArtifactPicker } from "@/components/download/artifact-picker";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { localePath } from "@/translation/language";
import type { Lang } from "@/translation/ui";

type DownloadCardsProps = {
  release: DownloadRelease;
  isLts: boolean;
  badge: string;
  lang: Lang;
};

type DownloadProductCardProps = {
  release: DownloadRelease;
  isLts: boolean;
  product: Product;
  badge: string;
  userOs: OperatingSystem;
  lang: Lang;
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

function productConfig(
  release: DownloadRelease,
  product: DownloadProductCardProps["product"],
  isLts: DownloadProductCardProps["isLts"],
  t: TFunction,
): ProductConfig {
  const isDesigner = product === "designer";

  return {
    title: t(
      isDesigner ? "download.labels.designer" : "download.labels.engine",
    ),
    badge: t(isDesigner ? "download.labels.design" : "download.labels.execute"),
    mode: t(isDesigner ? "download.labels.build" : "download.labels.run"),
    description: isDesigner
      ? t("download.card.designerDescription")
      : t("download.card.engineDescription"),
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

function DownloadProductCard({
  release,
  isLts,
  product,
  badge,
  userOs,
  lang,
}: DownloadProductCardProps) {
  const { t } = useTranslation(undefined, { lng: lang });
  const config = productConfig(release, product, isLts, t);
  const { artifacts } = config;
  const vsCodeExtensionArtifact = config.isDesigner
    ? artifacts.find(isVsCodeExtensionArtifact)
    : undefined;

  const artifactOptions = artifacts.map((artifact) =>
    artifactOption(artifact, config.isDesigner),
  );
  const permalinkOptions = artifactOptions.filter(
    ({ artifact }) => artifact.permalink,
  );

  const [selectedArtifactPermalink, setSelectedArtifactPermalink] = useState<
    string | null
  >(null);

  const [showPermalinks, setShowPermalinks] = useState(false);

  const defaultEngineArtifact = config.isDesigner
    ? undefined
    : artifacts.find(isDockerArtifact);

  const selectedArtifact =
    vsCodeExtensionArtifact ??
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
            <Badge variant={config.badgeVariant}>{badge}</Badge>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold">
          Axon Ivy {config.title} {release.versionShort}
        </CardTitle>
        <CardDescription>
          <H6>{config.mode}</H6>
        </CardDescription>
        <CardDescription className="text-n900">
          {config.description}
          {release.docLink && (
            <>
              {" "}
              {t("download.card.moreInformation")}{" "}
              <a href={release.docLink} className="text-primary">
                {t("download.card.documentation")}
              </a>
              .
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!vsCodeExtensionArtifact && (
          <ArtifactPicker
            product={product}
            options={artifactOptions}
            selectedPermalink={selectedArtifact?.permalink}
            isDesigner={config.isDesigner}
            onSelect={setSelectedArtifactPermalink}
          />
        )}
        <div
          className={vsCodeExtensionArtifact ? "mt-4 md:mt-14.5" : "mt-auto"}
        >
          <DownloadAction
            title={config.title}
            version={release.version}
            artifactLabel={artifactLabel}
            artifact={selectedArtifact}
            lang={lang}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <a
            href={localePath(
              lang,
              installationGuideHref(
                product,
                userOs,
                selectedArtifact,
                product === "engine" ? release.docLink : undefined,
              ),
            )}
            className="text-primary text-center"
          >
            {t("download.labels.installationGuide")}
          </a>
          <Separator orientation="vertical" />
          <P className="text-n900 text-center">
            {release.releaseDate
              ? t("download.labels.released", { date: release.releaseDate })
              : t("download.labels.releaseDateNotAvailable")}
          </P>
          <Separator orientation="vertical" />
          {vsCodeExtensionArtifact ? (
            <a
              href={release.releaseNotesLink}
              className="text-primary text-center"
            >
              {t("download.labels.releaseNotes")}
            </a>
          ) : permalinkOptions.length > 0 ? (
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 font-normal hover:no-underline"
              aria-expanded={showPermalinks}
              aria-controls={permalinkId}
              onClick={() => setShowPermalinks((current) => !current)}
            >
              <span className="flex w-full items-center gap-2">
                {t("download.labels.permalinks")}
                <IconArrowRight
                  className={`size-4 shrink-0 transition-transform ${
                    showPermalinks ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Button>
          ) : (
            <div className="w-24" />
          )}
        </div>
        {!vsCodeExtensionArtifact &&
          showPermalinks &&
          permalinkOptions.length > 0 && (
            <ul
              id={permalinkId}
              className="bg-n50 flex flex-col gap-2 rounded-lg p-3"
            >
              {permalinkOptions.map(({ artifact, label }) => (
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
  isLts,
  badge,
  lang,
}: DownloadCardsProps) {
  const [userOs, setUserOs] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    setUserOs(detectOperatingSystem());
  }, []);

  const showDesignerCard = release.designerArtifacts.length > 0;
  const showEngineCard = release.engineArtifacts.length > 0;

  if (!showDesignerCard && !showEngineCard) {
    return null;
  }

  return (
    <>
      {showDesignerCard && (
        <DownloadProductCard
          release={release}
          isLts={isLts}
          product="designer"
          badge={badge}
          userOs={userOs}
          lang={lang}
        />
      )}
      {showEngineCard && (
        <DownloadProductCard
          release={release}
          isLts={isLts}
          product="engine"
          badge={badge}
          userOs={userOs}
          lang={lang}
        />
      )}
    </>
  );
}
