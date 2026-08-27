import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Form Editor (Alpha) 🧪`,
  anchor: `formEditor`,
  content: [
    {
      type: `paragraph`,
      text: `We are enabling you to build user interfaces like never before.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Low-Code`,
          text: `Committed to letting everyone partake in building UIs, the new Form Editor lets you define contents without writing any code. Drag and Drop skills are all you need to start your creative journey.`,
        },
        {
          term: `Agnostic`,
          text: `Building the UI in technology-neutral mannor, we automatically generate the views for JSF as before. However, you're no longer the maintainer of them and can refrain from efforts to make them functional and keep them stable.`,
        },
        {
          term: `Alpha`,
          text: `Looking for feedback, we already integrated an early Alpha version of our new Form Editor. Nevertheless, we plan to support much more widgets, and integrations of complex components until the LTS 12 release.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Form Editor`,
      url: `/doc/11.3/designer-guide/user-interface/user-dialogs/form-editor.html`,
    },
  ],
  images: [
    `11.3/form-editor/01-form-widget-drop.png`,
    `11.3/form-editor/02-form-demo.gif`,
  ],
};

export default section;
