import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Inscription-Ansicht`,
  content: [
    {
      type: `paragraph`,
      text: `Die neue Inscription-Ansicht ist endlich vollständig! Sie können alle Elemente in der komplett überarbeiteten Oberfläche konfigurieren.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Überarbeitete Benutzeroberfläche`,
          text: `Freuen Sie sich auf die erneuerte Benutzeroberfläche! Dank des modernen Designs lässt sich mühelos durch Inscriptions navigieren und die Übersicht behalten. Das Update erfüllt nicht nur die Anforderungen fortgeschrittener Benutzer, sondern macht die Funktionen auch für neue Benutzer attraktiver. Das Redesign umfasst unter anderem einklappbare Abschnitte für alle Teilbereiche, aussagekräftigere Tab-Bezeichnungen und eine insgesamt übersichtlichere Oberfläche.`,
        },
        {
          term: `Browser`,
          text: `Neue Browser unterstützen die Suche nach CMS-Einträgen, DataClass-Attributen, Java-Typen und Ähnlichem. Damit lassen sich Elemente schnell und einfach konfigurieren – ganz ohne Code.`,
        },
        {
          term: `Codevervollständigung`,
          text: `Eine wichtige Neuerung dieser Version ist die Vervollständigungsliste in Script- und Codefeldern. Auf Anfrage werden jetzt automatisch mehr Funktionen, Typen und Attribute eingefügt.`,
        },
      ],
    },
  ],
  linkLabels: [`Designerhandbuch`],
};

export default section;
