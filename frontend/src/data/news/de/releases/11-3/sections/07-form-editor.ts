import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Form Editor (Alpha) 🧪`,
  content: [
    {
      type: `paragraph`,
      text: `Mit dem Form Editor können Sie Benutzeroberflächen wie nie zuvor erstellen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Low-Code`,
          text: `Der neue Form Editor ermöglicht allen die Erstellung von Benutzeroberflächen ohne Programmierkenntnisse. Für den Einstieg in Ihre kreative Arbeit genügt Drag-and-drop.`,
        },
        {
          term: `Technologieunabhängig`,
          text: `Die Benutzeroberfläche wird technologieunabhängig erstellt; wie bisher generieren wir daraus automatisch die Ansichten für JSF. Sie müssen diese Ansichten nicht mehr selbst pflegen und brauchen sich nicht um ihre Funktionsfähigkeit und Stabilität zu kümmern.`,
        },
        {
          term: `Alpha`,
          text: `Wir freuen uns auf Ihr Feedback und haben bereits eine frühe Alpha-Version des neuen Form Editors integriert. Bis zum LTS-Release 12 planen wir, deutlich mehr Widgets und Integrationen komplexer Komponenten zu unterstützen.`,
        },
      ],
    },
  ],
  linkLabels: [`Form Editor`],
};

export default section;
