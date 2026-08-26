import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Variables Editor`,
  anchor: `variablesEditor`,
  paragraphs: [`The first of many next-generation config editors has arrived!`],
  features: [
    {
      term: `Low-Code`,
      description: `Instead of having to navigate a YAML document that can get pretty big, you can now edit your variables with a handy user interface.`,
    },
    {
      term: `Features`,
      description: `Add or delete variables, and find what you are looking for by using the integrated search functionality. After selecting a variable, you can see all its information in the detail view. Change its name, value, description, and metadata while the UI adapts to your choices.`,
    },
  ],
  links: [
    {
      label: `Variables Editor`,
      url: `/doc/11.3/designer-guide/configuration/variables.html#editor`,
    },
  ],
  images: [
    `11.3/variables-editor/01-variables-editor.png`,
    `11.3/variables-editor/02-variables-editor.gif`,
    `11.3/variables-editor/03-variables-editor.png`,
  ],
  code_sample: null,
};

export default section;
