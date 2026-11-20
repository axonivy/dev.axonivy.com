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
  releaseId: `11.1`,
  slogan: `Workflow-Statistik-API`,
  overview: [
    "Eine blitzschnelle neue REST-API liefert Workflow-Statistiken mit komplexen Aggregationen (Buckets und Kennzahlen) zu Fällen und Aufgaben.",
    "Die Inscription-Ansicht der nächsten Generation vereinfacht die Prozesskonfiguration.",
    "Ergänzt die Synchronisierung von Azure AD-Benutzereigenschaften und ein News-Widget für Portal-Dashboards.",
    "Das Engine Cockpit wird kontinuierlich weiterentwickelt.",
  ],
  sections: sections,
};

export default release;
