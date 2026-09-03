import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Base, H4, P } from "@/components/ui/typography";

export type ArchiveArtifact = {
  name: string;
  url: string;
  filename: string;
  permalink: string;
};

export type ArchiveProduct = "designer" | "engine";

export type ArchiveRelease = {
  version: string;
  releaseDate: string;
  releaseNotes: string;
  vscodeExtensionLink: string;
  designerArtifacts: ArchiveArtifact[];
  engineArtifacts: ArchiveArtifact[];
};

export type ArchiveVersionOption = {
  id: string;
};

export type ArchiveResponse = {
  releaseInfos: ArchiveRelease[];
  categorizedVersions: Record<string, ArchiveVersionOption[]>;
  currentMajorVersion: string;
};

type ArtifactCategory =
  "all" | "deb" | "docker" | "windows" | "macos" | "linux" | "slim" | "other";

type ArtifactMeta = {
  category: ArtifactCategory;
  label: string;
  icon: React.ReactNode;
};

const artifactCategoryOrder: ArtifactCategory[] = [
  "all",
  "deb",
  "docker",
  "linux",
  "macos",
  "windows",
  "slim",
];

function isDockerArtifact(artifact: ArchiveArtifact) {
  return artifact.name.includes("/");
}

function getArtifactMeta(artifact: ArchiveArtifact): ArtifactMeta {
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
      label: "Slim",
      icon: <IconBrandUbuntu className="size-4" aria-hidden="true" />,
    };
  }
  if (filename.includes("linux")) {
    return {
      category: "linux",
      label: "Linux",
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
  if (filename.includes("all")) {
    return {
      category: "all",
      label: "All",
      icon: <IconDeviceLaptop className="size-4" aria-hidden="true" />,
    };
  }

  return {
    category: "other",
    label: artifact.filename,
    icon: <IconDownload className="size-4" aria-hidden="true" />,
  };
}

function sortArtifacts(artifacts: ArchiveArtifact[]) {
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

function ArtifactLinks({
  artifacts,
  vscodeExtensionLink,
}: {
  artifacts: ArchiveArtifact[];
  vscodeExtensionLink?: string;
}) {
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
      {vscodeExtensionLink ? (
        <li key="vscode-extension">
          <a
            href={vscodeExtensionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-1"
          >
            <span className="inline-flex items-center gap-1">
              <IconBrandVscode className="size-4" aria-hidden="true" />
              VS Code Extension
            </span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

export function ArchiveTable({
  product,
  releases,
}: {
  product: ArchiveProduct;
  releases: ArchiveRelease[];
}) {
  return (
    <>
      <MobileArchiveCards product={product} releases={releases} />
      <div className="bg-background hidden rounded-md px-4 py-2 md:block">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/8">Version</TableHead>
              <TableHead className="w-1/8">Release Date</TableHead>
              <TableHead className={product === "engine" ? "w-1/3" : "w-1/2"}>
                Artifacts
              </TableHead>
              {product === "engine" ? (
                <TableHead className="w-1/6">Slim</TableHead>
              ) : null}
              <TableHead className="w-1/6">Release notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {releases.map((release) => {
              const artifacts =
                product === "designer"
                  ? (release.designerArtifacts ?? [])
                  : (release.engineArtifacts ?? []);

              return (
                <TableRow key={release.version}>
                  <TableCell>{release.version}</TableCell>
                  <TableCell>{release.releaseDate || "-"}</TableCell>
                  <TableCell>
                    <ArtifactLinks
                      artifacts={
                        product === "engine"
                          ? artifacts.filter(
                              (artifact) =>
                                getArtifactMeta(artifact).category !== "slim",
                            )
                          : artifacts
                      }
                      vscodeExtensionLink={
                        product === "designer"
                          ? (release.vscodeExtensionLink ?? null)
                          : ""
                      }
                    />
                  </TableCell>
                  {product === "engine" ? (
                    <TableCell>
                      <ArtifactLinks
                        artifacts={artifacts.filter(
                          (artifact) =>
                            getArtifactMeta(artifact).category === "slim",
                        )}
                      />
                    </TableCell>
                  ) : null}
                  <TableCell>
                    {release.releaseNotes ? (
                      <a href={release.releaseNotes} className="text-primary">
                        Release notes
                        <IconArrowRight
                          className="ml-1 inline-block size-4"
                          aria-hidden="true"
                        />
                      </a>
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

  return (
    <div className="border-n200 flex justify-between gap-3 border-b py-2 last:border-b-0">
      <div className="text-n900 flex w-1/2 shrink-0 items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <div className="min-w-0 flex-1 text-right">
        {sortedArtifacts.length > 0
          ? sortedArtifacts.map((artifact) => {
              const isDocker = isDockerArtifact(artifact);

              return (
                <a
                  key={artifact.filename}
                  href={artifact.url}
                  className="text-primary inline-flex items-center gap-2"
                >
                  {isDocker ? (
                    <IconLink className="size-5 shrink-0" aria-hidden="true" />
                  ) : (
                    <IconDownload
                      className="size-5 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {isDocker ? "Docker" : "x64"}
                </a>
              );
            })
          : "-"}
      </div>
    </div>
  );
}

function MobileVsCodeRow({
  vsCodeExtensionLink,
}: {
  vsCodeExtensionLink: string;
}) {
  return (
    <div className="border-n200 flex justify-between gap-3 border-b py-2 last:border-b-0">
      <div className="text-n900 flex w-1/2 shrink-0 items-center gap-3">
        <IconBrandVscode className="size-4" aria-hidden="true" />
        <span>VS Code</span>
      </div>
      <div className="min-w-0 flex-1 text-right">
        <a
          href={vsCodeExtensionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-2"
        >
          <IconLink className="size-5 shrink-0" aria-hidden="true" />
          Marketplace
        </a>
      </div>
    </div>
  );
}

function MobileArchiveCards({
  product,
  releases,
}: {
  product: ArchiveProduct;
  releases: ArchiveRelease[];
}) {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      {releases.map((release) => {
        const artifacts =
          product === "designer"
            ? (release.designerArtifacts ?? [])
            : (release.engineArtifacts ?? []);

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
              {product === "designer" ? (
                <>
                  <MobileArtifactRow
                    icon={
                      <IconBrandWindows className="size-4" aria-hidden="true" />
                    }
                    label="Windows"
                    artifacts={artifacts.filter(
                      (artifact) =>
                        getArtifactMeta(artifact).category === "windows",
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandApple className="size-4" aria-hidden="true" />
                    }
                    label="macOS"
                    artifacts={artifacts.filter(
                      (artifact) =>
                        getArtifactMeta(artifact).category === "macos",
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandUbuntu className="size-4" aria-hidden="true" />
                    }
                    label="Linux"
                    artifacts={artifacts.filter(
                      (artifact) =>
                        getArtifactMeta(artifact).category === "linux",
                    )}
                  />
                </>
              ) : (
                <>
                  <MobileArtifactRow
                    icon={
                      <IconBrandWindows className="size-4" aria-hidden="true" />
                    }
                    label="Windows"
                    artifacts={artifacts.filter(
                      (artifact) =>
                        getArtifactMeta(artifact).category === "windows",
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandDocker className="size-4" aria-hidden="true" />
                    }
                    label="Docker"
                    artifacts={artifacts.filter((artifact) =>
                      isDockerArtifact(artifact),
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandUbuntu className="size-4" aria-hidden="true" />
                    }
                    label="Linux / macOS"
                    artifacts={artifacts.filter((artifact) => {
                      const category = getArtifactMeta(artifact).category;
                      return (
                        category !== "windows" &&
                        category !== "docker" &&
                        category !== "slim" &&
                        category !== "deb"
                      );
                    })}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandUbuntu className="size-4" aria-hidden="true" />
                    }
                    label="Slim"
                    artifacts={artifacts.filter(
                      (artifact) =>
                        getArtifactMeta(artifact).category === "slim",
                    )}
                  />
                </>
              )}
              {release.vscodeExtensionLink ? (
                <MobileVsCodeRow
                  vsCodeExtensionLink={release.vscodeExtensionLink}
                />
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

type ArchiveProps = {
  product: ArchiveProduct;
};

export default function Archive({ product }: ArchiveProps) {
  const [selectedVersion, setSelectedVersion] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["archive", selectedVersion || "latest"],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const endpoint = selectedVersion
        ? `/ui/archive/${encodeURIComponent(selectedVersion)}`
        : "/ui/archive";
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await response.json()) as ArchiveResponse;
    },
  });

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

  const releases = data.releaseInfos.filter((release) =>
    product === "designer"
      ? (release.designerArtifacts ?? []).length > 0
      : (release.engineArtifacts ?? []).length > 0,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-2">
          <H4>Archives</H4>
        </div>
        <NativeSelect
          value={selectedVersion || data.currentMajorVersion}
          onChange={(event) => setSelectedVersion(event.target.value)}
          className="bg-background rounded-lg"
        >
          {Object.entries(data.categorizedVersions).map(
            ([category, versions]) => (
              <NativeSelectOptGroup key={category} label={category}>
                {versions.map((version) => (
                  <NativeSelectOption key={version.id} value={version.id}>
                    {version.id}
                  </NativeSelectOption>
                ))}
                {category === "UNSUPPORTED" ? (
                  <NativeSelectOption key="older" value="older">
                    Older Versions
                  </NativeSelectOption>
                ) : null}
              </NativeSelectOptGroup>
            ),
          )}
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
        <ArchiveTable product={product} releases={releases} />
      )}
    </div>
  );
}
