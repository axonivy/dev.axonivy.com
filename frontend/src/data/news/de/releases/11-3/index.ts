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
  releaseId: `11.3`,
  slogan: `Variableneditor und Mobile App`,
  overview: [
    "Der neue Variableneditor vereinfacht die Definition dynamischer Bestandteile hochgradig konfigurierbarer Workflows.",
    "Die vollständig neu entwickelte Mobile App ist jetzt für Android und iOS verfügbar.",
    "Enthält eine Business Notification API und eine überarbeitete Inscription-Oberfläche.",
    "Ebenfalls enthalten sind ein TLS-Tester im Engine Cockpit sowie Alpha-Versionen des Form Editors und der VS Code Extension.",
  ],
  sections: sections,
};

export default release;
