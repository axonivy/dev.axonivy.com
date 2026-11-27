import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Mehrere Anwendungen pro Sicherheitskontext`,
  content: [
    {
      type: `paragraph`,
      text: `Axon Ivy-Anwendungen setzen keine starren Grenzen mehr untereinander. Anwendungen gehören zu einem Sicherheitssystem, in dem Benutzer und Rollen verwaltet werden. Dies ermöglicht eine unabhängige, funktionsgetriebene Entwicklung.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Funktionsgetriebene Entwicklung (FDD)`,
          text: `Es ist nicht mehr nötig, alles in eine Anwendung zu packen und dabei eine unübersichtliche Ansammlung zu riskieren. Verschiedene Teilanwendungen können in unabhängigen Anwendungen entwickelt werden und dennoch dieselbe Benutzer- und Rollenbasis verwenden.`,
        },
        {
          term: `Unabhängige Release-Zyklen`,
          text: `Wenn Sie Ihre Anwendung in mehrere Anwendungen aufteilen, können Sie jede davon unabhängig entwickeln und einen eigenen Release-Zyklus pflegen.`,
        },
        {
          term: `Eigenständiges Portal`,
          text: `Das Axon Ivy Portal muss nicht mehr Teil Ihrer Anwendung sein. Betreiben Sie das Portal in einer eigenen Anwendung, integrieren Sie Ihre Geschäftsprozesse über iFrames und halten Sie das Portal aktuell, ohne sich mit Migrationen aufhalten zu müssen.`,
        },
        {
          term: `Mandantenfähigkeit`,
          text: `Für Mandantenfähigkeit empfehlen wir dringend, eine separate Axon Ivy Engine pro Mandant zu betreiben und diese auf einer Containerplattform zu orchestrieren. Wenn Sie Mandantenfähigkeit auf einer Engine betreiben möchten, empfehlen wir, pro Mandant ein Sicherheitssystem einzurichten und die Anwendungen des Mandanten darin auszuführen.`,
        },
      ],
    },
  ],
  linkLabels: [`Anwendungslebenszyklus`, `Mandantenfähigkeit`],
};

export default section;
