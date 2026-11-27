import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `CMS`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben das Content-Management-System (kurz CMS) vollständig erneuert. Das interne Konzept wurde grundlegend verändert. Das Ergebnis ist ein schlankes CMS mit zahlreichen neuen Funktionen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Schlank und effizient`,
          text: `Weniger Dateien sorgen für eine bessere Leistung in der täglichen Entwicklung und zur Laufzeit in der Axon Ivy Engine.`,
        },
        {
          term: `Standardisiert`,
          text: `Das CMS verwendet jetzt kein proprietäres Format mehr. Dateien und Ordner bilden die CMS-Struktur eins zu eins ab.`,
        },
        {
          term: `cms.yaml`,
          text: `Alle Texte befinden sich jetzt in einer einzigen Datei: <code>cms.yaml</code>. Ein- und mehrzeilige Texte werden nicht mehr unterschiedlich behandelt.`,
        },
        {
          term: `Beliebige Dateien`,
          text: `Jetzt werden alle Dateitypen standardmäßig unterstützt.`,
        },
        {
          term: `Änderungen zur Laufzeit`,
          text: `Mit dem Application CMS lässt sich das CMS jetzt zur Laufzeit anpassen.`,
        },
      ],
    },
  ],
  linkLabels: [`CMS im Designerhandbuch`],
};

export default section;
