import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Highly Configurable`,
  anchor: `highly-configurable`,
  content: [
    {
      type: `paragraph`,
      text: `Successfully deploying your application in your customers environment is now easier than ever. The days of manual installations and the related chatty documentation are over!`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Files`,
          text: `The complete configuration of an Axon.ivy Engine is now stored in simple human readable <code>YAML</code> files. Now it is very easy to document the whole truth about the current engine environment within an <code>ivy.yaml</code> file.`,
        },
        {
          term: `Zero Documentation`,
          text: `In the past you had to document the installation of an Axon.ivy Engine because certain settings (e.g. Security System) could only be configured via the Admin UI. Now you can use the <code>ivy.yaml</code> file as your system documentation.`,
        },
        {
          term: `Overridable`,
          text: `Configurations are always overridable with environment variables. This is especially useful in container environments.`,
        },
        {
          term: `Trackable`,
          text: `Configuration changes get logged, showing what has been changed and where. Besides auditing configuration changes, this can also help tracking down problems after changes.`,
        },
      ],
    },
    {
      type: `code`,
      code: `# sample ivy.yaml with some often used entries defined
SystemDb:
  Url: jdbc:mariadb://myDbHost:3306/AxonIvySystemDatabase
  UserName: root
  Password: 1234
Administrators:
  admin:
    Password: "\${hash:1234}"
    Email: info@localhost
  devop:
    Password: "\${hash:4321}"
    Email: dev@axonivy.com
EMail:
  Server:
  Host: smtp.gmail.com
  Port: 25
Frontend:
  HostName: workflow.acme.com
  Port: 80`,
      language: `yaml`,
    },
  ],
  links: [
    {
      label: `Engine Guide Configuration`,
      url: `/doc/8.0/engine-guide/configuration/`,
    },
    {
      label: `Configuration File Reference`,
      url: `/doc/8.0/engine-guide/configuration/file-reference.html`,
    },
  ],
  images: [],
};

export default section;
