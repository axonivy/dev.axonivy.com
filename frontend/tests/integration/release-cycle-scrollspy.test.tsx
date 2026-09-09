import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReleaseCycleScrollspy from "@/components/download/release-cycle/scrollspy";
import { CURRENT_VERSION, LTS_VERSION } from "@/data/global-variables";

describe("ReleaseCycleScrollspy", () => {
  it("renders a nav link for every section, each pointing to a real section id", () => {
    render(<ReleaseCycleScrollspy />);

    const expectedSections: Array<[value: string, linkName: string]> = [
      ["LTS", "Long Term Support (LTS)"],
      ["LE", "Leading Edge (LE)"],
      ["Milestones", "Milestones"],
      ["maintenance", "Maintenance support"],
      ["illustration", "Release cycle illustration"],
    ];

    for (const [value, linkName] of expectedSections) {
      expect(screen.getByRole("link", { name: linkName })).toHaveAttribute(
        "href",
        `#${value}`,
      );
      expect(document.getElementById(value)).toBeInTheDocument();
    }
  });

  it("marks the clicked nav link as active", async () => {
    const user = userEvent.setup();
    render(<ReleaseCycleScrollspy />);

    const milestonesLink = screen.getByRole("link", { name: "Milestones" });
    const ltsLink = screen.getByRole("link", { name: /Long Term Support/ });

    await user.click(milestonesLink);

    expect(milestonesLink).toHaveClass("text-primary");
    expect(ltsLink).not.toHaveClass("text-primary");
  });
});
