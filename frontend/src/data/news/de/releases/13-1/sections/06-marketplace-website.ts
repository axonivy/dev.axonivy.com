import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Marketplace-Website`,
  content: [
    {
      type: `list`,
      items: [
        {
          term: `Rollenkonzept für die Marketplace-Community`,
          text: `Wir haben ein Rollenkonzept eingeführt, das klare Verantwortlichkeiten für die Zusammenarbeit in der Community schafft: **OWNER, CODEOWNER, and CONTRIBUTOR** – weitere Informationen finden Sie <a href="https://github.com/axonivy-market/market/wiki">hier</a>.`,
        },
        {
          term: `Deutsche Übersetzungen`,
          text: `Wir haben deutsche Übersetzungen für die neue <a href="https://github.com/axonivy-market/market/wiki">Market-Website</a> sowie für den Beschreibungsbereich jedes Connectors bereitgestellt.`,
        },
        {
          term: `Umgang mit veralteten Market-Extensions`,
          text: `Veraltete Extensions werden im Feld „Compatibility“ jetzt ohne Pluszeichen angezeigt.`,
        },
        {
          term: `Verbesserte Sucherfahrung`,
          text: `Die Suche auf der Website wurde verbessert.`,
        },
        {
          term: `Freigabeschritt für Feedback-Kommentare`,
          text: `Für das Feedback-Management der Connectors wird ein neuer Freigabeprozess eingeführt.`,
        },
      ],
    },
  ],
  linkLabels: [`Axon Ivy Market`],
};

export default section;
