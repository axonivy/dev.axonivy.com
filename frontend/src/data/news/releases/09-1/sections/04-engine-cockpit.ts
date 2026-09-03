import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Engine Cockpit 2.0`,
  anchor: `engine-cockpit`,
  content: [
    {
      type: `paragraph`,
      text: `We have worked hard to make the Engine Cockpit even better! And because we want everyone to benefit from these new features, we have ported some of them (like the LDAP Browser and the PMV Dependency view) back to LTS. And we made many small improvements that hopefully make your life easier. Let's have a look at them:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `LDAP Browser`,
          text: `Easy browsing of your connected security directory.`,
        },
        {
          term: `PMV Dependency View`,
          text: `Overview over your dependencies between PMVs, with feedback if something is missing.`,
        },
        {
          term: `MBean Monitor`,
          text: `More ways to monitor your running system without installing the VisualVM tool.`,
        },
        {
          term: `Restart Hint`,
          text: `Prominent warning if a change in your configuration requires an engine restart.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/9.1/engine-guide/tool-reference/engine-cockpit/index.html`,
    },
  ],
  images: [
    `9.1/engine-cockpit/01-ldap-browser.png`,
    `9.1/engine-cockpit/02-pmv-dependency-view.png`,
    `9.1/engine-cockpit/03-mbeans-monitor.png`,
    `9.1/engine-cockpit/04-restart-hint.png`,
  ],
};

export default section;
