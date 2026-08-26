import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Custom Fields`,
  anchor: `custom-fields`,
  paragraphs: [
    `Customizing a task and case list based on process data is easier than ever before. Put data in the custom field store of the task or case and it becomes automatically searchable. In addition, it can also be helpful for workflow process reporting.`,
    `Legacy Support: Forget the additional properties, the limited old custom fields, the strange business fields and the legacy categorization. You don't need them anymore. But we are fully backward compatible. All legacy API calls will be mapped to custom fields. All inscribed inscriptions in your project will automatically be converted.`,
  ],
  features: [
    {
      term: `Meaningful Name`,
      description: `Name the custom field as you like.`,
    },
    {
      term: `Searchable`,
      description: `You won't miss any search capabilities. Simply use TaskQuery and CaseQuery API to filter, aggregate and order by custom fields.`,
    },
    {
      term: `Strong Typing`,
      description: `All custom fields are strongly typed. You can choose between STRING, TEXT, NUMBER and TIMESTAMP.`,
    },
  ],
  links: [
    {
      label: `Public API Custom Field`,
      url: `/doc/8.0/public-api/ch/ivyteam/ivy/workflow/custom/field/ICustomFields.html`,
    },
    {
      label: `Public API Query`,
      url: `/doc/8.0/public-api/ch/ivyteam/ivy/workflow/query/TaskQuery.IFilterableColumns.html#customField--`,
    },
  ],
  images: [],
  code_sample: `TaskQuery.create().where()
        .customField().stringField("branchOffice").isEqual("Zug")
      .and()
        .customField().numberField("creditLimit").isGreaterThan(10_000);`,
};

export default section;
