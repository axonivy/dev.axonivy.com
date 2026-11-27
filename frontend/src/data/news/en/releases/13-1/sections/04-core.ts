import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Core`,
  anchor: `core`,
  content: [
    {
      type: `paragraph`,
      text: `Roles and Users Responsible for Task and Process Starts:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Start Roles`,
          text: `you can now configuree multiple roles on a start element, allowing any of them to start the corresponding process.`,
        },
        {
          term: `Task Responsibles`,
          text: `Tasks can now be assigned to multiple roles and users simultaneously. There's no longer a need to create temporary dynamic roles just to assign a task to multiple entities.`,
        },
        {
          term: `Task Lists`,
          text: `Both the Portal and Developer Workflow UI now display all responsible users and roles for each task in the task list.`,
        },
        {
          term: `Responsibles API`,
          text: `New APIs are available to manage and query the multiple roles and users assigned to tasks.`,
        },
        {
          term: `Performance`,
          text: `The Axon Ivy System Database schema has been optimized, and the implementations of TaskQuery and CaseQuery have been improved—resulting in significantly faster query response times.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Start Roles`,
      url: `/doc/13.1/designer-guide/process-modeling/process-elements/start.html#request-tab`,
    },
    {
      label: `Task Responsibles`,
      url: `/doc/13.1/en/designer-guide/process-modeling/process-elements/task-switch-gateway.html#tasks-tab`,
    },
    {
      label: `Task Responsibles API`,
      url: `/public-api/13.1/ch/ivyteam/ivy/workflow/task/responsible/Responsibles.html`,
    },
  ],
  images: [
    `13.1/core/01-request-start-tab-request.png`,
    `13.1/core/02-task-switch-gateway-tab-task.png`,
    `13.1/core/03-task-list.png`,
    `13.1/core/04-task-detail.png`,
  ],
};

export default section;
