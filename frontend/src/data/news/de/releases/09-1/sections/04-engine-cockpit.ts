import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit 2.0`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben hart daran gearbeitet, das Engine Cockpit noch besser zu machen! Damit alle von den neuen Funktionen profitieren, haben wir einige davon – etwa den LDAP Browser und die PMV Dependency View – auf LTS zurückportiert. Außerdem gibt es viele kleinere Verbesserungen, die Ihnen hoffentlich den Alltag erleichtern. Sehen wir sie uns an:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `LDAP Browser`,
          text: `Durchsuchen Sie ganz einfach Ihr verbundenes Sicherheitsverzeichnis.`,
        },
        {
          term: `PMV Dependency View`,
          text: `Übersicht über die Abhängigkeiten zwischen PMVs mit einem Hinweis auf fehlende Komponenten.`,
        },
        {
          term: `MBean Monitor`,
          text: `Mehr Möglichkeiten zur Überwachung des laufenden Systems, ganz ohne Installation von VisualVM.`,
        },
        {
          term: `Neustarthinweis`,
          text: `Ein deutlicher Hinweis, wenn eine Konfigurationsänderung einen Neustart des Engine erfordert.`,
        },
      ],
    },
  ],
  linkLabels: [`Engine Cockpit-Leitfaden`],
};

export default section;
