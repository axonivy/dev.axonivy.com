import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Ivy Portal 14 vereint alle Funktionen der Leading-Edge-Releases 13.1 und 13.2 in einer stabilen LTS-Version. Dazu kommen eine modernisierte UI, eine zentrale Menüverwaltung, eine intelligentere Task- und Fallbearbeitung, portierbare Konfigurationen und eine bessere Enterprise-Tauglichkeit.`,
    },
    { type: `heading`, text: `Aus 13.1 und 13.2` },
    {
      type: `list`,
      items: [
        {
          text: `Benutzerdefinierte Statistiken mit bedingungsbasierter Einfärbung, KPI-Diagrammen und Drill-down`,
        },
        {
          text: `Tasks und Fälle anheften, Navigation Widget mit ausgeblendeten Dashboards`,
        },
        { text: `Side Step Processes und statische Seiten` },
        {
          text: `Verbesserungen der Barrierefreiheit, verstärkte Sicherheit, mehrere Task-Aktivatoren`,
        },
        {
          text: `Vollständige Unterstützung mehrsprachiger Inhalte und der japanischen Lokalisierung`,
        },
      ],
    },
    { type: `heading`, text: `Neu in LTS 14` },
    {
      type: `list`,
      items: [
        {
          term: `Moderne UI`,
          text: `Überarbeitete Oberfläche mit Tabler Icons, PrimeFaces 15 und Jakarta EE`,
        },
        {
          term: `Zentrale Menüverwaltung`,
          text: `Navigation, Dashboards, Links und Apps zentral verwalten, inklusive Gruppierung und Einbettung`,
        },
        {
          term: `Intelligentere Task- und Fallbearbeitung`,
          text: `Massenübertragung, überarbeitetes Abwesenheitsmanagement, Portal Chatbot, direktes Feedback, sichtbare Fall-IDs, Unterstützung von Teilfällen und Dokumenten-Upload per Drag-and-drop`,
        },
        {
          term: `Portierbarkeit der Konfiguration`,
          text: `Standardisierter JSON-Export und -Import, übersetzte Werte in mehrsprachigen benutzerdefinierten Diagrammen`,
        },
        {
          term: `Enterprise-Tauglichkeit`,
          text: `WCAG-/VPAT-Konformität, umfassendere Sicherheitsscans, verbesserte Lasttests und regelmäßige Portal-Snapshots`,
        },
        {
          term: `Für den globalen Einsatz`,
          text: `Erweiterte japanische Übersetzungen, überarbeitete Berechtigungen und Dokumentation zu Stellvertretungen`,
        },
      ],
    },
  ],
};

export default section;
