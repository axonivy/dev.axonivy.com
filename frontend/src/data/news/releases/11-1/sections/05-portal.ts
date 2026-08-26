import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Portal`,
  anchor: `portal`,
  paragraphs: [
    `Upgrade your dashboard experience with our latest features and take your productivity to new heights. Try them out now and see the difference for yourself.`,
    `And much more:`,
  ],
  features: [
    {
      term: `Introducing the new News Widget for Portal Dashboards`,
      description: `Stay up-to-date with the latest features and updates within your organization or solution with just a glance. Our News Widget makes publishing new features easier than ever before, so you can keep your team informed without any hassle.`,
    },
    {
      term: `Improved Responsiveness on the Dashboard`,
      description: `We're also excited to announce that we've improved the responsiveness of our dashboard widgets. Whether you're on a desktop, laptop, tablet, or phone, our widgets will look great on all screen sizes and devices.`,
    },
    {
      term: `Enhanced External Links`,
      description: `Users can now configure external references to other tools based on permissions and add them to the Dashboard with a matching icon. It's never been easier to access all the tools and resources you need in one place.`,
    },
    {
      term: null,
      description: `Customize your widgets even more with HTML snippets and CSS. Personalize your dashboard to fit your unique needs and style.`,
    },
    {
      term: null,
      description: `Enjoy faster and smoother performance thanks to our performance optimizations for the task and case widgets as well as the process start widget. Access all your data and information quickly and easily.`,
    },
    {
      term: null,
      description: `Migrate your dashboard configurations with ease in the future by introducing a dashboard JSON version that will be used for future automated migrations.`,
    },
    {
      term: null,
      description: `Use HTML in your task and case descriptions to add formatting. Make your descriptions more informative and engaging.`,
    },
  ],
  links: [
    {
      label: `Portal`,
      url: `/portal/11.1/doc`,
    },
  ],
  images: [`11.1/portal/01-dashboard.png`, `11.1/portal/02-news.png`],
  code_sample: null,
};

export default section;
