import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Portal`,
  anchor: `portal`,
  content: [
    {
      type: `paragraph`,
      text: `Discover the power of Portal 13.1 and elevate how you visualize, organize and secure your work. Dive in today and feel the difference for yourself.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Portal Custom Statistics`,
          text: `Build custom statistics widgets right inside the Portal. Choose between multiple chart types, aggregate task and case data with bespoke filters, pick your own colours and refresh intervals, and even secure each widget with permission rules. Custom fields are, of course, fully supported for truly tailored insights.`,
        },
        {
          term: `Pin Your Tasks and Cases`,
          text: `Keep what matters front and centre. Every user can now pin individual tasks or cases directly from any list. Use the toggle in the widget to instantly filter to your pinned items, and clean up your pins anytime from your profile.`,
        },
        {
          term: `Navigation Widget & Hidden Dashboards`,
          text: `Design guided dashboard flows without cluttering the navigation bar. Mark any dashboard as hidden, then surface it through the new Navigation Widget. Mix and match views, add permission-driven buttons, and craft multi-layered experiences for every audience.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `And much more`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Hardened security`,
          text: `across all supported versions – reduced attack surface for XSS, injection and other vulnerabilities.`,
        },
        {
          term: `Multiple task activators`,
          text: `– assign more than one responsible person and see them clearly in both lists and details.`,
        },
        {
          term: `Multilanguage support for custom fields`,
          text: `– manage field captions and values in any CMS language to create truly global dashboards.`,
        },
        {
          term: `100 % Japanese localisation`,
          text: `– professionally translated UI for seamless collaboration with Japanese-speaking teams.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Portal`,
      url: `/doc/13.1/portal-guide/index.html`,
    },
  ],
  images: [
    `13.1/portal/01-statistics.png`,
    `13.1/portal/02-pin-tasks.png`,
    `13.1/portal/03-japanese.png`,
    `13.1/portal/04-navigation-widget.png`,
    `13.1/portal/05-multiple-responsibles.png`,
  ],
};

export default section;
