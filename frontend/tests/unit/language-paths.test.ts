import { expect, it } from "vitest";
import { getLanguagePaths, localizePaths } from "@/translation/language";

it("generates unprefixed English and prefixed German paths", () => {
  expect(getLanguagePaths()).toEqual([
    { params: { lang: undefined } },
    { params: { lang: "de" } },
  ]);
});

it("preserves dynamic parameters and props without mutating the input", () => {
  const props = { release: { id: "14.0" } };
  const paths = [{ params: { id: "14.0" }, props }];

  expect(localizePaths(paths)).toEqual([
    { params: { id: "14.0", lang: undefined }, props },
    { params: { id: "14.0", lang: "de" }, props },
  ]);
  expect(paths).toEqual([{ params: { id: "14.0" }, props }]);
});

it("preserves absent and nested documentation rest parameters", () => {
  const paths = [
    { params: { id: "10.0", path: undefined } },
    { params: { id: "10.0", path: "designer-guide/getting-started" } },
  ];

  expect(localizePaths(paths)).toEqual([
    { params: { id: "10.0", path: undefined, lang: undefined } },
    { params: { id: "10.0", path: undefined, lang: "de" } },
    {
      params: {
        id: "10.0",
        path: "designer-guide/getting-started",
        lang: undefined,
      },
    },
    {
      params: {
        id: "10.0",
        path: "designer-guide/getting-started",
        lang: "de",
      },
    },
  ]);
});

it("does not generate paths for an empty collection", () => {
  expect(localizePaths([])).toEqual([]);
});
