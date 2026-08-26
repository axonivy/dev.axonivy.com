import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Efficient user scaling`,
  anchor: `user-scaling`,
  paragraphs: [
    `We have made great efforts to ensure that our engine can serve hundreds of thousands of users quickly and efficiently. This is achieved through many memory, performance, UI and API improvements. In addition, users can be enabled or disabled.`,
  ],
  features: [
    {
      term: `Disabled users`,
      description: `Users are now disabled instead of deleted. As a result, the task state UNASSIGNED is no longer relevant.`,
    },
    {
      term: `User synchronization`,
      description: `The user synchronization is much faster and has an improved logging.`,
    },
    {
      term: `New user query`,
      description: `There is a new API to easily search users.`,
    },
    {
      term: `UI improvements`,
      description: `The Engine Cockpit can handle huge numbers of users and roles.`,
    },
    {
      term: `Task-/Case query`,
      description: `Faster database queries thanks to a simplified database schema.`,
    },
  ],
  links: [],
  images: [
    `9.1/200k-user/01-200k-users.png`,
    `9.1/200k-user/02-disabled-user.png`,
    `9.1/200k-user/03-managed-user.png`,
  ],
  code_sample: null,
};

export default section;
