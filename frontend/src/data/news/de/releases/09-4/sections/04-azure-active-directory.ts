import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Azure Active Directory`,
  content: [
    {
      type: `paragraph`,
      text: `Mit Azure Active Directory unterstützt Axon Ivy nun erstmals einen cloudbasierten Identity Provider. Ihre Mitarbeitenden können sich mit der vertrauten Microsoft-Anmeldung an der Axon Ivy-Plattform anmelden.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Einfache Benutzerverwaltung`,
          text: `Verwalten Sie Ihre Benutzer zentral in Azure Active Directory. Synchronisieren Sie diese einfach mit Axon Ivy und machen Sie Ihre Geschäftsprozesse sofort für die gesamte Organisation zugänglich.`,
        },
        {
          term: `Anmeldedaten`,
          text: `Mitarbeitende müssen sich keine zusätzlichen Anmeldedaten merken. Der Zugriff erfolgt einfach und sicher über die Microsoft-Anmeldung.`,
        },
        {
          term: `OAuth 2.0`,
          text: `Bei der Microsoft-Anmeldung kommt das branchenübliche OAuth-2.0-Protokoll zur Authentifizierung zum Einsatz. Axon Ivy kennt dadurch die Passwörter dieser Benutzer nicht und ermöglicht einen sicheren delegierten Zugriff.`,
        },
      ],
    },
  ],
  linkLabels: [`Azure Active Directory`],
};

export default section;
