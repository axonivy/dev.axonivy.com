import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import DevReleases from "@/components/download/dev-releases";
import type {
  ArchiveRelease,
  ArchiveResponse,
} from "@/components/download/archive";
import { renderWithQueryClient, mockFetchOnce } from "./test-utils";

function release(overrides: Partial<ArchiveRelease> = {}): ArchiveRelease {
  return {
    version: "12.0.1",
    releaseDate: "2024-01-15",
    releaseNotes: "https://example.com/notes",
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
    releaseInfos: [release()],
    categorizedVersions: {},
    currentMajorVersion: "12.0",
    ...overrides,
  };
}

describe("DevReleases", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests the unstable archive endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(archiveResponse()));

    renderWithQueryClient(<DevReleases product="engine" />);

    await screen.findByText("Dev Releases");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("/ui/archive/unstable");
  });

  it("shows a skeleton while loading, then renders the table", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { container } = renderWithQueryClient(
      <DevReleases product="engine" />,
    );

    expect(container.querySelector('[data-slot="skeleton"]')).toBeTruthy();
    expect(screen.queryByText("Dev Releases")).not.toBeInTheDocument();

    resolveFetch(
      mockFetchOnce(
        archiveResponse({
          releaseInfos: [
            release({
              engineArtifacts: [
                {
                  name: "AxonIvyEngine-linux-x64.tar.gz",
                  url: "/e",
                  filename: "engine-linux.tar.gz",
                  permalink: "p1",
                },
              ],
            }),
          ],
        }),
      ),
    );

    await screen.findByText("Dev Releases");
  });

  it("shows an error message when the request fails", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null, { status: 500 }));

    renderWithQueryClient(<DevReleases product="engine" />);

    expect(
      await screen.findByText(/Failed to load dev releases: HTTP 500/),
    ).toBeInTheDocument();
  });

  it("shows a fallback error message when the response has no data", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null));

    renderWithQueryClient(<DevReleases product="engine" />);

    expect(
      await screen.findByText(/Failed to load dev releases: No data available/),
    ).toBeInTheDocument();
  });

  it("sorts releases by version, descending", async () => {
    const artifacts = [
      {
        name: "AxonIvyEngine-linux-x64.tar.gz",
        url: "/e",
        filename: "engine-linux.tar.gz",
        permalink: "p1",
      },
    ];
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        archiveResponse({
          releaseInfos: [
            release({ version: "11.5.0", engineArtifacts: artifacts }),
            release({ version: "13.1.0", engineArtifacts: artifacts }),
            release({ version: "12.0.1", engineArtifacts: artifacts }),
          ],
        }),
      ),
    );

    renderWithQueryClient(<DevReleases product="engine" />);

    const table = await screen.findByRole("table");
    const rows = within(table).getAllByRole("row").slice(1); // drop header row
    expect(
      rows.map((row) => within(row).getAllByRole("cell")[0].textContent),
    ).toEqual(["13.1.0", "12.0.1", "11.5.0"]);
  });

  it("filters releases by product, treating a missing artifacts array as empty", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        archiveResponse({
          releaseInfos: [
            release({
              version: "12.0.1",
              engineArtifacts: [
                {
                  name: "AxonIvyEngine-linux-x64.tar.gz",
                  url: "/e",
                  filename: "engine-linux.tar.gz",
                  permalink: "p1",
                },
              ],
              designerArtifacts: undefined as unknown as [],
            }),
            release({
              version: "11.5.0",
              engineArtifacts: undefined as unknown as [],
              designerArtifacts: [
                {
                  name: "AxonIvyDesigner-windows-x64.zip",
                  url: "/d",
                  filename: "designer-windows.zip",
                  permalink: "p2",
                },
              ],
            }),
          ],
        }),
      ),
    );

    renderWithQueryClient(<DevReleases product="engine" />);

    const table = await screen.findByRole("table");
    expect(within(table).getByText("12.0.1")).toBeInTheDocument();
    expect(within(table).queryByText("11.5.0")).not.toBeInTheDocument();
  });

  it("renders no rows when nothing matches the product", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        archiveResponse({
          releaseInfos: [
            release({ engineArtifacts: [], designerArtifacts: [] }),
          ],
        }),
      ),
    );

    renderWithQueryClient(<DevReleases product="engine" />);

    const table = await screen.findByRole("table");
    expect(within(table).getAllByRole("row")).toHaveLength(1); // header only
  });
});
