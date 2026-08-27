import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Marketplace`,
  anchor: `market`,
  content: [
    {
      type: `paragraph`,
      text: `New Market Extensions`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Case Process Viewer`,
          text: `A new UI component visualizes the current process step directly in the Axon Ivy UI and can be integrated with a single line of code.`,
        },
        {
          term: `Chaptcha Utils`,
          text: `A ready-to-use CAPTCHA utility allows easy integration of human verification into Axon Ivy UIs for improved security.`,
        },
        {
          term: `Refactored Document Handling`,
          text: `Document handling is now available as lightweight, modular components (Axon Ivy Cells, Axon Ivy Words, ...) instead of a single large SDK. Current modules target PRO developers, with upcoming support for text processing, PDF, and image generation.`,
        },
        {
          term: `Process Analyser Improvement`,
          text: `The Process Analyzer now offers easier usage without extra counting elements, improved data analysis, a new heat color map, summarized process start analysis, and direct integration as a Portal widget.`,
        },
        {
          term: `New Mail Connector`,
          text: `A new Email Connector enables sending and receiving case-related emails with automatic case linking for full communication tracking. It supports sending, receiving, replying, forwarding, and resending via an intuitive UI.`,
        },
        {
          term: `Azure Service Bus Connector`,
          text: `New support for Azure Service Bus enables sending and receiving messages via queues and topics with multiple configurable connections.`,
        },
        {
          term: `IBM Db2 LUW`,
          text: `This connectors provides a JDBC driver for IBM's DB2 (Linux, Unix, Windows) database.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Marketplace Website Improvements`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Improved monitoring UI for better transparency`,
        },
        {
          text: `Simplified publishing via GitHub workflow with just a few clicks`,
        },
        { text: `New drag & drop preview for artifacts` },
        {
          text: `Clearer and more readable extension changelogs`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Case Process Viewer`,
      url: `https://market.axonivy.com/case-process-viewer?version=12.0.10#description`,
    },
    {
      label: `Captcha Utils`,
      url: `https://market.axonivy.com/captcha-utils?version=12.0.7#description`,
    },
    {
      label: `Axon Ivy Cells`,
      url: `https://market.axonivy.com/axonivy-cells?version=13.1.1#description`,
    },
    {
      label: `Axon Ivy Words`,
      url: `https://market.axonivy.com/axonivy-words?version=13.1.1#description`,
    },
    {
      label: `Process Analyser`,
      url: `https://market.axonivy.com/process-analyser?version=13.1.2#description`,
    },
    {
      label: `Case Mail Component`,
      url: `https://market.axonivy.com/case-mail-component-connector?version=12.0.4#description`,
    },
    {
      label: `Azure Service Bus`,
      url: `https://market.axonivy.com/azure-servicebus-connector?version=13.1.1#description`,
    },
    {
      label: `IBM DB2 LUW`,
      url: `https://market.axonivy.com/ibm-db2-luw?version=13.1.0#description`,
    },
    {
      label: `Contributing to the Axon Ivy Market`,
      url: `https://github.com/axonivy-market/market/wiki`,
    },
    {
      label: `Market Monitoring`,
      url: `https://market.axonivy.com/monitoring`,
    },
  ],
  images: [
    `13.2/market/01-monitoring.png`,
    `13.2/market/02-product-preview.png`,
    `13.2/market/03-release-notes.png`,
    `13.2/market/04-caseprocess-viewer.png`,
    `13.2/market/05-captcha.png`,
    `13.2/market/06-case-mail.png`,
  ],
};

export default section;
