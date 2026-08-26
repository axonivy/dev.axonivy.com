import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Java 11 LTS`,
  anchor: `java11`,
  paragraphs: [
    `Axon.ivy now runs with Java 11. Which is the most recent LTS runtime for Java.`,
  ],
  features: [
    {
      term: `Featured`,
      description: `Use the latest language features such as var and make use of modern libraries built upon Java 11.`,
    },
    {
      term: `Secure`,
      description: `Rely upon the latest maintenance releases to run your solution.`,
    },
    {
      term: `Light`,
      description: `The Java runtime environment is quick as fox since optional features are released as such and the remaining core was put on a strict diet.`,
    },
  ],
  links: [
    {
      label: `Java 11 Migration Notes`,
      url: `/doc/8.0/migration-notes#74java11migration`,
    },
  ],
  images: [`8.0/java-11/01-adopt-open-jdk.svg`],
  code_sample: null,
};

export default section;
