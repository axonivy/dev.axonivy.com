import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Workflow`,
  anchor: `azure`,
  content: [
    {
      type: `paragraph`,
      text: `Finally, workflow cases and tasks can have multilingual names and descriptions.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Multilingual names and descriptions of cases and tasks makes working in international companies and teams so easy`,
          text: `Use the CMS to define names and descriptions of cases and tasks. Then, configure which languages you would like to support in the engine cockpit. All names and descriptions are stored in those languages in the system database. Finally, configure the language you want to see the names and descriptions of the cases and tasks in the Axon Ivy Portal.`,
        },
        {
          term: `Custom fields are the most-used way to store business information along with your cases and tasks. Now, custom field metadata provide multilingual label and description for them`,
          text: `In Axon Ivy Portal, everywhere a custom field is used, the custom field label and description provided are displayed instead of its technical name. Also, they are used in the content assist of the case and task custom field editors.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Multilingual Cases and Tasks`,
      url: `/doc/9.4/designer-guide/how-to/workflow/cases-and-tasks.html#multilingual-name-and-description-of-cases-and-tasks`,
    },
    {
      label: `Custom Field Meta Data`,
      url: `/doc/9.4/designer-guide/how-to/workflow/custom-fields.html#meta-information`,
    },
  ],
  images: [
    `9.4/workflow/01-workflow-langauges.png`,
    `9.4/workflow/02-workflow-languages.png`,
    `9.4/workflow/03-custom-field-meta.png`,
    `9.4/workflow/04-custom-field-meta.png`,
  ],
};

export default section;
