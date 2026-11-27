import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Axon Ivy Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Das Portal-Team hat intensiv daran gearbeitet, Ihnen eine bessere Benutzererfahrung zu bieten. Neu unterstützt werden:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Passwort vergessen`,
          text: `Setzen Sie Ihr Passwort einfach mit der neuen integrierten Funktion auf dem Anmeldebildschirm zurück.`,
        },
        {
          term: `Vereinfachter Export von Aufgaben und Cases`,
          text: `Aufgaben und Cases lassen sich jetzt noch einfacher und flexibler exportieren.`,
        },
        {
          term: `Neugestaltete Prozessliste`,
          text: `Das neue Rasterlayout bietet eine frische Übersicht über die verfügbaren Prozesse.`,
        },
        {
          term: `Konfigurierbare Detailseiten`,
          text: `Die Detailseiten für Aufgaben und Cases lassen sich jetzt ohne eine einzige Zeile Code an Ihre Anforderungen anpassen.`,
        },
        {
          term: `Erweiterte benutzerspezifische Einstellungen`,
          text: `Das Portal bietet jetzt noch mehr Möglichkeiten zur Anpassung an Ihre Wünsche und Vorlieben. Werfen Sie einen Blick auf die neuen Einstellungen im Bereich Mein Profil.`,
        },
      ],
    },
  ],
  linkLabels: [`Neues und Wissenswertes zum Portal`],
};

export default section;
