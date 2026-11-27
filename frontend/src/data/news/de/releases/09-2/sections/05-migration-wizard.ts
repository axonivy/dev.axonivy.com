import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Migration Wizard`,
  content: [
    {
      type: `paragraph`,
      text: `Axon.ivy Engines aktuell, stabil und vor Sicherheitslücken geschützt zu halten, war noch nie so einfach. Der neue Migration Wizard richtet in wenigen Sekunden ein neues Engine ein und übernimmt dafür Konfiguration und Daten eines zuvor installierten Engine.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Hotfix-Aktualisierung`,
          text: `Aufwendige Aktualisierungen auf das neueste Engine gehören der Vergangenheit an. Laden Sie einfach ein neues Engine herunter, entpacken und starten Sie es, führen Sie den Migration Wizard aus – fertig.`,
        },
        {
          term: `Geführte Aktualisierung`,
          text: `Wir übernehmen die besten Einstellungen Ihrer bestehenden Konfiguration und wenden Formatänderungen an den Konfigurationsdateien automatisch an.`,
        },
        {
          term: `Entscheidung durch Benutzer`,
          text: `In manchen Migrationsszenarien hängt die beste Konfigurationsaktualisierung von Ihrer laufenden Anwendung ab. Bei wichtigen Änderungen bitten wir Sie um Zustimmung oder eine Entscheidung. Eine übersichtliche Konfigurations-Diff-Ansicht unterstützt Sie dabei.`,
        },
        {
          term: `Kompakte Dokumentation`,
          text: `Die Migration Notes enthalten jetzt Tags, die die Zielgruppe einer Änderung angeben. So erkennen Sie relevante Migrationsaufgaben leichter und können die übrigen Abschnitte weitgehend überspringen.`,
        },
        {
          term: `Hauptversionsupdate`,
          text: `Auch die Migration von einer Hauptversion (z. B. 8.0.4 LTS) auf eine neuere Version (z. B. 9.2.0 LE) wird unterstützt. Alle erforderlichen Konfigurationsänderungen werden abhängig von der Ausgangs- und Zielversion erzwungen und ausgewählt.`,
        },
      ],
    },
  ],
  linkLabels: [`Migration Wizard – Dokumentation`],
};

export default section;
