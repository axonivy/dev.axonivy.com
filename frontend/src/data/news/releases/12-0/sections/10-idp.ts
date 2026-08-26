import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Axon Ivy IDP`,
  anchor: `idp`,
  paragraphs: [
    `Axon Ivy IDP is an Intelligent Document Processing solution that automates the extraction, classification, and analysis of unstructured data. It streamlines document-intensive processes like invoice management, claims processing, and customer onboarding using AI-driven OCR, handwriting text recognition (HTR), and machine learning algorithms to elevate accuracy and efficiency in data management. Key features of Axon Ivy IDP include:`,
    `Axon Ivy IDP is now available to enhance document management and automation strategies.`,
  ],
  features: [
    {
      term: `OCR & HTR`,
      description: `Capture data from both printed and handwritten documents using advanced optical character recognition and handwriting text recognition.`,
    },
    {
      term: `Pre-Processing`,
      description: `Automated document splitting and cropping to ensure clean and accurate data capture.`,
    },
    {
      term: `Intelligent Classification`,
      description: `Classify documents with high precision, handling diverse document types.`,
    },
    {
      term: `Extraction`,
      description: `Extract relevant data fields to integrate with business workflows.`,
    },
    {
      term: `Seamless Integration`,
      description: `Easily integrate into Axon Ivy platform workflows, enabling end-to-end automation.`,
    },
  ],
  links: [],
  images: [
    `12.0/idp/01-extraction.png`,
    `12.0/idp/02-extraction.png`,
    `12.0/idp/03-extraction.png`,
    `12.0/idp/04-extraction.png`,
    `12.0/idp/05-splitting.png`,
    `12.0/idp/06-splitting.png`,
    `12.0/idp/07-splitting.png`,
  ],
  code_sample: null,
};

export default section;
