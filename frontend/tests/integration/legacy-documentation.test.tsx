import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LegacyDocumentation from "@/components/documentation/legacy-documentation";
import { renderWithQueryClient, mockFetchOnce } from "./test-utils";

type LegacyDocLink = { url: string; text: string };
type UiLegacyDocResponse = {
  version: string;
  releaseDocuments: { version: string; links: LegacyDocLink[] };
  externalBooks: { version: string; links: LegacyDocLink[] };
  documentUrl: string;
  currentNiceUrlPath: string;
  portalLink: string;
};

function legacyDocResponse(
  overrides: Partial<UiLegacyDocResponse> = {},
): UiLegacyDocResponse {
  return {
    version: "8.0",
    releaseDocuments: {
      version: "8.0",
      links: [
        { url: "/doc/8.0/intro", text: "Introduction" },
        { url: "/doc/8.0/setup", text: "Setup" },
      ],
    },
    externalBooks: {
      version: "8.0",
      links: [{ url: "https://example.com/book", text: "External Book" }],
    },
    documentUrl: "/legacy/8.0/intro.html",
    currentNiceUrlPath: "/doc/8.0/intro",
    portalLink: "https://example.com/portal",
    ...overrides,
  };
}

function setLocation(pathname: string) {
  window.history.pushState(null, "", pathname);
}

describe("LegacyDocumentation", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    setLocation("/");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    setLocation("/");
  });

  it("shows a loading indicator, then renders the documentation", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    resolveFetch(mockFetchOnce(legacyDocResponse()));
    await screen.findByText("Documentation 8.0");
  });

  it("shows an error message when the request fails", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null, { status: 500 }));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    expect(
      await screen.findByText(
        /Failed to load legacy documentation links: HTTP 500/,
      ),
    ).toBeInTheDocument();
  });

  it("shows a fallback message when the response has no data", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    expect(
      await screen.findByText("No legacy documentation data available."),
    ).toBeInTheDocument();
  });

  it("derives the initial request path from the current URL", async () => {
    setLocation("/doc/8.0/intro");
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(legacyDocResponse()));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    await screen.findByText("Documentation 8.0");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "/ui/legacy/doc/8.0/intro",
      expect.anything(),
    );
  });

  it("requests the default endpoint when the URL does not match the doc path", async () => {
    setLocation("/some/other/page");
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(legacyDocResponse()));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    await screen.findByText("Documentation 8.0");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "/ui/legacy/doc/8.0",
      expect.anything(),
    );
  });

  it("navigates to a release document, updates history, and highlights the active link", async () => {
    const user = userEvent.setup();
    setLocation("/doc/8.0/intro");
    vi.mocked(fetch).mockImplementation(async (input) => {
      const url = String(input);
      if (url.includes("/setup")) {
        return mockFetchOnce(
          legacyDocResponse({ documentUrl: "/legacy/8.0/setup.html" }),
        );
      }
      return mockFetchOnce(legacyDocResponse());
    });

    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    await screen.findByText("Documentation 8.0");

    const introButton = screen.getByRole("button", { name: "Introduction" });
    const setupButton = screen.getByRole("button", { name: "Setup" });
    expect(introButton).toHaveClass("font-semibold");
    expect(setupButton).not.toHaveClass("font-semibold");

    await user.click(setupButton);
    expect(window.location.pathname).toBe("/doc/8.0/setup");
    await waitFor(() =>
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        "/ui/legacy/doc/8.0/setup",
        expect.anything(),
      ),
    );

    await screen.findByText("Documentation 8.0");
    expect(screen.getByRole("button", { name: "Setup" })).toHaveClass(
      "font-semibold",
    );
    expect(
      screen.getByRole("button", { name: "Introduction" }),
    ).not.toHaveClass("font-semibold");
  });

  it("syncs the requested path when the browser back/forward navigation fires popstate", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(legacyDocResponse()));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    await screen.findByText("Documentation 8.0");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "/ui/legacy/doc/8.0",
      expect.anything(),
    );

    setLocation("/doc/8.0/setup");
    fireEvent.popState(window);

    await waitFor(() =>
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        "/ui/legacy/doc/8.0/setup",
        expect.anything(),
      ),
    );
  });

  it("renders external book links pointing out to a new tab", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(legacyDocResponse()));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    const externalLink = await screen.findByRole("link", {
      name: /External Book/,
    });
    expect(externalLink).toHaveAttribute("href", "https://example.com/book");
    expect(externalLink).toHaveAttribute("target", "_blank");
  });

  it("strips the legacy header/nav and injects a parent-targeted base tag on iframe load", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(legacyDocResponse()));
    renderWithQueryClient(<LegacyDocumentation version="8.0" />);
    await screen.findByText("Documentation 8.0");
    const iframe = screen.getByTitle("8.0") as HTMLIFrameElement;

    const legacyDoc = document.implementation.createHTMLDocument("legacy");
    legacyDoc.body.innerHTML = `
      <div id="header-wrapper"><div id="headerdiv"></div></div>
      <div class="navbar ivy-subnav">A</div>
      <div class="navbar ivy-subnav">B</div>
      <div class="container"></div>
      <nav id="page-nav"></nav>
      <div id="content">Body content</div>
    `;

    vi.spyOn(iframe, "contentWindow", "get").mockReturnValue({
      document: legacyDoc,
    } as unknown as Window);

    fireEvent.load(iframe);
    expect(legacyDoc.getElementById("header-wrapper")).toBeNull();
    expect(legacyDoc.getElementsByClassName("navbar ivy-subnav")).toHaveLength(
      0,
    );
    expect(legacyDoc.getElementById("page-nav")).toBeNull();
    expect(
      (legacyDoc.querySelector(".container") as HTMLElement).style.marginLeft,
    ).toBe("0px");
    expect(legacyDoc.querySelector("base[target='_parent']")).not.toBeNull();
  });
});
