import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Tags and Descriptions`,
  anchor: `inscription93`,
  content: [
    {
      type: `paragraph`,
      text: `Add more meta information to your process elements to ease finding or calling them.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Tags`,
          text: `Tag your process elements to easily find them in your projects. Some tags like <code>Deprecated</code>, <code>Connector</code> or <code>Demo</code> have a special meaning.`,
        },
        {
          term: `Parameter Description`,
          text: `Describe the parameters of start elements to give useful hints to the callers.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Tags`,
      url: `/doc/9.3/designer-guide/process-modeling/process-elements/common-tabs.html?highlight=tags#tags`,
    },
    {
      label: `Start Tab`,
      url: `/doc/9.3/designer-guide/process-modeling/process-elements/common-tabs.html#start-tab
		target=`,
    },
  ],
  images: [
    `9.3/start-inscription/01-tags.png`,
    `9.3/start-inscription/02-search-tags.PNG`,
    `9.3/start-inscription/03-deprecated.PNG`,
    `9.3/start-inscription/04-call-deprecated.png`,
    `9.3/start-inscription/05-description.PNG`,
    `9.3/start-inscription/06-show-description.png`,
  ],
};

export default section;
