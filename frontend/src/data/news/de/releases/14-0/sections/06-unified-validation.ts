import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Einheitliche Validierung`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 führt ein gemeinsames Validierungs-Framework für Entwicklungswerkzeuge und Builds ein. Die Validierung ist nicht mehr auf einzelne Editoren beschränkt, sondern kann auch für Workspace-Diagnosen und Maven-basierte Builds wiederverwendet werden.`,
    },
    {
      type: `paragraph`,
      text: `Die Validierung umfasst Prozesse, Formulare, Datenbanken, XHTML, CMS, Case Maps, Persistence und <code>pom.xml</code>. Validatoren lassen sich außerdem konfigurieren oder gezielt deaktivieren.`,
    },
    {
      type: `paragraph`,
      text: `So erhalten Sie während der Entwicklung früher und einheitlicher Feedback. Außerdem kann die Validierung als Teil automatisierter CI/CD-Qualitätsprüfungen eingesetzt werden.`,
    },
  ],
};

export default section;
