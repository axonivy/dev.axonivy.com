import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Mobile App`,
  content: [
    {
      type: `paragraph`,
      text: `Optimieren Sie Ihre Workflows unterwegs – Axon Ivy hat eine neue Version der Axon Ivy Mobile App veröffentlicht.`,
    },
    { type: `paragraph`, text: `Neuer Code, neues Design, viele Funktionen!` },
    {
      type: `list`,
      items: [
        {
          term: `Native iOS- und Android-App`,
          text: `Profitieren Sie auf beiden großen mobilen Plattformen von reibungsloser Leistung und einem maßgeschneiderten Design. Die Kompatibilität mit iOS und Android sorgt für eine nahtlose Integration und einfache Bedienung.`,
        },
        {
          term: `Arbeiten außerhalb des Büros`,
          text: `Die App eignet sich ideal für mobile Einsatzbereiche wie Baustellen, die Wartung von Aufzügen und andere Tätigkeiten unterwegs. Sie können Ihre Aufgaben in jeder Umgebung erledigen und überall dort arbeiten, wo Ihr Unternehmen Sie braucht.`,
        },
        {
          term: `Nativer Zugriff auf Kamera und weitere mobile Funktionen`,
          text: `Nutzen Sie die integrierten Funktionen Ihres Geräts wie Kamera und GPS optimal. Nehmen Sie Bilder auf, scannen Sie Dokumente und verwenden Sie weitere Funktionen direkt in der App, um Ihre Workflows zu optimieren und die Produktivität zu steigern.`,
        },
        {
          term: `Offline-Aufgaben`,
          text: `Bleiben Sie auch ohne Netzverbindung produktiv und verwalten Sie Aufgaben offline. So können Sie unabhängig von der Netzwerkverbindung ununterbrochen an Aufgaben, Projekten und Prozessen weiterarbeiten.`,
        },
        {
          term: `Demomodus`,
          text: `Entdecken Sie im praktischen Demomodus den gesamten Funktionsumfang der App. Testen Sie alle Funktionen direkt selbst und finden Sie heraus, wie die App Ihre Prozesse verbessern kann.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Installieren Sie jetzt die App für iOS und Android:`,
    },
  ],
  linkLabels: [`Android-App`, `iOS-App`],
};

export default section;
