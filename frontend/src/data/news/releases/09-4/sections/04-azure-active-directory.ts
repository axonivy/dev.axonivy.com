import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Azure Active Directory`,
  anchor: `azure`,
  paragraphs: [
    `With Azure Active Directory, Axon Ivy is now able to support its first cloud-based identity provider. This means that your employees can simply use the well-known Microsoft login in order to access the Axon Ivy platform.`,
  ],
  features: [
    {
      term: `Simple user management`,
      description: `Maintain your users in one place, namely Azure Active Directory. Easily synchronize these users with Axon Ivy and make your business processes instantly accessible to the entire organization.`,
    },
    {
      term: `User credentials`,
      description: `Employees do not have to worry about additional user credentials. Access is simple and secure via the Microsoft login.`,
    },
    {
      term: `OAuth 2.0`,
      description: `With Microsoft login, the industry-standard OAuth 2.0 protocol is used for authentication. Consequently, Axon Ivy is no longer aware of these users' passwords and secure delegated access is granted.`,
    },
  ],
  links: [
    {
      label: `Azure Active Directory`,
      url: `/doc/9.4/engine-guide/integration/identity-provider/azure-ad/index.html`,
    },
  ],
  images: [
    `9.4/azure-ad/01-azure.gif`,
    `9.4/azure-ad/02-azure.png`,
    `9.4/azure-ad/03-azure.png`,
  ],
  code_sample: null,
};

export default section;
