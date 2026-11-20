import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `OpenAPI-Client`,
  content: [
    {
      type: `paragraph`,
      text: `Die Kommunikation mit Diensten von Drittanbietern wurde in unserer Branche in den vergangenen Jahren deutlich vereinfacht. Viele große, offene Anbieter beschreiben ihre Servicefunktionen heute im plattformneutralen OpenAPI-Format. Deshalb haben wir in ein umfangreiches Werkzeugset investiert, das die Nutzung dieser Dienste erleichtert. So können Sie Daten senden und empfangen, ohne sich mit den Details dieser API-Spezifikationen befassen zu müssen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Codegeneratoren`,
          text: `Wir generieren Datenstrukturen, die von OpenAPI-Services empfangen und zurückgegeben werden, und vereinfachen so Ihre Arbeit in Inscription-Masken, Skripten oder einfachem Java-Code.`,
        },
        {
          term: `Integrierte Dokumentation`,
          text: `Service-Ressourcen sind ausführlich dokumentiert. Die Anwendungsfallbeschreibungen werden dort angezeigt, wo sie am nützlichsten sind: direkt in den Inscription-Masken der REST-Client-Aktivitäten.`,
        },
        {
          term: `Übersichtliche Inscription-Masken`,
          text: `Überladene Konfigurationsmasken für REST-Service-Aufrufe gehören der Vergangenheit an. OpenAPI-basierte Services werden übersichtlich dargestellt und zeigen nur die für die ausgewählte Service-Ressource relevanten Konfigurationen.`,
        },
        {
          term: `Validierung`,
          text: `Stark typisierte Datenmodelle und die Trennung optionaler und erforderlicher Daten ermöglichen die Eingabevalidierung. So können Sie die wesentlichen Daten angeben, ohne mühsame Testaufrufe an entfernte Services durchzuführen.`,
        },
        {
          term: `OAuth2-Flows`,
          text: `Für OpenAPI-Services müssen Benutzer typischerweise mit einem OAuth2-Token authentifiziert werden. Wir ermöglichen anbieterneutrale OAuth2-Authentifizierungsszenarien mit minimalem Entwicklungsaufwand.`,
        },
        {
          term: `Weitere Spezifikationen`,
          text: `Wir unterstützen nicht nur OpenAPI 3, sondern auch Swagger 2 und OData-API-Definitionen über Konverter.`,
        },
      ],
    },
  ],
  linkLabels: [
    `OpenAPI-Client`,
    `API-Browser`,
    `OpenAPI-Konverter`,
    `Public API: OAuth2`,
  ],
};

export default section;
