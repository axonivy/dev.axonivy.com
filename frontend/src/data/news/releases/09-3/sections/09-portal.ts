import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Portal`,
  anchor: `portal93`,
  content: [
    {
      type: `paragraph`,
      text: `User experience is a top priority in process automation projects. That is why the Axon Ivy Portal has been massively enhanced.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Customizable Dashboard`,
          text: `End-users can choose between different layouts, enable and disable default columns and even add custom columns at will.`,
        },
        {
          term: `Default Widgets`,
          text: `Axon Ivy Portal supports a sophisticated concept featuring default widgets for Process Starts, Task Lists, and Case Lists.`,
        },
        {
          term: `Custom Widgets`,
          text: `Individuality is king. End-users can easily create custom widgets in the dashboard.`,
        },
        {
          term: `Adjustable Look for Process List`,
          text: `Switch between an image, grid, and compact mode to display available processes.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Portal New & Noteworthy`,
      url: `/doc/9.3/en/portal-guide/portal-developer-guide/introduction/index.html#new-noteworthy-9-3`,
    },
  ],
  images: [
    `9.3/portal/01-image-mode.jpg`,
    `9.3/portal/02-add-widget.png`,
    `9.3/portal/03-individual-dashboard-with-two-tasklists.png`,
    `9.3/portal/04-my-profile.png`,
    `9.3/portal/05-widget-configuration.png`,
  ],
};

export default section;
