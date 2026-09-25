import { expect, it } from "vitest";
import {
  sectionValue,
  type NewsScrollSpySection,
} from "@/components/news/scrollspy";

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

it("uses the section's anchor when set", () => {
  const sections = [section({ anchor: "overview" })];
  expect(sectionValue(sections[0], 0, sections)).toBe("overview");
});

it("falls back to a positional value when there is no anchor", () => {
  const sections = [section({ anchor: null }), section({ anchor: null })];
  expect(sectionValue(sections[0], 0, sections)).toBe("section-1");
  expect(sectionValue(sections[1], 1, sections)).toBe("section-2");
});

it("suffixes later sections that share the same anchor", () => {
  const sections = [
    section({ heading: "Notes A", anchor: "notes" }),
    section({ heading: "Notes B", anchor: "notes" }),
  ];
  expect(sectionValue(sections[0], 0, sections)).toBe("notes");
  expect(sectionValue(sections[1], 1, sections)).toBe("notes-2");
});
