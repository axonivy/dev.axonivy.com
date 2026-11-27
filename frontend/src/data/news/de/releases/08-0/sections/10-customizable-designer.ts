import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Anpassbarer Designer`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben den neuesten Axon.ivy Designer deutlich flexibler gestaltet, damit er Ihre Entwicklungsanforderungen optimal erfüllt.`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Schlanker`,
          items: [
            { text: `Die Importfunktion für Xpert.ivy 3.9 wurde entfernt.` },
            {
              text: `Die Projektberichtsfunktion ist nicht mehr enthalten. Sie können sie jedoch über die vorkonfigurierte Update-Site installieren.`,
            },
          ],
        },
        {
          text: `Aktuell`,
          items: [
            {
              text: `Viele Entwickler verwenden GIT als primäres Versionsverwaltungssystem. EGit Team Provider wird jetzt zusammen mit einer neuen Version von Subclipse für SVN-Benutzer ausgeliefert.`,
            },
            {
              text: `Unabhängige Designer-Funktionen wie GIT oder SVN können jetzt aktualisiert werden. Sie müssen also nicht mehr auf den Veröffentlichungszyklus des Axon.ivy Designer warten, um die neuesten Verbesserungen von Drittanbietern zu erhalten.`,
            },
          ],
        },
        {
          text: `Ganz Ihrer`,
          items: [
            {
              text: `Sie benötigen bestimmte Kernbestandteile des Designer nicht? Wir haben Designer-Funktionen isoliert, sodass Sie sie deinstallieren können.`,
            },
            {
              text: `Stellen Sie Ihren eigenen Axon.ivy Designer mit den für Sie und Ihr Team wesentlichen Funktionen zusammen.`,
            },
          ],
        },
      ],
    },
  ],
};

export default section;
