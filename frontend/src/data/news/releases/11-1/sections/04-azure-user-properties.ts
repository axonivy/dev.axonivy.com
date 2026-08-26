import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Azure AD User Properties`,
  anchor: `azure`,
  paragraphs: [
    `We're excited to announce that our Azure AD support has just improved! With our latest update, you can easily synchronize user properties from Azure Active Directory with Axon Ivy user properties. You can seamlessly integrate essential details like phone numbers and department information into your workflows for a more streamlined user experience.`,
    `But that's not all - we've also added a powerful new feature that lets you inspect all role mappings directly from the configuration view of Azure Active Directory. This makes managing permissions easier than ever and keeps your workflows running smoothly.`,
    `Here are some key features of our latest update:`,
    `Upgrade your Azure AD integration today and experience the power of seamless user property synchronization and enhanced role mapping management.`,
  ],
  features: [
    {
      term: null,
      description: `Synchronize user properties from Azure AD with Axon Ivy user properties.`,
    },
    {
      term: null,
      description: `Seamlessly integrate phone numbers, department information, and more.`,
    },
    {
      term: null,
      description: `Inspect all role mappings directly from the Azure AD configuration view.`,
    },
    {
      term: null,
      description: `Simplify permission management and keep your workflows running smoothly.`,
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/11.1/engine-guide/integration/identity-provider/azure-ad`,
    },
  ],
  images: [
    `11.1/azure/01-user-property-config.png`,
    `11.1/azure/02-user-property-synch.png`,
  ],
  code_sample: null,
};

export default section;
