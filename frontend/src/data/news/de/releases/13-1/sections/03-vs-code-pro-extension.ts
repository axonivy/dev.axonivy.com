import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Visual Studio Code PRO Designer Extension (Preview)`,
  content: [
    {
      type: `paragraph`,
      text: `Die Visual Studio Code PRO Designer Extension wird als künftige Plattform für die Entwicklung von Ivy-Anwendungen kontinuierlich erweitert. Sie bietet eine moderne, erweiterbare und entwicklerfreundliche Alternative zum Eclipse-basierten PRO Designer. Version 13.1 ergänzt wichtige Funktionen und unterstützt weiterhin zentrale Modellierungsfunktionen wie Process Editor, Form Editor und Variable Editor.`,
    },
    { type: `paragraph`, text: `Neu in 13.1:` },
    {
      type: `list`,
      items: [
        {
          term: `Data Class Editor`,
          text: `Verwalten Sie Feldstrukturen, Annotationen und Beziehungen in einer visuellen Oberfläche.`,
        },
        {
          term: `CMS Editor`,
          text: `Erstellen und bearbeiten Sie mehrsprachige Inhalte (cms.yaml) mit integrierter Validierung.`,
        },
        {
          term: `Verbesserte Java-Unterstützung`,
          text: `Java-basierte Ivy-Projekte können jetzt mit den standardmäßigen Maven-Werkzeugen entwickelt und erstellt werden – ohne auf Eclipse-spezifische Konfigurationen angewiesen zu sein.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Die Extension befindet sich weiterhin in der Preview-Phase. Ihr Feedback spielt eine zentrale Rolle bei ihrer Weiterentwicklung. Ziel ist eine moderne, fokussierte und flexible IDE, die die Stärken des Eclipse-basierten PRO Designers bewahrt und zugleich den heutigen Erwartungen an die Entwicklung gerecht wird.`,
    },
  ],
  linkLabels: [`PRO Designer`],
};

export default section;
