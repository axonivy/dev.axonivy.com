import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Variableneditor`,
  content: [
    {
      type: `paragraph`,
      text: `Der erste von vielen Konfigurationseditoren der nächsten Generation ist da!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Low-Code`,
          text: `Statt durch ein möglicherweise sehr umfangreiches YAML-Dokument zu navigieren, können Sie Ihre Variablen jetzt bequem über eine Benutzeroberfläche bearbeiten.`,
        },
        {
          term: `Funktionen`,
          text: `Fügen Sie Variablen hinzu oder löschen Sie sie und finden Sie mit der integrierten Suche, wonach Sie suchen. Nach der Auswahl einer Variable sehen Sie alle zugehörigen Informationen in der Detailansicht. Ändern Sie Name, Wert, Beschreibung und Metadaten – die Benutzeroberfläche passt sich Ihren Eingaben an.`,
        },
      ],
    },
  ],
  linkLabels: [`Variableneditor`],
};

export default section;
