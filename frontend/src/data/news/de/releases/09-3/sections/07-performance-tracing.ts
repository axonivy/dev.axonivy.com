import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Leistung und Tracing`,
  content: [
    {
      type: `paragraph`,
      text: `Das Engine Cockpit bietet integrierte Werkzeuge, um Leistungsprobleme aufzuspüren.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Leistung`,
          text: `Erkennen Sie langsame externe Systeme mit der neuen Leistungsstatistik im Engine Cockpit.`,
        },
        {
          term: `Tracing`,
          text: `Fassen Sie Logeinträge über mehrere Services Ihrer Lösung hinweg einfacher zusammen. Dazu ist die Integration mit verbreiteten Tracing-Werkzeugen wie W3C Trace Context, Jaeger, Zipkin und Amazon X-Ray möglich.`,
        },
        {
          term: `Cache`,
          text: `Optimieren Sie die Cache-Einstellungen der Systemdatenbank mit der neuen Cache View im Engine Cockpit.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Leistungsstatistik`,
    `Tracing-Werkzeuge`,
    `Jaeger-Tracing-Beispiel`,
    `Cache View`,
  ],
};

export default section;
