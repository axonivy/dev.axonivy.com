import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `S3-Dokumentspeicher`,
  content: [
    {
      type: `paragraph`,
      text: `Workflow-Dokumente können jetzt in S3-kompatiblem Speicher abgelegt werden. S3 bietet gegenüber dem herkömmlichen lokalen Dateisystem viele Vorteile:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Plattformunabhängig`,
          text: `Sie müssen sich nicht mehr mit dem lokalen Dateisystem befassen.`,
        },
        {
          term: `Clusterfähig`,
          text: `Der Speicher funktioniert in einem Cluster. Sie müssen kein Verzeichnis mehr zwischen Clusterknoten freigeben.`,
        },
        {
          term: `S3-Funktionen`,
          text: `S3-Anbieter bieten viele Funktionen, darunter Aufbewahrungsrichtlinien, Verschlüsselung, Versionierung und Sicherungen.`,
        },
        {
          term: `Erweiterbar`,
          text: `S3 ist nicht das Richtige für Sie? Dank der neuen steckbaren Architektur können Sie sogar Ihren eigenen Dokumentspeicher implementieren.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Außerdem können Sie alle Workflow-Dokumente im Axon Ivy Engine Cockpit einsehen.`,
    },
  ],
  linkLabels: [`Enginehandbuch`, `Blogbeitrag`, `Docker-Beispiel`],
};

export default section;
