import type { Params } from "astro";
import type { Lang } from "./ui";

export function getLanguagePaths() {
  return [{ params: { lang: undefined } }, { params: { lang: "de" } }];
}

export function localizePaths<T extends { params: Params }>(paths: T[]) {
  return paths.flatMap((path) =>
    getLanguagePaths().map(({ params }) => ({
      ...path,
      params: { ...path.params, ...params },
    })),
  );
}

export const localePath = (lang: Lang, path: string): string => {
  return lang === "en" ? path : `/${lang}${path === "/" ? "" : path}`;
};
