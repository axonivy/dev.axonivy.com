import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Vereinfachtes Testen`,
  content: [
    {
      type: `paragraph`,
      text: `Noch nie war es so einfach, Unit-Tests zu schreiben, die die Qualität Ihrer Workflow-Anwendung überprüfen. Komponenten konnten zwar schon immer getestet werden, doch mit der neuen Axon.ivy-Plattform lassen sich Tests viel einfacher schreiben und pflegen:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `@IvyTest`,
          text: `Eine JUnit-5-Annotation, um Aufrufe gegen die Ivy-Umgebung zu ermöglichen.`,
        },
        {
          term: `@IvyProcessTest`,
          text: `Bietet eine umfangreiche BpmClient-API, mit der sich von Testbenutzern ausgeführte Prozesse simulieren lassen. Zusicherungen zum Prozessablauf und zu den zurückgegebenen Daten sind möglich.`,
        },
        {
          term: `@IvyWebTest`,
          text: `Steuert einen echten Browser, um die Arbeit von Benutzern mit Ihren Html Dialogs zu simulieren.`,
        },
      ],
    },
  ],
  linkLabels: [`Konzepte: Testen`],
};

export default section;
