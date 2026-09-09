import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import {
  NewsTimeline,
  type NewsTimelineItem,
} from "@/components/news/timeline";

function item(overrides: Partial<NewsTimelineItem> = {}): NewsTimelineItem {
  return {
    id: "12-0",
    versionTitle: "Axon Ivy 12.0",
    slogan: "Faster, smarter, better",
    tag: "Long Term Support",
    releaseDate: new Date("2024-01-15T00:00:00.000Z"),
    overview: ["Faster startup", "New icons"],
    ...overrides,
  };
}

describe("NewsTimeline", () => {
  it("renders a card per item with title, slogan, date, and a details link", () => {
    render(<NewsTimeline items={[item()]} />);

    expect(
      screen.getByRole("heading", { name: "Axon Ivy 12.0" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Faster, smarter, better")).toBeInTheDocument();
    expect(screen.getByText("Jan 2024")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View Details/ })).toHaveAttribute(
      "href",
      "/news/12-0",
    );
  });

  it("sets the machine-readable release date on the time element", () => {
    render(
      <NewsTimeline
        items={[item({ releaseDate: new Date("2024-01-15T00:00:00.000Z") })]}
      />,
    );

    const time = screen.getByText("Jan 2024");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2024-01-15T00:00:00.000Z");
  });

  it("renders overview facts", () => {
    render(
      <NewsTimeline
        items={[item({ overview: ["Faster startup", "New icons"] })]}
      />,
    );

    expect(screen.getByText("Faster startup")).toBeInTheDocument();
    expect(screen.getByText("New icons")).toBeInTheDocument();
  });

  it.each([
    ["Long Term Support", "green"],
    ["Leading Edge", "orange"],
    ["Archived", "gray"],
  ] as const)("renders the %s badge with the %s variant", (tag, variant) => {
    render(<NewsTimeline items={[item({ tag })]} />);

    const badge = screen.getByText(tag);
    expect(badge).toHaveAttribute("data-variant", variant);
  });

  it("renders a connector between items but not after the last one", () => {
    const { container } = render(
      <NewsTimeline
        items={[item({ id: "a" }), item({ id: "b" }), item({ id: "c" })]}
      />,
    );

    const connectors = container.querySelectorAll("span.bg-n200.absolute");
    expect(connectors).toHaveLength(2);
  });

  it("renders one card per item, each linking to its own news page", () => {
    render(
      <NewsTimeline
        items={[
          item({ id: "a", versionTitle: "Axon Ivy 11.0" }),
          item({ id: "b", versionTitle: "Axon Ivy 12.0" }),
        ]}
      />,
    );

    const list = screen.getByRole("list");
    const links = within(list).getAllByRole("link", { name: /View Details/ });
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/news/a",
      "/news/b",
    ]);
  });
});
