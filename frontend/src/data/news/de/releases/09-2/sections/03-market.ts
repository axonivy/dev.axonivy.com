import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Market`,
  content: [
    {
      type: `paragraph`,
      text: `Große und kleine Marken sind in unserem überarbeiteten Market vertreten. Wir bieten Connectoren für häufig genutzte Dienste wie Microsoft Office, DocuSign, Twitter und weitere. Unsere kostenlosen Produkte sind Geschenke, die Ihre Lösungen stärken sollen. Außerdem ist das Ökosystem keineswegs geschlossen. Wir freuen uns auf neue leistungsstarke, installierbare Komponenten von Ihnen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Connectoren`,
          text: `Sofort einsatzbereite REST-Connectoren für die Kommunikation mit beliebten Marken im Web.`,
        },
        {
          term: `Ivy-Komponenten`,
          text: `Die Produkte im Market wurden mit Ivy entwickelt und lösen häufige Probleme. Als funktionaler SubProcess verpackt, lassen sie sich überall installieren und wiederverwenden.`,
        },
        {
          term: `Demos`,
          text: `Unsere Produkte enthalten Demos, die einen passenden Anwendungsfall für die ausgewählte technische Infrastruktur zeigen.`,
        },
        {
          term: `Offen`,
          text: `Der Market lebt auf GitHub. Jeder kann neue Produkte beitragen und eine entwickelte Lösung gemeinsam voranbringen.`,
        },
        {
          term: `Installierbar`,
          text: `Mit einfachen Installationsformeln können Connector-Entwickler Maven-Abhängigkeiten, REST-Clients, Prozesse, Dialoge und mehr zu bestehenden Projekten beitragen.`,
        },
        {
          term: `Benutzerdefinierte Quellen`,
          text: `Der Designer kann Produkte nicht nur aus dem offiziellen Market, sondern auch aus eigenen Quellen installieren. Enthält Ihr Connector vertrauliche Informationen, können Sie ihn in einem benutzerdefinierten Repository verwalten und von dort installieren.`,
        },
      ],
    },
  ],
  linkLabels: [`Market-Dokumentation`, `Market durchsuchen`],
};

export default section;
