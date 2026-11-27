import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `PRO Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Der PRO Designer ist das zentrale Werkzeug für professionelle Entwickler. Als modernisierte Version des klassischen Designers vereint er eine Reihe moderner, webbasierter Funktionen, die die Produktivität steigern und die Entwicklung vereinfachen:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Inscription-Ansicht`,
          text: `Der verbesserte webbasierte Inscription Editor ersetzt die bisherige SWT-basierte Version. Eine optimierte Benutzeroberfläche und bessere Navigation machen das Bearbeiten von Inscriptions effizienter und benutzerfreundlicher und erleichtern die Verwaltung komplexer Konfigurationen.`,
        },
        {
          term: `Form Editor`,
          text: `Der neue Form Editor ermöglicht ein vielseitigeres und zukunftssicheres Design von HTML Dialogs. Formulardefinitionen werden in einem technologieunabhängigen Format gespeichert und sind so langfristig kompatibel. Derzeit werden aus diesen Definitionen automatisch JSF-basierte Benutzeroberflächen generiert, was für Konsistenz zwischen Projekten sorgt.`,
        },
        {
          term: `Data Class Editor`,
          text: `Im neuen Data Class Editor kann zwischen regulären Data Classes, Business Data Classes und Persistence Entity Data Classes gewechselt werden. Außerdem lassen sich beliebigen Data Classes und Feldern benutzerdefinierte Annotationen hinzufügen – für mehr Flexibilität und Kontrolle über Datenstrukturen.`,
        },
        {
          term: `Variable Editor`,
          text: `Statt große YAML-Dateien zu durchforsten, bietet der verbesserte Variable Editor eine benutzerfreundliche Oberfläche für die effizientere Verwaltung von Variablen. Das reduziert die Komplexität und sorgt für mehr Übersicht bei der Variablenkonfiguration.`,
        },
        {
          term: `Eclipse 2024/09`,
          text: `Nutzen Sie die neuesten Funktionen der Eclipse Platform 2024/09.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Der PRO Designer bietet eine modernisierte Umgebung, die Aufgaben vereinfacht und professionellen Entwicklern mehr Flexibilität gibt.`,
    },
  ],
  linkLabels: [`PRO Designer`],
};

export default section;
