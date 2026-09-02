import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `OpenAPI client`,
  anchor: `openApiClient`,
  content: [
    {
      type: `paragraph`,
      text: `Communications with third party services have been dramatically simplified throughout our industry in the last years. Actually, many large and open minded vendors are nowadays describing their service capabilities in the platform neutral OpenAPI format. Therefore, we have invested a lot to give you a rich toolset that makes the usage of these services easy and simple. So, you can send data to and fro without getting into the details of these API specifications.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Code Generators`,
          text: `We generate data structures that are consumed and returned from OpenAPI services to simplify your interaction within inscriptions masks, scripts or plain Java code.`,
        },
        {
          term: `Built-in Docs`,
          text: `Service resources are well documented, so we make these use-case descriptions visible and accessible where they serve you best, right in the Rest Client Activities inscription masks.`,
        },
        {
          term: `Light Inscriptions`,
          text: `gone are the days of overloaded configuration masks to model REST service interactions. OpenAPI based services are presented with a simple look and only show you the configs that make sense for the selected service resource.`,
        },
        {
          term: `Validation`,
          text: `Strongly typed data models, as well as separation of optional and mandatory data, make it possible to validate input and help you sending the essential data, without doing tedious test calls to the remote services.`,
        },
        {
          term: `OAuth2 Flows`,
          text: `OpenAPI services typically need users to be authenticated with an OAuth2 token. We made vendor neutral OAuth2 authentication scenarios possible with minimal effort for the developer.`,
        },
        {
          term: `More Specs`,
          text: `We support not only plain OpenAPI 3, but also swagger2 and OData API definitions via converters.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `OpenAPI client`,
      url: `/doc/9.2/designer-guide/configuration/rest-clients.html#openapi-client-generator`,
    },
    {
      label: `API browser`,
      url: `/doc/9.2/designer-guide/process-modeling/process-elements/rest-client-activity.html#process-element-rest-client-activity-browser`,
    },
    {
      label: `OpenAPI converters`,
      url: `/doc/9.2/designer-guide/configuration/rest-clients.html#rest-clients-openapi-migrate`,
    },
    {
      label: `Public API: OAuth2`,
      url: `/doc/9.2/public-api/ch/ivyteam/ivy/rest/client/oauth2/OAuth2BearerFilter.html`,
    },
  ],
  images: [
    `9.2/openApi-client/01-inscribe-api-docs.png`,
    `9.2/openApi-client/02-inscribe-resource-select.png`,
    `9.2/openApi-client/03-inscribe-validate-and-typed.png`,
    `9.2/openApi-client/04-generate-openapi-client.png`,
    `9.2/openApi-client/05-inscribe-typed-body.png`,
  ],
};

export default section;
