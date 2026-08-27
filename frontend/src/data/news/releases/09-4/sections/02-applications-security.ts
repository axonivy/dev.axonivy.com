import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Multiple applications per security context`,
  anchor: `multiApp`,
  content: [
    {
      type: `paragraph`,
      text: `Axon Ivy applications no longer impose hard boundaries on each other. Applications are part of a security system in which users and roles live. This enables independent feature-driven development.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Feature Driven Development (FDD)`,
          text: `It is no longer necessary to pack everything into one application and have a risk of clumping. Different sub-applications can be developed in independent applications and still have the same user and role base.`,
        },
        {
          term: `Independent release cycles`,
          text: `By splitting your application into multiple applications, you can develop each application independently and maintain an independent release cycle.`,
        },
        {
          term: `Standalone Portal`,
          text: `The Axon Ivy Portal no longer needs to be part of your application. Run the portal in its own application and integrate your business processes using the iFrame approach and keep the portal up-to-date and leave all migration pain behind.`,
        },
        {
          term: `Multi Tenancy`,
          text: `For multi-tenancy, we strongly recommend to run a separate Axon Ivy Engine per tenant and to orchestrate this in a container platform. If you want to run multi-tenancy on one engine, then we recommend to set up one security system per tenant and run the tenant's applications in this security system.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Application Lifecycle`,
      url: `/doc/9.4/concepts/application-lifecycle/index.html`,
    },
    {
      label: `Multi Tenancy`,
      url: `/doc/9.4/concepts/multi-tenancy/index.html`,
    },
  ],
  images: [
    `9.4/multi-app-context/01-multi-app.png`,
    `9.4/multi-app-context/02-multi-tenancy.png`,
  ],
};

export default section;
