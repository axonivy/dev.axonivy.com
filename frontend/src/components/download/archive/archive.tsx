import { ArchiveTable } from "@/components/download/archive/archive-table";
import { inCategory } from "@/components/download/archive/artifact-meta";
import { MobileArchiveCards } from "@/components/download/archive/mobile-archive-cards";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Base, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { IconDownload, IconFileDescription } from "@tabler/icons-react";
import { parseAsString, useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useEffect, useState } from "react";

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

export type UiArchiveResponse = {
  releaseInfos: ArchiveRelease[];
  categorizedVersions: Record<string, ArchiveVersionOption[]>;
  currentMajorVersion: string;
};

export type ArchiveData = {
  categorizedVersions: Record<string, ArchiveVersionOption[]>;
  currentMajorVersion: string;
  releasesByVersion: Record<string, ArchiveRelease[]>;
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

export default function Archive({ data }: { data: ArchiveData }) {
  return (
    <NuqsAdapter>
      <ArchiveContent data={data} />
    </NuqsAdapter>
  );
}

function ArchiveContent({ data }: { data: ArchiveData }) {
  const [selectedVersion, setSelectedVersion] = useQueryState(
    "archive",
    parseAsString.withDefault(""),
  );
  const [view, setView] = useState<ArchiveView>("downloads");

  useEffect(() => {
    if (!selectedVersion) {
      return;
    }
    if (
      selectedVersion !== "older" &&
      !(selectedVersion in data.releasesByVersion)
    ) {
      setSelectedVersion(null);
    }
  }, [data.releasesByVersion, selectedVersion, setSelectedVersion]);

  const changeVersion = (version: string) => {
    history.replaceState(history.state, "", "#archive");
    setSelectedVersion(version);
  };

  if (!data) {
    return <P className="text-n900">No archive data available.</P>;
  }

  const activeVersion = selectedVersion || data.currentMajorVersion;
  const releases = data.releasesByVersion[activeVersion] ?? [];
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
          <MobileArchiveCards releases={releases} />
          <ArchiveTable releases={releases} view={view} />
          {hasSlimEngineArtifact(releases) ? (
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
