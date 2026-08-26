import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Market Extensions`,
  anchor: `market-extensions`,
  paragraphs: [`Improvements of market extensions`],
  features: [
    {
      term: `Pattern Demos`,
      description: `Here, we show how our PRO developers typically solve common challenging tasks such as parallelization and task locking in customer projects.`,
    },
    {
      term: `Keycloak Connector`,
      description: `Our brand new connector enables data to flow from AxonIvy to Keycloak — for example, to support user approval workflows.`,
    },
    {
      term: `CoffeeMachine Connector`,
      description: `The Coffee Machine Connector is part of a new onboarding tutorial for Axon Ivy.`,
    },
    {
      term: `Stripe`,
      description: `This is the first connector to provide access to financial services.`,
    },
    {
      term: `GDPR Utility`,
      description: `This Axon Ivy Market Extension help you delete data in a GDPR-compliant way - simple and hassle-free!`,
    },
    {
      term: `OpenAI Connector Rework`,
      description: `We updated our OpenAI connector to OpenAI v2.3.0 (from 1.2).`,
    },
    {
      term: `DeepL Rework`,
      description: `We added parameter options to make the DeepL Connector usable in a more flexible way`,
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
  code_sample: null,
};

export default section;
