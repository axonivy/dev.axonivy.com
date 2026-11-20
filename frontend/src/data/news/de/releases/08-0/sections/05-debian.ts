import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Debian Engine Installer`,
  content: [
    {
      type: `paragraph`,
      text: `Das Axon.ivy Engine ist jetzt als Debian-Paket verfügbar. Engine-Betreiber profitieren damit von den umfangreichen Werkzeugen der bevorzugten Plattform der meisten Cloud-Anbieter.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Einfach`,
          text: `Installieren und starten Sie das Engine mit einem Klick.`,
        },
        {
          term: `Bewährte Praxis`,
          text: `Betreiben Sie das Axon.ivy Engine als systemd-Dienst und beschränken Sie den Zugriff auf Engine- und Workflow-Anwendungsdateien.`,
        },
        {
          term: `Aktualisierbar`,
          text: `Installieren Sie die neueste Hotfix-Version ohne riskante manuelle Schritte.`,
        },
        {
          term: `Sicher`,
          text: `Ihre manuellen Änderungen an Konfigurationsdateien bleiben bei Aktualisierungen erhalten.`,
        },
        {
          term: `Benutzerfreundlich`,
          text: `Ordnen Sie Dateien gemäß der Linux-Dateisystemstruktur und verwenden Sie die vom System bereitgestellte JVM erneut.`,
        },
      ],
    },
  ],
  linkLabels: [`Debian: Erste Schritte`],
};

export default section;
