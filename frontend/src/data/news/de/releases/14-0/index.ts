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
  releaseId: `14.0`,
  slogan: `Entwicklung, KI & Entwicklerunterstützung, Deployment und Technologie`,
  overview: [
    "Entwicklung: VS Code PRO Designer, webbasierte Editoren, verbesserte HTML-Dialog-Werkzeuge und einheitliche Validierung.",
    "KI & Entwicklerunterstützung: KI-gestützte Werkzeuge, MCP-Integration und verbesserte technische Dokumentation.",
    "Deployment: Application Versions, zuverlässigere Deployments und Grundlagen für unterbrechungsfreie Aktualisierungen.",
    "Technologie: Java 25, Jakarta EE 11, CDI, PrimeFaces 15, MyFaces 4, Tomcat 11, Jersey 4, Apache CXF 4.2 und aktualisierte Integrationsbibliotheken.",
  ],
  sections: sections,
};

export default release;
