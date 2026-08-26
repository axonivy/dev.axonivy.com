import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Run in Container`,
  anchor: `run-in-container`,
  paragraphs: [
    `Running the Axon.ivy Engine in an isolated container has become a lot easier.`,
    `This means that the barriers between Docker, Kubernetes, OpenShift and all other container orchestration platforms have been broken down!`,
  ],
  features: [
    {
      term: `Fully isolated`,
      description: `Software running in a container is completely isolated from the outside world.`,
    },
    {
      term: `Reproducible systems`,
      description: `Your system setup becomes fully reproducible in one go since the whole system configuration is defined in a so-called image.`,
    },
    {
      term: `Portable`,
      description: `Build once, run everywhere! Once a docker image is generated it can be run on every system that supports Docker.`,
    },
    {
      term: `Documented infrastructure`,
      description: `The entire Axon.ivy Engine system setup is part of an image and thus fully documented.`,
    },
  ],
  links: [
    {
      label: `Getting started`,
      url: `/doc/8.0/engine-guide/getting-started/docker.html`,
    },
    {
      label: `Axon.ivy Engine Docker Image`,
      url: `https://hub.docker.com/r/axonivy/axonivy-engine/`,
    },
    {
      label: `Docker Examples`,
      url: `https://github.com/axonivy/docker-samples`,
    },
  ],
  images: [`8.0/run-in-container/01-ivy-on-docker.jpg`],
  code_sample: null,
};

export default section;
