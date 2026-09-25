import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `OpenAPI backend`,
  anchor: `openAPIbackend`,
  content: [
    {
      type: `paragraph`,
      text: `We believe that the <a href="https://www.openapis.org/">OpenAPI initiative</a> made communications over system boundaries efficient, well documented and a pleasure to do. So, we gladly comply with it by documenting REST services by default in OpenAPI format.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Auto documented`,
          text: `You define services in Java as you have always done. All your services are automatically described in OpenAPI compatible format under http://localhost:8081/api/designer/openapi.json.`,
        },
        {
          term: `Industry standard`,
          text: `OpenAPI service descriptions have become the de-facto standard to describe REST interfaces. Consequently, third parties should gladly accept your service descriptions in OpenAPI format.`,
        },
        {
          term: `Prototyping UI`,
          text: `Axon Ivy products have a built-in API browser so that you can easily examine your service descriptions and send data to the service, without reading technical descriptor files.`,
        },
        {
          term: `Extended docs`,
          text: `By adding OpenAPI service annotations you can fine-tune the service presentation separate from technical data flow descriptions. Your service users will be glad to find prose and examples to clarify valid use-cases of your services.`,
        },
        {
          term: `Core services`,
          text: `Not only services from your workflow application, but Axon Ivy core services too are now documented in OpenAPI manor. Therefore, the documentation of the deployment and mobile-workflow endpoints has been improved.`,
        },
      ],
    },
  ],
  links: [
    {
      label: `API Publishing`,
      url: `/doc/9.2/concepts/3rd-party-integration/restapi.html#api-publishing`,
    },
    {
      label: `API Browser`,
      url: `/doc/9.2/concepts/3rd-party-integration/restapi.html#api-browser`,
    },
    {
      label: `OpenAPI customization`,
      url: `/doc/9.2/concepts/3rd-party-integration/restapi.html#custom-openapi-docs`,
    },
  ],
  images: [
    `9.2/openApi-backend/01-openapi.png`,
    `9.2/openApi-backend/02-apibrowser.png`,
    `9.2/openApi-backend/03-api-access.png`,
    `9.2/openApi-backend/04-api-docs.png`,
  ],
};

export default section;
