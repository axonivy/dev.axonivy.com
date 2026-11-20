import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Benutzerdefinierte Felder`,
  content: [
    {
      type: `paragraph`,
      text: `Auf Basis von Prozessdaten Aufgaben- und Case-Listen anzupassen ist jetzt einfacher denn je. Speichern Sie Daten im benutzerdefinierten Feldspeicher der Aufgabe oder des Case, damit sie automatisch durchsuchbar sind. Das kann auch bei der Berichterstellung zu Workflow-Prozessen hilfreich sein.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Aussagekräftiger Name`,
          text: `Benennen Sie das benutzerdefinierte Feld nach Ihren Wünschen.`,
        },
        {
          term: `Durchsuchbar`,
          text: `Sie müssen auf keine Suchmöglichkeiten verzichten. Verwenden Sie einfach die APIs <code>TaskQuery</code> und <code>CaseQuery</code>, um benutzerdefinierte Felder zu filtern, zu aggregieren und zu sortieren.`,
        },
        {
          term: `Stark typisiert`,
          text: `Alle benutzerdefinierten Felder sind stark typisiert. Sie können zwischen <code>STRING</code>, <code>TEXT</code>, <code>NUMBER</code> und <code>TIMESTAMP</code> wählen.`,
        },
      ],
    },
    {
      type: `code`,
      code: `TaskQuery.create().where()
        .customField().stringField("branchOffice").isEqual("Zug")
      .and()
        .customField().numberField("creditLimit").isGreaterThan(10_000);`,
      language: `java`,
    },
    {
      type: `paragraph`,
      text: `Unterstützung für ältere Versionen: Vergessen Sie zusätzliche Eigenschaften, die eingeschränkten alten benutzerdefinierten Felder, die ungewöhnlichen Geschäftsfelder und die veraltete Kategorisierung. Sie benötigen sie nicht mehr. Wir sind vollständig abwärtskompatibel: Alle bisherigen API-Aufrufe werden benutzerdefinierten Feldern zugeordnet. Sämtliche Eingaben in Ihrem Projekt werden automatisch konvertiert.`,
    },
  ],
  linkLabels: [`Public API: Benutzerdefinierte Felder`, `Public API: Abfragen`],
};

export default section;
