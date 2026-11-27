import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Marketplace`,
  content: [
    {
      type: `paragraph`,
      text: `Der Marketplace wurde mit einem frischen Design überarbeitet und um zahlreiche neue Funktionen ergänzt. Viele spannende Connectors sind hinzugekommen, die wir als Open Source anbieten.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Feedback`,
          text: `Sie können jetzt Feedback zu jedem Connector geben. Wir freuen uns darüber, denn so erfahren wir, welche Funktionen Ihnen gefallen, welche Sie benötigen und welche Sie sich wünschen.`,
        },
        {
          term: `Funktionen`,
          text: `Wir haben moderne Funktionen wie den Dark Mode und deutsche Übersetzungen hinzugefügt. Außerdem wurde die Dokumentation zu den Connectors umfassend überarbeitet.`,
        },
        {
          term: `Neue Connectors`,
          text: `Viele neue Connectors und Hilfsprogramme wurden entwickelt. Hier sind einige der spannenden Neuerungen:`,
          items: [
            {
              term: `<a href="https://market.axonivy.com/vertexai-google?version=13.2.0#description">Vertexai-google</a>`,
              text: `Dieser Connector konzentriert sich auf das Gemini-Modell, das speziell für anspruchsvolle multimodale Aufgaben mit visuellen und textuellen Eingaben entwickelt wurde.`,
            },
            {
              term: `<a href="https://market.axonivy.com/skribble-connector?version=13.1.1#description">Skribble-connector</a>`,
              text: `Skribble ist eine moderne Plattform für digitale Signaturen. Sie bietet rechtsverbindliche elektronische Signaturen, die den europäischen Gesetzen entsprechen.`,
            },
            {
              term: `<a href="https://market.axonivy.com/process-inspector?version=13.2.0#description">Process-inspector</a>`,
              text: `Mit dem Axon Ivy Process Inspector können Sie berechnen, wie lange die Bearbeitung eines Workflow-Falls dauert.`,
            },
          ],
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Diese und viele weitere hilfreiche Tools finden Sie auf der Axon Ivy Market-Website.`,
    },
  ],
  linkLabels: [`Axon Ivy Market`, `Market`],
};

export default section;
