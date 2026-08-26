import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `S3 Document Store`,
  anchor: `s3`,
  paragraphs: [
    `Workflow documents can now be saved in S3-compatible storage. S3 has many advantages over the conventional local file system:`,
    `Additionally, you can inspect all the workflow documents in the Axon Ivy Engine Cockpit.`,
  ],
  features: [
    {
      term: `Platform-independent`,
      description: `You no longer have to deal with the local file system.`,
    },
    {
      term: `Cluster-ready`,
      description: `It works in a cluster, and you no longer have to share a directory between cluster nodes.`,
    },
    {
      term: `S3 Features`,
      description: `S3 providers have many features, like retention policies, encryption, versioning, and backup, to mention some.`,
    },
    {
      term: `Pluggable`,
      description: `Not happy with S3? With the new pluggable architecture, you can even implement your document storage.`,
    },
  ],
  links: [
    {
      label: `Engine Guide`,
      url: `/doc/11.2/engine-guide/configuration/document/s3.html`,
    },
  ],
  images: [`11.2/s3/01-S3.png`, `11.2/s3/02-engine-cockpit-documents.png`],
  code_sample: null,
};

export default section;
