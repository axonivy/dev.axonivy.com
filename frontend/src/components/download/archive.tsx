import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import {
  IconArrowRight,
  IconArrowUpRight,
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
} from "@tabler/icons-react";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ArchiveSkeleton from "@/components/skeletons/archive-skeleton";
import { Base, H4, H5, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ArchiveArtifact = {
  name: string;
  url: string;
  filename: string;
  permalink: string;
};

export type ArchiveProduct = "designer" | "engine";

export type ArchiveRelease = {
  version: string;
  checksumsUrl: string;
  releaseDate: string;
  releaseNotes: string;
  designerArtifacts: ArchiveArtifact[];
  engineArtifacts: ArchiveArtifact[];
};

export type ArchiveVersionOption = { id: string };

export type ArchiveResponse = {
  releaseInfos: ArchiveRelease[];
  categorizedVersions: Record<string, ArchiveVersionOption[]>;
  currentMajorVersion: string;
};

type ArtifactCategory =
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

const artifactCategoryOrder: ArtifactCategory[] = [
  "all",
  "slim",
  "deb",
  "docker",
  "linux",
  "macos",
  "windows",
  "vscode",
];

function isDockerArtifact(artifact: ArchiveArtifact) {
  return artifact.name.includes("/");
}

function isVscodeArtifact(artifact: ArchiveArtifact) {
  return artifact.name.toLowerCase().includes("vscode");
}

export function getArtifactMeta(artifact: ArchiveArtifact): ArtifactMeta {
  const filename = artifact.name.toLowerCase();

  if (isDockerArtifact(artifact)) {
    return {
      category: "docker",
      label: "Docker",
      icon: <IconBrandDocker className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.includes("windows")) {
    return {
      category: "windows",
      label: "Windows",
      icon: <IconBrandWindows className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.includes("mac")) {
    return {
      category: "macos",
      label: "macOS",
      icon: <IconBrandApple className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.includes("slim")) {
    return {
      category: "slim",
      label: "All Slim\u00B9",
      icon: <IconBrandUbuntu className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.endsWith(".deb")) {
    return {
      category: "deb",
      label: "Debian",
      icon: <IconBrandDebian className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.includes("linux")) {
    return {
      category: "linux",
      label: "Linux",
      icon: <IconBrandUbuntu className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.includes("all")) {
    return {
      category: "all",
      label: "All",
      icon: <IconDeviceLaptop className="size-4" aria-hidden="true" />,
    };
  }
  if (isVscodeArtifact(artifact)) {
    return {
      category: "vscode",
      label: "VS Code",
      icon: <IconBrandVscode className="size-4" aria-hidden="true" />,
    };
  }

  return {
    category: "other",
    label: artifact.filename,
    icon: <IconDownload className="size-4" aria-hidden="true" />,
  };
}

export function sortArtifacts(artifacts: ArchiveArtifact[]) {
  return [...artifacts].sort((a, b) => {
    const categoryA = getArtifactMeta(a).category;
    const categoryB = getArtifactMeta(b).category;
    const rankA = artifactCategoryOrder.indexOf(categoryA);
    const rankB = artifactCategoryOrder.indexOf(categoryB);
    const orderedRankA = rankA === -1 ? Infinity : rankA;
    const orderedRankB = rankB === -1 ? Infinity : rankB;

    if (orderedRankA !== orderedRankB) {
      return orderedRankA - orderedRankB;
    }

    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}

export function sortReleasesByVersionDescending(releases: ArchiveRelease[]) {
  return [...releases].sort((a, b) => b.version.localeCompare(a.version));
}

function hasSlimEngineArtifact(releases: ArchiveRelease[]) {
  return releases.some((release) =>
    release.engineArtifacts.some(
      (artifact) => getArtifactMeta(artifact).category === "slim",
    ),
  );
}

async function fetchArchive(version: string) {
  const endpoint = version
    ? `/ui/archive/${encodeURIComponent(version)}`
    : "/ui/archive";
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return (await response.json()) as ArchiveResponse;
}

function ArtifactLinks({ artifacts }: { artifacts: ArchiveArtifact[] }) {
  const sortedArtifacts = sortArtifacts(artifacts);
  if (artifacts.length === 0) {
    return "-";
  }

  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {sortedArtifacts.map((artifact) => {
        const { icon, label } = getArtifactMeta(artifact);

        return (
          <li key={artifact.filename}>
            <a
              href={artifact.url}
              className="text-primary inline-flex items-center gap-1"
            >
              <span className="inline-flex items-center gap-1">
                {icon}
                {label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ArchiveTable({ releases }: { releases: ArchiveRelease[] }) {
  return (
    <>
      <MobileArchiveCards releases={releases} />
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
            {releases.map((release) => {
              return (
                <TableRow key={release.version}>
                  <TableCell className="align-top">{release.version}</TableCell>
                  <TableCell className="align-top">
                    {release.releaseDate || "-"}
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <span className="text-n900 w-18 shrink-0 font-medium">
                          Engine:
                        </span>
                        <ArtifactLinks
                          artifacts={release.engineArtifacts ?? []}
                        />
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-n900 w-18 shrink-0 font-medium">
                          Designer:
                        </span>
                        <ArtifactLinks
                          artifacts={release.designerArtifacts ?? []}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    {release.releaseNotes ? (
                      <div className="flex flex-col gap-2">
                        <a
                          href={release.releaseNotes}
                          className="text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Release notes
                          <IconArrowUpRight
                            className="ml-1 inline-block size-4"
                            aria-hidden="true"
                          />
                        </a>
                        <a
                          href={release.checksumsUrl}
                          className="text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Checksums
                          <IconArrowUpRight
                            className="ml-1 inline-block size-4"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function MobileArtifactRow({
  icon,
  label,
  artifacts,
}: {
  icon: React.ReactNode;
  label: string;
  artifacts: ArchiveArtifact[];
}) {
  const sortedArtifacts = sortArtifacts(artifacts);

  if (sortedArtifacts.length === 0) {
    return null;
  }

  return (
    <div className="border-n200 flex justify-between gap-3 border-b py-2 last:border-b-0">
      <div className="text-n900 flex w-1/2 shrink-0 items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <div className="min-w-0 flex-1 text-right">
        {sortedArtifacts.map((artifact) => {
          const isDocker = isDockerArtifact(artifact);
          const isVscode = isVscodeArtifact(artifact);

          return (
            <a
              key={artifact.filename}
              href={artifact.url}
              className="text-primary inline-flex items-center gap-2"
            >
              {isDocker || isVscode ? (
                <IconLink className="size-5 shrink-0" aria-hidden="true" />
              ) : (
                <IconDownload className="size-5 shrink-0" aria-hidden="true" />
              )}
              {isDocker ? "Docker" : isVscode ? "VS Code" : "x64"}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function MobileArtifactSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 first:mt-0">
      <Base className="text-n900 font-semibold">{title}</Base>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function MobileArchiveCards({ releases }: { releases: ArchiveRelease[] }) {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      {releases.map((release) => {
        const designerArtifacts = release.designerArtifacts ?? [];
        const engineArtifacts = release.engineArtifacts ?? [];

        return (
          <article
            key={release.version}
            className="bg-background rounded-3xl px-6 py-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <H4 className="text-n900">{release.version}</H4>
                <Base className="text-n600 mt-2 flex items-center gap-2">
                  <IconCalendar className="size-4" aria-hidden="true" />
                  {release.releaseDate || "-"}
                </Base>
              </div>
              {release.releaseNotes ? (
                <a
                  href={release.releaseNotes}
                  className="text-primary inline-flex shrink-0 items-center gap-1"
                >
                  Release notes
                  <IconArrowRight className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <div className="mt-4">
              <MobileArtifactSection title="Designer">
                <MobileArtifactRow
                  icon={
                    <IconBrandUbuntu className="size-4" aria-hidden="true" />
                  }
                  label="Linux"
                  artifacts={designerArtifacts.filter(
                    (artifact) =>
                      getArtifactMeta(artifact).category === "linux",
                  )}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandApple className="size-4" aria-hidden="true" />
                  }
                  label="macOS"
                  artifacts={designerArtifacts.filter(
                    (artifact) =>
                      getArtifactMeta(artifact).category === "macos",
                  )}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandWindows className="size-4" aria-hidden="true" />
                  }
                  label="Windows"
                  artifacts={designerArtifacts.filter(
                    (artifact) =>
                      getArtifactMeta(artifact).category === "windows",
                  )}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandVscode className="size-4" aria-hidden="true" />
                  }
                  label="VS Code"
                  artifacts={designerArtifacts.filter(isVscodeArtifact)}
                />
              </MobileArtifactSection>
              <MobileArtifactSection title="Engine">
                <MobileArtifactRow
                  icon={
                    <IconDeviceLaptop className="size-4" aria-hidden="true" />
                  }
                  label="All"
                  artifacts={engineArtifacts.filter(
                    (artifact) => getArtifactMeta(artifact).category === "all",
                  )}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandDebian className="size-4" aria-hidden="true" />
                  }
                  label="Debian"
                  artifacts={engineArtifacts.filter(
                    (artifact) => getArtifactMeta(artifact).category === "deb",
                  )}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandDocker className="size-4" aria-hidden="true" />
                  }
                  label="Docker"
                  artifacts={engineArtifacts.filter(isDockerArtifact)}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandUbuntu className="size-4" aria-hidden="true" />
                  }
                  label="Linux / macOS"
                  artifacts={engineArtifacts.filter((artifact) => {
                    const category = getArtifactMeta(artifact).category;
                    return (
                      category !== "windows" &&
                      category !== "docker" &&
                      category !== "slim" &&
                      category !== "deb" &&
                      category !== "all"
                    );
                  })}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandWindows className="size-4" aria-hidden="true" />
                  }
                  label="Windows"
                  artifacts={engineArtifacts.filter(
                    (artifact) =>
                      getArtifactMeta(artifact).category === "windows",
                  )}
                />
                <MobileArtifactRow
                  icon={
                    <IconBrandUbuntu className="size-4" aria-hidden="true" />
                  }
                  label="All Slim"
                  artifacts={engineArtifacts.filter(
                    (artifact) => getArtifactMeta(artifact).category === "slim",
                  )}
                />
              </MobileArtifactSection>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function Archive() {
  const [selectedVersion, setSelectedVersion] = useQueryState(
    "archive",
    parseAsString.withDefault(""),
  );
  const defaultArchive = useQuery({
    queryKey: ["archive", "latest"],
    placeholderData: (previousData) => previousData,
    queryFn: () => fetchArchive(""),
  });
  const knownArchiveVersions = useMemo(
    () =>
      Object.values(defaultArchive.data?.categorizedVersions ?? {})
        .flat()
        .map((version) => version.id),
    [defaultArchive.data?.categorizedVersions],
  );
  const shouldFetchSelectedArchive =
    selectedVersion !== "" &&
    selectedVersion !== "older" &&
    knownArchiveVersions.includes(selectedVersion);
  const selectedArchive = useQuery({
    queryKey: ["archive", selectedVersion],
    enabled: shouldFetchSelectedArchive,
    placeholderData: (previousData) => previousData,
    queryFn: () => fetchArchive(selectedVersion),
  });
  const data = shouldFetchSelectedArchive
    ? (selectedArchive.data ?? defaultArchive.data)
    : defaultArchive.data;
  const isLoading =
    defaultArchive.isLoading ||
    (shouldFetchSelectedArchive && selectedArchive.isLoading && !data);
  const error = defaultArchive.error ?? selectedArchive.error;

  useEffect(() => {
    if (!defaultArchive.data || !selectedVersion) {
      return;
    }
    if (
      selectedVersion !== "older" &&
      !knownArchiveVersions.includes(selectedVersion)
    ) {
      void setSelectedVersion(null);
    }
  }, [
    defaultArchive.data,
    knownArchiveVersions,
    selectedVersion,
    setSelectedVersion,
  ]);

  if (isLoading) {
    return <ArchiveSkeleton rows={12} />;
  }

  if (error) {
    return (
      <P className="text-destructive">
        Failed to load archive data: {error.message}
      </P>
    );
  }

  if (!data) {
    return <P className="text-n900">No archive data available.</P>;
  }

  const activeVersion = selectedVersion || data.currentMajorVersion;
  const ltsVersions = data.categorizedVersions["Long Term Support"] ?? [];
  const unstableVersions = data.categorizedVersions.unstable ?? [];
  const selectVersionGroups = Object.entries(data.categorizedVersions).filter(
    ([category, versions]) =>
      category !== "Long Term Support" &&
      category !== "unstable" &&
      versions.length > 0,
  );
  const selectVersionIds = selectVersionGroups.flatMap(([, versions]) =>
    versions.map((version) => version.id),
  );
  const isSelectSelected =
    activeVersion === "older" || selectVersionIds.includes(activeVersion);
  const selectLabel = "Archive";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-start gap-2">
        {ltsVersions.length > 0 ? (
          <div className="flex flex-row gap-2">
            {ltsVersions.map((version) => (
              <Button
                key={version.id}
                variant={activeVersion === version.id ? "default" : "outline"}
                onClick={() => void setSelectedVersion(version.id)}
              >
                LTS {version.id}
              </Button>
            ))}
          </div>
        ) : null}
        {unstableVersions.length > 0 ? (
          <div className="flex flex-row gap-2">
            {unstableVersions.map((version) => (
              <Button
                key={version.id}
                variant={activeVersion === version.id ? "default" : "outline"}
                onClick={() => void setSelectedVersion(version.id)}
              >
                Dev
              </Button>
            ))}
          </div>
        ) : null}
        <NativeSelect
          value={isSelectSelected ? activeVersion : ""}
          onChange={(event) => void setSelectedVersion(event.target.value)}
          className={cn(
            "bg-background rounded-lg",
            isSelectSelected &&
              "[&_select]:border-primary! [&_select]:bg-primary [&_select]:text-primary-foreground [&_select]:hover:bg-primary/80 [&_svg]:text-primary-foreground",
          )}
        >
          <NativeSelectOption value="" disabled hidden>
            {selectLabel}
          </NativeSelectOption>
          {selectVersionGroups.map(([category, versions]) => (
            <NativeSelectOptGroup
              key={category}
              label={category === "UNSUPPORTED" ? selectLabel : category}
            >
              {versions.map((version) => (
                <NativeSelectOption key={version.id} value={version.id}>
                  {version.id}
                </NativeSelectOption>
              ))}
              {category === "UNSUPPORTED" ? (
                <NativeSelectOption key="older" value="older">
                  Older
                </NativeSelectOption>
              ) : null}
            </NativeSelectOptGroup>
          ))}
        </NativeSelect>
      </div>

      {selectedVersion === "older" ? (
        <Base className="text-n900">
          Are you searching for even older versions? Have a look at our{" "}
          <a
            href="https://archive.axonivy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            archive page
          </a>
          .
        </Base>
      ) : (
        <>
          <ArchiveTable releases={data.releaseInfos} />
          {hasSlimEngineArtifact(data.releaseInfos) ? (
            <P className="text-n800">
              <sup>1</sup> This version is similar to the 'All' product, but
              without the 'demo-portal'.
            </P>
          ) : null}
        </>
      )}
    </div>
  );
}
