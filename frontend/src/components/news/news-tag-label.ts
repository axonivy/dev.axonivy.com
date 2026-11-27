import type { NewsTag } from "@/data/news/news";
import type { TFunction } from "i18next";

export function newsTagLabel(tag: NewsTag, t: TFunction): string {
  switch (tag) {
    case "Long Term Support":
      return t("news.tags.longTermSupport");
    case "Leading Edge":
      return t("news.tags.leadingEdge");
    case "Archived":
      return t("news.tags.archived");
  }
}
