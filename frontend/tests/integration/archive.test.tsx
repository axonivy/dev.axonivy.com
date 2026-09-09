import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Archive, {
  ArchiveTable,
  type ArchiveRelease,
  type ArchiveResponse,
} from "@/components/download/archive";
import { renderWithQueryClient, mockFetchOnce } from "./test-utils";

function release(overrides: Partial<ArchiveRelease> = {}): ArchiveRelease {
  return {
    version: "12.0.1",
    releaseDate: "2024-01-15",
    releaseNotes: "https://example.com/notes/12.0.1",
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
    categorizedVersions: { "12": [{ id: "12.0" }] },
    currentMajorVersion: "12.0",
    ...overrides,
  };
}

describe("Archive", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a skeleton while loading, then renders the archive table", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    renderWithQueryClient(<Archive product="engine" />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    resolveFetch(mockFetchOnce(archiveResponse()));
    await waitFor(() => screen.getByRole("table"));
  });

  it("shows an error message when the request fails", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null, { status: 500 }));
    renderWithQueryClient(<Archive product="engine" />);
    expect(
      await screen.findByText(/Failed to load archive data: HTTP 500/),
    ).toBeInTheDocument();
  });

  it("filters releases by product", async () => {
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
              designerArtifacts: [],
            }),
            release({
              version: "11.5.0",
              engineArtifacts: [],
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

    renderWithQueryClient(<Archive product="engine" />);
    const table = await screen.findByRole("table");
    expect(within(table).getByText("12.0.1")).toBeInTheDocument();
    expect(within(table).queryByText("11.5.0")).not.toBeInTheDocument();
  });

  it("requests the selected version when changing the version select", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockImplementation(async (input) => {
      const url = String(input);
      if (url.includes("/ui/archive/11.5")) {
        return mockFetchOnce(
          archiveResponse({
            releaseInfos: [
              release({
                version: "11.5.0",
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
            categorizedVersions: {
              "12": [{ id: "12.0" }],
              "11": [{ id: "11.5" }],
            },
          }),
        );
      }
      return mockFetchOnce(
        archiveResponse({
          categorizedVersions: {
            "12": [{ id: "12.0" }],
            "11": [{ id: "11.5" }],
          },
        }),
      );
    });

    renderWithQueryClient(<Archive product="engine" />);
    await screen.findByRole("table");
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "11.5");

    expect((await screen.findAllByText("11.5.0")).length).toBeGreaterThan(0);
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("/ui/archive/11.5");
  });

  it("shows the external archive link when 'Older Versions' is selected", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        archiveResponse({
          categorizedVersions: { UNSUPPORTED: [{ id: "9.0" }] },
        }),
      ),
    );

    renderWithQueryClient(<Archive product="engine" />);
    await screen.findByRole("table");
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "older");

    expect(screen.getByRole("link", { name: /archive page/i })).toHaveAttribute(
      "href",
      "https://archive.axonivy.com/",
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});

describe("ArchiveTable", () => {
  it("sorts and categorizes artifacts, routing slim artifacts to their own column for engine", () => {
    const { container } = renderWithQueryClient(
      <ArchiveTable
        product="engine"
        releases={[
          release({
            engineArtifacts: [
              {
                name: "AxonIvyEngine-windows-x64.zip",
                url: "/win",
                filename: "engine-windows.zip",
                permalink: "p1",
              },
              {
                name: "axonivy/engine",
                url: "/docker",
                filename: "docker-image",
                permalink: "p2",
              },
              {
                name: "AxonIvyEngine-linux-x64.tar.gz",
                url: "/linux",
                filename: "engine-linux.tar.gz",
                permalink: "p3",
              },
              {
                name: "AxonIvyEngine-slim-x64.tar.gz",
                url: "/slim",
                filename: "engine-slim.tar.gz",
                permalink: "p4",
              },
            ],
          }),
        ]}
      />,
    );

    const table = container.querySelector("table") as HTMLElement;
    const row = within(table).getByRole("row", { name: /12\.0\.1/ });
    const cells = within(row).getAllByRole("cell");
    const artifactLinks = within(cells[2]).getAllByRole("link");
    expect(artifactLinks.map((link) => link.textContent)).toEqual([
      "Docker",
      "Linux",
      "Windows",
    ]);

    const slimLinks = within(cells[3]).getAllByRole("link");
    expect(slimLinks).toHaveLength(1);
    expect(slimLinks[0]).toHaveAttribute("href", "/slim");
  });

  it("shows the VS Code extension link for designer but not for engine", () => {
    const sharedRelease = release({
      vscodeExtensionLink: "https://marketplace.example/ext",
      designerArtifacts: [
        {
          name: "AxonIvyDesigner-windows-x64.zip",
          url: "/win",
          filename: "designer-windows.zip",
          permalink: "p1",
        },
      ],
      engineArtifacts: [
        {
          name: "AxonIvyEngine-windows-x64.zip",
          url: "/win",
          filename: "engine-windows.zip",
          permalink: "p2",
        },
      ],
    });

    const { rerender, container } = renderWithQueryClient(
      <ArchiveTable product="designer" releases={[sharedRelease]} />,
    );
    expect(
      screen.getByRole("link", { name: /VS Code Extension/i }),
    ).toBeInTheDocument();
    rerender(<ArchiveTable product="engine" releases={[sharedRelease]} />);

    expect(
      screen.queryByRole("link", { name: /VS Code Extension/i }),
    ).not.toBeInTheDocument();
    void container;
  });

  it("renders a dash when there are no artifacts or release notes", () => {
    renderWithQueryClient(
      <ArchiveTable
        product="engine"
        releases={[
          release({ releaseNotes: "", releaseDate: "", engineArtifacts: [] }),
        ]}
      />,
    );

    const table = screen.getByRole("table");
    const row = within(table).getByRole("row", { name: /12\.0\.1/ });
    const cells = within(row).getAllByRole("cell");
    expect(cells[1]).toHaveTextContent("-"); // release date
    expect(cells[2]).toHaveTextContent("-"); // artifacts
    expect(cells[4]).toHaveTextContent("-"); // release notes
  });
});
