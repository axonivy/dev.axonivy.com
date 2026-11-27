import type { Lang } from "@/translation/ui";
import { Button } from "@/components/ui/button";
import type React from "react";

const LABELS: Record<Lang, string> = { en: "EN", de: "DE" };

export function LanguageSwitcher({
  lang,
  urls,
}: {
  lang: Lang;
  urls: Record<Lang, string>;
}) {
  function handleLanguageChange(code: Lang, e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (code === lang) return;
    localStorage.setItem("lang", code);
    window.location.assign(
      urls[code] + window.location.search + window.location.hash,
    );
  }

  return (
    <div className="flex flex-row">
      {(Object.keys(urls) as Lang[]).map((code) => (
        <Button
          key={code}
          variant="ghost"
          size="sm"
          nativeButton={false}
          aria-current={code === lang ? "true" : undefined}
          className={code === lang ? "font-bold" : "text-muted-foreground"}
          render={<a href={urls[code]} hrefLang={code} />}
          onClick={(e) => handleLanguageChange(code, e)}
        >
          {LABELS[code]}
        </Button>
      ))}
    </div>
  );
}
