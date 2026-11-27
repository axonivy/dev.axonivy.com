import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Core`,
  content: [
    {
      type: `paragraph`,
      text: `Die Plattformbasis wird durch verbesserte Cloud-Funktionen, bessere Integration und zukunftsfähige Technologieaktualisierungen gestärkt:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Internationalisierung`,
          text: `Erweiterte Mehrsprachenunterstützung in der Developer Workflow UI, im Engine Cockpit, bei Benachrichtigungen und Fehlermeldungen.`,
        },
        {
          term: `Cluster-Deployment & Observability`,
          text: `Erweiterte Deployment-Optionen, bessere IdP-Unterstützung für Administratoren sowie zusätzliche Docker- und Kubernetes-Beispiele verbessern die Cloud- und Enterprise-Tauglichkeit.`,
        },
        {
          term: `Developer Workflow UI`,
          text: `Verbesserte Navigation und neue Filter erleichtern die Arbeit mit großen Projekten.`,
        },
        {
          term: `Public API & Maven-Artefakte`,
          text: `Public APIs sind jetzt als Maven-Artefakte verfügbar und vereinfachen Integration, Automatisierung und Erweiterungsentwicklung.`,
        },
        {
          term: `Datenbank, Runtime & Jakarta`,
          text: `Unterstützung für SQL Server 2025 und Windows Server 2025, Runtime-Verbesserungen und der erste Schritt in Richtung Jakarta EE sichern die langfristige Java-Kompatibilität.`,
        },
        {
          term: `Engine Cockpit`,
          text: `Der Import von SSL-Schlüsseln vereinfacht die sichere Konfiguration und reduziert den manuellen Einrichtungsaufwand.`,
        },
        {
          term: `Mail API & IIS-Skript`,
          text: `Eine neue Mail API und ein aktualisiertes IIS-Deployment-Skript vereinfachen Kommunikation und Windows-Installationen.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Cluster-Deployment`,
    `Jakarta-Migration`,
    `Engine Cockpit – SSL-Einstellungen`,
    `Mail API`,
    `IIS-Skript`,
  ],
};

export default section;
