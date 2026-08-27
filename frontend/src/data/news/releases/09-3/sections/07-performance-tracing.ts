import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Performance & Tracing`,
  anchor: `performance93`,
  content: [
    {
      type: `paragraph`,
      text: `The Engine Cockpit comes with built-in tooling to battle performance issues.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Performance`,
          text: `Identify slow external systems with the new Performance Statistic in the Engine Cockpit.`,
        },
        {
          term: `Tracing`,
          text: `Simplifies consolidating log entries over multiple services of your solution by integrating with the most common tracing tools such as W3C Trace Context, Jaeger, Zipkin and Amazon X-Ray.`,
        },
        {
          term: `Cache`,
          text: `Optimize the system database cache settings with the new Cache View in the Engine Cockpit.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Performance Statistic`,
      url: `/doc/9.3/engine-guide/tool-reference/engine-cockpit/monitor.html#engine-cockpit-monitor-performance`,
    },
    {
      label: `Tracing Tools`,
      url: `/doc/9.3/engine-guide/monitoring/logging.html#request-tracing-tools`,
    },
    {
      label: `Jaeger Tracing Example`,
      url: `https://github.com/axonivy/docker-samples/tree/master/ivy-tracing-jaeger`,
    },
    {
      label: `Cache View`,
      url: `/doc/9.3/engine-guide/tool-reference/engine-cockpit/monitor.html#cache`,
    },
  ],
  images: [
    `9.3/performance/01-performance.png`,
    `9.3/performance/02-cache.png`,
    `9.3/performance/03-log.png`,
    `9.3/performance/04-jaeger.png`,
  ],
};

export default section;
