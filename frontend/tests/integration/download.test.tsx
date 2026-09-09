import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import Download from "@/components/download/download";
import type { DownloadRelease } from "@/components/download/download-cards";
import { renderWithQueryClient, mockFetchOnce } from "./test-utils";

function release(overrides: Partial<DownloadRelease> = {}): DownloadRelease {
  return {
    version: "12.0.1",
    versionShort: "12.0",
    releaseDate: "2024-01-15",
    releaseNotesLink: "https://example.com/notes",
    docLink: "https://example.com/docs",
    vscodeExtensionLink: "",
    designerArtifacts: [
      {
        name: "AxonIvyDesigner-windows-x64.zip",
        url: "/designer-win",
        filename: "designer-windows.zip",
        permalink: "/permalink/designer-win",
      },
    ],
    engineArtifacts: [
      {
        name: "AxonIvyEngine-linux-x64.tar.gz",
        url: "/engine-linux",
        filename: "engine-linux.tar.gz",
        permalink: "/permalink/engine-linux",
      },
    ],
    ...overrides,
  };
}

type DownloadData = {
  ltsCurrent: DownloadRelease[];
  ltsMaintenance: DownloadRelease[];
  le: DownloadRelease[];
  dev: DownloadRelease[];
};

function downloadData(overrides: Partial<DownloadData> = {}): DownloadData {
  return {
    ltsCurrent: [release({ version: "12.0.1", versionShort: "12.0" })],
    ltsMaintenance: [release({ version: "11.5.0", versionShort: "11.5" })],
    le: [release({ version: "13.1.0", versionShort: "13.1" })],
    dev: [],
    ...overrides,
  };
}

describe("Download", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a skeleton while loading, then renders the download sections", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { container } = renderWithQueryClient(<Download />);
    expect(container.querySelector('[data-slot="skeleton"]')).toBeTruthy();
    resolveFetch(mockFetchOnce(downloadData()));
    await screen.findByText("Axon Ivy Designer 12.0");
  });

  it("shows an error message when the request fails", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null, { status: 500 }));
    renderWithQueryClient(<Download />);
    expect(
      await screen.findByText(/Failed to load download links: HTTP 500/),
    ).toBeInTheDocument();
  });

  it("shows a fallback message when there is no release data at all", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        downloadData({ ltsCurrent: [], ltsMaintenance: [], le: [] }),
      ),
    );

    renderWithQueryClient(<Download />);
    expect(
      await screen.findByText("No download data available."),
    ).toBeInTheDocument();
  });

  it("renders the current LTS and maintenance sections", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(downloadData()));

    renderWithQueryClient(<Download />);

    await screen.findByText("Axon Ivy Designer 12.0");
    expect(screen.getByText("Axon Ivy Engine 12.0")).toBeInTheDocument();
    expect(screen.getByText("Download 11.5")).toBeInTheDocument();
    expect(screen.getByText("Axon Ivy Designer 11.5")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Learn more about our release cycle/ }),
    ).toHaveAttribute("href", "/download/release-cycle");
  });

  it("renders the Leading Edge section only when LE data is present", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(downloadData()));
    renderWithQueryClient(<Download />);
    expect(
      await screen.findByText("Want to check out brand new features?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Axon Ivy Designer 13.1")).toBeInTheDocument();
  });

  it("hides the Leading Edge section when there is no LE data", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(downloadData({ le: [] })));
    renderWithQueryClient(<Download />);
    await screen.findByText("Axon Ivy Designer 12.0");
    expect(
      screen.queryByText("Want to check out brand new features?"),
    ).not.toBeInTheDocument();
  });
});
