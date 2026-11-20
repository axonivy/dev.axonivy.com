import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Inscription-Ansicht (Vorschau)`,
  content: [
    {
      type: `paragraph`,
      text: `Wir stellen unseren neuen webbasierten Inscription-Editor vor – das erste von vielen spannenden Updates! Verabschieden Sie sich von der alten SWT-basierten Software und erleben Sie die Zukunft der Inscription-Bearbeitung. Auch wenn noch nicht alle Konfigurationen unterstützt werden, gibt dieses leistungsstarke Werkzeug einen Vorgeschmack auf das, was kommt. Die Entwicklung geht weiter und die Möglichkeiten sind vielfältig. Nutzen Sie diesen spannenden Ausblick auf die Zukunft der Inscription-Bearbeitung und probieren Sie das Werkzeug noch heute aus!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Browserkompatibel`,
          text: `Die neue Inscription-Ansicht basiert auf nativen Webtechnologien.`,
        },
        {
          term: `Ansicht`,
          text: `Als Ansicht implementiert, macht unser Werkzeug Popup-Dialoge überflüssig und aktualisiert den Inhalt dynamisch, wenn Sie andere Elemente auswählen.`,
        },
        {
          term: `Sofortiges Feedback`,
          text: `Neue Technologie, schnelleres Feedback – unser Ziel ist es, Ihr Benutzererlebnis zu verbessern.`,
        },
        {
          term: `IvyScript-Editor`,
          text: `Erleben Sie IvyScript neu: mit dem Monaco-Editor, automatischer Vervollständigung und einer verbesserten Schreiboberfläche.`,
        },
      ],
    },
  ],
  linkLabels: [`Designerhandbuch`],
};

export default section;
