import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Custom Fields`,
  anchor: `custom-fields`,
  content: [
    {
      type: `paragraph`,
      text: `Customizing a task and case list based on process data is easier than ever before. Put data in the custom field store of the task or case and it becomes automatically searchable. In addition, it can also be helpful for workflow process reporting.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Meaningful Name`,
          text: `Name the custom field as you like.`,
        },
        {
          term: `Searchable`,
          text: `You won't miss any search capabilities. Simply use <code>TaskQuery</code> and <code>CaseQuery</code> API to filter, aggregate and order by custom fields.`,
        },
        {
          term: `Strong Typing`,
          text: `All custom fields are strongly typed. You can choose between <code>STRING</code>, <code>TEXT</code>, <code>NUMBER</code> and <code>TIMESTAMP</code>.`,
        },
      ],
    },
    {
      type: `code`,
      code: `TaskQuery.create().where()
        .customField().stringField("branchOffice").isEqual("Zug")
      .and()
        .customField().numberField("creditLimit").isGreaterThan(10_000);`,
      language: `java`,
    },
    {
      type: `paragraph`,
      text: `Legacy Support: Forget the additional properties, the limited old custom fields, the strange business fields and the legacy categorization. You don't need them anymore. But we are fully backward compatible. All legacy API calls will be mapped to custom fields. All inscribed inscriptions in your project will automatically be converted.`,
    },
  ],
  links: [
    {
      label: `Public API Custom Field`,
      url: `/doc/8.0/en/public-api/ch/ivyteam/ivy/workflow/custom/field/ICustomFields.html`,
    },
    {
      label: `Public API Query`,
      url: `/doc/8.0/en/public-api/ch/ivyteam/ivy/workflow/query/TaskQuery.IFilterableColumns.html#customField--`,
    },
  ],
  images: [],
};

export default section;
