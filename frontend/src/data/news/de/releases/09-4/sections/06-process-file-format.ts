import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Neues Prozessdateiformat`,
  content: [
    {
      type: `paragraph`,
      text: `Das Speicherformat von Axon Ivy-Prozessen wurde auf JSON umgestellt.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Git-freundlich`,
          text: `Änderungen an einem Prozess lassen sich einfach überprüfen und nachverfolgen – ganz ohne die Werkzeuge des Axon Ivy Designers.`,
        },
        {
          term: `Aussagekräftig`,
          text: `Das neue JSON-Format verwendet natürliche Hierarchien und lässt Standardwerte aus, um die angewendete Prozesskonfiguration übersichtlich darzustellen.`,
        },
        {
          term: `Schnell`,
          text: `Die JSON-Inscription-Ansicht unterstützt Sie dabei, die aktuell ausgewählten Prozesselemente schnell zu überprüfen, ohne den vollständigen Inscription-Editor zu öffnen.`,
        },
      ],
    },
  ],
  linkLabels: [`JSON-Inscription`],
};

export default section;
