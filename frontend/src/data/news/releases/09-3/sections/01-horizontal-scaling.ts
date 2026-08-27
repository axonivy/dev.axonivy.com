import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Horizontal Scaling`,
  anchor: `scaling`,
  content: [
    {
      type: `paragraph`,
      text: `Scale your Axon Ivy Engine as your business does.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Cloud native`,
          text: `Use the cloud provider of your choice to scale Axon Ivy Engine horizontally. Start new instances on demand to match the current load of your clients.`,
        },
        {
          term: `Cluster Nodes`,
          text: `View the state of your Axon Ivy Engine cluster nodes in the Engine Cockpit.`,
        },
        {
          term: `Project Image`,
          text: `Put your projects together with the Axon Ivy Engine into a project container image. Then, build your own Kubernetes deployment by bundling it with all surrounding services.`,
        },
        {
          term: `Continues Deployment`,
          text: `Rollout new release frequently and early to a selected user group. Apply mature deployment scenarios such as Blue Green Deployments, A/B Testing, Canary releases.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/9.3/engine-guide/integration/cluster/index.html`,
    },
    {
      label: `HAProxy Scaling Example`,
      url: `https://github.com/axonivy/docker-samples/tree/master/ivy-scaling-haproxy`,
    },
    {
      label: `Nginx Scaling Example`,
      url: `https://github.com/axonivy/docker-samples/tree/master/ivy-scaling-nginx`,
    },
  ],
  images: [
    `9.3/scaling/01-cluster.png`,
    `9.3/scaling/02-project-image.png`,
    `9.3/scaling/03-scaling-haproxy.png`,
    `9.3/scaling/04-scaling-nginx.png`,
  ],
};

export default section;
