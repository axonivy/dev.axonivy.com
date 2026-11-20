import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Public API`,
  content: [
    {
      type: `paragraph`,
      text: `Dank zwanzig Jahren Projekterfahrung wissen wir, was Kunden von einer leistungsstarken Plattform zur Prozessautomatisierung erwarten. Die neu hinzugefügte API macht Ihnen die Arbeit noch leichter.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `<a href="/doc/9.3/en/public-api/ch/ivyteam/ivy/security/ISecurity.html">ISecurity</a>`,
          text: `<code>ivy.security</code> und <code>Ivy.security()</code> bieten zahlreiche Methoden zur Verwaltung von Benutzern, Rollen, Sicherheitsmitgliedern und Sitzungen.`,
        },
        {
          term: `<a href="/doc/9.3/en/public-api/ch/ivyteam/ivy/security/IRoleMatcher.html">IRoleMatcher</a>`,
          text: `Prüfen Sie einfach, ob der Benutzer der aktuellen Sitzung eine bestimmte Rolle besitzt. Die API ist für eine Sitzung und einen Benutzer verfügbar. Neue API-Methoden akzeptieren außerdem einen Rollennamen anstelle einer Rolleninstanz.`,
        },
        {
          term: `<a href="/doc/9.3/en/public-api/ch/ivyteam/ivy/security/exec/Sudo.html">Sudo</a>`,
          text: `Deaktiviert die Berechtigungsprüfung während der Ausführung von Code.`,
        },
        {
          term: `IvyRuntime`,
          text: `Stellt Informationen zur Laufzeitumgebung (Designer oder Engine) und zur aktuellen Version bereit.`,
        },
        {
          term: `<a href="/doc/9.3/en/public-api/ch/ivyteam/ivy/business/data/store/search/BooleanFieldOperation.html">BooleanFieldOperation</a>`,
          text: `Filtert Geschäftsdaten anhand boolescher Felder.`,
        },
        {
          term: `<a href="/doc/9.3/en/public-api/ch/ivyteam/ivy/workflow/businesscase/IBusinessCase.html#getStartedFrom()">IBusinessCase</a>`,
          text: `Eine neue Methode zeigt, wie ein Business Case gestartet wurde – entweder über einen Prozessstart oder einen Case-Map-Start.`,
        },
      ],
    },
  ],
  linkLabels: [`Public API`],
};

export default section;
