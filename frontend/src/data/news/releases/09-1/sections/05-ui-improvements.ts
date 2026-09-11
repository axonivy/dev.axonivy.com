import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `General UI/UX improvements`,
  anchor: `general-ui-ux-improvements`,
  content: [
    {
      type: `paragraph`,
      text: `As we started to make our theme customizable we made a lot of improvements to our internal pages.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Color Customizing`,
          text: `Our Serenity ivy theme provides some css variables to easily change colors.`,
        },
        {
          term: `User friendly error pages`,
          text: `Streamlined and user friendly design of our internal error pages.`,
        },
        {
          term: `Clean info page`,
          text: `New clean and modern server info page.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Color Customizing`,
      url: `/doc/9.1/designer-guide/user-interface/user-dialogs.html#color-customizing`,
    },
  ],
  images: [
    `9.1/ui-improvements/01-info-page.jpg`,
    `9.1/ui-improvements/02-error-page.png`,
  ],
};

export default section;
