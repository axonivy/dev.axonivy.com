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
  releaseId: `9.4`,
  slogan: `Neuer Prozesseditor`,
  overview: [
    "Der neue Prozesseditor macht das Zeichnen von Geschäftsprozessen deutlich einfacher.",
    "Mit individuellen Dashboards können Benutzer das Portal mit eigenen Willkommensseiten und Aufgaben- und Falllisten personalisieren.",
    "Der Kontext für mehrere Anwendungen ermöglicht die Definition von Sicherheitsgrenzen über Anwendungen hinweg.",
    "Ebenfalls enthalten sind ein neues CMS, Azure AD-Unterstützung, mehrsprachige Workflows und ein neues Prozessdateiformat.",
  ],
  sections: sections,
};

export default release;
