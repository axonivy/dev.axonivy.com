import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { detect } from "detect-browser";
import {
  DownloadCards,
  type Artifacts,
  type DownloadRelease,
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

function release(overrides: Partial<DownloadRelease> = {}): DownloadRelease {
  return {
    version: "12.0.1",
    versionShort: "12.0",
    releaseDate: "2024-01-15",
    releaseNotesLink: "https://example.com/notes",
    docLink: "https://example.com/docs",
    vscodeExtensionLink: "",
    designerArtifacts: [],
    engineArtifacts: [],
    ...overrides,
  };
}

describe("DownloadCards", () => {
  beforeEach(() => {
    vi.mocked(detect).mockReturnValue(null);
  });

  it("renders nothing when there are no artifacts and no vscode extension link", () => {
    const { container } = render(
      <DownloadCards
        release={release()}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("shows only the engine card when there are no designer artifacts or vscode link", () => {
    render(
      <DownloadCards
        release={release({ engineArtifacts: [artifact()] })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    expect(screen.getByText("Axon Ivy Engine 12.0")).toBeInTheDocument();
    expect(
      screen.queryByText("Axon Ivy Designer 12.0"),
    ).not.toBeInTheDocument();
  });

  it("shows only the designer card via the VS Code Marketplace action when there are no designer artifacts but a vscode link is present", () => {
    render(
      <DownloadCards
        release={release({
          vscodeExtensionLink: "https://marketplace.example/ext",
        })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    expect(screen.getByText("Axon Ivy Designer 12.0")).toBeInTheDocument();
    expect(screen.queryByText("Axon Ivy Engine 12.0")).not.toBeInTheDocument();

    const installLink = screen.getByRole("link", {
      name: /Install Designer using VS Code Marketplace/,
    });
    expect(installLink).toHaveAttribute(
      "href",
      "/download/installation/designer-vscode?vscodeExtensionLink=https%3A%2F%2Fmarketplace.example%2Fext",
    );
    expect(screen.getByRole("link", { name: "Release notes" })).toHaveAttribute(
      "href",
      "https://example.com/notes",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows both cards when both designer and engine artifacts exist", () => {
    render(
      <DownloadCards
        release={release({
          designerArtifacts: [
            artifact({ name: "AxonIvyDesigner-windows.zip" }),
          ],
          engineArtifacts: [artifact()],
        })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    expect(screen.getByText("Axon Ivy Designer 12.0")).toBeInTheDocument();
    expect(screen.getByText("Axon Ivy Engine 12.0")).toBeInTheDocument();
  });

  it("shows a release date fallback when none is provided", () => {
    render(
      <DownloadCards
        release={release({ releaseDate: "", engineArtifacts: [artifact()] })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    expect(screen.getByText("Release date not available")).toBeInTheDocument();
  });

  it("defaults to the artifact matching the detected operating system", async () => {
    vi.mocked(detect).mockReturnValue({ os: "Windows 10" } as ReturnType<
      typeof detect
    >);

    render(
      <DownloadCards
        release={release({
          engineArtifacts: [
            artifact({
              name: "AxonIvyEngine-windows-x64.zip",
              url: "/engine-windows",
            }),
            artifact({
              name: "AxonIvyEngine-linux-x64.tar.gz",
              url: "/engine-linux",
              permalink: "/permalink/engine-linux",
            }),
          ],
        })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    const pressedButton = await screen.findByRole("button", { pressed: true });
    expect(pressedButton).toHaveAccessibleName("AxonIvyEngine-windows-x64.zip");
    expect(
      screen.getByRole("link", { name: /Download Engine 12.0/ }),
    ).toHaveAttribute("href", "/engine-windows");
  });

  it("prioritizes a Docker artifact as the default engine selection over the OS match", async () => {
    vi.mocked(detect).mockReturnValue({ os: "Windows 10" } as ReturnType<
      typeof detect
    >);

    render(
      <DownloadCards
        release={release({
          engineArtifacts: [
            artifact({
              name: "AxonIvyEngine-windows-x64.zip",
              url: "/engine-windows",
            }),
            artifact({ name: "Docker", url: "/engine-docker", permalink: "" }),
          ],
        })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    const pressedButton = await screen.findByRole("button", { pressed: true });
    expect(pressedButton).toHaveAccessibleName("Docker");
    expect(
      screen.getByRole("link", { name: /Install Engine 12.0 via Docker/ }),
    ).toHaveAttribute(
      "href",
      "/download/installation/docker?downloadUrl=/engine-docker",
    );
  });

  it("updates the selection and download link when a different OS option is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(detect).mockReturnValue({ os: "Windows 10" } as ReturnType<
      typeof detect
    >);

    render(
      <DownloadCards
        release={release({
          engineArtifacts: [
            artifact({
              name: "AxonIvyEngine-windows-x64.zip",
              url: "/engine-windows",
            }),
            artifact({
              name: "AxonIvyEngine-linux-x64.tar.gz",
              url: "/engine-linux",
              permalink: "/permalink/engine-linux",
            }),
          ],
        })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    await screen.findByRole("button", { pressed: true });

    await user.click(screen.getByRole("button", { name: "Linux / macOS" }));

    expect(
      screen.getByRole("button", { name: "Linux / macOS" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "AxonIvyEngine-windows-x64.zip" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.getByRole("link", { name: /Download Engine 12.0/ }),
    ).toHaveAttribute("href", "/engine-linux");
    expect(
      screen.getByRole("link", { name: "Installation Guide" }),
    ).toHaveAttribute(
      "href",
      "/download/installation/engine?downloadUrl=%2Fengine-linux&docLink=https%3A%2F%2Fexample.com%2Fdocs",
    );
  });

  it("toggles the permalinks list and excludes artifacts without a permalink", async () => {
    const user = userEvent.setup();

    render(
      <DownloadCards
        release={release({
          designerArtifacts: [
            artifact({
              name: "AxonIvyDesigner-windows-x64.zip",
              url: "/designer-windows",
              permalink: "/permalink/designer-windows",
            }),
            artifact({
              name: "AxonIvyDesigner-linux-x64.tar.gz",
              url: "/designer-linux",
              permalink: "",
            }),
          ],
        })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    const toggle = screen.getByRole("button", { name: /Permalinks/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("/permalink/designer-windows"),
    ).not.toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("/permalink/designer-windows")).toBeInTheDocument();
    expect(
      screen.queryByText("AxonIvyDesigner-linux-x64.tar.gz:"),
    ).not.toBeInTheDocument();
  });

  it("hides the permalinks toggle when no artifact has a permalink", () => {
    render(
      <DownloadCards
        release={release({ engineArtifacts: [artifact({ permalink: "" })] })}
        releaseLabel="Long Term Support"
        badge="Stable"
      />,
    );

    expect(
      screen.queryByRole("button", { name: /Permalinks/ }),
    ).not.toBeInTheDocument();
  });
});
