import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Market Extensions`,
  anchor: `market-extensions`,
  content: [
    {
      type: `list`,
      items: [
        {
          term: `<a href="https://market.axonivy.com/pattern-demos?version=13.2.1#description">Pattern Demos</a>`,
          text: `Here, we show how our PRO developers typically solve common challenging tasks such as parallelization and task locking in customer projects.`,
        },
        {
          term: `<a href="https://market.axonivy.com/keycloak-connector?version=13.2.0#description">Keycloak Connector</a>`,
          text: `Our brand new connector enables data to flow from AxonIvy to Keycloak — for example, to support user approval workflows.`,
        },
        {
          term: `<a href="https://market.axonivy.com/coffee-machine-connector?version=13.2.0#description">CoffeeMachine Connector</a>`,
          text: `The Coffee Machine Connector is part of a new onboarding tutorial for Axon Ivy.`,
        },
        {
          term: `<a href="https://market.axonivy.com/stripe-connector?version=13.2.0#description">Stripe</a>`,
          text: `This is the first connector to provide access to financial services.`,
        },
        {
          term: `<a href="https://market.axonivy.com/gdpr-utils?version=13.2.0#description">GDPR Utility</a>`,
          text: `This Axon Ivy Market Extension help you delete data in a GDPR-compliant way - simple and hassle-free!`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Improvements of market extensions`,
    },
    {
      type: `list`,
      items: [
        {
          term: `OpenAI Connector Rework`,
          text: `We updated our <a href="https://market.axonivy.com/openai-connector">OpenAI connector</a> to OpenAI v2.3.0 (from 1.2).`,
        },
        {
          term: `DeepL Rework`,
          text: `We added parameter options to make the <a href="https://market.axonivy.com/deepl-connector?version=13.2.1#description">DeepL Connector</a> usable in a more flexible way`,
        },
      ],
    },
  ],
  links: [],
  images: [
    `13.1/market-artifacts/01-coffee-machine.png`,
    `13.1/market-artifacts/02-gdpr.png`,
    `13.1/market-artifacts/03-keycloak.png`,
    `13.1/market-artifacts/04-pattern-demos.png`,
    `13.1/market-artifacts/05-stripe.png`,
  ],
};

export default section;
