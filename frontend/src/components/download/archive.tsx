import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  IconArrowRight,
  IconBrandApple,
  IconBrandDocker,
  IconBrandUbuntu,
  IconBrandWindows,
  IconCalendar,
  IconDownload,
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

function artifactLinks(artifacts: ArchiveArtifact[]) {
  if (artifacts.length === 0) {
    return "-";
  }

  return (
    <ul className="flex flex-col gap-1">
      {artifacts.map((artifact) => (
        <li key={artifact.filename}>
          <a href={artifact.url} className="text-primary">
            <span className="inline-flex items-center gap-1">
              <IconDownload className="size-4" aria-hidden="true" />
              64-bit (exe)
            </span>
          </a>
        </li>
      ))}
    </ul>
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
  return (
    <div className="border-n200 flex items-center gap-3 border-b py-2 last:border-b-0">
      <div className="text-n900 flex w-1/2 shrink-0 items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <div className="min-w-0 flex-1">
        {artifacts.length > 0
          ? artifacts.map((artifact) => (
              <a
                key={artifact.filename}
                href={artifact.url}
                className="text-primary inline-flex items-center gap-2"
              >
                64-bit (exe)
                <IconDownload className="size-5 shrink-0" aria-hidden="true" />
              </a>
            ))
          : "-"}
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
                    artifacts={artifacts.filter((artifact) =>
                      artifact.name.includes("Windows"),
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandApple className="size-4" aria-hidden="true" />
                    }
                    label="macOS"
                    artifacts={artifacts.filter((artifact) =>
                      artifact.name.toLowerCase().includes("mac"),
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandUbuntu className="size-4" aria-hidden="true" />
                    }
                    label="Linux"
                    artifacts={artifacts.filter((artifact) =>
                      artifact.name.includes("Linux"),
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
                    artifacts={artifacts.filter((artifact) =>
                      artifact.name.includes("Windows"),
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandDocker className="size-4" aria-hidden="true" />
                    }
                    label="Docker"
                    artifacts={artifacts.filter((artifact) =>
                      artifact.name.includes("/"),
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandUbuntu className="size-4" aria-hidden="true" />
                    }
                    label="Linux / macOS"
                    artifacts={artifacts.filter(
                      (artifact) =>
                        !artifact.name.includes("Windows") &&
                        !artifact.name.includes("/") &&
                        !artifact.name.includes("Slim") &&
                        !artifact.name.toLowerCase().endsWith(".deb"),
                    )}
                  />
                  <MobileArtifactRow
                    icon={
                      <IconBrandUbuntu className="size-4" aria-hidden="true" />
                    }
                    label="Slim"
                    artifacts={artifacts.filter((artifact) =>
                      artifact.name.includes("Slim"),
                    )}
                  />
                </>
              )}
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
              <TableHead className="w-1/6">Version</TableHead>
              <TableHead className="w-1/6">Release Date</TableHead>
              {product === "designer" ? (
                <>
                  <TableHead className="w-1/6">Windows</TableHead>
                  <TableHead className="w-1/6">macOS</TableHead>
                  <TableHead className="w-1/6">Linux</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="w-1/6">Windows</TableHead>
                  <TableHead className="w-1/6">Docker</TableHead>
                  <TableHead className="w-1/6">Linux / macOS</TableHead>
                  <TableHead className="w-1/6">Slim</TableHead>
                </>
              )}
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
                  {product === "designer" ? (
                    <>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter((artifact) =>
                            artifact.name.includes("Windows"),
                          ),
                        )}
                      </TableCell>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter((artifact) =>
                            artifact.name.toLowerCase().includes("mac"),
                          ),
                        )}
                      </TableCell>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter((artifact) =>
                            artifact.name.includes("Linux"),
                          ),
                        )}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter((artifact) =>
                            artifact.name.includes("Windows"),
                          ),
                        )}
                      </TableCell>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter((artifact) =>
                            artifact.name.includes("/"),
                          ),
                        )}
                      </TableCell>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter(
                            (artifact) =>
                              !artifact.name.includes("Windows") &&
                              !artifact.name.includes("/") &&
                              !artifact.name.includes("Slim") &&
                              !artifact.name.toLowerCase().endsWith(".deb"),
                          ),
                        )}
                      </TableCell>
                      <TableCell>
                        {artifactLinks(
                          artifacts.filter((artifact) =>
                            artifact.name.includes("Slim"),
                          ),
                        )}
                      </TableCell>
                    </>
                  )}
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
      <div className="flex flex-row items-center justify-between">
        <H4>Archives</H4>
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
              </NativeSelectOptGroup>
            ),
          )}
        </NativeSelect>
      </div>

      <ArchiveTable product={product} releases={releases} />
    </div>
  );
}
