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
  releaseId: `11.2`,
  slogan: `Benachrichtigungen und Inscription-Ansichten`,
  overview: [
    "Ein neues Benachrichtigungs-Framework informiert Benutzer kanalübergreifend (Portal, E-Mail, Microsoft Teams) über Ereignisse wie neue Aufgaben.",
    "Die Inscription-Ansicht ist jetzt für eine einfachere Konfiguration direkt in den Prozesseditor integriert.",
    "Ergänzt werden Lazy Loading für Aufgaben- und Falllisten im Portal sowie zahlreiche Funktionen im Engine Cockpit.",
    "Ebenfalls enthalten sind CRON-gesteuerte Ereignisstarts, ein S3-Dokumentspeicher und JSON-Schema-basierte Konfigurationseditoren.",
  ],
  sections: sections,
};

export default release;
