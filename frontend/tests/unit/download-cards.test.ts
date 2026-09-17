import { describe, expect, it, vi } from "vitest";
import { detect } from "detect-browser";
import {
  detectOperatingSystem,
  operatingSystemFromText,
  artifactMatchesOperatingSystem,
  type Artifacts,
} from "@/components/download/download-cards";

vi.mock("detect-browser", () => ({ detect: vi.fn() }));

function artifact(overrides: Partial<Artifacts> = {}): Artifacts {
  return {
    name: "AxonIvyEngine-windows-x64.zip",
    url: "/artifact",
    filename: "artifact.zip",
    permalink: "/permalink/artifact",
    ...overrides,
  };
}

describe("operatingSystemFromText", () => {
  it.each([
    ["AxonIvyEngine-windows-x64.zip", "windows"],
    ["AxonIvyEngine-macintosh-x64.zip", "mac"],
    ["AxonIvyEngine-mac os-x64.zip", "mac"],
    ["AxonIvyEngine-macos-x64.zip", "mac"],
    ["AxonIvyEngine-apple-x64.zip", "mac"],
    ["AxonIvyEngine-linux-x64.zip", "linux"],
    ["Docker", "unknown"],
  ] as const)("maps %s to %s", (value, os) => {
    expect(operatingSystemFromText(value)).toBe(os);
  });
});

describe("detectOperatingSystem", () => {
  it.each([
    [{ os: "Windows 10" }, "windows"],
    [{ os: "Mac OS" }, "mac"],
    [{ os: "Linux" }, "linux"],
    [{ os: "Android OS" }, "unknown"],
    [null, "unknown"],
  ] as const)("maps detect() result %o to %s", (detected, os) => {
    vi.mocked(detect).mockReturnValue(detected as ReturnType<typeof detect>);
    expect(detectOperatingSystem()).toBe(os);
  });
});

it("falls back a mac user to the linux engine artifact", () => {
  const linuxArtifact = artifact({ name: "AxonIvyEngine-linux-x64.tar.gz" });
  expect(artifactMatchesOperatingSystem(linuxArtifact, "mac", false)).toBe(
    true,
  );
  const windowsArtifact = artifact({ name: "AxonIvyEngine-windows-x64.zip" });
  expect(artifactMatchesOperatingSystem(windowsArtifact, "mac", false)).toBe(
    false,
  );
});

it("requires an exact match for a mac designer, with no linux fallback", () => {
  const linuxArtifact = artifact({ name: "AxonIvyDesigner-linux-x64.tar.gz" });
  expect(artifactMatchesOperatingSystem(linuxArtifact, "mac", true)).toBe(
    false,
  );
  const macArtifact = artifact({ name: "AxonIvyDesigner-macos-x64.zip" });
  expect(artifactMatchesOperatingSystem(macArtifact, "mac", true)).toBe(true);
});

it("matches windows and linux directly for both products", () => {
  const windowsArtifact = artifact({ name: "AxonIvyEngine-windows-x64.zip" });
  expect(
    artifactMatchesOperatingSystem(windowsArtifact, "windows", false),
  ).toBe(true);
  expect(artifactMatchesOperatingSystem(windowsArtifact, "windows", true)).toBe(
    true,
  );
  const linuxArtifact = artifact({ name: "AxonIvyEngine-linux-x64.tar.gz" });
  expect(artifactMatchesOperatingSystem(linuxArtifact, "linux", false)).toBe(
    true,
  );
  expect(artifactMatchesOperatingSystem(linuxArtifact, "linux", true)).toBe(
    true,
  );
});
