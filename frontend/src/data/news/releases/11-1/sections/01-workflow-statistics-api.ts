import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Workflow Statistic API`,
  anchor: `workflowStatistic`,
  content: [
    {
      type: `paragraph`,
      text: `Introducing our latest addition to workflow statistics - a blazing-fast REST API that provides valuable insights into your business processes. Here are some of the key features:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `REST API`,
          text: `Access the REST API from anywhere you need it, with an OpenAPI specification that makes it easy to integrate into your workflows.`,
        },
        {
          term: `Fast`,
          text: `Enjoy lightning-fast performance thanks to our Elasticsearch-based statistics generation, which can aggregate data in milliseconds.`,
        },
        {
          term: `Complex`,
          text: `Get detailed insights into your tasks and cases with complex clustering and metric options, including sum, average, max, min, and count.`,
        },
        {
          term: `Full-featured`,
          text: `Take advantage of full-featured cases and tasks with custom fields to get the insights you need to optimize your workflows.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Upgrade your workflow statistics today with our powerful REST API, and start enjoying faster, more complex, and more fully featured insights into your business processes.`,
    },
  ],
  links: [
    {
      label: `Open API Specification`,
      url: `/api-browser?configUrl=https%3A%2F%2Fdeveloper.axonivy.com%2Fdoc%2F11.1%2Fopenapi%2Fconfig.json&urls.primaryName=default`,
    },
  ],
  images: [`11.1/workflow-statistics/01-workflow-statistic.png`],
};

export default section;
