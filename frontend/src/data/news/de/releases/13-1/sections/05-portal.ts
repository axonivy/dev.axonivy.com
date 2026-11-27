import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Entdecken Sie die Möglichkeiten von Portal 13.1 und verbessern Sie, wie Sie Ihre Arbeit visualisieren, organisieren und schützen. Probieren Sie es gleich aus und überzeugen Sie sich selbst.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Benutzerdefinierte Portal-Statistiken`,
          text: `Erstellen Sie benutzerdefinierte Statistik-Widgets direkt im Portal. Wählen Sie aus verschiedenen Diagrammtypen, aggregieren Sie Aufgaben- und Falldaten mit individuellen Filtern, legen Sie Farben und Aktualisierungsintervalle fest und schützen Sie jedes Widget mit Berechtigungsregeln. Benutzerdefinierte Felder werden vollständig unterstützt und ermöglichen genau auf Ihre Bedürfnisse zugeschnittene Einblicke.`,
        },
        {
          term: `Aufgaben und Fälle anheften`,
          text: `Behalten Sie Wichtiges im Blick. Jeder Benutzer kann jetzt einzelne Aufgaben oder Fälle direkt in einer beliebigen Liste anheften. Mit dem Umschalter im Widget filtern Sie sofort nach angehefteten Einträgen und können die angehefteten Elemente jederzeit in Ihrem Profil entfernen.`,
        },
        {
          term: `Navigations-Widget und verborgene Dashboards`,
          text: `Gestalten Sie geführte Dashboard-Abläufe, ohne die Navigationsleiste zu überladen. Markieren Sie ein Dashboard als verborgen und zeigen Sie es über das neue Navigations-Widget an. Kombinieren Sie Ansichten, fügen Sie berechtigungsabhängige Schaltflächen hinzu und erstellen Sie mehrstufige Erlebnisse für unterschiedliche Zielgruppen.`,
        },
      ],
    },
    { type: `paragraph`, text: `Und vieles mehr` },
    {
      type: `list`,
      items: [
        {
          term: `Verbesserte Sicherheit`,
          text: `für alle unterstützten Versionen – mit einer kleineren Angriffsfläche für XSS, Injection und andere Sicherheitslücken.`,
        },
        {
          term: `Mehrere Aufgabenaktivatoren`,
          text: `– weisen Sie mehrere verantwortliche Personen zu und sehen Sie diese übersichtlich in Listen und Details.`,
        },
        {
          term: `Mehrsprachige benutzerdefinierte Felder`,
          text: `– verwalten Sie Feldbeschriftungen und Werte in jeder CMS-Sprache und erstellen Sie wirklich globale Dashboards.`,
        },
        {
          term: `Vollständige japanische Lokalisierung`,
          text: `– eine professionell übersetzte Benutzeroberfläche für die nahtlose Zusammenarbeit mit japanischsprachigen Teams.`,
        },
      ],
    },
  ],
  linkLabels: [`Portal`],
};

export default section;
