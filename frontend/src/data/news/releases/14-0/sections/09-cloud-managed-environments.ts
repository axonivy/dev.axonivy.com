import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Cloud & Managed Environments`,
  anchor: `cloud-managed-environments`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 continues to strengthen Axon Ivy for cloud, containerized, and managed environments. Additionally smaller alpine based docker images are provided.`,
    },
    {
      type: `paragraph`,
      text: `A key addition is **PAAS mode**, which allows potentially risky Engine Cockpit capabilities to be hidden or disabled in managed environments. This provides better control over what administrators can access when the underlying infrastructure is managed by a platform provider.`,
    },
    {
      type: `paragraph`,
      text: `Together with the Application Version model, deployment reliability improvements, and additional operational controls, this strengthens the foundation for hosted, clustered, and cloud-oriented Axon Ivy environments.`,
    },
  ],
  links: [],
  images: [],
};

export default section;
