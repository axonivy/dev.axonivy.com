import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Sofortige Bereitstellung`,
  content: [
    {
      type: `paragraph`,
      text: `Wir sind überzeugt, dass hochgradig automatisierte Bereitstellungen wichtig sind. Kunden sollen die neuesten Funktionen sofort nutzen können. Entwickler und Betriebsteams benötigen gleichzeitig großes Vertrauen in die korrekte Ausführung ihrer Laufzeitartefakte.`,
    },
    {
      type: `paragraph`,
      text: `Deshalb haben wir unsere Bereitstellungsschnittstelle erweitert:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Atomar`,
          text: `Der gesamte Funktionsumfang einer Anwendung kann auf einmal bereitgestellt werden. Legen Sie einfach eine ZIP-Datei mit mehreren Projekten derselben Anwendung im Engine-Verzeichnis <code>deploy</code> ab, und sie wird ausgerollt.`,
        },
        {
          term: `Steuerbar`,
          text: `Mit der neuen Datei für Bereitstellungsoptionen können Sie den Prozess genau abstimmen. Sie können Konfigurationsaktualisierungen erzwingen und die zu verwendende Zielversion des Process Model festlegen. Es gibt nun keine technischen Gründe mehr, Workflow-Daten in eine neue Process Model Version zu migrieren.`,
        },
        {
          term: `Selbstdokumentierend`,
          text: `Bereitstellungsoptionen können in YAML-Dateien oder Maven-Plugin-Konfigurationen gespeichert werden. Der Prozess ist damit dokumentiert, sichtbar und in jeder Umgebung reproduzierbar. Eine separate Beschreibung in einem Leitfaden ist überflüssig.`,
        },
        {
          term: `Automatisiert`,
          text: `Die Bereitstellung auf dem Engine wird über einfache Dateioperationen gesteuert. Daher lässt sich nahezu jede Skriptumgebung zur Automatisierung verwenden. Der Rollout einer neuen Anwendungsversion sollte nie mehr als einen Klick erfordern.`,
        },
        {
          term: `Über HTTP`,
          text: `Die Bereitstellung auf entfernten Engines war noch nie so einfach! Laden Sie Ihre neue Anwendung einfach per HTTP-Dateiübertragung hoch – ideal für Ihre CI/CD-Umgebung!`,
        },
      ],
    },
  ],
  linkLabels: [
    `Engine-Handbuch: Bereitstellung`,
    `Maven-Plugin`,
    `GitHub-Beispiele`,
  ],
};

export default section;
