import { describe, expect, it } from "vitest";
import {
  getArtifactMeta,
  sortArtifacts,
  sortReleasesByVersionDescending,
  type ArchiveArtifact,
  type ArchiveRelease,
} from "@/components/download/archive";

function archiveArtifact(
  overrides: Partial<ArchiveArtifact> = {},
): ArchiveArtifact {
  return {
    name: "AxonIvyEngine-linux-x64.tar.gz",
    url: "/artifact",
    filename: "artifact.tar.gz",
    permalink: "/permalink/artifact",
    ...overrides,
  };
}

function archiveRelease(
  overrides: Partial<ArchiveRelease> = {},
): ArchiveRelease {
  return {
    version: "12.0.1",
    releaseDate: "2024-01-15",
    releaseNotes: "",
    designerArtifacts: [],
    engineArtifacts: [],
    ...overrides,
  };
}

describe("getArtifactMeta", () => {
  it.each([
    ["myorg/axonivy-engine", "docker"],
    ["AxonIvyEngine-windows-x64.zip", "windows"],
    ["AxonIvyEngine-mac-x64.zip", "macos"],
    ["AxonIvyEngine-slim-x64.tar.gz", "slim"],
    ["axonivy-engine.deb", "deb"],
    ["AxonIvyEngine-linux-x64.tar.gz", "linux"],
    ["AxonIvyEngine-all.zip", "all"],
    ["VSCode Extension", "vscode"],
  ] as const)("categorizes %s as %s", (name, category) => {
    expect(getArtifactMeta(archiveArtifact({ name })).category).toBe(category);
  });

  it("falls back to the 'other' category using the artifact's filename as the label", () => {
    const meta = getArtifactMeta(
      archiveArtifact({ name: "readme.txt", filename: "readme.txt" }),
    );
    expect(meta.category).toBe("other");
    expect(meta.label).toBe("readme.txt");
  });
});

describe("sortArtifacts", () => {
  it("orders artifacts by category following artifactCategoryOrder", () => {
    const artifacts = [
      archiveArtifact({ name: "AxonIvyEngine-slim-x64.tar.gz" }),
      archiveArtifact({ name: "AxonIvyEngine-windows-x64.zip" }),
      archiveArtifact({ name: "myorg/axonivy-engine" }),
      archiveArtifact({ name: "AxonIvyEngine-all.zip" }),
    ];

    expect(sortArtifacts(artifacts).map((a) => a.name)).toEqual([
      "AxonIvyEngine-all.zip",
      "AxonIvyEngine-slim-x64.tar.gz",
      "myorg/axonivy-engine",
      "AxonIvyEngine-windows-x64.zip",
    ]);
  });

  it("breaks ties within a category by case-insensitive name", () => {
    const artifacts = [
      archiveArtifact({ name: "AxonIvyEngine-windows-b.zip" }),
      archiveArtifact({ name: "axonivyengine-windows-a.zip" }),
    ];

    expect(sortArtifacts(artifacts).map((a) => a.name)).toEqual([
      "axonivyengine-windows-a.zip",
      "AxonIvyEngine-windows-b.zip",
    ]);
  });

  it("sorts an unranked/other artifact last", () => {
    const artifacts = [
      archiveArtifact({ name: "readme.txt", filename: "readme.txt" }),
      archiveArtifact({ name: "AxonIvyEngine-windows-x64.zip" }),
    ];

    expect(sortArtifacts(artifacts).map((a) => a.name)).toEqual([
      "AxonIvyEngine-windows-x64.zip",
      "readme.txt",
    ]);
  });
});

describe("sortReleasesByVersionDescending", () => {
  it("sorts releases by version, descending", () => {
    const releases = [
      archiveRelease({ version: "11.5.0" }),
      archiveRelease({ version: "13.1.0" }),
      archiveRelease({ version: "12.0.1" }),
    ];

    expect(
      sortReleasesByVersionDescending(releases).map((r) => r.version),
    ).toEqual(["13.1.0", "12.0.1", "11.5.0"]);
  });

  it("compares versions lexicographically, not numerically", () => {
    const releases = [
      archiveRelease({ version: "9.0.0" }),
      archiveRelease({ version: "10.0.0" }),
    ];

    expect(
      sortReleasesByVersionDescending(releases).map((r) => r.version),
    ).toEqual(["9.0.0", "10.0.0"]);
  });
});
