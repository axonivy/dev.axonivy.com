import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Public API`,
  anchor: `publicApi93`,
  paragraphs: [
    `With twenty years of project experience, we knew what customers expect from a powerful process automation platform. The newly added API makes your life even easier.`,
  ],
  features: [
    {
      term: `ISecurity`,
      description: `ivy.security and Ivy.security() provide a lot of methods to manage users, roles, security members and sessions.`,
    },
    {
      term: `IRoleMatcher`,
      description: `Makes it easy to check if the current session user has a certain role. The API is available on a session and a user. In addition, new API methods take a role name instead of a role instance.`,
    },
    {
      term: `Sudo`,
      description: `Disables permission checking while executing some code.`,
    },
    {
      term: `IvyRuntime`,
      description: `Provides information about the runtime (Designer or Engine) and the current version.`,
    },
    {
      term: `BooleanFieldOperation`,
      description: `Filters business data with boolean fields.`,
    },
    {
      term: `IBusinessCase`,
      description: `A new method to find out how a business case was started. Either from a process start or a case map start.`,
    },
  ],
  links: [
    {
      label: `Public API`,
      url: `/doc/9.3/public-api`,
    },
  ],
  images: [
    `9.3/public-api/01-security.PNG`,
    `9.3/public-api/02-role-matcher.PNG`,
    `9.3/public-api/03-has-role.PNG`,
    `9.3/public-api/04-sudo.PNG`,
    `9.3/public-api/05-ivy-runtime.PNG`,
    `9.3/public-api/06-boolean-field.PNG`,
    `9.3/public-api/07-started-from.PNG`,
  ],
  code_sample: null,
};

export default section;
