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
  releaseId: `12.0`,
  slogan: `NEO – der völlig neue Low-Code-Editor`,
  overview: [
    "Der NEO Designer ist eine optimierte, webbasierte Low-Code-Plattform für die schnelle Anwendungsentwicklung.",
    "Der neue AI Assistant im Portal unterstützt als virtueller Partner bei der Dokumentensuche sowie der Aufgaben- und Prozessverwaltung.",
    "Ergänzt werden Process Analytics und Axon Ivy IDP (Intelligent Document Processing).",
    "Ebenfalls enthalten sind ein neuer Form-, Data-Class- und Variableneditor, erweiterte CORE-Funktionen und eine Mobile App.",
  ],
  sections: sections,
};

export default release;
