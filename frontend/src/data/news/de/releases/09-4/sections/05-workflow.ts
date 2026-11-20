import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Workflow`,
  content: [
    {
      type: `paragraph`,
      text: `Ab sofort können Workflow-Fälle und -Aufgaben mehrsprachige Namen und Beschreibungen haben.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Mehrsprachige Namen und Beschreibungen von Fällen und Aufgaben erleichtern die Arbeit in internationalen Unternehmen und Teams`,
          text: `Verwenden Sie das CMS, um Namen und Beschreibungen für Fälle und Aufgaben festzulegen. Konfigurieren Sie anschließend im Engine Cockpit, welche Sprachen unterstützt werden sollen. Alle Namen und Beschreibungen werden in diesen Sprachen in der Systemdatenbank gespeichert. Legen Sie schließlich im Axon Ivy Portal fest, in welcher Sprache die Namen und Beschreibungen der Fälle und Aufgaben angezeigt werden sollen.`,
        },
        {
          term: `Benutzerdefinierte Felder speichern besonders häufig Geschäftsinformationen zu Fällen und Aufgaben. Ihre Metadaten können jetzt mehrsprachige Bezeichnungen und Beschreibungen enthalten`,
          text: `Im Axon Ivy Portal werden überall dort, wo ein benutzerdefiniertes Feld verwendet wird, die angegebene Bezeichnung und Beschreibung statt des technischen Namens angezeigt. Sie werden außerdem in der Inhaltshilfe der Editoren für benutzerdefinierte Fall- und Aufgabenfelder verwendet.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Mehrsprachige Fälle und Aufgaben`,
    `Metadaten benutzerdefinierter Felder`,
  ],
};

export default section;
