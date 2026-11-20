import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Ein wachsender Market`,
  content: [
    {
      type: `paragraph`,
      text: `Unser <a href="https://market.axonivy.com/">Axon Ivy Market</a> wächst und bietet immer mehr sofort einsatzbereite Produkte. Diese Produkte sind mit LTS 10 kompatibel. Sie müssen also nicht auf den Leading-Edge-Zug aufspringen, um die leistungsstarken Produkte im Arbeitsalltag zu nutzen.`,
    },
    {
      type: `paragraph`,
      text: `KI und Robotik: Überlassen wir den Maschinen die mühsame Arbeit!`,
    },
    {
      type: `list`,
      items: [
        { text: `Axon Ivy RPA` },
        {
          text: `<a href="https://market.axonivy.com/openai-connector?version=13.2.1#description">Chat GPT Connector</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/deepl-connector?version=13.2.1#description">DeepL Connector</a>`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Swissness: Lokalprodukte aus unserer Zentrale`,
    },
    {
      type: `list`,
      items: [
        {
          text: `<a href="https://market.axonivy.com/sbb-connector?version=13.1.1#description">SBB</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/srf-weather-connector?version=13.2.0#description">SRF Meteo</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/threema-connector?version=13.2.0#description">Threema</a>`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Infrastruktur: leistungsstark und einfach integrierbar`,
    },
    {
      type: `list`,
      items: [
        {
          text: `<a href="https://market.axonivy.com/docker-connector?version=13.2.0#description">Docker</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/kafka-connector?version=13.2.0#description">Kafka</a>`,
        },
        { text: `Graph QL` },
      ],
    },
    {
      type: `paragraph`,
      text: `Low-Code-Erweiterungen: mehr Produktivität für Einsteiger und Profis`,
    },
    {
      type: `list`,
      items: [
        {
          text: `<a href="https://market.axonivy.com/openai-assistant?version=13.2.1#description">Chat GPT Assistant</a>`,
        },
        {
          text: `<a href="https://market.axonivy.com/excel-importer?version=13.1.1#description">Excel Dialog Importer</a>`,
        },
      ],
    },
  ],
  linkLabels: [`Market durchsuchen`, `Market-Dokumentation`, `Beitrags-Wiki`],
};

export default section;
