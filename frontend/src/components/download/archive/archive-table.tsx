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
}: {
  label: string;
  artifacts: ArchiveArtifact[];
  view: ArchiveView;
}) {
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
        {isSbom ? " SBOM:" : ":"}
      </span>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {sortedArtifacts.map((artifact) => {
          const { icon, label } = getArtifactMeta(artifact);

          return (
            <li key={artifact.filename} className="flex">
              <a
                href={linkFor(artifact, view)}
                className="text-primary inline-flex items-center gap-1"
              >
                {icon}
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
}: {
  release: ArchiveRelease;
  view: ArchiveView;
}) {
  if (view === "sbom" && !hasSbom(release)) {
    return <span className="text-n900">No SBOM files available</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      <ArtifactRow
        label="Engine"
        view={view}
        artifacts={release.engineArtifacts ?? []}
      />
      <ArtifactRow
        label="Designer"
        view={view}
        artifacts={release.designerArtifacts ?? []}
      />
    </div>
  );
}

function ReleaseDetails({ release }: { release: ArchiveRelease }) {
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
        <ExternalLink href={release.releaseNotes}>Release notes</ExternalLink>
      )}
      {release.checksumsUrl && (
        <ExternalLink href={release.checksumsUrl}>Checksums</ExternalLink>
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
}: {
  releases: ArchiveRelease[];
  view: ArchiveView;
}) {
  return (
    <div className="bg-background hidden rounded-md px-4 py-2 md:block">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/8">Version</TableHead>
            <TableHead className="w-1/8">Release Date</TableHead>
            <TableHead className="w-1/2">Artifacts</TableHead>
            <TableHead className="w-1/6">Details</TableHead>
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
                <ReleaseArtifacts release={release} view={view} />
              </TableCell>
              <TableCell className="align-top">
                <ReleaseDetails release={release} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
