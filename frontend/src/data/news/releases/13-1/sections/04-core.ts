import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Core`,
  anchor: `core`,
  paragraphs: [`Roles and Users Responsible for Task and Process Starts:`],
  features: [
    {
      term: `Start Roles`,
      description: `you can now configuree multiple roles on a start element, allowing any of them to start the corresponding process.`,
    },
    {
      term: `Task Responsibles`,
      description: `Tasks can now be assigned to multiple roles and users simultaneously. There's no longer a need to create temporary dynamic roles just to assign a task to multiple entities.`,
    },
    {
      term: `Task Lists`,
      description: `Both the Portal and Developer Workflow UI now display all responsible users and roles for each task in the task list.`,
    },
    {
      term: `Responsibles API`,
      description: `New APIs are available to manage and query the multiple roles and users assigned to tasks.`,
    },
    {
      term: `Performance`,
      description: `The Axon Ivy System Database schema has been optimized, and the implementations of TaskQuery and CaseQuery have been improved—resulting in significantly faster query response times.`,
    },
  ],
  links: [
    {
      label: `Start Roles`,
      url: `/doc/13.1/designer-guide/process-modeling/process-elements/start.html#request-tab`,
    },
  ],
  images: [
    `13.1/core/01-request-start-tab-request.png`,
    `13.1/core/02-task-switch-gateway-tab-task.png`,
    `13.1/core/03-task-list.png`,
    `13.1/core/04-task-detail.png`,
  ],
  code_sample: null,
};

export default section;
