import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Debian Engine Installer`,
  anchor: `debian`,
  paragraphs: [
    `The Axon.ivy Engine is now available as a Debian package. Now Engine operators can benefit from the rich tooling on the preferred platform of most cloud providers.`,
  ],
  features: [
    {
      term: `Simple`,
      description: `Install & run the Engine with one click.`,
    },
    {
      term: `Best practice`,
      description: `Run the Axon.ivy Engine as systemd service and restricts the access to Engine and workflow application files.`,
    },
    {
      term: `Updateable`,
      description: `Install the latest hotfix version without risky manual steps.`,
    },
    {
      term: `Secure`,
      description: `Keep your manual changes in configuration files during updates.`,
    },
    {
      term: `Friendly`,
      description: `Organize files compliant with the Linux file structure and re-use the JVM provided by the system.`,
    },
  ],
  links: [
    {
      label: `Debian : Getting Started`,
      url: `/doc/8.0/engine-guide/getting-started/debian.html`,
    },
    {
      label: `Download Debian package`,
      url: `/permalink/8.0/axonivy-engine.deb`,
    },
  ],
  images: [`8.0/debian/01-debian-package-installer.png`],
  code_sample: null,
};

export default section;
