import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `S3 Document Store`,
  anchor: `s3`,
  content: [
    {
      type: `paragraph`,
      text: `Workflow documents can now be saved in S3-compatible storage. S3 has many advantages over the conventional local file system:`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Platform-independent`,
          text: `You no longer have to deal with the local file system.`,
        },
        {
          term: `Cluster-ready`,
          text: `It works in a cluster, and you no longer have to share a directory between cluster nodes.`,
        },
        {
          term: `S3 Features`,
          text: `S3 providers have many features, like retention policies, encryption, versioning, and backup, to mention some.`,
        },
        {
          term: `Pluggable`,
          text: `Not happy with S3? With the new pluggable architecture, you can even implement your document storage.`,
        },
      ],
    },
    {
      type: `paragraph`,
      text: `Additionally, you can inspect all the workflow documents in the Axon Ivy Engine Cockpit.`,
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/11.2/engine-guide/configuration/document/s3.html`,
    },
    {
      label: `Blog Post`,
      url: `https://community.axonivy.com/d/524-s3-production-ready`,
    },
    {
      label: `Docker Sample`,
      url: `https://github.com/axonivy/docker-samples/tree/master/ivy-s3`,
    },
  ],
  images: [`11.2/s3/01-S3.png`, `11.2/s3/02-engine-cockpit-documents.png`],
};

export default section;
