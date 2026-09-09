import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Security & Platform Hardening`,
  anchor: `security-platform-hardening`,
  content: [
    {
      type: `paragraph`,
      text: `LTS 14 includes security improvements that go beyond individual bug fixes and introduce additional platform-level controls.`,
    },
    {
      type: `paragraph`,
      text: `**Key areas include:**`,
    },
    {
      type: `list`,
      items: [
        {
          text: `Annotation-based control of CSRF protection for selected resources`,
        },
        {
          text: `Configurable handling of <code>X-Requested-By</code> for Engine REST APIs`,
        },
        { text: `PAAS-specific Cockpit restrictions` },
        { text: `Safer redirect handling` },
        { text: `Upload hardening` },
        { text: `XML parsing hardening` },
        { text: `URL validation` },
        { text: `Safer UI rendering defaults` },
        { text: `Performance optimizations` },
      ],
    },
    {
      type: `paragraph`,
      text: `These changes are particularly relevant for hosted, clustered, and externally integrated environments.`,
    },
  ],
};

export default section;
