import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `CRON expressions`,
  anchor: `cron`,
  content: [
    {
      type: `paragraph`,
      text: `You can now configure periodical jobs by using CRON expressions. CRON expressions give you a broad spectrum of possible configurations. From once every minute to every day, week, month, or year.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `User Synchronisation`,
          text: `You can now define the time by a CRON expression, allowing synchronizations multiple times a day or only on weekends.`,
        },
        {
          term: `Timer Bean`,
          text: `Use a CRON expression on the new Start Event Bean <code>ch.ivyteam.ivy.process.eventstart.beans.TimerBean</code> to define when your processes are started.`,
        },
        {
          term: `Poller API`,
          text: `The definition of polling intervals in your Start and Intermediate Event Beans has become much easier with the new fluent <code>cpoll()</code> API`,
        },
        {
          term: `Monitoring`,
          text: `Monitor all jobs and all your Start and Intermediate Event Beans in the new <a href="/doc/11.2/en/engine-guide/reference/engine-cockpit/monitor.html#jobs">Jobs</a>, <a href="/doc/11.2/en/engine-guide/reference/engine-cockpit/monitor.html#start-events">Start Events</a>, and <a href="/doc/11.2/en/engine-guide/reference/engine-cockpit/monitor.html#intermediate-events">Intermediate Events</a> view of the Engine Cockpit.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide - Configuration`,
      url: `/doc/11.2/engine-guide/configuration/advanced-configuration.html#cron-expression`,
    },
    {
      label: `Engine Guide - Monitor`,
      url: `/doc/11.2/engine-guide/reference/engine-cockpit/monitor.html#start-events`,
    },
    {
      label: `Public API`,
      url: `doc/11.2/public-api/ch/ivyteam/ivy/process/beans/IPoller.html`,
    },
  ],
  images: [
    `11.2/cron/01-user-synch.gif`,
    `11.2/cron/02-timer-bean.png`,
    `11.2/cron/03-jobs.png`,
    `11.2/cron/04-start-events.png`,
    `11.2/cron/05-start-event.png`,
  ],
};

export default section;
