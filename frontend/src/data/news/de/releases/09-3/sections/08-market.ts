import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Aktualisierter Market`,
  content: [
    {
      type: `paragraph`,
      text: `Der Axon Ivy Market gewinnt an Dynamik und entwickelt sich zu einem leistungsstarken Ökosystem für alle Projekte der digitalen Transformation.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Wachstum`,
          text: `Immer mehr Connectoren sind sofort verfügbar. Die Community hat mit uns neue Connectoren für SFTP, das Schweizer Telefonverzeichnis und Amazons Natural-Language-Processing-Dienste entwickelt.`,
        },
        {
          term: `Vorlagen`,
          text: `Unser Vorlagen-Repository ermöglicht Ihnen, in kürzester Zeit ein eigenes Produkt zu entwickeln. Alles ist vorkonfiguriert, damit Sie so einfach wie möglich beitragen können.`,
        },
        {
          term: `Kompatibilität`,
          text: `Vordefinierte Build-Pipelines und sichere, versionierte Maven-Repositories stehen für Ihr Produkt bereit. Dadurch wird die langfristige Pflege eines weit verbreiteten Market-Produkts bei sich weiterentwickelndem Designer-Funktionsumfang einfach und bequem.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Market durchsuchen`,
    `Market-Dokumentation`,
    `Wiki für Beiträge`,
  ],
};

export default section;
