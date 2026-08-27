import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Slow Requests and Traffic Graph`,
  anchor: `tracing`,
  content: [
    {
      type: `paragraph`,
      text: `It is key for an orchestration platform like Axon Ivy to provide tools to analyze problems. The new Slow Requests and Traffic Graph views in the Engine Cockpit provide you with all the information you need to find the sources of trouble in your orchestrated solution.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Slow Requests`,
          text: `Have a look at the slowest requests. Dive into a request and see which systems are called by it.`,
        },
        {
          term: `Traffic Graph`,
          text: `Gives you an overview of all incoming and outgoing traffic. You see in one graph which system returns errors or is slow in answering requests.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Slow Requests`,
      url: `/doc/9.4/engine-guide/tool-reference/engine-cockpit/monitor.html#slow-requests`,
    },
    {
      label: `Traffic Graph`,
      url: `/doc/9.4/engine-guide/tool-reference/engine-cockpit/monitor.html##traffic-graph`,
    },
  ],
  images: [
    `9.4/tracing-system-overview/01-slow-requests.png`,
    `9.4/tracing-system-overview/02-traffic-graph.PNG`,
  ],
};

export default section;
