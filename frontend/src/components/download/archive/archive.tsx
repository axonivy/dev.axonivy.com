import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { IconDownload, IconFileDescription } from "@tabler/icons-react";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import ArchiveSkeleton from "@/components/skeletons/archive-skeleton";
import { Base, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileArchiveCards } from "@/components/download/archive/mobile-archive-cards";
import { ArchiveTable } from "@/components/download/archive/archive-table";
import { inCategory } from "@/components/download/archive/artifact-meta";

export type ArchiveProduct = "designer" | "engine";

type UnsafeReason = { issue: string; url: string };

export type ArchiveArtifact = {
  name: string;
  url: string;
  filename: string;
  permalink: string;
  bomUrl: string;
};

export type ArchiveRelease = {
  version: string;
  checksumsUrl: string;
  releaseDate: string;
  unsafeReasons: UnsafeReason[];
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

export type ArchiveView = "downloads" | "sbom";

export function sortReleasesByVersionDescending(releases: ArchiveRelease[]) {
  return [...releases].sort((a, b) => b.version.localeCompare(a.version));
}

function hasSlimEngineArtifact(releases: ArchiveRelease[]) {
  return releases.some((release) =>
    release.engineArtifacts.some(inCategory("slim")),
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
  const [view, setView] = useState<ArchiveView>("downloads");

  useEffect(() => {
    if (!defaultArchive.data || !selectedVersion) {
      return;
    }
    if (
      selectedVersion !== "older" &&
      !knownArchiveVersions.includes(selectedVersion)
    ) {
      setSelectedVersion(null);
    }
  }, [
    defaultArchive.data,
    knownArchiveVersions,
    selectedVersion,
    setSelectedVersion,
  ]);

  const changeVersion = (version: string) => {
    history.replaceState(history.state, "", "#archive");
    setSelectedVersion(version);
  };

  if (isLoading) {
    return <ArchiveSkeleton rows={5} />;
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
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          {ltsVersions.length > 0 ? (
            <div className="flex flex-row gap-2">
              {ltsVersions.map((version) => (
                <Button
                  key={version.id}
                  variant={activeVersion === version.id ? "default" : "outline"}
                  onClick={() => changeVersion(version.id)}
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
                  onClick={() => changeVersion(version.id)}
                >
                  Dev
                </Button>
              ))}
            </div>
          ) : null}
          <NativeSelect
            value={isSelectSelected ? activeVersion : ""}
            onChange={(event) => changeVersion(event.target.value)}
            className={cn(
              "bg-background rounded-lg",
              isSelectSelected &&
                "[&_select]:border-primary! [&_select]:bg-primary dark:[&_select]:bg-primary [&_select]:text-primary-foreground dark:[&_select]:text-primary-foreground [&_select]:hover:bg-primary/80 dark:[&_select]:hover:bg-primary/80 [&_svg]:text-primary-foreground",
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
        <Tabs
          className="hidden md:flex"
          value={view}
          onValueChange={(v) => setView(v as ArchiveView)}
        >
          <TabsList className="bg-n100 gap-2 px-0.75 py-4.5">
            <TabsTrigger value="downloads" className="gap-2 px-3 py-3.5">
              <IconDownload className="size-4" aria-hidden="true" />
              Download
            </TabsTrigger>
            <TabsTrigger value="sbom" className="gap-2 px-3 py-3.5">
              <IconFileDescription className="size-4" aria-hidden="true" />
              SBOM files
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
          <MobileArchiveCards releases={data.releaseInfos} />
          <ArchiveTable releases={data.releaseInfos} view={view} />
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
