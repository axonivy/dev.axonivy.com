import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Instant Deployment`,
  anchor: `deployment`,
  content: [
    {
      type: `paragraph`,
      text: `We believe that highly automated deployments are important. Customers should be able to use the latest features instantly. While developers and operations need a high confidence about the proper execution of their runtime artifacts.`,
    },
    {
      type: `paragraph`,
      text: `That's why we extended our deployment interface:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Atomar`,
          text: `The complete feature set of an application can be deployed at once. Just drop a zip file that contains multiple projects that belong to the same application into our engine <code>deploy</code> directory and it will be rolled-out.`,
        },
        {
          term: `Controllable`,
          text: `The new deployment option file gives you the chance to fine tune the deployment process. It allows to enforce configuration updates and to steer the target Process Model Version to use. Now there are no technical reasons to migrate workflow data into a new Process Model Version.`,
        },
        {
          term: `Self-documented`,
          text: `Deployment options can be stored in YAML files or in Maven plugin configurations. The deployment process is therefore documented, visible and reproducible in any environment. A separate documentation in a guide becomes obsolete.`,
        },
        {
          term: `Automated`,
          text: `The deployment to the engine is steered by simple file operations. So almost any scripting environment can be used to automate deployments. The roll-out of a new application version should never take more effort than one click.`,
        },
        {
          term: `Via HTTP`,
          text: `Deployment to remote engines has never been easier! Just upload your new application with one HTTP file transfer and you're done, perfect for your CI/CD environment!`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/8.0/engine-guide/administration/deployment.html`,
    },
    {
      label: `Maven Plugin`,
      url: `https://axonivy.github.io/project-build-plugin`,
    },
    {
      label: `GitHub Examples`,
      url: `https://github.com/axonivy/project-build-examples`,
    },
  ],
  images: [],
};

export default section;
