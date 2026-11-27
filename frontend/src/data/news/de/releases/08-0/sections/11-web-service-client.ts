import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Neue Werkzeuge für Web-Service-Clients`,
  content: [
    {
      type: `paragraph`,
      text: `Die Werkzeuge zum Aufrufen entfernter Webservices wurden vollständig überarbeitet und sind leistungsfähiger als je zuvor.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Einfach`,
          text: `Übersichtliche und intuitive Konfigurationsmaske für die Web-Service-Call-Aktivität.`,
        },
        {
          term: `Sicher`,
          text: `Integrierte Authentifizierung für HTTP-BASIC, HTTP-DIGEST, NTLM und WS-Security.`,
        },
        {
          term: `Konform`,
          text: `Eine umfangreiche Auswahl an Webservice-Spezifikationen (WS-*) wird unterstützt und kann sofort verwendet werden.`,
        },
        {
          term: `Zuverlässig`,
          text: `Logs und Überwachungsfunktionen helfen dabei, anfällige Webservice-Kommunikation leicht zu erkennen.`,
        },
        {
          term: `Offen`,
          text: `Prozessentwickler können problemlos zusätzliche Client-Funktionen beisteuern.`,
        },
      ],
    },
  ],
  linkLabels: [`Integration von Drittanbietern`, `Tutorial-Video`],
};

export default section;
