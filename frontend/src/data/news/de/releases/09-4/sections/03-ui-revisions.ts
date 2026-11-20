import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Überarbeitung der Benutzeroberfläche`,
  content: [
    {
      type: `paragraph`,
      text: `Wir haben das allgemeine Erscheinungsbild mit einer neuen PrimeFaces-Version, einem neuen Standard-Theme und einer völlig neuen Möglichkeit zur Anpassung einer Axon Ivy Engine an Ihr Unternehmen überarbeitet.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `PrimeFaces 11`,
          text: `Wir sind von PrimeFaces 7 auf 11 aktualisiert und bieten damit zahlreiche neue und überarbeitete Widgets. Beachten Sie unseren separaten <a href="/doc/9.4/en/axonivy/migration/migration-notes-94.html#primefaces-11">PrimeFaces-Migrationsleitfaden</a>.`,
        },
        {
          term: `Freya-Theme`,
          text: `Wir stellen außerdem das <a href="https://primeui.store/templates/vue/freya">Freya-Theme</a> als neues Standard-Theme für Ihre HTML-Dialoge bereit. Sein frisches Erscheinungsbild unterstützt auch den Dark Mode. Selbstverständlich haben wir die <code>Dev-Workflow-UI</code> und das <code>Engine Cockpit</code> ebenfalls auf dieses neue Theme umgestellt.`,
        },
        {
          term: `Branding`,
          text: `Es gibt eine völlig neue Möglichkeit, eine Axon Ivy Engine <a href="/doc/9.4/en/designer-guide/user-interface/branding/index.html">mit den Farben und dem Logo Ihres Unternehmens zu versehen</a> – ganz ohne Änderungen am Standard des <code>Axon Ivy Portal</code>.`,
        },
      ],
    },
  ],
  linkLabels: [`PF 11 – Migrationshinweise`, `Freya-Theme`, `Branding`],
};

export default section;
