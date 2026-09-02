import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy Portal`,
  anchor: `portal`,
  content: [
    {
      type: `paragraph`,
      text: `Packed with new features like notifications, enhancements to the Portal Dashboards, and multiple improvements for a smoother and more efficient user experience.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Notifications`,
          text: `The portal seamlessly integrates the redesigned notifications provider of the Axon Ivy engine. These notifications are prominently displayed within the portal interface, allowing users to filter, mark notifications as read, and efficiently manage their preferences. Users can easily subscribe or unsubscribe to various notification channels, ensuring a tailored and personalized notification experience.`,
        },
        {
          term: `Lazy Loading Task and Case Lists`,
          text: `We have optimized the task and case lists by removing pagination in favor of implementing lazy loading.`,
        },
        {
          term: `AI Translations`,
          text: `With the possibility of integrating DeepL into the Portal, creating multi-language dashboards has become remarkably convenient. Widget titles and published news within the news widget can be translated effortlessly with the assistance of AI technology.`,
        },
        {
          term: `Import, Export, and Sharing of Portal Dashboards`,
          text: `With Import/Export functionality, seamlessly move and duplicate dashboards across different environments. Sharing dashboards empowers collaboration by allowing the sharing of customized dashboards via a link with team members.`,
        },
        {
          term: `Enhanced Accessibility for Custom Dashboard Widgets`,
          text: `The custom widget can display a predefined Ivy process directly in the dashboard, embedded into a dashboard widget. If you use this functionality, selecting and adding available custom widgets to your dashboard has become much more straightforward!`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `And much more:`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Custom Order of the Processes in the Dashboard Process Widget`,
        },
        {
          text: `More End-user-like business states for tasks and cases`,
        },
        { text: `Skeleton loading in the portal` },
      ],
    },
  ],
  links: [
    {
      label: `Portal`,
      url: `/doc/11.2/en/portal-guide/index.html`,
    },
  ],
  images: [
    `11.2/portal/01-dashboard-share.png`,
    `11.2/portal/02-all-sorting-options.png`,
    `11.2/portal/03-deepL-in-use.png`,
    `11.2/portal/04-new-custom-widget-selection-dialog.png`,
    `11.2/portal/05-notification.png`,
    `11.2/portal/06-skeleton.gif`,
  ],
};

export default section;
