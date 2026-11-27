import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Mit Axon Ivy Portal LTS 12 erreichen Produktivität und Effizienz eine neue Stufe! Diese Version ist ein wichtiger Meilenstein: Sie vereint alle leistungsstarken Funktionen und Verbesserungen der Leading-Edge-Releases 11.x in einer robusten und stabilen LTS-Version. LTS 12 bietet das bisher intuitivste, barrierefreieste und anpassbarste Portal-Erlebnis.`,
    },
    { type: `heading`, text: `Funktionen aus den Leading-Edge-Versionen` },
    {
      type: `paragraph`,
      text: `LTS 12 baut auf den Innovationen und Optimierungen früherer Versionen auf. Dazu gehören:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `<a href="/news/11.1#portal">Axon Ivy Portal 11.1</a>`,
          text: `Einführung des News-Widgets, verbesserte Darstellung auf verschiedenen Geräten und berechtigungsabhängig anpassbare externe Links.`,
        },
        {
          term: `<a href="/news/11.2#portal">Axon Ivy Portal 11.2</a>`,
          text: `Benachrichtigungen, verzögertes Laden von Aufgaben- und Falllisten, KI-Übersetzungen, Import- und Exportfunktionen für Dashboards sowie verbesserte Barrierefreiheit.`,
        },
        {
          term: `<a href="/news/11.3#portal">Axon Ivy Portal 11.3</a>`,
          text: `Erweiterte komplexe Filter, neue Statistikdiagramme, Schnellsuche und die vollständige Veröffentlichung des Portals als Open Source.`,
        },
      ],
    },
    { type: `heading`, text: `Weitere Verbesserungen` },
    {
      type: `paragraph`,
      text: `Zusätzlich zu den bekannten Funktionen der Versionen 11.1 bis 11.3 bietet LTS 12 weitere Verbesserungen:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Optimierte Navigation und Oberfläche`,
          text: `Die Benutzeroberfläche wurde für effizientes Arbeiten modernisiert. Über die anpassbare Navigation auf oberster Ebene können Sie direkt auf personalisierte Dashboards zugreifen.`,
        },
        {
          term: `Erweiterte Widget-Funktionen`,
          text: `Echtzeitbenachrichtigungen, interaktive Widgets und ein erweitertes Statistiksystem ermöglichen die nahtlose Verwaltung von Aufgaben und Fällen in einer strukturierten Umgebung.`,
        },
        {
          term: `Verbesserte Barrierefreiheit`,
          text: `Verbesserungen bei Kontrast, Layouts und Tastaturnavigation machen die Nutzung für Menschen mit unterschiedlichen Fähigkeiten einfacher.`,
        },
        {
          term: `Erweiterte Statistik-Widgets`,
          text: `LTS 12 bietet zahlreiche neue Statistik-Widgets mit Einblicken in Aufgaben, Prioritäten, Fallkategorien und mehr. Die Daten werden von Elasticsearch bereitgestellt.`,
        },
        {
          term: `Open Source`,
          text: `Wir freuen uns, bekannt zu geben, dass das Axon Ivy Portal mit LTS 12 vollständig als Open Source verfügbar ist. Entwicklerinnen und Entwickler weltweit sind eingeladen, es zu erkunden, weiterzuentwickeln und zur Zukunft des Portals beizutragen.`,
        },
      ],
    },
  ],
  linkLabels: [`Portal`],
};

export default section;
