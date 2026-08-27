import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Efficient user scaling`,
  anchor: `user-scaling`,
  content: [
    {
      type: `paragraph`,
      text: `We have made great efforts to ensure that our engine can serve hundreds of thousands of users quickly and efficiently. This is achieved through many memory, performance, UI and API improvements. In addition, users can be enabled or disabled.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Disabled users`,
          text: `Users are now disabled instead of deleted. As a result, the task state UNASSIGNED is no longer relevant.`,
        },
        {
          term: `User synchronization`,
          text: `The user synchronization is much faster and has an improved logging.`,
        },
        {
          term: `New user query`,
          text: `There is a new API to easily search users.`,
        },
        {
          term: `UI improvements`,
          text: `The Engine Cockpit can handle huge numbers of users and roles.`,
        },
        {
          term: `Task-/Case query`,
          text: `Faster database queries thanks to a simplified database schema.`,
        },
      ],
    },
  ],
  links: [],
  images: [
    `9.1/200k-user/01-200k-users.png`,
    `9.1/200k-user/02-disabled-user.png`,
    `9.1/200k-user/03-managed-user.png`,
  ],
};

export default section;
