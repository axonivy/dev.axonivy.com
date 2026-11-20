import { defineCollection } from "astro:content";
import { getNews } from "@/data/news/news";

const newsCollection = defineCollection({
  loader: async () =>
    (["en", "de"] as const).flatMap((lang) =>
      getNews(lang).map(({ id, ...release }) => ({
        ...release,
        id: `${lang}-${id}`,
        lang,
      })),
    ),
});

export const collections = { news: newsCollection };
