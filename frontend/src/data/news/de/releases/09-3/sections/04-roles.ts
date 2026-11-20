import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Rollenbasierte Willkommensseite`,
  content: [
    {
      type: `paragraph`,
      text: `Die überarbeitete Willkommensseite des Designer unterstützt Sie dabei, den Arbeitsbereich entsprechend Ihrer Rolle einzurichten.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Einfach zugänglich`,
          text: `Ein übersichtlicher, schlanker Funktionsumfang ermöglicht neuen Benutzern einen schnellen Einstieg in die erste Prozessmodellierung.`,
        },
        {
          term: `Erweiterte Aktionen`,
          text: `Tester und Entwickler verlieren keine Funktionen und erhalten schnellen Zugriff auf erweiterte Funktionen.`,
        },
        {
          term: `Projektfilter`,
          text: `Inhalte im Projektbaum werden entsprechend Ihrer Rolle gefiltert – entweder zur Verringerung der Komplexität oder für den Zugriff auf erweiterte Konfigurationen und Inhalte. Sie können jederzeit zu einem anderen Filtersatz wechseln.`,
        },
      ],
    },
  ],
  linkLabels: [`Designer-Handbuch`],
};

export default section;
