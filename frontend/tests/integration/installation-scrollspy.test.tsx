import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InstallationScrollSpy from "@/components/download/installation/scrollspy";
import type { InstallationGuide } from "@/data/installation-guides";

function guide(overrides: Partial<InstallationGuide> = {}): InstallationGuide {
  return {
    title: "Install Axon Ivy Engine",
    type: "Engine",
    product: "Engine",
    steps: [
      { id: 1, title: "Download the engine" },
      { id: 2, title: "Extract the archive" },
    ],
    ...overrides,
  };
}

function setSearch(search: string) {
  window.history.pushState(null, "", `/?${search}`);
}

describe("InstallationScrollSpy", () => {
  afterEach(() => {
    setSearch("");
  });

  it("renders the guide title and a nav link per step", () => {
    render(
      <InstallationScrollSpy
        guideId="engine"
        guide={guide({
          steps: [
            { id: 1, title: "Download the engine" },
            { id: 2, title: "Extract the archive" },
            { id: 3, title: "Start the engine" },
          ],
        })}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Install Axon Ivy Engine" }),
    ).toBeInTheDocument();

    for (const [id, title] of [
      [1, "Download the engine"],
      [2, "Extract the archive"],
      [3, "Start the engine"],
    ] as const) {
      expect(screen.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `#step-${id}`,
      );
      expect(document.getElementById(`step-${id}`)).toBeInTheDocument();
    }
  });

  it("shows the docker download link when the guide type is Docker", () => {
    setSearch("downloadUrl=%2Fengine-docker");
    render(
      <InstallationScrollSpy
        guideId="docker"
        guide={guide({ type: "Docker" })}
      />,
    );

    expect(screen.getByRole("link", { name: "Docker" })).toHaveAttribute(
      "href",
      "/engine-docker",
    );
  });

  it("shows the guide type for non-Engine, non-Docker guides", () => {
    render(
      <InstallationScrollSpy
        guideId="designer-linux"
        guide={guide({ type: "Linux", product: "Designer" })}
      />,
    );

    expect(screen.getByText(/for Linux/)).toBeInTheDocument();
  });

  it("renders the hint box when the guide has one", () => {
    render(
      <InstallationScrollSpy
        guideId="designer-mac"
        guide={guide({
          hint: { title: "Apple Silicon", description: "Use Rosetta 2." },
        })}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Apple Silicon" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Use Rosetta 2.")).toBeInTheDocument();
  });

  it("hides substep 2.1 from the generic list for the docker guide, replacing it with a command block", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: {},
      configurable: true,
    });
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);

    render(
      <InstallationScrollSpy
        guideId="docker"
        guide={guide({
          type: "Docker",
          steps: [
            {
              id: 2,
              title: "Run as Docker image",
              substeps: [
                { id: 2.1, title: "docker pull image <br /> docker run image" },
              ],
            },
          ],
        })}
      />,
    );

    expect(screen.queryByText(/2\.1/)).not.toBeInTheDocument();
    const commandBlock = document.querySelector("code");
    expect(commandBlock).toHaveTextContent("docker pull image");
    expect(commandBlock).toHaveTextContent("docker run image");

    await user.click(screen.getByRole("button", { name: "Copy command" }));
    expect(writeText).toHaveBeenCalledWith(
      "docker pull image\ndocker run image",
    );
    expect(
      screen.getByRole("button", { name: "Command copied" }),
    ).toBeInTheDocument();
  });

  it("does not hide substep 2.1 for non-docker guides", () => {
    render(
      <InstallationScrollSpy
        guideId="designer-mac"
        guide={guide({
          product: "Designer",
          steps: [
            {
              id: 2,
              title: "Install the application",
              substeps: [
                { id: 2.1, title: "Open the Downloads folder in Finder" },
              ],
            },
          ],
        })}
      />,
    );

    expect(
      screen.getByText(/Open the Downloads folder in Finder/),
    ).toBeInTheDocument();
  });

  it("shows a download link on step 1 for non-docker guides, using the downloadUrl query param", () => {
    setSearch("downloadUrl=%2Fengine-latest");
    render(
      <InstallationScrollSpy
        guideId="engine"
        guide={guide({ steps: [{ id: 1, title: "Download the engine" }] })}
      />,
    );

    expect(
      screen.getByRole("link", { name: /Download Axon Ivy Engine/ }),
    ).toHaveAttribute("href", "/engine-latest");
  });

  it("links to the official guide on step 1 for the docker and vscode guides", () => {
    render(
      <InstallationScrollSpy
        guideId="docker"
        guide={guide({
          type: "Docker",
          steps: [
            {
              id: 1,
              title: "Install Docker",
              url: "https://docs.docker.com/get-started/",
            },
          ],
        })}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Official guide" }),
    ).toHaveAttribute("href", "https://docs.docker.com/get-started/");
  });

  it("shows the VS Code Marketplace link on step 2 of the designer-vscode guide", () => {
    setSearch("vscodeExtensionLink=https%3A%2F%2Fmarketplace.example%2Fext");
    render(
      <InstallationScrollSpy
        guideId="designer-vscode"
        guide={guide({
          type: "VS Code",
          product: "Designer",
          steps: [{ id: 2, title: "Open the extension" }],
        })}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Open VS Code Marketplace" }),
    ).toHaveAttribute("href", "https://marketplace.example/ext");
  });

  it("shows the tutorials/documentation info box for designer guides", () => {
    render(
      <InstallationScrollSpy
        guideId="designer-windows"
        guide={guide({ product: "Designer" })}
      />,
    );

    expect(
      screen.getAllByRole("link", { name: /Tutorials/ })[0],
    ).toHaveAttribute("href", "https://www.axonivy.com/tutorials");
    expect(
      screen.getAllByRole("link", { name: /Documentation/ })[0],
    ).toHaveAttribute("href", "/doc");
  });

  it("builds the engine Getting Started link from the docLink query param", () => {
    setSearch("docLink=%2Fdoc%2F12.0%2Fen");
    render(<InstallationScrollSpy guideId="engine" guide={guide()} />);

    expect(
      screen.getByRole("link", { name: "Getting Started" }),
    ).toHaveAttribute(
      "href",
      "/doc/12.0/en/engine-guide/getting-started/index.html",
    );
  });

  it("links Getting Started with Docker to the last step's url", () => {
    render(
      <InstallationScrollSpy
        guideId="docker"
        guide={guide({
          type: "Docker",
          steps: [
            { id: 1, title: "Install Docker" },
            {
              id: 2,
              title: "Learn more",
              url: "https://example.com/docker-guide",
            },
          ],
        })}
      />,
    );

    expect(
      screen.getByRole("link", { name: /Getting Started with Docker/ }),
    ).toHaveAttribute("href", "https://example.com/docker-guide");
  });
});
