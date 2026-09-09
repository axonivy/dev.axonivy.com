import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VersionOverview from "@/components/download/version-overview";
import type {
  ArchiveRelease,
  ArchiveResponse,
} from "@/components/download/archive";
import { renderWithQueryClient, mockFetchOnce } from "./test-utils";

function release(overrides: Partial<ArchiveRelease> = {}): ArchiveRelease {
  return {
    version: "0.0.0",
    releaseDate: "2024-01-15",
    releaseNotes: "",
    vscodeExtensionLink: "",
    designerArtifacts: [],
    engineArtifacts: [],
    ...overrides,
  };
}

function archiveResponse(
  overrides: Partial<ArchiveResponse> = {},
): ArchiveResponse {
  return {
    releaseInfos: [],
    categorizedVersions: { "12": [{ id: "12.0" }] },
    currentMajorVersion: "12.0",
    ...overrides,
  };
}

const devEngineOnly = release({
  version: "13.0.0-m010",
  engineArtifacts: [
    {
      name: "AxonIvyEngine-linux-x64.tar.gz",
      url: "/dev-engine-linux",
      filename: "dev-engine-linux.tar.gz",
      permalink: "p1",
    },
  ],
});

const devDesignerOnly = release({
  version: "13.0.0-m011",
  designerArtifacts: [
    {
      name: "AxonIvyDesigner-windows-x64.zip",
      url: "/dev-designer-win",
      filename: "dev-designer-win.zip",
      permalink: "p2",
    },
  ],
});

const stableEngineOnly = release({
  version: "12.0.1",
  engineArtifacts: [
    {
      name: "AxonIvyEngine-linux-x64.tar.gz",
      url: "/engine-linux",
      filename: "engine-linux.tar.gz",
      permalink: "p3",
    },
  ],
});

const stableDesignerOnly = release({
  version: "11.5.0",
  designerArtifacts: [
    {
      name: "AxonIvyDesigner-windows-x64.zip",
      url: "/designer-win",
      filename: "designer-win.zip",
      permalink: "p4",
    },
  ],
});

function setUpFetchMock() {
  vi.mocked(fetch).mockImplementation(async (input) => {
    const url = String(input);
    if (url.includes("/ui/archive/unstable")) {
      return mockFetchOnce(
        archiveResponse({ releaseInfos: [devEngineOnly, devDesignerOnly] }),
      );
    }
    return mockFetchOnce(
      archiveResponse({ releaseInfos: [stableEngineOnly, stableDesignerOnly] }),
    );
  });
}

describe("VersionOverview", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults to the engine product for both the dev releases and archive tables", async () => {
    setUpFetchMock();

    renderWithQueryClient(<VersionOverview />);

    await waitFor(() => expect(screen.getAllByRole("table")).toHaveLength(2));
    const [devTable, archiveTable] = screen.getAllByRole("table");

    expect(within(devTable).getByText("13.0.0-m010")).toBeInTheDocument();
    expect(within(devTable).queryByText("13.0.0-m011")).not.toBeInTheDocument();
    expect(within(devTable).getByText("Slim")).toBeInTheDocument();

    expect(within(archiveTable).getByText("12.0.1")).toBeInTheDocument();
    expect(within(archiveTable).queryByText("11.5.0")).not.toBeInTheDocument();
    expect(within(archiveTable).getByText("Slim")).toBeInTheDocument();
  });

  it("filters both tables to the designer product without issuing new requests", async () => {
    const user = userEvent.setup();
    setUpFetchMock();

    renderWithQueryClient(<VersionOverview />);

    await waitFor(() => expect(screen.getAllByRole("table")).toHaveLength(2));
    const callCountBeforeSwitch = vi.mocked(fetch).mock.calls.length;

    await user.click(screen.getByRole("button", { name: /Designer Versions/ }));

    const [devTable, archiveTable] = screen.getAllByRole("table");

    expect(within(devTable).getByText("13.0.0-m011")).toBeInTheDocument();
    expect(within(devTable).queryByText("13.0.0-m010")).not.toBeInTheDocument();
    expect(within(devTable).queryByText("Slim")).not.toBeInTheDocument();

    expect(within(archiveTable).getByText("11.5.0")).toBeInTheDocument();
    expect(within(archiveTable).queryByText("12.0.1")).not.toBeInTheDocument();
    expect(within(archiveTable).queryByText("Slim")).not.toBeInTheDocument();

    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(callCountBeforeSwitch);
  });

  it("highlights the active product button", async () => {
    const user = userEvent.setup();
    setUpFetchMock();

    renderWithQueryClient(<VersionOverview />);
    await waitFor(() => expect(screen.getAllByRole("table")).toHaveLength(2));

    const engineButton = screen.getByRole("button", {
      name: /Engine Versions/,
    });
    const designerButton = screen.getByRole("button", {
      name: /Designer Versions/,
    });

    expect(engineButton).toHaveClass("bg-primary");
    expect(designerButton).not.toHaveClass("bg-primary");

    await user.click(designerButton);

    expect(designerButton).toHaveClass("bg-primary");
    expect(engineButton).not.toHaveClass("bg-primary");
  });
});
