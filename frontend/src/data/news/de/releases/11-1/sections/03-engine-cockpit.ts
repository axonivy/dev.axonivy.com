import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Schöpfen Sie mit unserem neuesten Update das volle Potenzial Ihrer Engine aus! Das Engine Cockpit erhält drei völlig neue Ansichten, mit denen Sie Probleme mit Ihrer Suchmaschine, Sitzungen und Threads analysieren und beheben können. Mit diesen leistungsstarken Werkzeugen haben Sie die Kontrolle über Ihre Engine und können ihre Leistung wie nie zuvor optimieren. Probieren Sie es aus und überzeugen Sie sich selbst!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Suchmaschine`,
          text: `Durchsuchen Sie indexierte Dokumente und konfigurieren Sie Optionen in einer intuitiven Ansicht. Außerdem können Sie Ihren Index bequem an einer zentralen Stelle neu erstellen.`,
        },
        {
          term: `Threads`,
          text: `Erstellen Sie Thread-Dumps ganz einfach in einer übersichtlichen Ansicht. Erkannte Deadlocks, aktuelle Sperren und Stacktraces finden Sie an einem Ort.`,
        },
        {
          term: `Sitzungen`,
          text: `Verwalten Sie Ihre Sitzungen in einer leistungsstarken Ansicht. Sie erhalten alle nötigen Informationen, darunter Angaben zur Sitzungserstellung und Benutzerauthentifizierung.`,
        },
      ],
    },
  ],
  linkLabels: [`Engine Cockpit`],
};

export default section;
