import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Market Extensions`,
  content: [
    {
      type: `list`,
      items: [
        {
          term: `<a href="https://market.axonivy.com/pattern-demos?version=13.2.1#description">Pattern Demos</a>`,
          text: `Hier zeigen wir, wie unsere PRO-Entwickler typische anspruchsvolle Aufgaben in Kundenprojekten lösen, zum Beispiel Parallelisierung und das Sperren von Aufgaben.`,
        },
        {
          term: `<a href="https://market.axonivy.com/keycloak-connector?version=13.2.0#description">Keycloak Connector</a>`,
          text: `Unser brandneuer Connector ermöglicht den Datenaustausch von Axon Ivy zu Keycloak – beispielsweise zur Unterstützung von Genehmigungs-Workflows für Benutzer.`,
        },
        {
          term: `<a href="https://market.axonivy.com/coffee-machine-connector?version=13.2.0#description">CoffeeMachine Connector</a>`,
          text: `Der Coffee Machine Connector ist Teil eines neuen Onboarding-Tutorials für Axon Ivy.`,
        },
        {
          term: `<a href="https://market.axonivy.com/stripe-connector?version=13.2.0#description">Stripe</a>`,
          text: `Dies ist der erste Connector, der den Zugriff auf Finanzdienstleistungen ermöglicht.`,
        },
        {
          term: `<a href="https://market.axonivy.com/gdpr-utils?version=13.2.0#description">GDPR Utility</a>`,
          text: `Mit dieser Axon Ivy Market Extension können Sie Daten einfach und unkompliziert DSGVO-konform löschen.`,
        },
      ],
    },
    { type: `paragraph`, text: `Verbesserungen an Market Extensions` },
    {
      type: `list`,
      items: [
        {
          term: `Überarbeitung des OpenAI Connectors`,
          text: `Wir haben unseren <a href="https://market.axonivy.com/openai-connector">OpenAI-Connector</a> auf OpenAI v2.3.0 (von 1.2) aktualisiert.`,
        },
        {
          term: `Überarbeitung von DeepL`,
          text: `Wir haben Parameteroptionen ergänzt, damit sich der <a href="https://market.axonivy.com/deepl-connector?version=13.2.1#description">DeepL Connector</a> flexibler einsetzen lässt.`,
        },
      ],
    },
  ],
};

export default section;
