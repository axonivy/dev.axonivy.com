import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Portal`,
  anchor: `portal`,
  paragraphs: [
    `Axon Ivy Portal 11.3 – your key to boosted productivity and seamless workflow! With an enhanced complex filter, lightning-fast search, customizable statistic charts, and real-time notifications, managing tasks and cases is effortless. Plus, now that the portal is now open source!`,
  ],
  features: [
    {
      term: `Improved Complex Filters`,
      description: `With the reinvented complex filter you can refine your task and caselist searches with ease. The new filter can combine an endless number of filter conditions. Various new filters for custom fields have been added, and even moving timeframes are now possible. So, say goodbye to endless scrolling and hello to targeted results within the task and case widget of the portal dashboard.`,
    },
    {
      term: `New Statistic Charts`,
      description: `In this release, we've overhauled and enhanced the statistics capabilities of the portal. We've introduced numerous new standard charts, and now, custom charts can also be tailored for your business users and seamlessly integrated into standard and private dashboards. Experience unparalleled performance with process data being provided through the Elasticsearch engine.`,
    },
    {
      term: `Notifications`,
      description: `Effortlessly receive real-time updates through the new Notifications in the Axon Ivy Portal. Ensuring you're always in the know about crucial tasks and project milestones. You can personalize your notification subscriptions to boost your productivity.`,
    },
    {
      term: `Quick Search & New Global Search`,
      description: `Looking for a specific task or case? We've got you covered! With the new quick search feature within the task and case widget, you'll find what you're looking for in no time. All standard fields plus the custom fields can be added to the configurable search scope, ensuring a balance between functionality and performance. Plus, we've redesigned the global search for clearer and faster results.`,
    },
    {
      term: `Portal goes Open Source`,
      description: `We're thrilled to announce that the Axon Ivy Portal is now #OpenSource! 🚀 This means that developers everywhere can dive into our powerful portal technology, explore its capabilities, and contribute to its evolution.`,
    },
    {
      term: `And much more...`,
      description: `You can now add custom case fields to your task list to display case-related information directly next to your tasks. Additionally, we've introduced the capability to define action buttons in the case list, allowing you to trigger case-related processes effortlessly. To top it off, we've enhanced the Process Information Page, improving its flexibility and multilanguage support for a better user experience.`,
    },
  ],
  links: [
    {
      label: `Portal`,
      url: `/portal/11.3/doc`,
    },
  ],
  images: [
    `11.3/portal/01-portal.png`,
    `11.3/portal/02-portal.png`,
    `11.3/portal/03-portal.png`,
    `11.3/portal/04-portal.png`,
  ],
  code_sample: null,
};

export default section;
