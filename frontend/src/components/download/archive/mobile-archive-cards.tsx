import {
  IconArrowRight,
  IconBrandApple,
  IconBrandDebian,
  IconBrandDocker,
  IconBrandUbuntu,
  IconBrandVscode,
  IconBrandWindows,
  IconCalendar,
  IconDeviceLaptop,
  IconDownload,
  IconLink,
  type Icon,
} from "@tabler/icons-react";
import { Base, H4 } from "@/components/ui/typography";
import type {
  ArchiveArtifact,
  ArchiveRelease,
} from "@/components/download/archive/archive";
import {
  inCategory,
  isDockerArtifact,
  isVscodeArtifact,
  sortArtifacts,
} from "@/components/download/archive/artifact-meta";

type ArtifactFilter = (artifact: ArchiveArtifact) => boolean;

type MobileRow = { label: string; icon: Icon; filter: ArtifactFilter };

const designerRows: MobileRow[] = [
  { label: "Linux", icon: IconBrandUbuntu, filter: inCategory("linux") },
  { label: "macOS", icon: IconBrandApple, filter: inCategory("macos") },
  { label: "Windows", icon: IconBrandWindows, filter: inCategory("windows") },
  { label: "VS Code", icon: IconBrandVscode, filter: isVscodeArtifact },
];

const engineRows: MobileRow[] = [
  { label: "All", icon: IconDeviceLaptop, filter: inCategory("all") },
  { label: "Debian", icon: IconBrandDebian, filter: inCategory("deb") },
  { label: "Docker", icon: IconBrandDocker, filter: isDockerArtifact },
  {
    label: "Linux / macOS",
    icon: IconBrandUbuntu,
    filter: (artifact) =>
      !inCategory("windows", "docker", "slim", "deb", "all")(artifact),
  },
  { label: "Windows", icon: IconBrandWindows, filter: inCategory("windows") },
  { label: "All Slim", icon: IconBrandUbuntu, filter: inCategory("slim") },
];

function artifactLinkLabel(artifact: ArchiveArtifact) {
  if (isDockerArtifact(artifact)) {
    return "Docker";
  }
  if (isVscodeArtifact(artifact)) {
    return "VS Code";
  }
  return "x64";
}

function MobileArtifactRow({
  row,
  artifacts,
}: {
  row: MobileRow;
  artifacts: ArchiveArtifact[];
}) {
  const sortedArtifacts = sortArtifacts(artifacts.filter(row.filter));
  if (sortedArtifacts.length === 0) {
    return null;
  }

  const RowIcon = row.icon;

  return (
    <div className="border-n200 flex justify-between gap-3 border-b py-2 last:border-b-0">
      <div className="text-n900 flex w-1/2 shrink-0 items-center gap-3">
        <RowIcon className="size-4" aria-hidden="true" />
        <span>{row.label}</span>
      </div>
      <div className="min-w-0 flex-1 text-right">
        {sortedArtifacts.map((artifact) => {
          const isExternal =
            isDockerArtifact(artifact) || isVscodeArtifact(artifact);
          const LinkIcon = isExternal ? IconLink : IconDownload;

          return (
            <a
              key={artifact.filename}
              href={artifact.url}
              className="text-primary inline-flex items-center gap-2"
            >
              <LinkIcon className="size-5 shrink-0" aria-hidden="true" />
              {artifactLinkLabel(artifact)}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function MobileArtifactSection({
  title,
  rows,
  artifacts,
}: {
  title: string;
  rows: MobileRow[];
  artifacts: ArchiveArtifact[];
}) {
  return (
    <section className="mt-4 first:mt-0">
      <Base className="text-n900 font-semibold">{title}</Base>
      <div className="mt-2">
        {rows.map((row) => (
          <MobileArtifactRow key={row.label} row={row} artifacts={artifacts} />
        ))}
      </div>
    </section>
  );
}

function MobileReleaseCard({ release }: { release: ArchiveRelease }) {
  return (
    <article className="bg-background rounded-3xl px-6 py-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <H4 className="text-n900">{release.version}</H4>
          <Base className="text-n600 mt-2 flex items-center gap-2">
            <IconCalendar className="size-4" aria-hidden="true" />
            {release.releaseDate || "-"}
          </Base>
        </div>
        {release.releaseNotes && (
          <a
            href={release.releaseNotes}
            className="text-primary inline-flex shrink-0 items-center gap-1"
          >
            Release notes
            <IconArrowRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
      <div className="mt-4">
        <MobileArtifactSection
          title="Designer"
          rows={designerRows}
          artifacts={release.designerArtifacts ?? []}
        />
        <MobileArtifactSection
          title="Engine"
          rows={engineRows}
          artifacts={release.engineArtifacts ?? []}
        />
      </div>
    </article>
  );
}

export function MobileArchiveCards({
  releases,
}: {
  releases: ArchiveRelease[];
}) {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      {releases.map((release) => (
        <MobileReleaseCard key={release.version} release={release} />
      ))}
    </div>
  );
}
