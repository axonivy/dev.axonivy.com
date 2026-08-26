import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `CRON expressions`,
  anchor: `cron`,
  paragraphs: [
    `You can now configure periodical jobs by using CRON expressions. CRON expressions give you a broad spectrum of possible configurations. From once every minute to every day, week, month, or year.`,
  ],
  features: [
    {
      term: `User Synchronisation`,
      description: `You can now define the time by a CRON expression, allowing synchronizations multiple times a day or only on weekends.`,
    },
    {
      term: `Timer Bean`,
      description: `Use a CRON expression on the new Start Event Bean ch.ivyteam.ivy.process.eventstart.beans.TimerBean to define when your processes are started.`,
    },
    {
      term: `Poller API`,
      description: `The definition of polling intervals in your Start and Intermediate Event Beans has become much easier with the new fluent poll() API`,
    },
    {
      term: `Monitoring`,
      description: `Monitor all jobs and all your Start and Intermediate Event Beans in the new Jobs, Start Events, and Intermediate Events view of the Engine Cockpit.`,
    },
  ],
  links: [
    {
      label: `Engine Guide - Configuration`,
      url: `/doc/11.2/engine-guide/configuration/advanced-configuration.html#cron-expression`,
    },
  ],
  images: [
    `11.2/cron/01-user_synch.gif`,
    `11.2/cron/02-timer-bean.png`,
    `11.2/cron/03-jobs.png`,
    `11.2/cron/04-start-events.png`,
    `11.2/cron/05-start-event.png`,
  ],
  code_sample: null,
};

export default section;
