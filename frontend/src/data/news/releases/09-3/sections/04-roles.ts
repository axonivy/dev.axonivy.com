import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Role based Welcome`,
  anchor: `role93`,
  paragraphs: [
    `The refurbished Designer welcome page assists you in settings up the workspace according to your role.`,
  ],
  features: [
    {
      term: `Accessible`,
      description: `simple and uncluttered feature set to onboard new users quickly into the first Process drawing experience.`,
    },
    {
      term: `Advanced actions`,
      description: `Testers and Developers don't lose any features, but gain quick links to advanced features.`,
    },
    {
      term: `Project filters`,
      description: `contents within the Project tree will be filtered according to your role. Either to reduce complexity or to provide access to advanced configs and contents. You can switch at any time to a different filter set.`,
    },
  ],
  links: [
    {
      label: `Designer Guide`,
      url: `/doc/9.3/designer-guide/process-modeling/projects/ivyProjectView.html#filters`,
    },
  ],
  images: [
    `9.3/role-welcome/01-a-new-welcome-page.png`,
    `9.3/role-welcome/02-role-tester.png`,
    `9.3/role-welcome/03-role-developer.png`,
    `9.3/role-welcome/04-role-expert.png`,
    `9.3/role-welcome/05-init-process-from-scratch.png`,
    `9.3/role-welcome/06-quick-filters-for-projects.png`,
  ],
  code_sample: null,
};

export default section;
