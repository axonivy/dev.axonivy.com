import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Engine Cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `Das Cockpit bietet neue Funktionen, die den sicheren Betrieb vereinfachen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Binärdateien`,
          text: `Der Config File Editor zeigt jetzt auch binäre Schlüssel- und Truststore-Dateien an. Mit der neuen Funktion zum Herunter- und Hochladen können Sie die Dateien lokal mit einem Werkzeug Ihrer Wahl bearbeiten und die geänderte Version anschließend wieder bereitstellen.`,
        },
        {
          term: `TLS-Tester`,
          text: `Sichere TLS-Verbindungen von der Engine zu entfernten Diensten lassen sich jetzt direkt im Cockpit testen. Die unterstützten Cipher und verwendeten Zertifikate werden angezeigt. Die Funktion ist nicht nur für REST- und SOAP-Webservices, sondern auch für LDAPS-Verbindungen verfügbar.`,
        },
        {
          term: `Konfiguration im Fokus`,
          text: `Um die Konfiguration von HTTP-Connectors zu vereinfachen, haben wir die Dokumentation zu den konfigurierbaren Eigenschaften in den System Configuration Editor integriert. Standardwerte, ausführliche Beschreibungen und gültige Beispiele helfen Ihnen, sich im Cockpit ganz auf die Konfiguration zu konzentrieren und alle Informationen im Blick zu behalten.`,
        },
      ],
    },
  ],
  linkLabels: [`Engine Cockpit`],
};

export default section;
