import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `General UI/UX improvements`,
  anchor: `general-ui-ux-improvements`,
  paragraphs: [
    `As we started to make our theme customizable we made a lot of improvements to our internal pages.`,
  ],
  features: [
    {
      term: `Color Customizing`,
      description: `Our Serenity ivy theme provides some css variables to easily change colors.`,
    },
    {
      term: `User friendly error pages`,
      description: `Streamlined and user friendly design of our internal error pages.`,
    },
    {
      term: `Clean info page`,
      description: `New clean and modern server info page.`,
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
  code_sample: null,
};

export default section;
