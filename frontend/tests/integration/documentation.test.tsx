import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import Documentation from "@/components/documentation/documentation";
import { renderWithQueryClient, mockFetchOnce } from "./test-utils";

type DocLink = { url: string; text: string };
type DocVersionLinks = { version: string; links: DocLink[] };
type UiDocResponse = {
  docLinksLTS: DocVersionLinks[];
  docLinksLE: DocVersionLinks[];
  docLinksDev: DocVersionLinks[];
};

function docResponse(overrides: Partial<UiDocResponse> = {}): UiDocResponse {
  return { docLinksLTS: [], docLinksLE: [], docLinksDev: [], ...overrides };
}

describe("Documentation", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a skeleton while loading, then renders documentation sections", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { container } = renderWithQueryClient(<Documentation />);

    expect(container.querySelector('[data-slot="skeleton"]')).toBeTruthy();

    resolveFetch(
      mockFetchOnce(
        docResponse({
          docLinksLTS: [
            {
              version: "11.0",
              links: [{ url: "/doc/11.0", text: "Documentation" }],
            },
          ],
        }),
      ),
    );

    await screen.findByText("LTS - Long Term Support");
  });

  it("shows an error message when the request fails", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null, { status: 500 }));

    renderWithQueryClient(<Documentation />);

    expect(
      await screen.findByText(/Failed to load documentation links: HTTP 500/),
    ).toBeInTheDocument();
  });

  it("shows a fallback message when the response has no data", async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchOnce(null));

    renderWithQueryClient(<Documentation />);

    expect(
      await screen.findByText("No documentation data available."),
    ).toBeInTheDocument();
  });

  it("hides sections that have no links", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        docResponse({
          docLinksLTS: [
            {
              version: "11.0",
              links: [{ url: "/doc/11.0", text: "Documentation" }],
            },
          ],
        }),
      ),
    );

    renderWithQueryClient(<Documentation />);

    await screen.findByText("LTS - Long Term Support");
    expect(screen.queryByText("LE - Leading Edge")).not.toBeInTheDocument();
    expect(screen.queryByText("Development build")).not.toBeInTheDocument();
  });

  it("sorts LTS groups by version, descending", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        docResponse({
          docLinksLTS: [
            {
              version: "9.0",
              links: [{ url: "/doc/9.0", text: "Documentation" }],
            },
            {
              version: "11.0",
              links: [{ url: "/doc/11.0", text: "Documentation" }],
            },
            {
              version: "10.0",
              links: [{ url: "/doc/10.0", text: "Documentation" }],
            },
          ],
        }),
      ),
    );

    renderWithQueryClient(<Documentation />);

    await screen.findByText("LTS - Long Term Support");
    const headings = screen.getAllByRole("heading", { level: 5 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Version 11.0",
      "Version 10.0",
      "Version 9.0",
    ]);
  });

  it("assigns the correct badge per section and LTS recency", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        docResponse({
          docLinksLTS: [
            {
              version: "9.0",
              links: [{ url: "/doc/9.0", text: "Documentation" }],
            },
            {
              version: "11.0",
              links: [{ url: "/doc/11.0", text: "Documentation" }],
            },
          ],
          docLinksLE: [
            {
              version: "13.1",
              links: [{ url: "/doc/13.1", text: "Documentation" }],
            },
          ],
          docLinksDev: [
            {
              version: "13.2",
              links: [{ url: "/doc/dev", text: "Documentation" }],
            },
          ],
        }),
      ),
    );

    renderWithQueryClient(<Documentation />);
    await screen.findByText("LTS - Long Term Support");

    const badgeNear = (versionText: string) => {
      const heading = screen.getByRole("heading", {
        level: 5,
        name: versionText,
      });
      return within(heading.parentElement as HTMLElement).getByText(
        /Stable|Maintenance|Latest features|In development/,
      );
    };

    expect(badgeNear("Version 11.0")).toHaveTextContent("Stable");
    expect(badgeNear("Version 9.0")).toHaveTextContent("Maintenance");
    expect(badgeNear("Version 13.1")).toHaveTextContent("Latest features");
    expect(badgeNear("Version 13.2")).toHaveTextContent("In development");
  });

  it("filters 'new and noteworthy' links out of the dev section", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        docResponse({
          docLinksDev: [
            {
              version: "13.2",
              links: [
                { url: "/doc/dev", text: "Documentation" },
                {
                  url: "/doc/dev/new-and-noteworthy",
                  text: "New and Noteworthy",
                },
              ],
            },
          ],
        }),
      ),
    );

    renderWithQueryClient(<Documentation />);

    await screen.findByText("Development build");
    expect(screen.queryByText("New and Noteworthy")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Documentation/ })).toHaveAttribute(
      "href",
      "/doc/dev",
    );
  });

  it("separates the documentation link from secondary links", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockFetchOnce(
        docResponse({
          docLinksLTS: [
            {
              version: "11.0",
              links: [
                { url: "/doc/11.0/migration", text: "Migration Guide" },
                { url: "/doc/11.0", text: "Documentation" },
                { url: "/doc/11.0/notes", text: "Release Notes" },
              ],
            },
          ],
        }),
      ),
    );

    renderWithQueryClient(<Documentation />);

    const docLink = await screen.findByRole("link", { name: /Documentation/ });
    expect(docLink).toHaveAttribute("href", "/doc/11.0");

    expect(
      screen.getByRole("link", { name: /Migration Guide/ }),
    ).toHaveAttribute("href", "/doc/11.0/migration");
    expect(screen.getByRole("link", { name: /Release Notes/ })).toHaveAttribute(
      "href",
      "/doc/11.0/notes",
    );
  });
});
