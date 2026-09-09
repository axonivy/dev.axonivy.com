import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Unified Validation`,
  anchor: `unified-validation`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 introduces a shared validation framework across development tooling and builds. Validation is no longer limited to individual editors but can be reused across workspace diagnostics and Maven-based builds.`,
    },
    {
      type: `paragraph`,
      text: `Validation covers processes, forms, databases, XHTML, CMS, Case Maps, persistence, and <code>pom.xml</code>. Validators can also be configured or selectively suppressed.`,
    },
    {
      type: `paragraph`,
      text: `This provides earlier and more consistent feedback during development and enables validation to become part of automated CI/CD quality checks.`,
    },
  ],
  links: [],
  images: [
    `14.0/unified-validation/01-validation-error.png`,
    `14.0/unified-validation/02-warnings.png`,
  ],
};

export default section;
