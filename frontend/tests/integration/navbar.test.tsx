import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/navbar";

describe("Navbar", () => {
  it("renders the static top-level links with correct hrefs", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Download" })).toHaveAttribute(
      "href",
      "/download",
    );
    expect(screen.getByRole("link", { name: "News" })).toHaveAttribute(
      "href",
      "/news",
    );
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute(
      "href",
      "/team",
    );
  });

  it("marks the Community link as external", () => {
    render(<Navbar />);
    const community = screen.getByRole("link", { name: /Community/ });
    expect(community).toHaveAttribute("href", "https://community.axonivy.com/");
    expect(community).toHaveAttribute("target", "_blank");
    expect(community).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("opens the Platform dropdown revealing its sub-items", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: /Platform/ }));
    expect(screen.getByRole("link", { name: "Release Cycle" })).toHaveAttribute(
      "href",
      "/download/release-cycle",
    );
    expect(screen.getByRole("link", { name: "Deprecation" })).toHaveAttribute(
      "href",
      "/deprecation",
    );
    expect(screen.getByRole("link", { name: "Support" })).toHaveAttribute(
      "href",
      "/support",
    );

    const market = screen.getByRole("link", { name: /Market/ });
    expect(market).toHaveAttribute("href", "https://market.axonivy.com/");
    expect(market).toHaveAttribute("target", "_blank");
  });

  it("opens the Documentation dropdown with version-specific links", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /Documentation/ }));

    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "/doc",
    );
    expect(screen.getByRole("link", { name: /LTS 14.0/ })).toHaveAttribute(
      "href",
      "/doc/14.0/en",
    );
    expect(screen.getByRole("link", { name: /LTS 12.0/ })).toHaveAttribute(
      "href",
      "/doc/12.0/en",
    );
    expect(screen.getByRole("link", { name: /Tutorial/ })).toHaveAttribute(
      "href",
      "https://axonivy.com/tutorial",
    );
  });

  it("opens and closes the mobile navigation drawer via the hamburger button", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-label", "Close navigation menu");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-label", "Open navigation menu");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("expands the mobile Platform submenu and closes the drawer when a sub-link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await screen.findByRole("navigation", { name: "Mobile navigation" });
    const platformTrigger = screen.getByRole("button", { name: "Platform" });
    expect(platformTrigger).toHaveAttribute("aria-expanded", "false");

    await user.click(platformTrigger);
    expect(platformTrigger).toHaveAttribute("aria-expanded", "true");
    const releaseCycleLink = screen.getByRole("link", {
      name: "Release Cycle",
    });
    expect(releaseCycleLink).toHaveAttribute("href", "/download/release-cycle");

    await user.click(releaseCycleLink);
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("renders the mode toggle inside the mobile drawer footer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    expect(
      await screen.findByRole("button", { name: "Toggle theme" }),
    ).toBeInTheDocument();
  });
});
