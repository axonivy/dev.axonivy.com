import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Konfigurationsdateien`,
  content: [
    {
      type: `paragraph`,
      text: `Die gesamte Konfiguration in Axon Ivy-Projekten wurde überarbeitet und zusammengeführt. Das erleichtert den Alltag aller Entwickler erheblich.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `GIT/SCM`,
          text: `Die neuen Dateiformate sind schlanke Textformate und weniger fehleranfällig als XML-Dateien.`,
        },
        {
          term: `Vereinheitlichung`,
          text: `Die Dateien lassen sich einfach in <code>app.yaml</code> auf dem Axon Ivy Engine anpassen. Die Konfiguration von REST-Clients, Web-Service-Clients, Datenbanken und Variablen sieht in Ihrem Axon Ivy-Projekt jetzt genauso aus wie auf dem Axon Ivy Engine.`,
        },
        {
          term: `Bekannte Dateierweiterungen`,
          text: `Alle Konfigurationsdateien verwenden jetzt standardisierte Dateierweiterungen. Dadurch erhalten Sie Syntaxhervorhebung in anderen Werkzeugen und können Änderungen problemlos per Pull Request teilen.`,
        },
        {
          term: `Projektstruktur`,
          text: `Alle Konfigurationsdateien im Axon Ivy-Projekt befinden sich im Ordner <code>Config</code> – sowohl im Axon Ivy Designer als auch im Dateisystem. So bleibt alles transparent.`,
        },
      ],
    },
  ],
  linkLabels: [`Projektkonfiguration`, `app.yaml`],
};

export default section;
