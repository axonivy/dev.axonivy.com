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
  releaseId: `9.3`,
  slogan: `Nach Bedarf skalieren`,
  overview: [
    "Engines können jetzt nach Bedarf skaliert werden: Neue Instanzen werden gestartet, um die Client-Auslastung bei Ihrem bevorzugten Container- oder Cloud-Anbieter auszugleichen.",
    "Die Projektkonfiguration wurde überarbeitet und in einfachen, weitverbreiteten Textformaten zusammengeführt.",
    "Neu sind dev.workflow.ui, eine rollenbasierte Willkommensseite und eine leistungsstarke Public API.",
    "Ebenfalls enthalten sind Verbesserungen bei Leistung und Tracing sowie ein aktualisierter Market.",
  ],
  sections: sections,
};

export default release;
