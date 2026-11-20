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
  releaseId: `13.2`,
  slogan: `Agenten, Statistiken, Visual Studio Code Extension und Editoren`,
  overview: [
    "Smart Workflow und Smart Core vertiefen die KI-gestützte Prozess-Orchestrierung und erweitern das bestehende KI-Portfolio (IDP, Portal Assistant, LLM-Connectoren).",
    "Mit dem Portal Statistics Widget Configurator erhalten Sie mit wenigen Klicks aussagekräftige Einblicke in Prozess- und Geschäftsdaten.",
    "Die VS Code Extension wird zum primären PRO Designer und bietet eine moderne, schnelle und erweiterbare Entwicklungsumgebung.",
    "Ebenfalls enthalten sind ein CMS Translation Wizard, die datenbankgestützte Formularerstellung, verbesserte BPMN-2-Unterstützung und neue Market-Connectoren.",
  ],
  sections: sections,
};

export default release;
