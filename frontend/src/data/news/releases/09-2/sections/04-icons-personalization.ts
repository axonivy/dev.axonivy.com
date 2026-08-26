import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Icons & Personalization`,
  anchor: `icons`,
  paragraphs: [
    `Spice up your process designs: Customize process elements by using decorator icons of your choice.`,
    `Customize and categorize your process list to match your company's individual profile by defining an icon and category for each start.`,
  ],
  features: [
    {
      term: `Process Starts Icon and Category`,
      description: `: Define an icon for each process start and categorize them, customizing the look-and-feel of the process list.`,
    },
    {
      term: `Process Element Decorator Icons`,
      description: `: Improve your process designs by defining icons for REST Client, Web Service and Database configurations. These icons will then be used in all process elements and selection windows.`,
    },
    {
      term: `Call Sub Decorator Icons`,
      description: `: Enhance your Callable Sub Processes with custom icons. These will be used in the Call Sub process elements when choosing the sub process and as decorator icon.`,
    },
    {
      term: `Call Sub Documentation`,
      description: `: Make your Callable Sub Processes easier to use for other developers by adding tags, descriptions and descriptions for parameters. These tags and descriptions will show up in the Call Sub process element when choosing starts and defining input-output mappings, even in the attribute browser.`,
    },
  ],
  links: [],
  images: [
    `9.2/icons/01-icons-processstart.png`,
    `9.2/icons/02-icons-restclient-ditor.PNG`,
    `9.2/icons/03-icons-decorator-elements.png`,
    `9.2/icons/04-icons-callsub-icons.png`,
    `9.2/icons/05-icons-callsub-params.PNG`,
  ],
  code_sample: null,
};

export default section;
