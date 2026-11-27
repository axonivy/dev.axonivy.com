import type {
  NewsReleaseTranslation,
  NewsSectionTranslation,
} from "@/data/news/news";

const sectionModules = import.meta.glob<{ default: NewsSectionTranslation }>(
  "./sections/*.ts",
  { eager: true },
);

const sections: NewsSectionTranslation[] = Object.keys(sectionModules)
  .sort()
  .map((key) => sectionModules[key].default);

const release: NewsReleaseTranslation = {
  releaseId: `10.0`,
  slogan: `Ein vollständig neues Benutzererlebnis`,
  overview: [
    "LTS-Version, die alle neuen Funktionen aus den 9.x-Leading-Edge-Releases vereint.",
    "Bietet ein vollständig überarbeitetes, völlig neues Benutzererlebnis.",
  ],
  sections: sections,
};

export default release;
