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
  releaseId: `8.0`,
  slogan: `Clever, noch cleverer: Axon.ivy Digital Business Platform`,
  overview: [
    "Das neue Engine Cockpit ersetzt die AdminUI durch einen umfangreichen, vollständig webbasierten Funktionsumfang, der in jedem Browser und auf Mobilgeräten verfügbar ist.",
    "Die Bereitstellung wird deutlich einfacher und hochgradig konfigurierbar; manuelle Installationsschritte entfallen.",
    "Das Portal wurde vollständig überarbeitet und um zahlreiche Funktionen erweitert.",
    "Ebenfalls enthalten sind ein Setup Wizard, ein Debian Engine Installer, Container-Unterstützung sowie native Entwicklung auf Mac und GTK3.",
  ],
  sections: sections,
};

export default release;
