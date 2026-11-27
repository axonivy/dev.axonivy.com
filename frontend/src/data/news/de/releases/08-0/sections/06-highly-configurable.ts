import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Hochgradig konfigurierbar`,
  content: [
    {
      type: `paragraph`,
      text: `Die erfolgreiche Bereitstellung Ihrer Anwendung in der Umgebung Ihrer Kunden ist jetzt einfacher denn je. Manuelle Installationen und die dazugehörige umfangreiche Dokumentation gehören der Vergangenheit an!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Dateien`,
          text: `Die gesamte Konfiguration eines Axon.ivy Engine wird nun in einfachen, menschenlesbaren <code>YAML</code>-Dateien gespeichert. Mit einer <code>ivy.yaml</code>-Datei lässt sich die komplette Konfiguration der aktuellen Engine-Umgebung einfach dokumentieren.`,
        },
        {
          term: `Keine Dokumentation nötig`,
          text: `Früher musste die Installation eines Axon.ivy Engine dokumentiert werden, weil sich bestimmte Einstellungen (z. B. das Sicherheitssystem) nur über die Admin UI konfigurieren ließen. Jetzt dient die <code>ivy.yaml</code>-Datei als Systemdokumentation.`,
        },
        {
          term: `Überschreibbar`,
          text: `Konfigurationen lassen sich jederzeit mit Umgebungsvariablen überschreiben. Das ist besonders in Container-Umgebungen nützlich.`,
        },
        {
          term: `Nachvollziehbar`,
          text: `Konfigurationsänderungen werden protokolliert und zeigen, was und wo geändert wurde. Das hilft bei der Überprüfung von Änderungen und bei der Fehlersuche nach einer Änderung.`,
        },
      ],
    },
    {
      type: `code`,
      code: `# sample ivy.yaml with some often used entries defined
SystemDb:
  Url: jdbc:mariadb://myDbHost:3306/AxonIvySystemDatabase
  UserName: root
  Password: 1234
Administrators:
  admin:
    Password: "\${hash:1234}"
    Email: info@localhost
  devop:
    Password: "\${hash:4321}"
    Email: dev@axonivy.com
EMail:
  Server:
  Host: smtp.gmail.com
  Port: 25
Frontend:
  HostName: workflow.acme.com
  Port: 80`,
      language: `yaml`,
    },
  ],
  linkLabels: [
    `Engine-Handbuch: Konfiguration`,
    `Referenz der Konfigurationsdateien`,
  ],
};

export default section;
