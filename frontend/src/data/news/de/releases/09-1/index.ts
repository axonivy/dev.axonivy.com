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
  releaseId: `9.1`,
  slogan: `Effiziente Skalierung für Benutzer und vereinfachtes Testen`,
  overview: [
    "Zahlreiche Verbesserungen an Speicher, Leistung, Benutzeroberfläche und API ermöglichen es dem Engine, Hunderttausende Benutzer effizient zu bedienen.",
    "Vereinfachtes Testen unterstützt stabile Rollouts umfangreicher Änderungen mit minimalem manuellem Aufwand über CI-Pipelines.",
    "Das Portal erhält verschiedene Verbesserungen der Benutzerfreundlichkeit und Oberfläche.",
    "Ebenfalls enthalten sind ein isolierter Web-App-Kontext sowie ein LDAP- und JMX-Browser im Engine Cockpit.",
  ],
  sections: sections,
};

export default release;
