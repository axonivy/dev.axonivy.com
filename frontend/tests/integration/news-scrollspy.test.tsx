import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsScrollSpy from "@/components/news/scrollspy";
import type { NewsBlock, NewsLink } from "@/data/news/news";

type NewsScrollSpySection = {
  heading: string;
  anchor: string | null;
  content: NewsBlock[];
  links: NewsLink[];
  images: string[];
};

function section(
  overrides: Partial<NewsScrollSpySection> = {},
): NewsScrollSpySection {
  return {
    heading: "Section",
    anchor: null,
    content: [],
    links: [],
    images: [],
    ...overrides,
  };
}

function renderScrollSpy(
  sections: NewsScrollSpySection[],
  overrides: Partial<React.ComponentProps<typeof NewsScrollSpy>> = {},
) {
  return render(
    <NewsScrollSpy
      title="Axon Ivy 12.0"
      slogan="Faster, smarter, better"
      tag="Long Term Support"
      releaseDate="January 2024"
      downloadUrl="/download"
      releaseNotesUrl="https://example.com/notes"
      migrationGuideUrl="https://example.com/migration"
      sections={sections}
      {...overrides}
    />,
  );
}

describe("NewsScrollSpy", () => {
  it("renders the release header with badge, dates, and action links", () => {
    renderScrollSpy([section({ heading: "Overview" })]);

    expect(screen.getByText("Long Term Support")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Axon Ivy 12.0" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Faster, smarter, better")).toBeInTheDocument();
    expect(screen.getByText("January 2024")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download/ })).toHaveAttribute(
      "href",
      "/download",
    );
    expect(screen.getByRole("link", { name: /Release Notes/ })).toHaveAttribute(
      "href",
      "https://example.com/notes",
    );
    expect(
      screen.getByRole("link", { name: /Migration Guide/ }),
    ).toHaveAttribute("href", "https://example.com/migration");
  });

  it("shows the badge label matching the release tag", () => {
    const { rerender } = renderScrollSpy([section()], { tag: "Leading Edge" });
    expect(screen.getByText("Leading Edge")).toBeInTheDocument();

    rerender(
      <NewsScrollSpy
        title="Axon Ivy 12.0"
        slogan={null}
        tag="Archived"
        releaseDate="January 2024"
        downloadUrl="/download"
        releaseNotesUrl="https://example.com/notes"
        migrationGuideUrl="https://example.com/migration"
        sections={[section()]}
      />,
    );
    expect(screen.getByText("Archived")).toBeInTheDocument();
  });

  it("renders inline formatting: code spans, bold text, and links", () => {
    renderScrollSpy([
      section({
        content: [
          {
            type: "paragraph",
            text: 'Run `ivy build` to compile, then **deploy** or read the <a href="https://example.com/guide">guide</a>.',
          },
        ],
      }),
    ]);

    expect(screen.getByText("ivy build").tagName).toBe("CODE");
    expect(screen.getByText("deploy").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "guide" })).toHaveAttribute(
      "href",
      "https://example.com/guide",
    );
  });

  it("renders nested list items with terms", () => {
    renderScrollSpy([
      section({
        content: [
          {
            type: "list",
            items: [
              {
                term: "Performance",
                text: "Faster startup",
                items: [{ text: "Lazy-loaded modules" }],
              },
              { text: "New icons" },
            ],
          },
        ],
      }),
    ]);

    expect(screen.getByText("Performance:")).toBeInTheDocument();
    expect(screen.getByText("Faster startup")).toBeInTheDocument();
    expect(screen.getByText("Lazy-loaded modules")).toBeInTheDocument();
    expect(screen.getByText("New icons")).toBeInTheDocument();
  });

  it("renders heading and code blocks", () => {
    renderScrollSpy([
      section({
        content: [
          { type: "heading", text: "Breaking changes" },
          { type: "code", code: "ivy.engine.start()" },
        ],
      }),
    ]);

    expect(
      screen.getByRole("heading", { name: "Breaking changes" }),
    ).toBeInTheDocument();
    expect(screen.getByText("ivy.engine.start()")).toBeInTheDocument();
  });

  it("renders a nav link per section and marks the clicked section active", async () => {
    const user = userEvent.setup();
    renderScrollSpy([
      section({ heading: "Overview", anchor: "overview" }),
      section({ heading: "Migration", anchor: "migration" }),
    ]);

    const overviewLink = screen.getByRole("link", { name: "Overview" });
    const migrationLink = screen.getByRole("link", { name: "Migration" });

    expect(overviewLink).toHaveAttribute("href", "#overview");
    expect(migrationLink).toHaveAttribute("href", "#migration");

    await user.click(overviewLink);
    expect(overviewLink).toHaveClass("text-primary");
    expect(migrationLink).not.toHaveClass("text-primary");

    await user.click(migrationLink);
    expect(migrationLink).toHaveClass("text-primary");
    expect(overviewLink).not.toHaveClass("text-primary");
  });

  it("de-duplicates sections that share the same anchor", () => {
    render(
      <NewsScrollSpy
        title="Axon Ivy 12.0"
        slogan={null}
        tag="Long Term Support"
        releaseDate="January 2024"
        downloadUrl="/download"
        releaseNotesUrl="https://example.com/notes"
        migrationGuideUrl="https://example.com/migration"
        sections={[
          section({ heading: "Notes A", anchor: "notes" }),
          section({ heading: "Notes B", anchor: "notes" }),
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Notes A" })).toHaveAttribute(
      "href",
      "#notes",
    );
    expect(screen.getByRole("link", { name: "Notes B" })).toHaveAttribute(
      "href",
      "#notes-2",
    );
    expect(document.getElementById("notes")).toBeInTheDocument();
    expect(document.getElementById("notes-2")).toBeInTheDocument();
  });

  it("renders multiple section links separated by bullets", () => {
    renderScrollSpy([
      section({
        links: [
          { label: "Read more", url: "https://example.com/a" },
          { label: "Watch demo", url: "https://example.com/b" },
        ],
      }),
    ]);

    expect(screen.getByRole("link", { name: /Read more/ })).toHaveAttribute(
      "href",
      "https://example.com/a",
    );
    expect(screen.getByRole("link", { name: /Watch demo/ })).toHaveAttribute(
      "href",
      "https://example.com/b",
    );
    expect(screen.getByText("•")).toBeInTheDocument();
  });

  it("opens the image gallery, navigates between images, and wraps around", async () => {
    const user = userEvent.setup();
    renderScrollSpy([
      section({
        heading: "Screenshots",
        images: ["test/img1.png", "test/img2.png", "test/img3.png"],
      }),
    ]);

    const thumbnails = screen.getAllByRole("button", {
      name: /Open image preview/,
    });
    await user.click(thumbnails[0]);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("1 / 3")).toBeInTheDocument();

    await user.click(
      within(dialog).getByRole("button", { name: "Next image" }),
    );
    expect(within(dialog).getByText("2 / 3")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Next image" }),
    );
    await user.click(
      within(dialog).getByRole("button", { name: "Next image" }),
    );
    expect(within(dialog).getByText("1 / 3")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Previous image" }),
    );
    expect(within(dialog).getByText("3 / 3")).toBeInTheDocument();
  });

  it("navigates the image gallery with arrow keys", async () => {
    const user = userEvent.setup();
    renderScrollSpy([
      section({
        heading: "Screenshots",
        images: ["test/img1.png", "test/img2.png"],
      }),
    ]);

    await user.click(
      screen.getAllByRole("button", { name: /Open image preview/ })[0],
    );
    const dialog = await screen.findByRole("dialog");

    dialog.focus();
    await user.keyboard("{ArrowRight}");
    expect(within(dialog).getByText("2 / 2")).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}");
    expect(within(dialog).getByText("1 / 2")).toBeInTheDocument();
  });

  it("hides the counter and navigation controls for a single image", async () => {
    const user = userEvent.setup();
    renderScrollSpy([
      section({ heading: "Screenshots", images: ["test/img1.png"] }),
    ]);

    await user.click(
      screen.getByRole("button", { name: /Open image preview/ }),
    );
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).queryByRole("button", { name: "Next image" }),
    ).not.toBeInTheDocument();
    expect(within(dialog).queryByText(/\d \/ \d/)).not.toBeInTheDocument();
  });
});
