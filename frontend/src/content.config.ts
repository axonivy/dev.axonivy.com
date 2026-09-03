import { defineCollection } from "astro:content";
import { news } from "@/data/news/news";

const newsCollection = defineCollection({
  loader: async () => news,
});

export const collections = {
  news: newsCollection,
};
