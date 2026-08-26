import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Native MAC & GTK3 Development`,
  anchor: `native-mac-gtk3`,
  paragraphs: [
    `Run the Axon.ivy Designer with the operating system you know and love most.`,
  ],
  features: [
    {
      term: `MAC Designer`,
      description: `We released the first native Axon.ivy Designer for Mac OS X. Now you can digitalize your business on a Mac without starting a virtualized OS.`,
    },
    {
      term: `Linux GTK3`,
      description: `The latest designer has been optimized to work with the most popular desktop environments on Linux. As a result, we were able to update the embedded browser, delivering way more accurate results when modern CSS & JavaScript is used.`,
    },
    {
      term: `Process Editor`,
      description: `Many new native UI components are now available for all platforms: Context Menu, Inscription Masks`,
    },
    {
      term: `Html Dialog Editor`,
      description: `It dropped its strict coupling to the JavaFX-based WYSIWYG editor and therefore runs on all platforms.`,
    },
  ],
  links: [],
  images: [`8.0/native-mac-gtk3/01-high-sierra-rest-activity.png`],
  code_sample: null,
};

export default section;
