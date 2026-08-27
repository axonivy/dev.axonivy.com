import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Simplified Testing`,
  anchor: `testing`,
  content: [
    {
      type: `paragraph`,
      text: `It has never been easier to write unit tests that verify the quality of your workflow application. Though testing of your components has always been possible, the new Axon.ivy platform makes writing and maintaining tests much easier:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `@IvyTest`,
          text: `a JUnit 5 annotation to enable calls against the Ivy environment.`,
        },
        {
          term: `@IvyProcessTest`,
          text: `provides a rich BpmClient API to simulate processes being executed by test users. Assertions on the process flow and the returned data are possible.`,
        },
        {
          term: `@IvyWebTest`,
          text: `orchestrates a real browser in order to simulate users working on your Html Dialogs.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `Concepts: Testing`,
      url: `/doc/9.1/concepts/testing/index.html`,
    },
    {
      label: `Youtube: Tutorial`,
      url: `https://www.youtube.com/playlist?list=PLrFKpclzHMnJXhDEWjY8Bp_kqXdgdc_b_`,
    },
  ],
  images: [
    `9.1/testing/01-test-flavour-selection.png`,
    `9.1/testing/02-workflow-demos-test_workspace.png`,
    `9.1/testing/03-webtesting-run.gif`,
    `9.1/testing/04-maven-job-build-examples.png`,
  ],
};

export default section;
