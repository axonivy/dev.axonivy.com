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
  releaseId: `9.2`,
  slogan: `Wir sind offen!`,
  overview: [
    "REST-Services werden jetzt standardmäßig im OpenAPI-Format dokumentiert und erleichtern so die systemübergreifende Integration.",
    "Der überarbeitete Market bietet Connectoren für beliebte Dienste wie Microsoft Office, DocuSign und Twitter.",
    "Der neue Migration Wizard vereinfacht Engine-Aktualisierungen.",
    "Ebenfalls enthalten sind personalisierte Prozess-Icons, ein überarbeitetes Engine Cockpit und der Ausstieg des Mac OS Designer aus der Beta.",
  ],
  sections: sections,
};

export default release;
