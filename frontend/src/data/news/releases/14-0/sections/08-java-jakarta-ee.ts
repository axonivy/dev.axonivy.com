import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Java 25 & Jakarta EE 11`,
  anchor: `java-jakarta-ee`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 modernizes the underlying Java enterprise technology stack.`,
    },
    { type: `paragraph`, text: `**Technology updates include:**` },
    {
      type: `list`,
      items: [
        { text: `Java 25` },
        { text: `Jakarta namespace (<code>jakarta.*</code>)` },
        { text: `Java EE → Jakarta EE project conversion` },
        { text: `CDI and <code>@Named instead of @ManagedBean</code>` },
        { text: `Tomcat 11` },
        { text: `MyFaces and PrimeFaces 15` },
        {
          text: `Apache HttpClient 5, Jersey 4, Apache CXF 4.2 for REST and SOAP`,
        },
        { text: `broader third-party library updates` },
      ],
    },
    {
      type: `paragraph`,
      text: `Project converters assist with Java EE to Jakarta EE references and migration from legacy managed bean patterns toward CDI as well as migrating to Primefaces 15.`,
    },
  ],
  images: [`14.0/java-jakarta-ee/01-jakarta-ee.png`],
};

export default section;
