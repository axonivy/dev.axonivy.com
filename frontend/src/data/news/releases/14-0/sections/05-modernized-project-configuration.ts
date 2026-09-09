import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Modernized Project Configuration`,
  anchor: `modernized-project-configuration`,
  content: [
    {
      type: `paragraph`,
      text: `Project structure and configuration becomes more consistent, tooling-friendly, and easier for AI-assisted development tools to understand and work with.`,
    },
    {
      type: `paragraph`,
      text: `**Key format changes:**`,
    },
    {
      type: `list`,
      items: [
        { text: `Roles: XML → YAML` },
        { text: `Users: XML → YAML` },
        { text: `Persistence: XML → YAML` },
        { text: `JCase Maps: <code>.icm</code> → <code>.m.json</code>` },
        {
          text: `JSON schemas with deterministic versioning, allowing AI models to understand the formats and to generate or modify the files`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `These changes simplify automated processing and validation of project resources and align configuration formats with the new web-based editors.`,
    },
  ],
  images: [
    `14.0/modernized-project-configuration/01-users-yaml.png`,
    `14.0/modernized-project-configuration/02-json-deterministic-versioning.png`,
  ],
};

export default section;
