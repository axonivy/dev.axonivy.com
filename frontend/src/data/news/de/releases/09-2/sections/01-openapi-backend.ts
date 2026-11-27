import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `OpenAPI-Backend`,
  content: [
    {
      type: `paragraph`,
      text: `Wir sind überzeugt, dass die <a href="https://www.openapis.org/">OpenAPI-Initiative</a> die Kommunikation über Systemgrenzen hinweg effizient, gut dokumentiert und angenehm gestaltet. Deshalb unterstützen wir sie gerne und dokumentieren REST-Services standardmäßig im OpenAPI-Format.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Automatisch dokumentiert`,
          text: `Sie definieren Services wie bisher in Java. Alle Ihre Services werden automatisch im OpenAPI-kompatiblen Format unter http://localhost:8081/api/designer/openapi.json beschrieben.`,
        },
        {
          term: `Industriestandard`,
          text: `OpenAPI-Servicebeschreibungen haben sich als De-facto-Standard zur Beschreibung von REST-Schnittstellen etabliert. Daher werden Drittanbieter Ihre Servicebeschreibungen im OpenAPI-Format gerne akzeptieren.`,
        },
        {
          term: `Prototyping-Oberfläche`,
          text: `Axon.ivy-Produkte verfügen über einen integrierten API-Browser. Damit können Sie Ihre Servicebeschreibungen einfach prüfen und Daten an den Service senden, ohne technische Beschreibungsdateien lesen zu müssen.`,
        },
        {
          term: `Erweiterte Dokumentation`,
          text: `Mit OpenAPI-Serviceannotationen können Sie die Darstellung des Services unabhängig von technischen Datenflussbeschreibungen präzisieren. Ihre Servicenutzer finden dort hilfreiche Texte und Beispiele zu gültigen Anwendungsfällen.`,
        },
        {
          term: `Core-Services`,
          text: `Nicht nur Services Ihrer Workflow-Anwendung, sondern auch Axon.ivy-Core-Services werden jetzt im OpenAPI-Format dokumentiert. Dadurch wurde die Dokumentation der Deployment- und Mobile-Workflow-Endpunkte verbessert.`,
        },
      ],
    },
  ],
  linkLabels: [`API-Veröffentlichung`, `API-Browser`, `OpenAPI anpassen`],
};

export default section;
