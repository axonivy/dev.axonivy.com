import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Native Entwicklung auf MAC und GTK3`,
  content: [
    {
      type: `paragraph`,
      text: `Führen Sie den Axon.ivy Designer mit dem Betriebssystem aus, das Sie am besten kennen und am liebsten verwenden.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `MAC Designer`,
          text: `Wir veröffentlichen den ersten nativen Axon.ivy Designer für Mac OS X. Digitalisieren Sie Ihr Geschäft jetzt auf einem Mac, ohne ein virtualisiertes Betriebssystem starten zu müssen.`,
        },
        {
          term: `Linux GTK3`,
          text: `Der neueste Designer wurde für die beliebtesten Desktop-Umgebungen unter Linux optimiert. Dadurch konnten wir den integrierten Browser aktualisieren und wesentlich genauere Ergebnisse bei modernem CSS und JavaScript erzielen.`,
        },
        {
          term: `Process Editor`,
          text: `Viele neue native UI-Komponenten sind jetzt auf allen Plattformen verfügbar: Kontextmenü und Inscription-Masken.`,
        },
        {
          term: `Html Dialog Editor`,
          text: `Die strikte Kopplung an den JavaFX-basierten WYSIWYG-Editor wurde aufgehoben, sodass der Editor auf allen Plattformen läuft.`,
        },
      ],
    },
  ],
};

export default section;
