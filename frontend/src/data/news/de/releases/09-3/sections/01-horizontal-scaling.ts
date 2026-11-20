import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `Horizontale Skalierung`,
  content: [
    {
      type: `paragraph`,
      text: `Skalieren Sie Ihr Axon Ivy Engine im Gleichschritt mit Ihrem Geschäft.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Cloud-nativ`,
          text: `Skalieren Sie das Axon Ivy Engine horizontal mit dem Cloud-Anbieter Ihrer Wahl. Starten Sie bei Bedarf neue Instanzen, um die aktuelle Auslastung Ihrer Clients abzudecken.`,
        },
        {
          term: `Cluster-Nodes`,
          text: `Zeigen Sie den Status der Cluster-Nodes Ihres Axon Ivy Engine im Engine Cockpit an.`,
        },
        {
          term: `Projekt-Image`,
          text: `Packen Sie Ihre Projekte zusammen mit dem Axon Ivy Engine in ein Projekt-Container-Image. Erstellen Sie anschließend Ihr eigenes Kubernetes-Deployment, indem Sie es mit allen zugehörigen Services bündeln.`,
        },
        {
          term: `Kontinuierliche Bereitstellung`,
          text: `Rollen Sie neue Releases regelmäßig und frühzeitig für eine ausgewählte Benutzergruppe aus. Nutzen Sie bewährte Bereitstellungsszenarien wie Blue-Green-Deployments, A/B-Tests und Canary-Releases.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Engine-Handbuch`,
    `HAProxy-Skalierungsbeispiel`,
    `Nginx-Skalierungsbeispiel`,
  ],
};

export default section;
