import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Java 25 & Jakarta EE 11`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 modernisiert den zugrunde liegenden Java-Enterprise-Technologie-Stack.`,
    },
    { type: `paragraph`, text: `**Technologieaktualisierungen umfassen:**` },
    {
      type: `list`,
      items: [
        { text: `Java 25` },
        { text: `Jakarta-Namespace (<code>jakarta.*</code>)` },
        { text: `Konvertierung von Java-EE- zu Jakarta-EE-Projekten` },
        { text: `CDI und <code>@Named statt @ManagedBean</code>` },
        { text: `Tomcat 11` },
        { text: `MyFaces und PrimeFaces 15` },
        {
          text: `Apache HttpClient 5, Jersey 4, Apache CXF 4.2 für REST und SOAP`,
        },
        { text: `Weitere Aktualisierungen von Drittanbieterbibliotheken` },
      ],
    },
    {
      type: `paragraph`,
      text: `Projektkonverter unterstützen bei Java-EE-zu-Jakarta-EE-Referenzen und der Migration von veralteten Managed-Bean-Mustern zu CDI sowie bei der Migration auf Primefaces 15.`,
    },
  ],
};

export default section;
