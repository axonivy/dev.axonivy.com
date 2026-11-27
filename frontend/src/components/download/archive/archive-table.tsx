import { IconAlertTriangle, IconArrowUpRight } from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Base } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type {
  ArchiveArtifact,
  ArchiveRelease,
  ArchiveView,
} from "@/components/download/archive/archive";
import {
  getArtifactMeta,
  sortArtifacts,
} from "@/components/download/archive/artifact-meta";
import { useTranslation } from "react-i18next";
import type { Lang } from "@/translation/ui";

function linkFor(artifact: ArchiveArtifact, view: ArchiveView) {
  return view === "sbom" ? artifact.bomUrl : artifact.url;
}

function hasSbom(release: ArchiveRelease) {
  return [
    ...(release.engineArtifacts ?? []),
    ...(release.designerArtifacts ?? []),
  ].some((artifact) => artifact.bomUrl);
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn("text-primary", className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <IconArrowUpRight
        className="ml-1 inline-block size-4"
        aria-hidden="true"
      />
    </a>
  );
}

function ArtifactRow({
  label,
  artifacts,
  view,
  lang,
}: {
  label: string;
  artifacts: ArchiveArtifact[];
  view: ArchiveView;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });
  const sortedArtifacts = sortArtifacts(
    artifacts.filter((artifact) => linkFor(artifact, view)),
  );
  if (sortedArtifacts.length === 0) {
    return null;
  }

  const isSbom = view === "sbom";

  return (
    <div className="flex items-start gap-2">
      <span
        className={cn(
          "text-n900 shrink-0 font-medium",
          isSbom ? "w-30" : "w-18",
        )}
      >
        {label}
        {isSbom ? t("download.archive.sbomSuffix") : ":"}
      </span>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {sortedArtifacts.map((artifact) => {
          const meta = getArtifactMeta(artifact);
          const label =
            meta.category === "all"
              ? t("download.archive.all")
              : meta.category === "slim"
                ? t("download.archive.allSlim")
                : meta.label;

          return (
            <li key={artifact.filename} className="flex">
              <a
                href={linkFor(artifact, view)}
                className="text-primary inline-flex items-center gap-1"
              >
                {meta.icon}
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ReleaseArtifacts({
  release,
  view,
  lang,
}: {
  release: ArchiveRelease;
  view: ArchiveView;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });
  if (view === "sbom" && !hasSbom(release)) {
    return (
      <span className="text-n900">{t("download.archive.noSbomFiles")}</span>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ArtifactRow
        label={t("download.labels.engine")}
        view={view}
        artifacts={release.engineArtifacts ?? []}
        lang={lang}
      />
      <ArtifactRow
        label={t("download.labels.designer")}
        view={view}
        artifacts={release.designerArtifacts ?? []}
        lang={lang}
      />
    </div>
  );
}

function ReleaseDetails({
  release,
  lang,
}: {
  release: ArchiveRelease;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });
  const hasDetails =
    release.releaseNotes ||
    release.checksumsUrl ||
    release.unsafeReasons?.length;

  if (!hasDetails) {
    return <Base>-</Base>;
  }

  return (
    <div className="flex flex-col gap-2">
      {release.releaseNotes && (
        <ExternalLink href={release.releaseNotes}>
          {t("download.archive.releaseNotes")}
        </ExternalLink>
      )}
      {release.checksumsUrl && (
        <ExternalLink href={release.checksumsUrl}>
          {t("download.archive.checksums")}
        </ExternalLink>
      )}
      {release.unsafeReasons?.map((reason) => (
        <ExternalLink key={reason.url} href={reason.url} className="text-red">
          <IconAlertTriangle
            className="mr-1 inline-block size-4"
            aria-hidden="true"
          />
          {reason.issue}
        </ExternalLink>
      ))}
    </div>
  );
}

export function ArchiveTable({
  releases,
  view,
  lang,
}: {
  releases: ArchiveRelease[];
  view: ArchiveView;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });
  return (
    <div className="bg-background hidden rounded-md px-4 py-2 md:block">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/8">
              {t("download.archive.tableVersion")}
            </TableHead>
            <TableHead className="w-1/8">
              {t("download.archive.releaseDate")}
            </TableHead>
            <TableHead className="w-1/2">
              {t("download.archive.tableArtifacts")}
            </TableHead>
            <TableHead className="w-1/6">
              {t("download.archive.details")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release) => (
            <TableRow key={release.version}>
              <TableCell className="align-top">{release.version}</TableCell>
              <TableCell className="align-top">
                {release.releaseDate || "-"}
              </TableCell>
              <TableCell className="align-top">
                <ReleaseArtifacts release={release} view={view} lang={lang} />
              </TableCell>
              <TableCell className="align-top">
                <ReleaseDetails release={release} lang={lang} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
