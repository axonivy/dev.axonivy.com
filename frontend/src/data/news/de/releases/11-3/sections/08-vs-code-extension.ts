import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Visual Studio Code Designer Extension (Alpha) 🧪`,
  content: [
    {
      type: `paragraph`,
      text: `Wir unternehmen die ersten vielversprechenden Erkundungsschritte auf dem Weg zu einer webbasierten IDE.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Visual Studio Code`,
          text: `Wir veröffentlichen das erste einfache Citizen-Developer-Toolset für Visual Studio Code als Extension. Die endgültige Laufzeitumgebung steht noch nicht fest, doch Visual Studio Code scheint eine sehr vielversprechende Basis für den Designer der Zukunft zu sein.`,
        },
        {
          term: `Editoren`,
          text: `Wichtige Editoren für Variablen, Formulare und Prozesse wurden für die native Ausführung im Browser entwickelt. Daher haben wir diese Editoren bereits in unsere Designer-Extensions integriert. So steht experimentierfreudigen Anwendern schon früh derselbe Funktionsumfang wie im klassischen Eclipse Designer zur Verfügung.`,
        },
        {
          term: `Ansichten`,
          text: `Mit unserer benutzerdefinierten Projects-Ansicht und den integrierten Browsern bieten wir bereits eine geeignete Umgebung, um erste Projekte zu erstellen und Prozessabläufe zu simulieren.`,
        },
        {
          term: `Workspaces`,
          text: `Bei der Erkundung von Dev Containers haben wir festgestellt, dass sich damit komplexe Workspace-Konfigurationen einfach und leistungsstark gemeinsam nutzen lassen. Entwickler können sofort loslegen, ohne manuelle Einrichtungsschritte ausführen zu müssen.`,
        },
        {
          term: `Cloud-fähig`,
          text: `Mit GitHub Codespaces läuft der Designer nativ in der Cloud. So können wir Prozesse überall in kürzester Zeit erstellen.`,
        },
      ],
    },
  ],
  linkLabels: [`VS Marketplace`],
};

export default section;
