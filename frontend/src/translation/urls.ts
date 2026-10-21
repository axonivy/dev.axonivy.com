import { getRelativeLocaleUrl } from "astro:i18n";
import type { Lang } from "./ui";

export function getLanguageUrls(url: URL): Record<Lang, string> {
  const pathWithoutLang = url.pathname.replace(/^\/de(?=\/|$)/, "") || "/";
  return {
    en: getRelativeLocaleUrl("en", pathWithoutLang),
    de: getRelativeLocaleUrl("de", pathWithoutLang),
  };
}
