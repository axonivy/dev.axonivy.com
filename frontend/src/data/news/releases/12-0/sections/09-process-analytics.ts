import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Process Analytics`,
  anchor: `process-analytics`,
  content: [
    {
      type: `paragraph`,
      text: `We can now visualize the usage of your processes, making it easier for you to identify bottlenecks and determine the key influencing factors.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `KPI`,
          text: `It is possible to analyse the frequency and duration of a process run.`,
        },
        {
          term: `Timeintervall`,
          text: `You can specify the time interval for which the evaluation should be performed.`,
        },
        { term: `Custom Filter`, text: `You can filter the data` },
        {
          term: `Export`,
          text: `You can analyze the data according to custom filters for each specific process, such as filtering by Legal Entities, Department, or similar criteria—depending on what is available for the respective process.`,
        },
      ],
    },
  ],
  links: [],
  images: [`12.0/process-analytics/01-process-analytics.png`],
};

export default section;
