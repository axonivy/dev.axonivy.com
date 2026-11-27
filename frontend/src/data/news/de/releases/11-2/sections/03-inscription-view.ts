import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Inscription-Ansicht (Beta)`,
  content: [
    {
      type: `paragraph`,
      text: `Wir sind der Fertigstellung unserer neuen webbasierten Inscription-Ansichten einen Schritt näher gekommen! Wir haben die Standard-Inscriptions der alten SWT-basierten Software ersetzt und bringen die Zukunft der Inscription-Bearbeitung direkt zu Ihnen. Neben neuen Funktionen haben wir die Ansicht vollständig in den Prozesseditor integriert und die Benutzeroberfläche sowie das Benutzererlebnis umfassend überarbeitet.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Integration in den Prozesseditor`,
          text: `Die neue Inscription-Ansicht ist vollständig in den bestehenden Prozesseditor integriert und bietet so ein optimales Benutzererlebnis. Sie ist als Seitenleiste umgesetzt: Ein Doppelklick auf ein Element öffnet sie, und bei jeder weiteren Auswahl wird die Ansicht aktualisiert.`,
        },
        {
          term: `Schneller`,
          text: `Die neue Benutzeroberfläche lädt alle Daten und Zusatzinformationen verzögert, um die Ladezeit zu verkürzen.`,
        },
        {
          term: `Rückgängig`,
          text: `Wenn Sie Änderungen rückgängig machen möchten, können Sie mit einem Klick einen ganzen Abschnitt zurücksetzen.`,
        },
        {
          term: `Validierungen`,
          text: `Validierungsmeldungen erscheinen jetzt direkt beim jeweiligen Konfigurationseingabefeld. So erkennen Sie leichter, was an welcher Stelle nicht stimmt.`,
        },
        {
          term: `Überarbeitete Benutzeroberfläche`,
          text: `Wir haben die Inscription-Ansicht umfassend überarbeitet, damit Sie Ihre Konfigurationen besser im Überblick behalten.`,
        },
      ],
    },
  ],
  linkLabels: [`Designerhandbuch`],
};

export default section;
