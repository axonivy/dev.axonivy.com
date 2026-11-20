import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Axon Ivy Portal`,
  content: [
    {
      type: `paragraph`,
      text: `Verbessern Sie Ihr Dashboard-Erlebnis mit unseren neuesten Funktionen und steigern Sie Ihre Produktivität. Probieren Sie sie gleich aus und überzeugen Sie sich selbst.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Das neue News-Widget für Portal-Dashboards`,
          text: `Bleiben Sie auf einen Blick über die neuesten Funktionen und Updates in Ihrer Organisation oder Lösung informiert. Mit unserem News-Widget lassen sich neue Funktionen einfacher denn je veröffentlichen, damit Ihr Team mühelos auf dem Laufenden bleibt.`,
        },
        {
          term: `Verbesserte Anpassungsfähigkeit des Dashboards`,
          text: `Außerdem haben wir die Anpassungsfähigkeit unserer Dashboard-Widgets verbessert. Ob Desktop, Laptop, Tablet oder Smartphone – unsere Widgets sehen auf allen Bildschirmgrößen und Geräten gut aus.`,
        },
        {
          term: `Erweiterte externe Links`,
          text: `Benutzer können jetzt externe Verweise auf andere Werkzeuge abhängig von Berechtigungen konfigurieren und sie mit einem passenden Symbol zum Dashboard hinzufügen. So greifen Sie ganz einfach zentral auf alle benötigten Werkzeuge und Ressourcen zu.`,
        },
      ],
    },
    { type: `paragraph`, text: `Und vieles mehr:` },
    {
      type: `list`,
      items: [
        {
          text: `Passen Sie Ihre Widgets mit HTML-Snippets und CSS noch individueller an. Gestalten Sie Ihr Dashboard passend zu Ihren Anforderungen und Ihrem Stil.`,
        },
        {
          text: `Profitieren Sie dank Leistungsoptimierungen für Aufgaben- und Fall-Widgets sowie das Prozessstart-Widget von schnellerer und flüssigerer Bedienung. Greifen Sie schnell und einfach auf Ihre Daten und Informationen zu.`,
        },
        {
          text: `Migrieren Sie Ihre Dashboard-Konfigurationen künftig ganz einfach: Eine Dashboard-JSON-Version unterstützt zukünftige automatische Migrationen.`,
        },
        {
          text: `Verwenden Sie HTML in Aufgaben- und Fallbeschreibungen, um Formatierungen hinzuzufügen und die Beschreibungen informativer und ansprechender zu gestalten.`,
        },
      ],
    },
  ],
  linkLabels: [`Portal`],
};

export default section;
