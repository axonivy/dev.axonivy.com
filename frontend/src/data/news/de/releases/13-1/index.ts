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
  releaseId: `13.1`,
  slogan: `Verbesserte Editoren und Ansichten, mehrsprachige Werkzeuge und eine vollständig vorschaufähige Benutzeroberfläche`,
  overview: [
    "Die Dialogvorschau ist zurück – mit einer stabileren und genaueren Echtzeitdarstellung sowie direkter Navigation zu Elementen.",
    "Der NEO Designer ist jetzt vollständig auf Deutsch verfügbar und damit für noch mehr Benutzer zugänglich.",
    "Das Portal unterstützt neben neuen Statistikfunktionen jetzt auch Japanisch.",
    "Ebenfalls enthalten sind Verbesserungen am CMS Editor und der Tastaturunterstützung, mehrere Aufgabenverantwortliche und Marketplace-Updates.",
  ],
  sections: sections,
};

export default release;
