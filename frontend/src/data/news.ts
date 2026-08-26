export interface NewsFeature {
  term: string | null;
  description: string;
}

export interface NewsLink {
  label: string;
  url: string;
}

export interface NewsSection {
  heading: string;
  anchor: string | null;
  paragraphs: string[];
  features: NewsFeature[];
  links: NewsLink[];
  images: string[];
  code_sample: string | null;
}

export interface NewsRelease {
  id: string;
  version_title: string;
  slogan: string | null;
  release_date: Date;
  migration_guide_url: string;
  overview: string[];
  sections: NewsSection[];
}

export const news: NewsRelease[] = [
  {
    id: `13.2`,
    version_title: `Axon Ivy 13.2`,
    slogan: `Agents, Statistics, Visual Studio Code Extension and Editors`,
    release_date: new Date(`2025-12-22`),
    migration_guide_url: `/doc/13.2/en/axonivy/migration/index.html`,
    overview: [
      "Smart Workflow and Smart Core deepen AI-powered process orchestration, extending the existing AI portfolio (IDP, Portal Assistant, LLM connectors).",
      "Portal Statistics Widget Configurator delivers meaningful insights into process and business data in just a few clicks.",
      "VS Code Extension becomes the primary PRO Designer, offering a modern, fast, and extensible development environment.",
      "Also includes a CMS Translation Wizard, database-driven form generation, improved BPMN 2 support, and new Market connectors.",
    ],
    sections: [
      {
        heading: `Agentic Orchestration & AI Process Generation`,
        anchor: `ai`,
        paragraphs: [
          `Version 13.2 expands the AI portfolio (IDP, Portal Assistant, LLM connectors) with two deeply integrated platform components: Smart Workflow and Smart Core.`,
        ],
        features: [
          {
            term: `Smart Workflow`,
            description: `Smart Workflow embeds agents directly into Axon Ivy, combining deterministic BPMN steps with adaptive AI decision-making. It enables flexible orchestration where processes interact seamlessly with agent intelligence.`,
          },
          {
            term: `Smart Core`,
            description: `Smart Core adds a native MCP server to the Axon Ivy Engine, enabling the generation of Ivy artifacts, processes, data classes, forms, connectors, directly from natural language.`,
          },
        ],
        links: [
          {
            label: `Smart Workflow`,
            url: `https://market.axonivy.com/smart-workflow?version=13.2.0-a6#description`,
          },
          {
            label: `Smart Core`,
            url: `https://github.com/axonivy/smart-core/tree/master`,
          },
          {
            label: `AI powered process orchestration for the enterprise`,
            url: `https://www.axonivy.com/ai-powered-process-orchestration-for-the-enterprise`,
          },
        ],
        images: [`13.2/ai/01-smart-workflow.png`, `13.2/ai/02-smart-core.png`],
        code_sample: null,
      },
      {
        heading: `Visual Studio Code Extension vs. Eclipse-based PRO Designer`,
        anchor: `vscode`,
        paragraphs: [
          `The Visual Studio Code Extension is now the primary PRO Designer, offering a modern and actively evolving environment despite its beta status. The Eclipse-based PRO Designer is in maintenance mode with only essential bug fixes and no new features in 13.2.`,
          `New Features in the VS Code Extension:`,
        ],
        features: [
          {
            term: `Project Conversion`,
            description: `Easily migrate existing projects into the VS Code–based PRO Designer.`,
          },
          {
            term: `IAR Support`,
            description: `Full handling of Ivy Archive (*.iar) files, including import and dependency management.`,
          },
          {
            term: `Integrated Test Execution`,
            description: `Run Ivy tests directly in VS Code with faster execution and tighter integration.`,
          },
          {
            term: `Engine Download & Maven Build`,
            description: `Automatic Engine management and simplified Maven builds using the standard compiler plugin.`,
          },
        ],
        links: [
          {
            label: `Axon Ivy PRO Designer 13 Extension for Visual Studio Code`,
            url: `https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-13`,
          },
          {
            label: `Deprecation of the Eclipse-based PRO Designer`,
            url: `https://community.axonivy.com/d/1149-maintenance-mode-of-the-eclipse-based-pro-designer`,
          },
          {
            label: `Axon Ivy Maven Project Build Plugin`,
            url: `https://axonivy.github.io/project-build-plugin/release/13.2/index.html`,
          },
        ],
        images: [
          `13.2/vs-code-vs-eclipse/01-project-conversion.png`,
          `13.2/vs-code-vs-eclipse/02-testing.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Designers`,
        anchor: `designers`,
        paragraphs: [
          `The latest updates deliver significant improvements to the overall design experience across both environments:`,
          `All new features are available in both tools, ensuring a consistent experience for all roles.`,
        ],
        features: [
          {
            term: `NEO Designer`,
            description: `the web-based, intuitive tool for business technologists`,
          },
          {
            term: `PRO Designer (VS Code Extension)`,
            description: `development environment for experienced developers`,
          },
          {
            term: `CMS Editor Enhancements`,
            description: `Improved multilingual editing with integrated translation.`,
          },
          {
            term: `Form Editor Enhancements`,
            description: `Support for lazy data models, listener properties, component conversion with preserved settings, a unified dialog framework, and direct control of column widths for richer, more responsive UIs.`,
          },
          {
            term: `New XHTML Editor`,
            description: `Smart code completion, validation, and contextual hover information improve speed and reliability.`,
          },
          {
            term: `Generate from Data`,
            description: `Automatic entity form generation from databases accelerates UI creation and ensures visual consistency.`,
          },
          {
            term: `Improved Configuration & Inscription Experience`,
            description: `Streamlined configuration with better defaults, tab-based settings, and more intuitive controls.`,
          },
          {
            term: `Process Modeling Refinements`,
            description: `Enhanced copy/paste, smoother insert actions, and improved undo/redo for more efficient modeling.`,
          },
          {
            term: `BPMN-2 Import Improvements`,
            description: `More reliable BPMN-2 imports with better semantic accuracy and support for standard BPMN icons.`,
          },
          {
            term: `NEO Designer Updates`,
            description: `Usability improvements and a new integrated Runtime Log View for faster diagnostics during design and testing.`,
          },
        ],
        links: [
          {
            label: `NEO Designer`,
            url: `/doc/13.2/neo-designer/index.html`,
          },
          {
            label: `PRO Designer (Deprecated)`,
            url: `/doc/13.2/designer-guide/index.html`,
          },
          {
            label: `PRO Designer (VS Code Extension)`,
            url: `https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-13`,
          },
          {
            label: `CMS Editor`,
            url: `/doc/13.2/designer-guide/cms/cms-editor.html`,
          },
          {
            label: `Form Editor`,
            url: `/doc/13.2/designer-guide/user-interface/user-dialogs/form-editor.html`,
          },
        ],
        images: [
          `13.2/designers/01-cms.png`,
          `13.2/designers/02-cms-translation.png`,
          `13.2/designers/03-form-editor-data-table.gif`,
          `13.2/designers/04-form-editor-change-type.gif`,
          `13.2/designers/05-form-editor-change-listener.gif`,
          `13.2/designers/06-xhtml-editor.gif`,
          `13.2/designers/07-generate-data.png`,
          `13.2/designers/08-generate-wizard.png`,
          `13.2/designers/09-inscription-tabs.png`,
          `13.2/designers/10-inscriptions.gif`,
          `13.2/designers/11-process-editor-undo-redo.gif`,
          `13.2/designers/12-bpmn.png`,
          `13.2/designers/13-neo-workspaces.png`,
          `13.2/designers/14-neo-recently-open.png`,
          `13.2/designers/15-neo-filters.png`,
          `13.2/designers/16-neo-bpmn-import.png`,
          `13.2/designers/17-neo-runtimelog.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Core`,
        anchor: `core`,
        paragraphs: [
          `The platform foundation is strengthened with improved cloud capabilities, better integration, and future-ready technology updates:`,
        ],
        features: [
          {
            term: `Internationalization`,
            description: `Expanded multi-language support across the Developer Workflow UI, Engine Cockpit, notifications, and error messages.`,
          },
          {
            term: `Cluster Deployment & Observability`,
            description: `Enhanced deployment options, improved IdP support for administrators, and expanded Docker and Kubernetes examples improve cloud and enterprise readiness.`,
          },
          {
            term: `Developer Workflow UI`,
            description: `Improved navigation and new filtering simplify handling large projects.`,
          },
          {
            term: `Public API & Maven Artifacts`,
            description: `Public APIs are now available as Maven artifacts, simplifying integration, automation, and extension development.`,
          },
          {
            term: `Database, Runtime & Jakarta`,
            description: `Support for SQL Server 2025, Windows Server 2025, runtime improvements, and the first step toward Jakarta EE ensure long-term Java compatibility.`,
          },
          {
            term: `Engine Cockpit`,
            description: `SSL key import simplifies secure configuration and reduces manual setup.`,
          },
          {
            term: `Mail API & IIS Script`,
            description: `A new Mail API and updated IIS deployment script streamline communication and Windows installations.`,
          },
        ],
        links: [
          {
            label: `Cluster Deployment`,
            url: `/doc/13.2/engine-guide/integration/cluster/deployment/index.html`,
          },
          {
            label: `Jakarta Migration`,
            url: `/doc/13.2/axonivy/migration/migration-notes-131-132.html#persistence-api-hibernate`,
          },
          {
            label: `Engine Cockpit - SSL Settings`,
            url: `/doc/13.2/engine-guide/reference/engine-cockpit/system.html#ssl-settings`,
          },
          {
            label: `Mail API`,
            url: `/doc/13.2/public-api/ch/ivyteam/ivy/mail/package-summary.html`,
          },
          {
            label: `IIS Script`,
            url: `https://github.com/axonivy-market/iis-proxy`,
          },
        ],
        images: [
          `13.2/core/01-internationalisation.png`,
          `13.2/core/02-dev-wf-ui.png`,
          `13.2/core/03-windows-server-2025.png`,
          `13.2/core/04-jakarta.png`,
          `13.2/core/05-engine-cockpit-ssl.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Portal`,
        anchor: `portal`,
        paragraphs: [
          `Portal 13.2 introduces faster navigation, stronger analytics and more flexible process handling. Improved accessibility, new statistics features and Side Step Processes make daily work smoother, clearer and more efficient.`,
          `And more`,
        ],
        features: [
          {
            term: `Statistics`,
            description: `With the Portal Statistics Widget Configurator, you can create meaningful insights into your process and business data in just a few clicks. Condition-based coloring for instant KPI visibility KPI-based charts using custom fields for tailored analysis Drill-down from charts directly to tasks and cases Preconfigured sample dashboards for fast setup`,
          },
          {
            term: `Accessibility`,
            description: `Improved focus order, enhanced keyboard navigation, optimized ARIA landmarks and better screen reader compatibility. Stronger contrasts, consistent labels and complete alt-text support ensure a modern, WCAG-aligned experience.`,
          },
          {
            term: `Side Step Process`,
            description: `Pause or branch from an active workflow without interrupting the main case. Perfect for clarifications, additional information requests or parallel sub-processes. Fully multilingual and ready for global teams.`,
          },
          {
            term: `Static Pages`,
            description: `Add custom info or help pages directly into the Portal navigation. Fully styled, localizable, permission-controlled and seamlessly integrated into the Portal layout.`,
          },
          {
            term: null,
            description: `Improved stability for inactive browser tabs`,
          },
          { term: null, description: `Fixes for multilingual inconsistencies` },
          {
            term: null,
            description: `Better shortcut handling in info widgets`,
          },
          { term: null, description: `More robust user menu and filters` },
          { term: null, description: `Faster loading for large UI elements` },
          { term: null, description: `Improved case detail handling` },
          {
            term: null,
            description: `Safer streamed content and file deletion workflows`,
          },
        ],
        links: [
          {
            label: `Statistic Chart`,
            url: `https://market.axonivy.com/market-cache/portal/portal-guide/13.2.0-m284/doc/en/portal-user-guide/statistic-chart/index.html`,
          },
          {
            label: `Accessibility`,
            url: `https://market.axonivy.com/market-cache/portal/portal-guide/13.2.0-m284/doc/en/portal-user-guide/accessibility/index.html`,
          },
          {
            label: `Static Pages`,
            url: `https://market.axonivy.com/market-cache/portal/portal-guide/13.2.0-m284/doc/en/portal-developer-guide/static-page/index.html`,
          },
          {
            label: `Portal`,
            url: `/doc/13.2/portal-guide/index.html`,
          },
        ],
        images: [
          `13.2/portal/01-light.png`,
          `13.2/portal/02-dark.png`,
          `13.2/portal/03-statistic-config.png`,
          `13.2/portal/04-statistc-config-colors.png`,
          `13.2/portal/05-statistic-example1.png`,
          `13.2/portal/06-statistic-examples2.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Marketplace`,
        anchor: `market`,
        paragraphs: [
          `New Market Extensions`,
          `Marketplace Website Improvements`,
        ],
        features: [
          {
            term: `Case Process Viewer`,
            description: `A new UI component visualizes the current process step directly in the Axon Ivy UI and can be integrated with a single line of code.`,
          },
          {
            term: `Chaptcha Utils`,
            description: `A ready-to-use CAPTCHA utility allows easy integration of human verification into Axon Ivy UIs for improved security.`,
          },
          {
            term: `Refactored Document Handling`,
            description: `Document handling is now available as lightweight, modular components (Axon Ivy Cells, Axon Ivy Words, ...) instead of a single large SDK. Current modules target PRO developers, with upcoming support for text processing, PDF, and image generation.`,
          },
          {
            term: `Process Analyser Improvement`,
            description: `The Process Analyzer now offers easier usage without extra counting elements, improved data analysis, a new heat color map, summarized process start analysis, and direct integration as a Portal widget.`,
          },
          {
            term: `New Mail Connector`,
            description: `A new Email Connector enables sending and receiving case-related emails with automatic case linking for full communication tracking. It supports sending, receiving, replying, forwarding, and resending via an intuitive UI.`,
          },
          {
            term: `Azure Service Bus Connector`,
            description: `New support for Azure Service Bus enables sending and receiving messages via queues and topics with multiple configurable connections.`,
          },
          {
            term: `IBM Db2 LUW`,
            description: `This connectors provides a JDBC driver for IBM's DB2 (Linux, Unix, Windows) database.`,
          },
          {
            term: null,
            description: `Improved monitoring UI for better transparency`,
          },
          {
            term: null,
            description: `Simplified publishing via GitHub workflow with just a few clicks`,
          },
          { term: null, description: `New drag & drop preview for artifacts` },
          {
            term: null,
            description: `Clearer and more readable extension changelogs`,
          },
        ],
        links: [
          {
            label: `Case Process Viewer`,
            url: `https://market.axonivy.com/case-process-viewer?version=12.0.10#description`,
          },
          {
            label: `Captcha Utils`,
            url: `https://market.axonivy.com/captcha-utils?version=12.0.7#description`,
          },
          {
            label: `Axon Ivy Cells`,
            url: `https://market.axonivy.com/axonivy-cells?version=13.1.1#description`,
          },
          {
            label: `Axon Ivy Words`,
            url: `https://market.axonivy.com/axonivy-words?version=13.1.1#description`,
          },
          {
            label: `Process Analyser`,
            url: `https://market.axonivy.com/process-analyser?version=13.1.2#description`,
          },
          {
            label: `Case Mail Component`,
            url: `https://market.axonivy.com/case-mail-component-connector?version=12.0.4#description`,
          },
          {
            label: `Azure Service Bus`,
            url: `https://market.axonivy.com/azure-servicebus-connector?version=13.1.1#description`,
          },
          {
            label: `IBM DB2 LUW`,
            url: `https://market.axonivy.com/ibm-db2-luw?version=13.1.0#description`,
          },
          {
            label: `Contributing to the Axon Ivy Market`,
            url: `https://github.com/axonivy-market/market/wiki`,
          },
          {
            label: `Market Monitoring`,
            url: `https://market.axonivy.com/monitoring`,
          },
        ],
        images: [
          `13.2/market/01-monitoring.png`,
          `13.2/market/02-product-preview.png`,
          `13.2/market/03-release-notes.png`,
          `13.2/market/04-caseprocess-viewer.png`,
          `13.2/market/05-captcha.png`,
          `13.2/market/06-case-mail.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `13.1`,
    version_title: `Axon Ivy 13.1`,
    slogan: `Improved editors and views, multilingual tooling, and a fully previewable UI experience`,
    release_date: new Date(`2025-06-06`),
    migration_guide_url: `/doc/13.1/en/axonivy/migration/index.html`,
    overview: [
      "Dialog Preview returns with a more stable, accurate implementation for real-time rendering and direct navigation to elements.",
      "NEO Designer is now fully available in German, broadening accessibility for more users.",
      "Portal gains Japanese language support alongside new statistics capabilities.",
      "Also includes CMS Editor and keyboard support improvements, multiple task responsibles, and Marketplace updates.",
    ],
    sections: [
      {
        heading: `NEO Designer`,
        anchor: `neo`,
        paragraphs: [
          `The NEO Designer continues to evolve as a modern, web-based low-code platform. In version 13.1, key improvements focus on feedback, accessibility, and content management.`,
        ],
        features: [
          {
            term: `Graph Views`,
            description: `Visual diagrams of data class hierarchies and project dependencies help users understand and navigate large project structures.`,
          },
          {
            term: `Dialog Preview`,
            description: `A reworked dialog preview allows live rendering of forms and components, with instant navigation to source definitions.`,
          },
          {
            term: `CMS Editor`,
            description: `Enhanced support for multilingual content with the ability to add, remove, and manage languages. Improved validation, filtering, and editing make content configuration more efficient.`,
          },
          {
            term: `Keyboard Support`,
            description: `Full shortcut navigation is now available across the UI, speeding up form editing, tile management, and process modeling.`,
          },
          {
            term: `Internationalization`,
            description: `The interface is now available in English and German, with all labels externalized and ready for future translations.`,
          },
          {
            term: `Simulation Control Enhancements`,
            description: `Process simulation behavior has been improved. The embedded engine can be reset or stopped without leaving the UI.`,
          },
          {
            term: `Runtime Log View`,
            description: `A built-in log viewer helps developers filter and inspect runtime logs by level, source, or project directly within the workspace.`,
          },
          {
            term: `Validation on Creation`,
            description: `Users now get immediate feedback when naming new forms or processes, preventing configuration errors early.`,
          },
        ],
        links: [
          {
            label: `NEO Designer`,
            url: `/doc/13.1/designer-guide`,
          },
        ],
        images: [
          `13.1/neo-designer/01-project-dependencies.png`,
          `13.1/neo-designer/02-data-class-graph.png`,
          `13.1/neo-designer/03-dialog-preview.png`,
          `13.1/neo-designer/04-cms.png`,
          `13.1/neo-designer/05-keyboard.png`,
          `13.1/neo-designer/06-internationalization.png`,
          `13.1/neo-designer/07-simulation-control.png`,
          `13.1/neo-designer/08-runtime-log.png`,
          `13.1/neo-designer/09-validation.png`,
        ],
        code_sample: null,
      },
      {
        heading: `PRO Designer`,
        anchor: `proDesigner`,
        paragraphs: [
          `The PRO Designer continues to evolve as the primary environment for professional developers, with version 13.1 introducing enhancements for the development of more robust and maintainable applications.`,
          `All new features introduced in the PRO Designer are also available in the NEO Designer.`,
        ],
        features: [
          {
            term: `Dialog Preview`,
            description: `Reintroduced with a more stable implementation, the preview enables live rendering of forms and XHTML dialogs with direct navigation to element definitions.`,
          },
          {
            term: `Form Editor Enhancements`,
            description: `Editable Data Tables, reusable form components (including fieldsets and panels), and visual improvements like better alignment, drag-and-drop, and new button styles enhance design flexibility. Attribute validation and keyboard support improve accuracy and speed.`,
          },
          {
            term: `Process Editor`,
            description: `Now powered by GLSP v2.3.0, the editor delivers smoother interaction and rendering. Expanded keyboard shortcuts streamline navigation and editing.`,
          },
          {
            term: `Inscription View`,
            description: `IvyScript hints, a better Function Browser, and an embedded Condition Builder improve scripting and configuration. Improved stability, especially during tab switching and editor focus.`,
          },
          {
            term: `Data Class Editor`,
            description: `Improved annotation validation and relationship configuration. Field badges and keyboard accessibility increase clarity and efficiency.`,
          },
          {
            term: `Variable Editor`,
            description: `Now faster and easier to use with large sets of variables. Inline validation and full keyboard control are supported.`,
          },
        ],
        links: [
          {
            label: `PRO Designer`,
            url: `/doc/13.1/designer-guide/index.html`,
          },
        ],
        images: [
          `13.1/pro-designer/01-dialog-preview.png`,
          `13.1/pro-designer/02-form-editor.png`,
          `13.1/pro-designer/03-process-editor.png`,
          `13.1/pro-designer/04-function-browser.png`,
          `13.1/pro-designer/05-condition-builder.png`,
          `13.1/pro-designer/06-data-class-editor.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Visual Studio Code PRO Designer Extension (Preview)`,
        anchor: `vsCodeDesigner`,
        paragraphs: [
          `The Visual Studio Code PRO Designer Extension continues to expand as the future platform for Ivy application development offering a modern, extensible, and developer-friendly alternative to the Eclipse-based PRO Designer. With version 13.1, the extension introduces key additions while continuing to support essential modeling features such as the Process Editor, Form Editor, and Variable Editor.`,
          `New in 13.1:`,
          `The extension remains in preview, and your feedback plays a central role in shaping its evolution. The goal is a modern, focused, and flexible IDE that preserves the strengths of the Eclipse-based PRO Designer while aligning with today’s development expectations.`,
        ],
        features: [
          {
            term: `Data Class Editor`,
            description: `Manage field structures, annotations, and relationships in a visual interface.`,
          },
          {
            term: `CMS Editor`,
            description: `Create and edit multilingual content (cms.yaml) with built-in validation`,
          },
          {
            term: `Improved Java Support`,
            description: `Java-based Ivy projects can now be developed and built using standard Maven tooling, without relying on Eclipse-specific configurations.`,
          },
        ],
        links: [
          {
            label: `PRO Designer`,
            url: `/doc/13.1/designer-guide/index.html`,
          },
        ],
        images: [
          `13.1/vscode-designer/01-vs-code-extension.png`,
          `13.1/vscode-designer/02-dataclass-editor.png`,
          `13.1/vscode-designer/03-cms-editor.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Core`,
        anchor: `core`,
        paragraphs: [
          `Roles and Users Responsible for Task and Process Starts:`,
        ],
        features: [
          {
            term: `Start Roles`,
            description: `you can now configuree multiple roles on a start element, allowing any of them to start the corresponding process.`,
          },
          {
            term: `Task Responsibles`,
            description: `Tasks can now be assigned to multiple roles and users simultaneously. There's no longer a need to create temporary dynamic roles just to assign a task to multiple entities.`,
          },
          {
            term: `Task Lists`,
            description: `Both the Portal and Developer Workflow UI now display all responsible users and roles for each task in the task list.`,
          },
          {
            term: `Responsibles API`,
            description: `New APIs are available to manage and query the multiple roles and users assigned to tasks.`,
          },
          {
            term: `Performance`,
            description: `The Axon Ivy System Database schema has been optimized, and the implementations of TaskQuery and CaseQuery have been improved—resulting in significantly faster query response times.`,
          },
        ],
        links: [
          {
            label: `Start Roles`,
            url: `/doc/13.1/designer-guide/process-modeling/process-elements/start.html#request-tab`,
          },
        ],
        images: [
          `13.1/core/01-request-start-tab-request.png`,
          `13.1/core/02-task-switch-gateway-tab-task.png`,
          `13.1/core/03-task-list.png`,
          `13.1/core/04-task-detail.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Portal`,
        anchor: `portal`,
        paragraphs: [
          `Discover the power of Portal 13.1 and elevate how you visualize, organize and secure your work. Dive in today and feel the difference for yourself.`,
          `And much more`,
        ],
        features: [
          {
            term: `Portal Custom Statistics`,
            description: `Build custom statistics widgets right inside the Portal. Choose between multiple chart types, aggregate task and case data with bespoke filters, pick your own colours and refresh intervals, and even secure each widget with permission rules. Custom fields are, of course, fully supported for truly tailored insights.`,
          },
          {
            term: `Pin Your Tasks and Cases`,
            description: `Keep what matters front and centre. Every user can now pin individual tasks or cases directly from any list. Use the toggle in the widget to instantly filter to your pinned items, and clean up your pins anytime from your profile.`,
          },
          {
            term: `Navigation Widget & Hidden Dashboards`,
            description: `Design guided dashboard flows without cluttering the navigation bar. Mark any dashboard as hidden, then surface it through the new Navigation Widget. Mix and match views, add permission-driven buttons, and craft multi-layered experiences for every audience.`,
          },
          {
            term: `Hardened security`,
            description: `across all supported versions – reduced attack surface for XSS, injection and other vulnerabilities.`,
          },
          {
            term: `Multiple task activators`,
            description: `– assign more than one responsible person and see them clearly in both lists and details.`,
          },
          {
            term: `Multilanguage support for custom fields`,
            description: `– manage field captions and values in any CMS language to create truly global dashboards.`,
          },
          {
            term: `100 % Japanese localisation`,
            description: `– professionally translated UI for seamless collaboration with Japanese-speaking teams.`,
          },
        ],
        links: [
          {
            label: `Portal`,
            url: `/doc/13.1/portal-guide/index.html`,
          },
        ],
        images: [
          `13.1/portal/01-statistics.png`,
          `13.1/portal/02-pin-tasks.png`,
          `13.1/portal/03-japanese.png`,
          `13.1/portal/04-navigation-widget.png`,
          `13.1/portal/05-multiple-responsibles.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Marketplace Website`,
        anchor: `market`,
        paragraphs: [],
        features: [
          {
            term: `Roles concept for marketplace community`,
            description: `We have introduced a role concept to ensure clear responsibilities for collaboration in the community: OWNER, CODEOWNER, and CONTRIBUTOR - for futher insights check out this.`,
          },
          {
            term: `German translations`,
            description: `We have provided German translations for the new Market Website well as for the Description section of each connector.`,
          },
          {
            term: `Handling of deprecated market extensions`,
            description: `Deprecated extensions are now displayed without the plus-sign in the “Compatibility” field.`,
          },
          {
            term: `Improve UX for search experience`,
            description: `The search experience on the website has been improved.`,
          },
          {
            term: `Approval step for feedback comments`,
            description: `A new approval process is being introduced for feedback management of the connectors.`,
          },
        ],
        links: [
          { label: `Axon Ivy Market`, url: `https://market.axonivy.com/` },
          {
            label: `Market`,
            url: `/doc/13.1/market/index.html`,
          },
        ],
        images: [
          `13.1/market/01-deprecation.png`,
          `13.1/market/02-german.png`,
          `13.1/market/03-plus.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Market Extensions`,
        anchor: `market-extensions`,
        paragraphs: [`Improvements of market extensions`],
        features: [
          {
            term: `Pattern Demos`,
            description: `Here, we show how our PRO developers typically solve common challenging tasks such as parallelization and task locking in customer projects.`,
          },
          {
            term: `Keycloak Connector`,
            description: `Our brand new connector enables data to flow from AxonIvy to Keycloak — for example, to support user approval workflows.`,
          },
          {
            term: `CoffeeMachine Connector`,
            description: `The Coffee Machine Connector is part of a new onboarding tutorial for Axon Ivy.`,
          },
          {
            term: `Stripe`,
            description: `This is the first connector to provide access to financial services.`,
          },
          {
            term: `GDPR Utility`,
            description: `This Axon Ivy Market Extension help you delete data in a GDPR-compliant way - simple and hassle-free!`,
          },
          {
            term: `OpenAI Connector Rework`,
            description: `We updated our OpenAI connector to OpenAI v2.3.0 (from 1.2).`,
          },
          {
            term: `DeepL Rework`,
            description: `We added parameter options to make the DeepL Connector usable in a more flexible way`,
          },
        ],
        links: [],
        images: [
          `13.1/market-artifacts/01-coffee-machine.png`,
          `13.1/market-artifacts/02-gdpr.png`,
          `13.1/market-artifacts/03-keycloak.png`,
          `13.1/market-artifacts/04-pattern-demos.png`,
          `13.1/market-artifacts/05-stripe.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `12.0`,
    version_title: `Axon Ivy 12.0`,
    slogan: `NEO - The all new Low Code Editor`,
    release_date: new Date(`2024-11-28`),
    migration_guide_url: `/doc/12.0/en/axonivy/migration/index.html`,
    overview: [
      "Introduces the NEO Designer, a streamlined, web-based low-code platform for rapid application development.",
      "New AI Assistant in the Portal supports document search, task, and process management as a virtual partner.",
      "Adds Process Analytics and Axon Ivy IDP (Intelligent Document Processing).",
      "Also includes a new Form/Data Class/Variable Editor, enhanced CORE functionality, and a mobile app.",
    ],
    sections: [
      {
        heading: `NEO Designer`,
        anchor: `neo`,
        paragraphs: [
          `We are excited to introduce the new NEO Designer, a streamlined, web-based low-code platform for rapid application development. It provides essential features to simplify task automation, reduce complexity, and deploy scalable applications efficiently.`,
          `With enhanced usability, seamless workspace management and robust integration capabilities, NEO Designer enables business users to build and maintain scalable applications with ease.`,
        ],
        features: [
          {
            term: `Enhanced Form and Process Editors`,
            description: `Upgraded Form Editor for intuitive design and a Process Editor with real-time animation for workflow visualization, along with an integrated browser for reviewing and simulating applications before deployment.`,
          },
          {
            term: `Data Class and Variable Editors`,
            description: `Includes a Data Class Editor for visualizing data and a Variable Editor that supports the import of variables across projects, streamlining complex management.`,
          },
          {
            term: `Deployment and Market Integration`,
            description: `Deploy projects directly to the Axon Ivy engine and access the Axon Ivy Market to browse and install connectors and demo workflows within the platform.`,
          },
        ],
        links: [
          {
            label: `NEO Designer`,
            url: `/doc/12.0/designer-guide`,
          },
        ],
        images: [
          `12.0/neo-designer/01-welcome-page.png`,
          `12.0/neo-designer/02-overview.png`,
          `12.0/neo-designer/03-processes.png`,
          `12.0/neo-designer/04-process.png`,
          `12.0/neo-designer/05-data-class.png`,
          `12.0/neo-designer/06-form.png`,
          `12.0/neo-designer/07-animation.gif`,
        ],
        code_sample: null,
      },
      {
        heading: `PRO Designer`,
        anchor: `proDesigner`,
        paragraphs: [
          `The PRO Designer is the essential tool for professional developers. As a facelift version of the classic Designer, it integrates a range of modern, web-based features designed to enhance productivity and streamline the development experience:`,
          `PRO Designer offers an updated environment aimed at simplifying tasks and providing flexibility for professional developers.`,
        ],
        features: [
          {
            term: `Inscription View`,
            description: `The enhanced web-based Inscription Editor replaces the previous SWT-based version. It provides a more efficient, user-friendly approach to editing inscriptions, including a streamlined UI and improved navigation, making it easier to manage complex configurations.`,
          },
          {
            term: `Form Editor`,
            description: `The new Form Editor supports the design of HTML Dialogs with a more versatile and future-proof approach. Form definitions are stored in a technology-independent format for long-term compatibility. Currently, JSF-based UIs are automatically generated from these definitions, ensuring consistency across projects.`,
          },
          {
            term: `Data Class Editor`,
            description: `The new Data Class Editor now allows switching between regular data classes, business data classes, and persistence entity data classes. It also supports adding custom annotations to any data class or field, offering greater flexibility and control over data structures.`,
          },
          {
            term: `Variable Editor`,
            description: `Instead of navigating through large YAML files, the enhanced Variable Editor provides a user-friendly interface for managing variables more efficiently, reducing complexity and improving clarity during variable configuration.`,
          },
          {
            term: `Eclipse 2024/09`,
            description: `Use the greatest and latest features of the new Eclipse Platform 2024/09.`,
          },
        ],
        links: [
          {
            label: `PRO Designer`,
            url: `/doc/12.0/designer-guide/index.html`,
          },
        ],
        images: [
          `12.0/pro-designer/01-inscription-view.png`,
          `12.0/pro-designer/02-data-class-editor.png`,
          `12.0/pro-designer/03-form-editor.png`,
          `12.0/pro-designer/04-variable-editor.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Core`,
        anchor: `core`,
        paragraphs: [`The Axon Ivy Core also has some great new features:`],
        features: [
          {
            term: `Notification`,
            description: `Task and business notifications can now be delivered through multiple channels, including the Portal, email, or Microsoft Teams. A new API has been introduced for sending custom business notifications, and users can configure which notifications they want to receive and through which channels.`,
          },
          {
            term: `CRON`,
            description: `Periodic jobs, start, and intermediate events can now be scheduled using CRON expressions. This allows for flexible configurations, ranging from once a minute to daily, weekly, monthly, or yearly schedules, providing more control over automated tasks.`,
          },
          {
            term: `Developer Workflow UI`,
            description: `Improved developer workflow UI with new features like task and case notes, simple statistics, notifications, and enhanced task, case, and process start lists to make the developer experience more efficient.`,
          },
          {
            term: `S3 Document Storage`,
            description: `Workflow documents can now be stored in S3-compatible storage systems, offering many advantages over traditional local storage.`,
          },
          {
            term: `Keycloak Identity Provider`,
            description: `Users and roles can now be managed in Keycloak, a popular open-source identity and access management system. With Keycloak you can integrate the security features of your choice like multi-factor authentication.`,
          },
          {
            term: `Java 21`,
            description: `Use the latest Java 21 language features in your projects and take advantage of all the new Java 21 performance optimizations when running your engine.`,
          },
        ],
        links: [
          {
            label: `Notifications`,
            url: `/doc/12.0/concepts/notification/index.html`,
          },
        ],
        images: [
          `12.0/core/01-notification-portal.png`,
          `12.0/core/02-notification-mail.png`,
          `12.0/core/03-notification-channels.png`,
          `12.0/core/04-notification-user-subscribe.png`,
          `12.0/core/05-cron-user-synch.gif`,
          `12.0/core/06-cron-timer-bean.png`,
          `12.0/core/07-dev-wf-ui-notes.png`,
          `12.0/core/08-dev-wf-ui-stats.png`,
          `12.0/core/09-dev-wf-ui-list.png`,
          `12.0/core/10-s3.png`,
          `12.0/core/11-keycloak.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Engine Cockpit`,
        anchor: `engineCockpit`,
        paragraphs: [
          `The engine cockpit has been updated with new features designed to simplify operations.`,
        ],
        features: [
          {
            term: `Migration Wizard`,
            description: `The migration wizard has been redesigned to assist with migrating an Engine between versions, including upgrades from one LTS (Long-Term Support) version to the next or between update releases.`,
          },
          {
            term: `Health Check`,
            description: `The new health check service performs various checks to analyze the Engine's health, providing warnings if potential issues are detected.`,
          },
          {
            term: `SSL / TLS Tester`,
            description: `Keys and certificates can now be managed through the SSL view. The TLS tester helps verify connections to databases, REST, and SOAP services, with the option to import missing certificates.`,
          },
          {
            term: `Monitoring`,
            description: `The monitoring capabilities now include eleven new views, such as System Database Info, Class Histogram, Threads, Flight Recorder, Notifications, Session, Jobs, Health, Documents, Start Events, and Intermediate Events, for better operational insights.`,
          },
          {
            term: `Security Export`,
            description: `Users, roles, user-role assignments, and permissions can now be exported to Excel files to facilitate audits or documentation.`,
          },
          {
            term: `Properties and Features`,
            description: `The properties and features of REST clients or SOAP web services can be edited directly from the cockpit.`,
          },
          {
            term: `More Improvements`,
            description: `Enhanced Active Directory and Entra ID browsers, improved configuration file editor, updated search engine view, user substitute and absence management, and options for merging and changing the security system of an application.`,
          },
        ],
        links: [
          {
            label: `Engine Cockpit`,
            url: `/doc/12.0/engine-guide/reference/engine-cockpit/index.html`,
          },
        ],
        images: [
          `12.0/engine-cockpit/01-migration-wizard.gif`,
          `12.0/engine-cockpit/02-health.gif`,
          `12.0/engine-cockpit/03-tls-tester.gif`,
          `12.0/engine-cockpit/04-montoring-system-db-info.gif`,
          `12.0/engine-cockpit/05-montoring-java.gif`,
          `12.0/engine-cockpit/06-montoring-engine.gif`,
          `12.0/engine-cockpit/07-monitoring-workflow.gif`,
          `12.0/engine-cockpit/08-security-report.png`,
          `12.0/engine-cockpit/09-web-service-properties.png`,
          `12.0/engine-cockpit/10-other-azure-idp.png`,
          `12.0/engine-cockpit/11-other-ad-idp.png`,
          `12.0/engine-cockpit/12-other-config-editor.png`,
          `12.0/engine-cockpit/13-other-search.png`,
          `12.0/engine-cockpit/14-other-substitutes.png`,
          `12.0/engine-cockpit/15-other-merge-security-system.png`,
          `12.0/engine-cockpit/16-other-change-security-system.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Mobile App`,
        anchor: `mobileApp`,
        paragraphs: [
          `Streamline Your Workflow On the Go - Axon Ivy has released a new version of the Axon Ivy Mobile App.`,
          `New Code, New Design, More Functionality!`,
          `Install the App for iOS and Android now:`,
        ],
        features: [
          {
            term: `Native iOS & Android App`,
            description: `Smooth performance and an optimized design are provided across both major mobile platforms. Support for iOS and Android ensures a consistent, user-friendly experience on any device.`,
          },
          {
            term: `Work Beyond the Office`,
            description: `Ideal for mobile scenarios such as construction sites, elevator maintenance, and other field operations. Tasks can be managed from anywhere, providing the flexibility to work wherever needed.`,
          },
          {
            term: `Native Access to Camera and Other Mobile Functions`,
            description: `The app uses integrated device capabilities such as the camera and GPS to enhance functionality and enable the use of mobile tools within the app to improve workflow efficiency.`,
          },
          {
            term: `Offline Tasks Capability`,
            description: `Productivity is maintained even without an internet connection. Offline task capabilities ensure tasks, projects, and processes can continue without interruption, regardless of connectivity.`,
          },
          {
            term: `Demo Mode`,
            description: `All app capabilities can be explored in demo mode, allowing for firsthand testing to evaluate potential process improvements.`,
          },
        ],
        links: [
          {
            label: `Android App`,
            url: `https://play.google.com/store/apps/details?id=com.axonivy`,
          },
        ],
        images: [
          `12.0/mobile-app/01-mobile-app.png`,
          `12.0/mobile-app/02-mobile-app.png`,
          `12.0/mobile-app/03-mobile-app.png`,
          `12.0/mobile-app/04-mobile-app.png`,
          `12.0/mobile-app/05-mobile-app.png`,
          `12.0/mobile-app/06-mobile-app.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Portal`,
        anchor: `portal`,
        paragraphs: [
          `Welcome to the next level of productivity and efficiency with the release of Axon Ivy Portal LTS 12! This version marks a significant milestone, combining all the powerful features and enhancements from the 11.x Leading Edge releases into one robust, stable LTS version. With LTS 12, we’re delivering the most intuitive, accessible, and customizable portal experience yet.`,
          `LTS 12 builds upon the innovations and optimizations introduced in previous versions, including:`,
          `Beyond the well-known features from versions 11.1 to 11.3, LTS 12 brings additional enhancements:`,
        ],
        features: [
          {
            term: `Axon Ivy Portal 11.1`,
            description: `Introduction of the News Widget, improved responsiveness across devices, and customizable external links based on permissions.`,
          },
          {
            term: `Axon Ivy Portal 11.2`,
            description: `Notifications, lazy loading for task and case lists, AI translations, import and export functions for dashboards, and enhanced accessibility.`,
          },
          {
            term: `Axon Ivy Portal 11.3`,
            description: `Enhanced complex filters, new statistic charts, quick search, and the full open-sourcing of the portal.`,
          },
          {
            term: `Optimized Navigation and Interface`,
            description: `The user interface has been modernized for efficiency. Customizable top-level navigation allows direct access to personalized dashboards.`,
          },
          {
            term: `Advanced Widget Functionality`,
            description: `Real-time notifications, interactive widgets, and an expanded statistics system facilitate seamless task and case management in a structured environment.`,
          },
          {
            term: `Accessibility Upgrades`,
            description: `Improvements in contrast, layouts, and keyboard navigation increase usability for users of all abilities.`,
          },
          {
            term: `Expanded Statistics Widgets`,
            description: `LTS 12 includes a variety of new statistics widgets, offering insights into tasks, priorities, case categories, and more, powered by Elasticsearch.`,
          },
          {
            term: `Open Source`,
            description: `With LTS 12, we’re thrilled to announce that the Axon Ivy Portal is now fully open source, inviting developers worldwide to explore, innovate, and contribute to the portal’s evolution.`,
          },
        ],
        links: [
          {
            label: `Portal`,
            url: `/doc/12.0/portal-guide/index.html`,
          },
        ],
        images: [
          `12.0/portal/01-new-design.png`,
          `12.0/portal/02-charts.png`,
          `12.0/portal/03-chart-config.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Meet Your New AI Assistant`,
        anchor: `ai-assistant`,
        paragraphs: [
          `With LTS 12, the portal experience reaches new heights with the introduction of the AI Assistant, acting as your virtual partner. The AI Assistant dynamically supports a range of tasks, from document searches to task and process management.`,
        ],
        features: [
          {
            term: `Portal Support`,
            description: `The AI Assistant has knowledge of the Axon Ivy documentation and allows you to add custom documentation.`,
          },
          {
            term: `Task and Process Management`,
            description: `The AI Assistant can start tasks and processes.`,
          },
          {
            term: `Search and Filter`,
            description: `It can search and filter tasks and cases.`,
          },
          {
            term: `Multilingual Support`,
            description: `Assistance in multiple languages.`,
          },
          {
            term: `Customizable Assistants`,
            description: `Create theme-based and personalized assistants.`,
          },
          {
            term: `Model-Based AI`,
            description: `Assistants are created and managed using custom models.`,
          },
          {
            term: `Custom Ivy AI Flows`,
            description: `Build custom AI logic that adds value within the Axon Ivy environment.`,
          },
        ],
        links: [],
        images: [
          `12.0/ai-assistant/01-portal-assistant.png`,
          `12.0/ai-assistant/02-ai-management.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Marketplace`,
        anchor: `market`,
        paragraphs: [
          `The marketplace has been revamped with a fresh design and a variety of new features have been added. Many exciting connectors have been added, which we offer to you as open-source.`,
          `You can find these and many other supporting tools on the Axon Ivy Market website.`,
        ],
        features: [
          {
            term: `Feedback`,
            description: `It is now possible and encouraged for you to provide feedback on each connector so that we can understand which features you like, need, and want to be added.`,
          },
          {
            term: `Features`,
            description: `We've added a range of modern features, such as dark mode and German translations. Additionally, the documentation for the connectors has been thoroughly revised.`,
          },
          {
            term: `New connectors`,
            description: `Many new connectors and utilities have been created, let us introduce some exciting new features: Vertexai-google: This connector is focusing on the Gemini model, specifically designed for advanced multimodal tasks involving visual and textual inputs. Skribble-connector: Skribble is a modern digital signature platform that provides legally binding electronic signatures that are compliant with European laws. Process-inspector: Axon Ivy’s Process Inspector tool helps you to calculate the duration to finish a workflow case.`,
          },
        ],
        links: [
          { label: `Axon Ivy Market`, url: `https://market.axonivy.com/` },
          {
            label: `Market`,
            url: `/doc/12.0/market/index.html`,
          },
        ],
        images: [`12.0/market/01-market.png`],
        code_sample: null,
      },
      {
        heading: `Process Analytics`,
        anchor: `process-analytics`,
        paragraphs: [
          `We can now visualize the usage of your processes, making it easier for you to identify bottlenecks and determine the key influencing factors.`,
        ],
        features: [
          {
            term: `KPI`,
            description: `It is possible to analyse the frequency and duration of a process run.`,
          },
          {
            term: `Timeintervall`,
            description: `You can specify the time interval for which the evaluation should be performed.`,
          },
          { term: `Custom Filter`, description: `You can filter the data` },
          {
            term: `Export`,
            description: `You can analyze the data according to custom filters for each specific process, such as filtering by Legal Entities, Department, or similar criteria—depending on what is available for the respective process.`,
          },
        ],
        links: [],
        images: [`12.0/process-analytics/01-process-analytics.png`],
        code_sample: null,
      },
      {
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
      },
    ],
  },
  {
    id: `11.3`,
    version_title: `Axon Ivy 11.3`,
    slogan: `Variables Editor and Mobile App`,
    release_date: new Date(`2024-05-23`),
    migration_guide_url: `/doc/11.3/en/axonivy/migration/index.html`,
    overview: [
      "New Variables Editor simplifies defining dynamic parts within highly configurable workflows.",
      "Completely rewritten Mobile App released for both Android and iOS.",
      "Adds a Business Notification API and a polished Inscription UI.",
      "Also includes a TLS Tester in the Engine Cockpit, plus alpha versions of the Form Editor and VS Code Extension.",
    ],
    sections: [
      {
        heading: `Variables Editor`,
        anchor: `variablesEditor`,
        paragraphs: [
          `The first of many next-generation config editors has arrived!`,
        ],
        features: [
          {
            term: `Low-Code`,
            description: `Instead of having to navigate a YAML document that can get pretty big, you can now edit your variables with a handy user interface.`,
          },
          {
            term: `Features`,
            description: `Add or delete variables, and find what you are looking for by using the integrated search functionality. After selecting a variable, you can see all its information in the detail view. Change its name, value, description, and metadata while the UI adapts to your choices.`,
          },
        ],
        links: [
          {
            label: `Variables Editor`,
            url: `/doc/11.3/designer-guide/configuration/variables.html#editor`,
          },
        ],
        images: [
          `11.3/variables-editor/01-variables-editor.png`,
          `11.3/variables-editor/02-variables-editor.gif`,
          `11.3/variables-editor/03-variables-editor.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Inscription View`,
        anchor: `inscriptionView`,
        paragraphs: [
          `The new Inscription View is finally feature complete! You are able to configure all elements on the totally redesigned interface.`,
        ],
        features: [
          {
            term: `UI update`,
            description: `Prepare to be amazed by the refreshed user interface! Thanks to the sleek new design, navigating through inscriptions has never been smoother, making oversight effortless. The UI update not only attends to the needs of advanced users but also makes the functionality more appealing for new users. Among other things, the redesign features collapsible sections for every subpart, improved tab naming, and overall interface streamlining.`,
          },
          {
            term: `Browsers`,
            description: `We added assisting browsers to search for CMS entries, DataClass attributes, Java-Types and the like. These browsers make element configurations an easy and swift user experience without the need to write any code.`,
          },
          {
            term: `Code Completion`,
            description: `A notable improvement in this version is the completion list within script/code fields. You now get more functions, types, and attributes auto-inserted whenever you ask for it.`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/11.3/designer-guide/process-modeling/process-modeling/process-inscription-editor-view.html`,
          },
        ],
        images: [
          `11.3/inscription-view/01-inscription-view.png`,
          `11.3/inscription-view/02-inscription-view.png`,
          `11.3/inscription-view/03-inscription-view.png`,
          `11.3/inscription-view/04-inscription-view.png`,
          `11.3/inscription-view/05-inscription-view.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Engine Cockpit`,
        anchor: `engineCockpit`,
        paragraphs: [
          `The Cockpit includes new features to ease your secure operations.`,
        ],
        features: [
          {
            term: `Binaries`,
            description: `The Config File Editor also lists binary key- and trust-store files now. Using the new up-/download functionality, you can edit them locally with a tool of your preference and put the modified version back in charge later on.`,
          },
          {
            term: `TLS Tester`,
            description: `Secure TLS connections from the engine to remote services can now be tested directly in the cockpit. We list supported ciphers and used certificates. You get that feature not only on REST and SOAP WebServices but for LDAPS connections too.`,
          },
          {
            term: `Focused`,
            description: `To simplify configurations onto HTTP connectors, we integrated the documentation for configurable properties into the System Configuration editor. We list defaults, descriptive docs, and valid examples to keep you focused in the cockpit, having all information in sight.`,
          },
        ],
        links: [
          {
            label: `Engine Cockpit`,
            url: `https://developer.axonivy.com/doc/11.3/engine-guide/reference/engine-cockpit`,
          },
        ],
        images: [
          `11.3/engine-cockpit/01-binary-up-down-load.png`,
          `11.3/engine-cockpit/02-ldaps-connection-test.png`,
          `11.3/engine-cockpit/03-rest-tls-test.png`,
          `11.3/engine-cockpit/04-property-with-examples.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Business Notification API`,
        anchor: `notificationAPI`,
        paragraphs: [
          `The notification feature introduced with 11.2, received further extensions.`,
        ],
        features: [
          {
            term: null,
            description: `Keep the users of a process up to date by sending business notifications with the new API.`,
          },
          {
            term: null,
            description: `Notification messages have been streamlined, improved, and look better than ever.`,
          },
          {
            term: null,
            description: `All the information needed to fulfill your daily work is only a click away with the new task or case detail link in notification messages.`,
          },
          {
            term: null,
            description: `Customize the task notification message to the needs of your process by using your self-crafted templates.`,
          },
        ],
        links: [
          {
            label: `Concept Chapter`,
            url: `/doc/11.3/concepts/notification/index.html`,
          },
        ],
        images: [
          `11.3/notification-api/01-notification.png`,
          `11.3/notification-api/02-notification.png`,
          `11.3/notification-api/03-notification.png`,
          `11.3/notification-api/04-notification.png`,
          `11.3/notification-api/05-notification.png`,
          `11.3/notification-api/06-notification.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Portal`,
        anchor: `portal`,
        paragraphs: [
          `Axon Ivy Portal 11.3 – your key to boosted productivity and seamless workflow! With an enhanced complex filter, lightning-fast search, customizable statistic charts, and real-time notifications, managing tasks and cases is effortless. Plus, now that the portal is now open source!`,
        ],
        features: [
          {
            term: `Improved Complex Filters`,
            description: `With the reinvented complex filter you can refine your task and caselist searches with ease. The new filter can combine an endless number of filter conditions. Various new filters for custom fields have been added, and even moving timeframes are now possible. So, say goodbye to endless scrolling and hello to targeted results within the task and case widget of the portal dashboard.`,
          },
          {
            term: `New Statistic Charts`,
            description: `In this release, we've overhauled and enhanced the statistics capabilities of the portal. We've introduced numerous new standard charts, and now, custom charts can also be tailored for your business users and seamlessly integrated into standard and private dashboards. Experience unparalleled performance with process data being provided through the Elasticsearch engine.`,
          },
          {
            term: `Notifications`,
            description: `Effortlessly receive real-time updates through the new Notifications in the Axon Ivy Portal. Ensuring you're always in the know about crucial tasks and project milestones. You can personalize your notification subscriptions to boost your productivity.`,
          },
          {
            term: `Quick Search & New Global Search`,
            description: `Looking for a specific task or case? We've got you covered! With the new quick search feature within the task and case widget, you'll find what you're looking for in no time. All standard fields plus the custom fields can be added to the configurable search scope, ensuring a balance between functionality and performance. Plus, we've redesigned the global search for clearer and faster results.`,
          },
          {
            term: `Portal goes Open Source`,
            description: `We're thrilled to announce that the Axon Ivy Portal is now #OpenSource! 🚀 This means that developers everywhere can dive into our powerful portal technology, explore its capabilities, and contribute to its evolution.`,
          },
          {
            term: `And much more...`,
            description: `You can now add custom case fields to your task list to display case-related information directly next to your tasks. Additionally, we've introduced the capability to define action buttons in the case list, allowing you to trigger case-related processes effortlessly. To top it off, we've enhanced the Process Information Page, improving its flexibility and multilanguage support for a better user experience.`,
          },
        ],
        links: [
          {
            label: `Portal`,
            url: `/portal/11.3/doc`,
          },
        ],
        images: [
          `11.3/portal/01-portal.png`,
          `11.3/portal/02-portal.png`,
          `11.3/portal/03-portal.png`,
          `11.3/portal/04-portal.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Mobile App`,
        anchor: `mobileApp`,
        paragraphs: [
          `Streamline Your Workflow On the Go - Axon Ivy has released a new version of the Axon Ivy Mobile App.`,
          `New Code, New Design, lots of functionalities!`,
          `Install the App for iOS and Android now:`,
        ],
        features: [
          {
            term: `Native iOS & Android App`,
            description: `Experience smooth performance and tailored design on both major mobile platforms. The app's compatibility with iOS and Android ensures seamless integration and user-friendly operation.`,
          },
          {
            term: `Work Beyond the Office`,
            description: `The app is perfect for mobile use cases like construction sites, elevator maintenance, and other on-the-go scenarios. You can work on your tasks in any environment, giving you the freedom to work from wherever your business takes you.`,
          },
          {
            term: `Native Access to Camera and Other Mobile Functions`,
            description: `Take full advantage of your device's built-in features, including the camera, GPS, and other mobile tools. Capture images, scan documents, and leverage other capabilities directly from the app to streamline your workflow and enhance productivity.`,
          },
          {
            term: `Offline Tasks Capability`,
            description: `Stay productive even when you're off the grid with offline task management. This feature ensures you can continue working on tasks, projects, and processes without interruption, regardless of network connectivity.`,
          },
          {
            term: `Demo Mode`,
            description: `Explore the app's full range of capabilities with its convenient demo mode. Test out all features and functions right now firsthand to see how it can elevate your processes.`,
          },
        ],
        links: [
          {
            label: `Android App`,
            url: `https://play.google.com/store/apps/details?id=com.axonivy`,
          },
        ],
        images: [
          `11.3/mobile-app/01-mobile-app.png`,
          `11.3/mobile-app/02-mobile-app.png`,
          `11.3/mobile-app/03-mobile-app.png`,
          `11.3/mobile-app/04-mobile-app.png`,
          `11.3/mobile-app/05-mobile-app.png`,
          `11.3/mobile-app/06-mobile-app.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Form Editor (Alpha) 🧪`,
        anchor: `formEditor`,
        paragraphs: [
          `We are enabling you to build user interfaces like never before.`,
        ],
        features: [
          {
            term: `Low-Code`,
            description: `Committed to letting everyone partake in building UIs, the new Form Editor lets you define contents without writing any code. Drag and Drop skills are all you need to start your creative journey.`,
          },
          {
            term: `Agnostic`,
            description: `Building the UI in technology-neutral mannor, we automatically generate the views for JSF as before. However, you're no longer the maintainer of them and can refrain from efforts to make them functional and keep them stable.`,
          },
          {
            term: `Alpha`,
            description: `Looking for feedback, we already integrated an early Alpha version of our new Form Editor. Nevertheless, we plan to support much more widgets, and integrations of complex components until the LTS 12 release.`,
          },
        ],
        links: [
          {
            label: `Form Editor`,
            url: `/doc/11.3/designer-guide/user-interface/user-dialogs/form-editor.html`,
          },
        ],
        images: [
          `11.3/form-editor/01-form-widget-drop.png`,
          `11.3/form-editor/02-form-demo.gif`,
        ],
        code_sample: null,
      },
      {
        heading: `Visual Studio Code Designer Extension (Alpha) 🧪`,
        anchor: `vsx-designer`,
        paragraphs: [
          `We're doing the first valiant explorative steps towards a web-based IDE.`,
        ],
        features: [
          {
            term: `Visual Studio Code`,
            description: `We publish the first simple citizen developer toolset for Visual Studio Code as an extension. Though we haven't decided yet about the final runtime environment, Visual Studio Code seems like a very promising base to serve the Designer of the future.`,
          },
          {
            term: `Editors`,
            description: `Important editors, for Variables, Forms, and Processes were developed to run natively in the Browser. Therefore, we already integrated these editors into our Designer extensions. This enables valiant early bird adopters to use the same feature set as within the classic Eclipse Designer.`,
          },
          {
            term: `Views`,
            description: `With our custom Projects-View and the integrated Browsers, we already provide a welcoming environment to build first projects and simulate runs of processes.`,
          },
          {
            term: `Workspaces`,
            description: `Exploring dev-containers, we already gained trust, that this is an easy and powerful stack to share complex workspace setups. Focusing developers to work instantly, without the need to run manual setups.`,
          },
          {
            term: `Cloud-ready`,
            description: `With Github Codespaces, the Designer runs natively in the cloud. This gives us many options, to build processes anywhere in no time.`,
          },
        ],
        links: [
          {
            label: `VS Marketplace`,
            url: `https://marketplace.visualstudio.com/items?itemName=axon-ivy.designer-11`,
          },
        ],
        images: [`11.3/vsx-designer/01-add-project.gif`],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Marketplace`,
        anchor: `marketplace`,
        paragraphs: [
          `The Axon Ivy Marketplace is rapidly expanding, continually enriching its collection with innovative artifacts each day.`,
          `Discover how the Axon Ivy Marketplace can transform your business processes today!`,
        ],
        features: [
          {
            term: `Artificial Intelligence`,
            description: `AI has come to stay. The Axon Ivy Market also offers numerous AI-driven connectors and assistance. The ChatGPT Assistant extends the Axon Ivy Designer for code completion, code analysis, and BPMN modeling. With AWS AI Services, NLP and chatbots become child's play.`,
          },
          {
            term: `Microsoft 365`,
            description: `Unleash the full potential of Microsoft 365 within your business processes. The Microsoft Graph API connector allows seamless interaction with any Microsoft service directly from Axon Ivy.`,
          },
          {
            term: `E-Signatures`,
            description: `Streamline document handling with our reliable e-signature connectors. Send and sign documents effortlessly using solutions like DocuSign eSignature and Adobe Acrobat Sign, enhancing the efficiency and reducing the costs of your business operations.`,
          },
          {
            term: `Miscellaneous Tools`,
            description: `But that's not all! Little helpers such as parcel tracking with UPS, the Salesforce connector, Apache Kafka for event streaming, the weather service from OpenWeather or the simple integration of Google Maps help enormously with the automation of business processes.`,
          },
        ],
        links: [
          { label: `Axon Ivy Market`, url: `https://market.axonivy.com/` },
        ],
        images: [
          `11.3/marketplace/01-market.png`,
          `11.3/marketplace/02-market.png`,
          `11.3/marketplace/03-market.png`,
          `11.3/marketplace/04-market.png`,
          `11.3/marketplace/05-market.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `11.2`,
    version_title: `Axon Ivy 11.2`,
    slogan: `Notifications and Inscriptions`,
    release_date: new Date(`2023-12-01`),
    migration_guide_url: `/doc/11.2/en/axonivy/migration/index.html`,
    overview: [
      "New notification framework informs users about events like new tasks across channels (Portal, email, Microsoft Teams).",
      "Inscription view is now integrated directly into the process editor for easier configuration.",
      "Adds lazy loading of Task/Case lists in Portal and numerous Engine Cockpit features.",
      "Also includes CRON-triggered event starts, S3 document store, and JSON schema-based config editors.",
    ],
    sections: [
      {
        heading: `Notification`,
        anchor: `notification`,
        paragraphs: [
          `User notifications have been completely redesigned to provide a holistic user experience. Not only end-users get a transparent notification journey, but also system administrators benefit from a simplified management experience.`,
        ],
        features: [
          {
            term: `Channels`,
            description: `With the Web, Mail, and Microsoft Teams channels, Axon Ivy Engine comes with three built-in channels.`,
          },
          {
            term: `Templating`,
            description: `The content of the user notifications can be changed via a standardized templating mechanism.`,
          },
          {
            term: `Subscription`,
            description: `Administrators can set the default subscriptions, and the users themselves can override these settings in their profiles.`,
          },
          {
            term: `Monitoring`,
            description: `Notifications will be traced and can be monitored in the Axon Ivy Engine Cockpit.`,
          },
        ],
        links: [
          {
            label: `Concept Chapter`,
            url: `/doc/11.2/concepts/notification/index.html`,
          },
        ],
        images: [
          `11.2/notification/00-portal-notification.png`,
          `11.2/notification/01-engine-cockpit-notification-channels.png`,
          `11.2/notification/02-engine-cockpit-monitor-notifications.png`,
          `11.2/notification/03-engine-cockpit-monitor-notification-deliveries.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Portal`,
        anchor: `portal`,
        paragraphs: [
          `Packed with new features like notifications, enhancements to the Portal Dashboards, and multiple improvements for a smoother and more efficient user experience.`,
          `And much more:`,
        ],
        features: [
          {
            term: `Notifications`,
            description: `The portal seamlessly integrates the redesigned notifications provider of the Axon Ivy engine. These notifications are prominently displayed within the portal interface, allowing users to filter, mark notifications as read, and efficiently manage their preferences. Users can easily subscribe or unsubscribe to various notification channels, ensuring a tailored and personalized notification experience.`,
          },
          {
            term: `Lazy Loading Task and Case Lists`,
            description: `We have optimized the task and case lists by removing pagination in favor of implementing lazy loading.`,
          },
          {
            term: `AI Translations`,
            description: `With the possibility of integrating DeepL into the Portal, creating multi-language dashboards has become remarkably convenient. Widget titles and published news within the news widget can be translated effortlessly with the assistance of AI technology.`,
          },
          {
            term: `Import, Export, and Sharing of Portal Dashboards`,
            description: `With Import/Export functionality, seamlessly move and duplicate dashboards across different environments. Sharing dashboards empowers collaboration by allowing the sharing of customized dashboards via a link with team members.`,
          },
          {
            term: `Enhanced Accessibility for Custom Dashboard Widgets`,
            description: `The custom widget can display a predefined Ivy process directly in the dashboard, embedded into a dashboard widget. If you use this functionality, selecting and adding available custom widgets to your dashboard has become much more straightforward!`,
          },
          {
            term: null,
            description: `Custom Order of the Processes in the Dashboard Process Widget`,
          },
          {
            term: null,
            description: `More End-user-like business states for tasks and cases`,
          },
          { term: null, description: `Skeleton loading in the portal` },
        ],
        links: [
          {
            label: `Portal`,
            url: `/portal/11.2/doc`,
          },
        ],
        images: [
          `11.2/portal/01-dashboard-share.png`,
          `11.2/portal/02-all-sorting-options.png`,
          `11.2/portal/03-deepL-in-use.png`,
          `11.2/portal/04-new-custom-widget-selection-dialog.png`,
          `11.2/portal/05-notification.png`,
          `11.2/portal/06-skeleton.gif`,
        ],
        code_sample: null,
      },
      {
        heading: `Inscription View (Beta)`,
        anchor: `inscriptionView`,
        paragraphs: [
          `We are one step further on our path to finalizing our new web-based Inscription Views! We replaced default inscriptions from the old SWT-based software and experienced the future of inscription editing. Besides new features, we integrated it fully inside the process editor and gave it a big UI / UX update.`,
        ],
        features: [
          {
            term: `Process Editor integration`,
            description: `The new inscription view is fully integrated into the existing process editor to provide the best user experience. Implemented as a sidebar, a double click upon an element opens it, and subsequent selections will update the view.`,
          },
          {
            term: `Faster`,
            description: `The new UI lazy loads all data and additional information to improve the loading speed.`,
          },
          {
            term: `Undo`,
            description: `If you make changes and want to revert them, you can undo a complete section with one click.`,
          },
          {
            term: `Validations`,
            description: `Validation messages are now directly located to the configuration input to give you a better hint of what and where something is wrong.`,
          },
          {
            term: `UI update`,
            description: `We spent a big UI update to the inscription view to improve the overview of your configurations.`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/doc/11.2/designer-guide/process-modeling/process-modeling/process-inscription-editor-view.html`,
          },
        ],
        images: [
          `11.2/inscription-view/01-integration.gif`,
          `11.2/inscription-view/02-validations.png`,
          `11.2/inscription-view/03-ui-update.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Engine Cockpit`,
        anchor: `engineCockpit`,
        paragraphs: [
          `We added fantastic world-class monitoring, user management, operations, and configuration features to the Engine Cockpit.`,
          `The Engine Cockpit is now also available in the Axon Ivy Designer. The Preferences for SSL Client and Email were removed. Use the Engine Cockpit to configure these settings.`,
        ],
        features: [
          {
            term: `Configuration`,
            description: `The new System/SSL view to manage your certificates. The new System/Config File Editor helps you view and edit any configuration file.`,
          },
          {
            term: `User Management`,
            description: `The user details view shows a user's substitutes and absences. The security identity provider configuration view has been re-implemented and now features a directory browser for Microsoft Entra ID (formally known as Azure AD).`,
          },
          {
            term: `Operations`,
            description: `Restart the Axon Ivy Engine with the Engine Cockpit. Merge security contexts and move applications to help you migrate your Axon Ivy Engine from LTS 8`,
          },
          {
            term: `Monitoring`,
            description: `Use the new Class Histogram, Threads, Flight Recorder view to analyze memory leaks, performance bottlenecks, or endless loops. Also, the Notification, Documents, Start Events, and Intermediate Events view were added.`,
          },
        ],
        links: [
          {
            label: `Engine Cockpit`,
            url: `/doc/11.2/engine-guide/reference/engine-cockpit`,
          },
        ],
        images: [
          `11.2/engine-cockpit/01-ssl.png`,
          `11.2/engine-cockpit/02-substitutes-absences.png`,
          `11.2/engine-cockpit/03-azure-idp.png`,
          `11.2/engine-cockpit/04-ad-idp.png`,
          `11.2/engine-cockpit/05-restart.png`,
          `11.2/engine-cockpit/06-merge-security-system.png`,
          `11.2/engine-cockpit/07-change-security-system.png`,
          `11.2/engine-cockpit/08-class-histogram.png`,
          `11.2/engine-cockpit/09-jfr.png`,
        ],
        code_sample: null,
      },
      {
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
        images: [
          `11.2/s3/01-S3.png`,
          `11.2/s3/02-engine-cockpit-documents.png`,
        ],
        code_sample: null,
      },
      {
        heading: `CRON expressions`,
        anchor: `cron`,
        paragraphs: [
          `You can now configure periodical jobs by using CRON expressions. CRON expressions give you a broad spectrum of possible configurations. From once every minute to every day, week, month, or year.`,
        ],
        features: [
          {
            term: `User Synchronisation`,
            description: `You can now define the time by a CRON expression, allowing synchronizations multiple times a day or only on weekends.`,
          },
          {
            term: `Timer Bean`,
            description: `Use a CRON expression on the new Start Event Bean ch.ivyteam.ivy.process.eventstart.beans.TimerBean to define when your processes are started.`,
          },
          {
            term: `Poller API`,
            description: `The definition of polling intervals in your Start and Intermediate Event Beans has become much easier with the new fluent poll() API`,
          },
          {
            term: `Monitoring`,
            description: `Monitor all jobs and all your Start and Intermediate Event Beans in the new Jobs, Start Events, and Intermediate Events view of the Engine Cockpit.`,
          },
        ],
        links: [
          {
            label: `Engine Guide - Configuration`,
            url: `/doc/11.2/engine-guide/configuration/advanced-configuration.html#cron-expression`,
          },
        ],
        images: [
          `11.2/cron/01-user_synch.gif`,
          `11.2/cron/02-timer-bean.png`,
          `11.2/cron/03-jobs.png`,
          `11.2/cron/04-start-events.png`,
          `11.2/cron/05-start-event.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Config File Editor`,
        anchor: `configEditor`,
        paragraphs: [
          `Reviewing and editing engine configuration files is simple and powerful with the new built-in Config File Editor.`,
          `While editing our prominent YAML files, you have a rich set of authoring features at hand:`,
        ],
        features: [
          {
            term: `Validation`,
            description: `Keys used within the YAML files are validated against the official schema. So, invalid values are being blamed with a warning marker.`,
          },
          {
            term: `Completion`,
            description: `By pressing CTRL + Space, the context completion helps you identify and select valid configuration values or keys.`,
          },
          {
            term: `Help`,
            description: `Hovering over keys lets you get context-specific documentation right where you are editing.`,
          },
          {
            term: `Formatting`,
            description: `YAML content has strict formatting rules, and the editor ensures whitespace indents are correct and in effect.`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/11.2/engine-guide/reference/engine-cockpit/system.html#engine-cockpit-config-editor`,
          },
        ],
        images: [
          `11.2/config-editor/01-config-file-editor.gif`,
          `11.2/config-editor/02-context-values.png`,
          `11.2/config-editor/03-context-keys.png`,
          `11.2/config-editor/04-validate-keys.png`,
          `11.2/config-editor/05-hover-help.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Growing Market`,
        anchor: `market`,
        paragraphs: [
          `Our Axon Ivy Market is growing and offering more goods from the shelf. These products are compatible with LTS 10. So there's no need to join the leading-edge train to use these powerful products in your daily work.`,
          `AI and Robotics: Let's delegate the tedious work to the machines!`,
          `Swissness: Local goods built in our headquarters`,
          `Infrastructure: Powerful and simple to integrate`,
          `Low Code Extensions: Making beginners and professionals more productive`,
        ],
        features: [
          { term: null, description: `Axon Ivy RPA` },
          { term: null, description: `Chat GPT Connector` },
          { term: null, description: `DeepL Connector` },
          { term: null, description: `SBB` },
          { term: null, description: `SRF Meteo` },
          { term: null, description: `Threema` },
          { term: null, description: `Docker` },
          { term: null, description: `Kafka` },
          { term: null, description: `Graph QL` },
          { term: null, description: `Chat GPT Assistant` },
          { term: null, description: `Excel Dialog Importer` },
        ],
        links: [
          { label: `Browse the Market`, url: `/market` },
          {
            label: `Market docs`,
            url: `/doc/11.2/market/index.html`,
          },
          {
            label: `Contribution Wiki`,
            url: `https://github.com/axonivy/market/wiki`,
          },
        ],
        images: [`11.2/market/01-market.png`],
        code_sample: null,
      },
    ],
  },
  {
    id: `11.1`,
    version_title: `Axon Ivy 11.1`,
    slogan: `Workflow Statistic API`,
    release_date: new Date(`2023-05-03`),
    migration_guide_url: `/doc/11.1/en/axonivy/migration/index.html`,
    overview: [
      "New blazing-fast REST API delivers workflow statistics with complex aggregations (buckets and metrics) over cases and tasks.",
      "Next Generation Inscription View streamlines process configuration.",
      "Adds Azure AD user property synchronization and a News widget for Portal Dashboards.",
      "Continued improvements to the Engine Cockpit.",
    ],
    sections: [
      {
        heading: `Workflow Statistic API`,
        anchor: `workflowStatistic`,
        paragraphs: [
          `Introducing our latest addition to workflow statistics - a blazing-fast REST API that provides valuable insights into your business processes. Here are some of the key features:`,
          `Upgrade your workflow statistics today with our powerful REST API, and start enjoying faster, more complex, and more fully featured insights into your business processes.`,
        ],
        features: [
          {
            term: `REST API`,
            description: `Access the REST API from anywhere you need it, with an OpenAPI specification that makes it easy to integrate into your workflows.`,
          },
          {
            term: `Fast`,
            description: `Enjoy lightning-fast performance thanks to our Elasticsearch-based statistics generation, which can aggregate data in milliseconds.`,
          },
          {
            term: `Complex`,
            description: `Get detailed insights into your tasks and cases with complex clustering and metric options, including sum, average, max, min, and count.`,
          },
          {
            term: `Full-featured`,
            description: `Take advantage of full-featured cases and tasks with custom fields to get the insights you need to optimize your workflows.`,
          },
        ],
        links: [
          {
            label: `Open API Specification`,
            url: `/api-browser?configUrl=https%3A%2F%2Fdeveloper.axonivy.com%2Fdoc%2F11.1%2Fopenapi%2Fconfig.json&urls.primaryName=default`,
          },
        ],
        images: [`11.1/workflow-statistics/01-workflow-statistic.png`],
        code_sample: null,
      },
      {
        heading: `Inscription View (Preview)`,
        anchor: `inscriptionView`,
        paragraphs: [
          `Introducing our revolutionary new web-based Inscription Editor - the first of many exciting updates to come! Say goodbye to the old SWT-based software and experience the future of inscription editing. While it may not yet support all configurations, this powerful tool is just a preview of what's to come, and with ongoing development, the possibilities are endless. Don't miss out on this exciting glimpse into the future of inscription editing - try it out today!`,
        ],
        features: [
          {
            term: `Browser compatible`,
            description: `The new inscription view runs on native web technologies.`,
          },
          {
            term: `View`,
            description: `Implemented as a View, our tool eliminates the need for pop-up dialogs and dynamically updates the content as you select different elements.`,
          },
          {
            term: `Immediate feedback`,
            description: `New technology, faster feedback - our goal is to enhance your user experience.`,
          },
          {
            term: `IvyScript editor`,
            description: `Experience IvyScript like never before with our use of the Monaco editor, complete with auto-completion and an improved writing interface.`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/doc/11.1/designer-guide/process-modeling/process-modeling/process-inscription-editor-view.html`,
          },
        ],
        images: [
          `11.1/inscription-view/01-inscription-view.gif`,
          `11.1/inscription-view/02-dark-mode.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Engine Cockpit`,
        anchor: `engineCockpit`,
        paragraphs: [
          `Unlock the full potential of your engine with our latest update! Introducing three brand new views in the Engine Cockpit, designed to help you analyze and troubleshoot any issues with your search engine, sessions, and threads. With these powerful new tools, you can take control of your engine and optimize its performance like never before. Try it out today and see the difference for yourself!`,
        ],
        features: [
          {
            term: `Search Engine`,
            description: `Easily browse indexed documents and configure options with our intuitive view. Plus, enjoy the added convenience of reindexing your index in one place.`,
          },
          {
            term: `Threads`,
            description: `Create thread dumps like a pro with our easy-to-use view. Discover detected deadlocks, current locks, and stack traces all in one place.`,
          },
          {
            term: `Sessions`,
            description: `Take control of your sessions with our powerful management view. Get all the necessary information, including session creation and user authentication details.`,
          },
        ],
        links: [
          {
            label: `Engine Cockpit`,
            url: `/doc/11.1/engine-guide/reference/engine-cockpit`,
          },
        ],
        images: [
          `11.1/engine-cockpit/01-cockpit-elastic.png`,
          `11.1/engine-cockpit/02-cockpit-elastic-doc.png`,
          `11.1/engine-cockpit/03-cockpit-threads.png`,
          `11.1/engine-cockpit/04-cockpit-sessions.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Azure AD User Properties`,
        anchor: `azure`,
        paragraphs: [
          `We're excited to announce that our Azure AD support has just improved! With our latest update, you can easily synchronize user properties from Azure Active Directory with Axon Ivy user properties. You can seamlessly integrate essential details like phone numbers and department information into your workflows for a more streamlined user experience.`,
          `But that's not all - we've also added a powerful new feature that lets you inspect all role mappings directly from the configuration view of Azure Active Directory. This makes managing permissions easier than ever and keeps your workflows running smoothly.`,
          `Here are some key features of our latest update:`,
          `Upgrade your Azure AD integration today and experience the power of seamless user property synchronization and enhanced role mapping management.`,
        ],
        features: [
          {
            term: null,
            description: `Synchronize user properties from Azure AD with Axon Ivy user properties.`,
          },
          {
            term: null,
            description: `Seamlessly integrate phone numbers, department information, and more.`,
          },
          {
            term: null,
            description: `Inspect all role mappings directly from the Azure AD configuration view.`,
          },
          {
            term: null,
            description: `Simplify permission management and keep your workflows running smoothly.`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/11.1/engine-guide/integration/identity-provider/azure-ad`,
          },
        ],
        images: [
          `11.1/azure/01-user-property-config.png`,
          `11.1/azure/02-user-property-synch.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Portal`,
        anchor: `portal`,
        paragraphs: [
          `Upgrade your dashboard experience with our latest features and take your productivity to new heights. Try them out now and see the difference for yourself.`,
          `And much more:`,
        ],
        features: [
          {
            term: `Introducing the new News Widget for Portal Dashboards`,
            description: `Stay up-to-date with the latest features and updates within your organization or solution with just a glance. Our News Widget makes publishing new features easier than ever before, so you can keep your team informed without any hassle.`,
          },
          {
            term: `Improved Responsiveness on the Dashboard`,
            description: `We're also excited to announce that we've improved the responsiveness of our dashboard widgets. Whether you're on a desktop, laptop, tablet, or phone, our widgets will look great on all screen sizes and devices.`,
          },
          {
            term: `Enhanced External Links`,
            description: `Users can now configure external references to other tools based on permissions and add them to the Dashboard with a matching icon. It's never been easier to access all the tools and resources you need in one place.`,
          },
          {
            term: null,
            description: `Customize your widgets even more with HTML snippets and CSS. Personalize your dashboard to fit your unique needs and style.`,
          },
          {
            term: null,
            description: `Enjoy faster and smoother performance thanks to our performance optimizations for the task and case widgets as well as the process start widget. Access all your data and information quickly and easily.`,
          },
          {
            term: null,
            description: `Migrate your dashboard configurations with ease in the future by introducing a dashboard JSON version that will be used for future automated migrations.`,
          },
          {
            term: null,
            description: `Use HTML in your task and case descriptions to add formatting. Make your descriptions more informative and engaging.`,
          },
        ],
        links: [
          {
            label: `Portal`,
            url: `/portal/11.1/doc`,
          },
        ],
        images: [`11.1/portal/01-dashboard.png`, `11.1/portal/02-news.png`],
        code_sample: null,
      },
    ],
  },
  {
    id: `10.0`,
    version_title: `Axon Ivy 10.0`,
    slogan: `All new user experience`,
    release_date: new Date(`2022-10-17`),
    migration_guide_url: `/doc/10.0/en/axonivy/migration/index.html`,
    overview: [
      "LTS release consolidating all new features introduced across the 9.x Leading Edge releases.",
      "Delivers a fully refreshed, all-new user experience.",
    ],
    sections: [
      {
        heading: `All 9.x LE features`,
        anchor: `all`,
        paragraphs: [
          `This new LTS release includes all latest 9.x LE features.`,
        ],
        features: [
          {
            term: `9.1`,
            description: `Efficient user scaling and simplified testing`,
          },
          { term: `9.2`, description: `OpenAPI power and Axon Ivy Market` },
          {
            term: `9.3`,
            description: `Grow with your business and simplified configuration files`,
          },
          {
            term: `9.4`,
            description: `New Process Editor and multiple application context`,
          },
        ],
        links: [
          { label: `Release 10.0`, url: `https://release.axonivy.com` },
          { label: `News 9.x`, url: `/news` },
        ],
        images: [
          `10.0/all-le-features/01-process-editor.png`,
          `10.0/all-le-features/02-market-browse.png`,
          `10.0/all-le-features/03-scaling.jpg`,
          `10.0/all-le-features/04-test-flavour-selection.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `9.4`,
    version_title: `Axon Ivy 9.4`,
    slogan: `New process editor`,
    release_date: new Date(`2022-09-13`),
    migration_guide_url: `/doc/9.4/en/axonivy/migration/index.html`,
    overview: [
      "New Process Editor makes drawing business processes significantly easier.",
      "Individual Dashboards let users personalize the Portal with custom welcome screens and task/case lists.",
      "Multiple Applications Context allows defining security boundaries across applications.",
      "Also includes a new CMS, Azure AD support, multi-lingual workflows, and a new process file format.",
    ],
    sections: [
      {
        heading: `New Process Editor`,
        anchor: `processEditor`,
        paragraphs: [
          `Version 9.4 replaces the old AWT-based Process Editor with a new, fully web-based alternative. The new editor allows you to implement business processes even faster.`,
        ],
        features: [
          {
            term: `Browser compatible`,
            description: `The new process editor runs on native web technologies.`,
          },
          {
            term: `Element palette`,
            description: `The element palette is now divided into different categories to facilitate your search for the desired element.`,
          },
          {
            term: `Quick Actions`,
            description: `Besides the new look and feel of the editor view, there is a new way to interact with process elements. The Quick Action Bar gives you a range of actions which can be triggered (e.g. open an inscription mask or append a new element).`,
          },
          {
            term: `Process viewer on engine`,
            description: `The Dev-Workflow-UI and the Axon Ivy Portal now provide a process viewer.`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/doc/9.4/designer-guide/process-modeling/process-modeling/process-editor.html`,
          },
        ],
        images: [
          `9.4/new-process-editor/01-run-quick-action.png`,
          `9.4/new-process-editor/02-element-palette.png`,
          `9.4/new-process-editor/03-dark-mode.png`,
          `9.4/new-process-editor/04-portal-process-viewer.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Multiple applications per security context`,
        anchor: `multiApp`,
        paragraphs: [
          `Axon Ivy applications no longer impose hard boundaries on each other. Applications are part of a security system in which users and roles live. This enables independent feature-driven development.`,
        ],
        features: [
          {
            term: `Feature Driven Development (FDD)`,
            description: `It is no longer necessary to pack everything into one application and have a risk of clumping. Different sub-applications can be developed in independent applications and still have the same user and role base.`,
          },
          {
            term: `Independent release cycles`,
            description: `By splitting your application into multiple applications, you can develop each application independently and maintain an independent release cycle.`,
          },
          {
            term: `Standalone Portal`,
            description: `The Axon Ivy Portal no longer needs to be part of your application. Run the portal in its own application and integrate your business processes using the iFrame approach and keep the portal up-to-date and leave all migration pain behind.`,
          },
          {
            term: `Multi Tenancy`,
            description: `For multi-tenancy, we strongly recommend to run a separate Axon Ivy Engine per tenant and to orchestrate this in a container platform. If you want to run multi-tenancy on one engine, then we recommend to set up one security system per tenant and run the tenant's applications in this security system.`,
          },
        ],
        links: [
          {
            label: `Application Lifecycle`,
            url: `/doc/9.4/concepts/application-lifecycle/index.html`,
          },
          {
            label: `Multi Tenancy`,
            url: `/doc/9.4/concepts/multi-tenancy/index.html`,
          },
        ],
        images: [
          `9.4/multi-app-context/01-multi-app.png`,
          `9.4/multi-app-context/02-multi-tenancy.png`,
        ],
        code_sample: null,
      },
      {
        heading: `UI Revisions`,
        anchor: `ui-revision`,
        paragraphs: [
          `We refurbished our general look and feel with a new PrimeFaces version, a new default theme and a completely new way to brand an Axon Ivy Engine for your company.`,
        ],
        features: [
          {
            term: `PrimeFaces 11`,
            description: `We updated from PrimeFaces 7 to 11, which means a lot of new and updated widgets. Be aware of our separate PrimeFaces Migration-Guide.`,
          },
          {
            term: `Freya Theme`,
            description: `We also provide the Freya Theme as the new default theme for your HTML Dialogs. Its fresh look also supports dark mode and of course we updated the Dev-Workflow-UI and the Engine Cockpit to use this new theme.`,
          },
          {
            term: `Branding`,
            description: `There is a completely new way to brand an Axon Ivy Engine with the colors and logo of your company, without the need to change the Axon Ivy Portal standard.`,
          },
        ],
        links: [
          {
            label: `PF 11 Migration Notes`,
            url: `/doc/9.4/axonivy/migration/migration-notes-94.html#primefaces-11`,
          },
          {
            label: `Freya Theme`,
            url: `/doc/9.4/designer-guide/user-interface/user-dialogs/html-dialog-themes.html#freya-themes`,
          },
          {
            label: `Branding`,
            url: `/doc/9.4/designer-guide/user-interface/branding/index.html`,
          },
        ],
        images: [
          `9.4/ui-revisions/01-cockpit.png`,
          `9.4/ui-revisions/02-cockpit-branding.png`,
          `9.4/ui-revisions/03-portal-branding.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Azure Active Directory`,
        anchor: `azure`,
        paragraphs: [
          `With Azure Active Directory, Axon Ivy is now able to support its first cloud-based identity provider. This means that your employees can simply use the well-known Microsoft login in order to access the Axon Ivy platform.`,
        ],
        features: [
          {
            term: `Simple user management`,
            description: `Maintain your users in one place, namely Azure Active Directory. Easily synchronize these users with Axon Ivy and make your business processes instantly accessible to the entire organization.`,
          },
          {
            term: `User credentials`,
            description: `Employees do not have to worry about additional user credentials. Access is simple and secure via the Microsoft login.`,
          },
          {
            term: `OAuth 2.0`,
            description: `With Microsoft login, the industry-standard OAuth 2.0 protocol is used for authentication. Consequently, Axon Ivy is no longer aware of these users' passwords and secure delegated access is granted.`,
          },
        ],
        links: [
          {
            label: `Azure Active Directory`,
            url: `/doc/9.4/engine-guide/integration/identity-provider/azure-ad/index.html`,
          },
        ],
        images: [
          `9.4/azure-ad/01-azure.gif`,
          `9.4/azure-ad/02-azure.png`,
          `9.4/azure-ad/03-azure.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Workflow`,
        anchor: `azure`,
        paragraphs: [
          `Finally, workflow cases and tasks can have multilingual names and descriptions.`,
        ],
        features: [
          {
            term: `Multilingual names and descriptions of cases and tasks makes working in international companies and teams so easy.`,
            description: `Use the CMS to define names and descriptions of cases and tasks. Then, configure which languages you would like to support in the engine cockpit. All names and descriptions are stored in those languages in the system database. Finally, configure the language you want to see the names and descriptions of the cases and tasks in the Axon Ivy Portal.`,
          },
          {
            term: `Custom fields are the most-used way to store business information along with your cases and tasks. Now, custom field metadata provide multilingual label and description for them`,
            description: `In Axon Ivy Portal, everywhere a custom field is used, the custom field label and description provided are displayed instead of its technical name. Also, they are used in the content assist of the case and task custom field editors.`,
          },
        ],
        links: [
          {
            label: `Multilingual Cases and Tasks`,
            url: `/doc/9.4/designer-guide/how-to/workflow/cases-and-tasks.html#multilingual-name-and-description-of-cases-and-tasks`,
          },
          {
            label: `Custom Field Meta Data`,
            url: `/doc/9.4/designer-guide/how-to/workflow/custom-fields.html#meta-information`,
          },
        ],
        images: [
          `9.4/workflow/01-workflow-languages.png`,
          `9.4/workflow/02-workflow-languages.png`,
          `9.4/workflow/03-custom-field-meta.png`,
          `9.4/workflow/04-custom-field-meta.png`,
        ],
        code_sample: null,
      },
      {
        heading: `New Process File Format`,
        anchor: `jsonProcess`,
        paragraphs: [
          `The storage format of Axon Ivy processes has been rewritten to JSON.`,
        ],
        features: [
          {
            term: `GIT friendly`,
            description: `Changes in a process can be easily reviewed and tracked without using the Axon Ivy Designer tooling.`,
          },
          {
            term: `Expressive`,
            description: `The new JSON format uses natural hierarchies and omits default values in order to be an effective communicator of the process configuration applied.`,
          },
          {
            term: `Quick`,
            description: `The JSON Inscription view assists you in quickly reviewing the currently selected process elements without opening the full blown inscription editor.`,
          },
        ],
        links: [
          {
            label: `JSON Inscription`,
            url: `/doc/9.4/designer-guide/process-modeling/process-modeling/process-inscription-view.html`,
          },
        ],
        images: [`9.4/json-process/01-json-inscription-view.png`],
        code_sample: null,
      },
      {
        heading: `Convert Project Wizard`,
        anchor: `migration`,
        paragraphs: [
          `Converting an Axon Ivy project to the latest version and technologies has never been easier.`,
        ],
        features: [
          {
            term: `Convert Project wizard`,
            description: `The revised Convert Project wizard converts Axon Ivy projects to the latest version. But now, it also helps to convert from PrimeFaces 7 to 11 and web service clients from Axis to CXF.`,
          },
          {
            term: `Auto Conversion`,
            description: `The Axon Ivy Engine auto-converts all deployed projects automatically to the latest version.`,
          },
          {
            term: `Java 17`,
            description: `After converting your projects, enjoy the new powerful features of Java 17.`,
          },
        ],
        links: [
          {
            label: `Converting Projects`,
            url: `/doc/9.4/designer-guide/process-modeling/projects/converting.html#converting-projects`,
          },
          {
            label: `Primefaces 11 Migration`,
            url: `/doc/9.4/axonivy/migration/migration-notes-pf11.html#primefaces-11-migration`,
          },
          {
            label: `Drop Axis`,
            url: `/doc/9.4/axonivy/migration/migration-notes-93.html#migrate-93-axis`,
          },
          {
            label: `Java 17`,
            url: `https://docs.oracle.com/en/java/javase/17/`,
          },
        ],
        images: [
          `9.4/project-migration-wizards/01-convert-project.png`,
          `9.4/project-migration-wizards/02-convert-project.png`,
          `9.4/project-migration-wizards/03-convert-project.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Slow Requests and Traffic Graph`,
        anchor: `tracing`,
        paragraphs: [
          `It is key for an orchestration platform like Axon Ivy to provide tools to analyze problems. The new Slow Requests and Traffic Graph views in the Engine Cockpit provide you with all the information you need to find the sources of trouble in your orchestrated solution.`,
        ],
        features: [
          {
            term: `Slow Requests`,
            description: `Have a look at the slowest requests. Dive into a request and see which systems are called by it.`,
          },
          {
            term: `Traffic Graph`,
            description: `Gives you an overview of all incoming and outgoing traffic. You see in one graph which system returns errors or is slow in answering requests.`,
          },
        ],
        links: [
          {
            label: `Slow Requests`,
            url: `/doc/9.4/engine-guide/tool-reference/engine-cockpit/monitor.html#slow-requests`,
          },
          {
            label: `Traffic Graph`,
            url: `/doc/9.4/engine-guide/tool-reference/engine-cockpit/monitor.html##traffic-graph`,
          },
        ],
        images: [
          `9.4/tracing-system-overview/01-slow-requests.png`,
          `9.4/tracing-system-overview/02-traffic-graph.PNG`,
        ],
        code_sample: null,
      },
      {
        heading: `CMS`,
        anchor: `cms`,
        paragraphs: [
          `We have renovated the content management system (CMS for short) completely. We changed the internal concept radically resulting in a smart CMS with many new features.`,
        ],
        features: [
          {
            term: `Small and Smart`,
            description: `Fewer files lead to better performance in day-to-day development as well as at runtime in the Axon Ivy Engine.`,
          },
          {
            term: `Standard`,
            description: `The CMS now does not consist of a properitary format. Files and folders reflect 1:1 the structure of the CMS.`,
          },
          {
            term: `cms.yaml`,
            description: `All texts are now in one file the cms.yaml. Single-line texts as well as multi-line texts are no longer distinguished.`,
          },
          {
            term: `Any files`,
            description: `We now support all file types out-of-the-box.`,
          },
          {
            term: `Change at runtime`,
            description: `With the application CMS, the CMS can now be customized at runtime.`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/doc/9.4/designer-guide/cms/index.html`,
          },
        ],
        images: [`9.4/cms/01-structure.png`, `9.4/cms/02-cms-yaml.png`],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Portal`,
        anchor: `portal93`,
        paragraphs: [
          `More power for the end user. The Axon Ivy Portal appears in a new look and is completely customizable.`,
        ],
        features: [
          {
            term: `Welcome screen`,
            description: `You never get a second chance for a first impression. Create your own welcome screen for your end-users.`,
          },
          {
            term: `Freya theme`,
            description: `Check out the new state-of-the-art PrimeFaces theme featuring dark-mode and many more.`,
          },
          {
            term: `Avatars`,
            description: `Put your own personal touch to the Axon Ivy Portal by using avatars.`,
          },
          {
            term: `Dashboard configuration`,
            description: `An intuitive step-by-step wizard guides you through the configuration of your dashboards.`,
          },
          {
            term: `Password validation`,
            description: `Define your own password policies globally and at a granular level.`,
          },
        ],
        links: [
          {
            label: `Portal New & Noteworthy`,
            url: `/portal/9.4/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-4`,
          },
        ],
        images: [
          `9.4/portal/01-light-mode.png`,
          `9.4/portal/02-dark-mode.png`,
          `9.4/portal/03-dashboard.png`,
          `9.4/portal/04-admin.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `9.3`,
    version_title: `Axon Ivy 9.3`,
    slogan: `Scale on demand`,
    release_date: new Date(`2021-12-10`),
    migration_guide_url: `/doc/9.3/en/axonivy/migration/index.html`,
    overview: [
      "Engines can now scale on demand, starting new instances to match client load on your preferred container or cloud provider.",
      "Project configuration revised and consolidated into simple, widely supported text formats.",
      "Adds a new dev.workflow.ui, role-based welcome page, and a powerful public API.",
      "Also includes performance and tracing enhancements and an updated Market.",
    ],
    sections: [
      {
        heading: `Horizontal Scaling`,
        anchor: `scaling`,
        paragraphs: [`Scale your Axon Ivy Engine as your business does.`],
        features: [
          {
            term: `Cloud native`,
            description: `Use the cloud provider of your choice to scale Axon Ivy Engine horizontally. Start new instances on demand to match the current load of your clients.`,
          },
          {
            term: `Cluster Nodes`,
            description: `View the state of your Axon Ivy Engine cluster nodes in the Engine Cockpit.`,
          },
          {
            term: `Project Image`,
            description: `Put your projects together with the Axon Ivy Engine into a project container image. Then, build your own Kubernetes deployment by bundling it with all surrounding services.`,
          },
          {
            term: `Continues Deployment`,
            description: `Rollout new release frequently and early to a selected user group. Apply mature deployment scenarios such as Blue Green Deployments, A/B Testing, Canary releases.`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/9.3/engine-guide/integration/cluster/index.html`,
          },
          {
            label: `HAProxy Scaling Example`,
            url: `https://github.com/axonivy/docker-samples/tree/master/ivy-scaling-haproxy`,
          },
          {
            label: `Nginx Scaling Example`,
            url: `https://github.com/axonivy/docker-samples/tree/master/ivy-scaling-nginx`,
          },
        ],
        images: [
          `9.3/scaling/01-cluster.png`,
          `9.3/scaling/02-project-image.png`,
          `9.3/scaling/03-scaling-haproxy.png`,
          `9.3/scaling/04-scaling-nginx.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Config files`,
        anchor: `project93`,
        paragraphs: [
          `The entire configuration in Axon Ivy projects has been revised and consolidated. This will make the daily life for all developers much easier.`,
        ],
        features: [
          {
            term: `GIT/SCM`,
            description: `The new file formats are lightweight text formats, less prone to errors than XML files.`,
          },
          {
            term: `Streamlining`,
            description: `Ready to customize by coping into app.yaml on the Axon Ivy Engine. The configuration of rest clients, web service clients, databases and variables now looks exactly the same in your Axon Ivy project as on the Axon Ivy Engine.`,
          },
          {
            term: `Well-known file extensions`,
            description: `All configuration files now have standard file extensions which gives you code highlighting in all other tools and also when sending a pull request to a friend.`,
          },
          {
            term: `Project Tree`,
            description: `All configuration files in the Axon Ivy project are located under the Config folder both in Axon Ivy Designer and physically on the file system - full transparency.`,
          },
        ],
        links: [
          {
            label: `Project Config`,
            url: `/doc/9.3/designer-guide/configuration/index.html`,
          },
          {
            label: `app.yaml`,
            url: `/doc/9.3/engine-guide/configuration/files/app-yaml.html`,
          },
        ],
        images: [
          `9.3/config-files/01-config-file-editor.png`,
          `9.3/config-files/02-config-files-project-tree.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Developer Workflow UI`,
        anchor: `devWfUi93`,
        paragraphs: [
          `The brand-new Developer Workflow UI will make it easier for developers to create and work with workflows and processes. It is made with JSF and is a replacement for the old JSP Designer Workflow UI.`,
        ],
        features: [
          {
            term: `Accessible Info`,
            description: `The modern design makes it easier to find any information about tasks, cases and more.`,
          },
          {
            term: `Last Starts`,
            description: `Last started Processes and Case Maps will be shown in a list on the Homepage where you can easily start them again.`,
          },
          {
            term: `Iframe Support`,
            description: `Processes and tasks start in an iframe.`,
          },
        ],
        links: [],
        images: [
          `9.3/dev-workflow-ui/01-starts.png`,
          `9.3/dev-workflow-ui/02-home.png`,
          `9.3/dev-workflow-ui/03-task.png`,
          `9.3/dev-workflow-ui/04-case.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Role based Welcome`,
        anchor: `role93`,
        paragraphs: [
          `The refurbished Designer welcome page assists you in settings up the workspace according to your role.`,
        ],
        features: [
          {
            term: `Accessible`,
            description: `simple and uncluttered feature set to onboard new users quickly into the first Process drawing experience.`,
          },
          {
            term: `Advanced actions`,
            description: `Testers and Developers don't lose any features, but gain quick links to advanced features.`,
          },
          {
            term: `Project filters`,
            description: `contents within the Project tree will be filtered according to your role. Either to reduce complexity or to provide access to advanced configs and contents. You can switch at any time to a different filter set.`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/doc/9.3/designer-guide/process-modeling/projects/ivyProjectView.html#filters`,
          },
        ],
        images: [
          `9.3/role-welcome/01-a-new-welcome-page.png`,
          `9.3/role-welcome/02-role-tester.png`,
          `9.3/role-welcome/03-role-developer.png`,
          `9.3/role-welcome/04-role-expert.png`,
          `9.3/role-welcome/05-init-process-from-scratch.png`,
          `9.3/role-welcome/06-quick-filters-for-projects.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Tags and Descriptions`,
        anchor: `inscription93`,
        paragraphs: [
          `Add more meta information to your process elements to ease finding or calling them.`,
        ],
        features: [
          {
            term: `Tags`,
            description: `Tag your process elements to easily find them in your projects. Some tags like Deprecated, Connector or Demo have a special meaning.`,
          },
          {
            term: `Parameter Description`,
            description: `Describe the parameters of start elements to give useful hints to the callers.`,
          },
        ],
        links: [
          {
            label: `Tags`,
            url: `/doc/9.3/designer-guide/process-modeling/process-elements/common-tabs.html?highlight=tags#tags`,
          },
          {
            label: `Start Tab`,
            url: `/doc/9.3/designer-guide/process-modeling/process-elements/common-tabs.html#start-tab
		target=`,
          },
        ],
        images: [
          `9.3/start-inscription/01-tags.png`,
          `9.3/start-inscription/02-search-tags.PNG`,
          `9.3/start-inscription/03-deprecated.PNG`,
          `9.3/start-inscription/04-call-deprecated.png`,
          `9.3/start-inscription/05-description.PNG`,
          `9.3/start-inscription/06-show-description.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Public API`,
        anchor: `publicApi93`,
        paragraphs: [
          `With twenty years of project experience, we knew what customers expect from a powerful process automation platform. The newly added API makes your life even easier.`,
        ],
        features: [
          {
            term: `ISecurity`,
            description: `ivy.security and Ivy.security() provide a lot of methods to manage users, roles, security members and sessions.`,
          },
          {
            term: `IRoleMatcher`,
            description: `Makes it easy to check if the current session user has a certain role. The API is available on a session and a user. In addition, new API methods take a role name instead of a role instance.`,
          },
          {
            term: `Sudo`,
            description: `Disables permission checking while executing some code.`,
          },
          {
            term: `IvyRuntime`,
            description: `Provides information about the runtime (Designer or Engine) and the current version.`,
          },
          {
            term: `BooleanFieldOperation`,
            description: `Filters business data with boolean fields.`,
          },
          {
            term: `IBusinessCase`,
            description: `A new method to find out how a business case was started. Either from a process start or a case map start.`,
          },
        ],
        links: [
          {
            label: `Public API`,
            url: `/doc/9.3/public-api`,
          },
        ],
        images: [
          `9.3/public-api/01-security.PNG`,
          `9.3/public-api/02-role-matcher.PNG`,
          `9.3/public-api/03-has-role.PNG`,
          `9.3/public-api/04-sudo.PNG`,
          `9.3/public-api/05-ivy-runtime.PNG`,
          `9.3/public-api/06-boolean-field.PNG`,
          `9.3/public-api/07-started-from.PNG`,
        ],
        code_sample: null,
      },
      {
        heading: `Performance & Tracing`,
        anchor: `performance93`,
        paragraphs: [
          `The Engine Cockpit comes with built-in tooling to battle performance issues.`,
        ],
        features: [
          {
            term: `Performance`,
            description: `Identify slow external systems with the new Performance Statistic in the Engine Cockpit.`,
          },
          {
            term: `Tracing`,
            description: `Simplifies consolidating log entries over multiple services of your solution by integrating with the most common tracing tools such as W3C Trace Context, Jaeger, Zipkin and Amazon X-Ray.`,
          },
          {
            term: `Cache`,
            description: `Optimize the system database cache settings with the new Cache View in the Engine Cockpit.`,
          },
        ],
        links: [
          {
            label: `Performance Statistic`,
            url: `/doc/9.3/engine-guide/tool-reference/engine-cockpit/monitor.html#engine-cockpit-monitor-performance`,
          },
          {
            label: `Tracing Tools`,
            url: `/doc/9.3/engine-guide/monitoring/logging.html#request-tracing-tools`,
          },
          {
            label: `Jaeger Tracing Example`,
            url: `https://github.com/axonivy/docker-samples/tree/master/ivy-tracing-jaeger`,
          },
          {
            label: `Cache View`,
            url: `/doc/9.3/engine-guide/tool-reference/engine-cockpit/monitor.html#cache`,
          },
        ],
        images: [
          `9.3/performance/01-performance.png`,
          `9.3/performance/02-cache.png`,
          `9.3/performance/03-log.png`,
          `9.3/performance/04-jaeger.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Updated Market`,
        anchor: `marketConnectors93`,
        paragraphs: [
          `The Axon Ivy Market is gaining momentum, becoming a powerful ecosystem for all digital transformation projects.`,
        ],
        features: [
          {
            term: `Growing`,
            description: `more connectors are ready to be taken from the shelf. To name a few, the community partnered with us to supply new connectors for SFTP, the Swiss Phone Directory and Amazon's Natural Language Processing services.`,
          },
          {
            term: `Templates`,
            description: `our template repository empowers you to develop your own product in no time. In fact, everything is pre-configured to make your contribution as simple as possible.`,
          },
          {
            term: `Compatible`,
            description: `pre-defined build pipelines, and secure versioned maven repositories are waiting to serve your product. Therefore, maintaining a widely used Market product over time, while the Designer feature set evolves, becomes a simple and convenient task.`,
          },
        ],
        links: [
          { label: `Browse the Market`, url: `/market` },
          {
            label: `Market docs`,
            url: `/doc/9.3/market/index.html`,
          },
          {
            label: `Contribution Wiki`,
            url: `https://github.com/axonivy/market/wiki`,
          },
        ],
        images: [`9.3/market-connectors/01-market-selection.png`],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Portal`,
        anchor: `portal93`,
        paragraphs: [
          `User experience is a top priority in process automation projects. That is why the Axon Ivy Portal has been massively enhanced.`,
        ],
        features: [
          {
            term: `Customizable Dashboard`,
            description: `End-users can choose between different layouts, enable and disable default columns and even add custom columns at will.`,
          },
          {
            term: `Default Widgets`,
            description: `Axon Ivy Portal supports a sophisticated concept featuring default widgets for Process Starts, Task Lists, and Case Lists.`,
          },
          {
            term: `Custom Widgets`,
            description: `Individuality is king. End-users can easily create custom widgets in the dashboard.`,
          },
          {
            term: `Adjustable Look for Process List`,
            description: `Switch between an image, grid, and compact mode to display available processes.`,
          },
        ],
        links: [
          {
            label: `Portal New & Noteworthy`,
            url: `/portal/9.3/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-3`,
          },
        ],
        images: [
          `9.3/portal/01-image-mode.jpg`,
          `9.3/portal/02-add-widget.png`,
          `9.3/portal/03-individual-dashboard-with-two-tasklists.png`,
          `9.3/portal/04-my-profile.png`,
          `9.3/portal/05-widget-configuration.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `9.2`,
    version_title: `Axon Ivy 9.2`,
    slogan: `We are open!`,
    release_date: new Date(`2021-04-06`),
    migration_guide_url: `/doc/9.2/en/axonivy/migration/index.html`,
    overview: [
      "REST services are now documented in OpenAPI format by default, easing cross-system integration.",
      "Refreshed Market offers connectors to popular services like Microsoft Office, DocuSign, and Twitter.",
      "New Migration Wizard simplifies running Engine updates.",
      "Also includes personalized process icons, a refreshed Engine Cockpit, and Mac OS Designer leaving beta.",
    ],
    sections: [
      {
        heading: `OpenAPI backend`,
        anchor: `openAPIbackend`,
        paragraphs: [
          `We believe that the OpenAPI initiative made communications over system boundaries efficient, well documented and a pleasure to do. So, we gladly comply with it by documenting REST services by default in OpenAPI format.`,
        ],
        features: [
          {
            term: `Auto documented`,
            description: `: You define services in Java as you have always done. All your services are automatically described in OpenAPI compatible format under http://localhost:8081/api/designer/openapi.json.`,
          },
          {
            term: `Industry standard`,
            description: `: OpenAPI service descriptions have become the de-facto standard to describe REST interfaces. Consequently, third parties should gladly accept your service descriptions in OpenAPI format.`,
          },
          {
            term: `Prototyping UI`,
            description: `: Axon Ivy products have a built-in API browser so that you can easily examine your service descriptions and send data to the service, without reading technical descriptor files.`,
          },
          {
            term: `Extended docs`,
            description: `: By adding OpenAPI service annotations you can fine-tune the service presentation separate from technical data flow descriptions. Your service users will be glad to find prose and examples to clarify valid use-cases of your services.`,
          },
          {
            term: `Core services`,
            description: `: Not only services from your workflow application, but Axon Ivy core services too are now documented in OpenAPI manor. Therefore, the documentation of the deployment and mobile-workflow endpoints has been improved.`,
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
          `9.2/openapi-backend/01-openapi.png`,
          `9.2/openapi-backend/02-apibrowser.png`,
          `9.2/openapi-backend/03-api-access.png`,
          `9.2/openapi-backend/04-api-docs.png`,
        ],
        code_sample: null,
      },
      {
        heading: `OpenAPI client`,
        anchor: `openApiClient`,
        paragraphs: [
          `Communications with third party services have been dramatically simplified throughout our industry in the last years. Actually, many large and open minded vendors are nowadays describing their service capabilities in the platform neutral OpenAPI format. Therefore, we have invested a lot to give you a rich toolset that makes the usage of these services easy and simple. So, you can send data to and fro without getting into the details of these API specifications.`,
        ],
        features: [
          {
            term: `Code Generators`,
            description: `: We generate data structures that are consumed and returned from OpenAPI services to simplify your interaction within inscriptions masks, scripts or plain Java code.`,
          },
          {
            term: `Built-in Docs`,
            description: `: Service resources are well documented, so we make these use-case descriptions visible and accessible where they serve you best, right in the Rest Client Activities inscription masks.`,
          },
          {
            term: `Light Inscriptions`,
            description: `: gone are the days of overloaded configuration masks to model REST service interactions. OpenAPI based services are presented with a simple look and only show you the configs that make sense for the selected service resource.`,
          },
          {
            term: `Validation`,
            description: `: Strongly typed data models, as well as separation of optional and mandatory data, make it possible to validate input and help you sending the essential data, without doing tedious test calls to the remote services.`,
          },
          {
            term: `OAuth2 Flows`,
            description: `: OpenAPI services typically need users to be authenticated with an OAuth2 token. We made vendor neutral OAuth2 authentication scenarios possible with minimal effort for the developer.`,
          },
          {
            term: `More Specs`,
            description: `: We support not only plain OpenAPI 3, but also swagger2 and OData API definitions via converters.`,
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
          `9.2/openapi-client/01-inscribe-api-docs.png`,
          `9.2/openapi-client/02-inscribe-resource-select.png`,
          `9.2/openapi-client/03-inscribe-validate-and-typed.png`,
          `9.2/openapi-client/04-generate-openapi-client.png`,
          `9.2/openapi-client/05-inscribe-typed-body.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Market`,
        anchor: `marketConnectors`,
        paragraphs: [
          `Big and small brands are all gathered in our refreshed Market. We offer connectors to frequently used services such as Microsoft Office, DocuSign, Twitter and more. Our products are free of charge, gifts to empower your solutions. Furthermore, it's not a closed eco-system, far from it. We are eager to see new powerful, installable components from you.`,
        ],
        features: [
          {
            term: `Connectors`,
            description: `: Ready to use REST connectors to establish third-party communications to popular brands in the web.`,
          },
          {
            term: `Ivy Components`,
            description: `: Products in the Market are built with Ivy and solve a common problem. Wrapped in a functional SubProcess, they can be installed and re-used anywhere.`,
          },
          {
            term: `Demos`,
            description: `: Our products are enriched with Demos that expose a valid use-case for the chosen technical infrastructure.`,
          },
          {
            term: `Open`,
            description: `: The Market lives on Github, anyone can contribute new products and build momentum around a developed solution.`,
          },
          {
            term: `Installable`,
            description: `: Simple install formulas allow connector developers to contribute Maven dependencies, Rest clients, processes, dialogs and more to existing projects.`,
          },
          {
            term: `Custom sources`,
            description: `: Not only can the Designer install products from the official Market, but from custom sources as well. If your connector contains confidential information, feel free to maintain and install it from your custom repository.`,
          },
        ],
        links: [
          {
            label: `Market docs`,
            url: `/doc/9.2/market/index.html`,
          },
          { label: `Browse the Market`, url: `/market` },
        ],
        images: [
          `9.2/market-connectors/01-market-browse.png`,
          `9.2/market-connectors/02-embedded-market.png`,
          `9.2/market-connectors/03-connector-installer.png`,
          `9.2/market-connectors/04-insert-connector.png`,
          `9.2/market-connectors/05-rest-client-wizard-market-choice.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Icons & Personalization`,
        anchor: `icons`,
        paragraphs: [
          `Spice up your process designs: Customize process elements by using decorator icons of your choice.`,
          `Customize and categorize your process list to match your company's individual profile by defining an icon and category for each start.`,
        ],
        features: [
          {
            term: `Process Starts Icon and Category`,
            description: `: Define an icon for each process start and categorize them, customizing the look-and-feel of the process list.`,
          },
          {
            term: `Process Element Decorator Icons`,
            description: `: Improve your process designs by defining icons for REST Client, Web Service and Database configurations. These icons will then be used in all process elements and selection windows.`,
          },
          {
            term: `Call Sub Decorator Icons`,
            description: `: Enhance your Callable Sub Processes with custom icons. These will be used in the Call Sub process elements when choosing the sub process and as decorator icon.`,
          },
          {
            term: `Call Sub Documentation`,
            description: `: Make your Callable Sub Processes easier to use for other developers by adding tags, descriptions and descriptions for parameters. These tags and descriptions will show up in the Call Sub process element when choosing starts and defining input-output mappings, even in the attribute browser.`,
          },
        ],
        links: [],
        images: [
          `9.2/icons/01-icons-processstart.png`,
          `9.2/icons/02-icons-restclient-ditor.PNG`,
          `9.2/icons/03-icons-decorator-elements.png`,
          `9.2/icons/04-icons-callsub-icons.png`,
          `9.2/icons/05-icons-callsub-params.PNG`,
        ],
        code_sample: null,
      },
      {
        heading: `Migration Wizard`,
        anchor: `migrationWizard`,
        paragraphs: [
          `Keeping Axon Ivy Engines up-to-date, stable and protected against security vulnerabilities has never been easier. The new Migration Wizard sets up a new Engine in seconds by re-using the configurations and data from a previously installed Engine.`,
        ],
        features: [
          {
            term: `Hotfix Update`,
            description: `: Painful updates to the latest Engine are a thing of the past. Just download and unpack a new Engine, boot it, run the migration wizard and your done.`,
          },
          {
            term: `Guided Update`,
            description: `: We just do what is best in your existing configuration and automatically apply internal format changes to your configuration files.`,
          },
          {
            term: `Users Choice`,
            description: `: In some migration scenarios the best configuration updates depend on your running application. For crucial changes, we ask your consent or choice to proceed. In addition, a nice config diff viewer helps you to decide wisely.`,
          },
          {
            term: `Lean Docs`,
            description: `: The Migration Notes document now contains tags to define the target audience of a change. Therefore, the relevant migration tasks for you can be much easier identified, and you may skip the other parts at large.`,
          },
          {
            term: `Major Update`,
            description: `: Migrating from one major version (e.g. 8.0.4 LTS) to a newer (e.g. 9.2.0 LE) is supported, too. All necessary configuration changes are enforced and selected, based upon the version you are migrating from/to.`,
          },
        ],
        links: [
          {
            label: `Migration Wizard docs`,
            url: `/doc/9.2/engine-guide/tool-reference/migration-wizard.html`,
          },
        ],
        images: [
          `9.2/migration-wizard/01-engine-cockpit-setup-intro.png`,
          `9.2/migration-wizard/02-migrate-select-old-engine.png`,
          `9.2/migration-wizard/03-migration-outline-scenario.png`,
          `9.2/migration-wizard/04-migrate-diff-config.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Engine Cockpit`,
        anchor: `engine-cockpit92`,
        paragraphs: [
          `You want a refreshed look of your well-known and beloved Engine Cockpit? You want to have a live overview of your running services? That's what we want too, so here we go:`,
        ],
        features: [
          {
            term: `Live Stats`,
            description: `An easy way to get an overview of your running services and system, by opening the new sidebar.`,
          },
          {
            term: `Fresh Look`,
            description: `New icons, some adjusted colors and a few polished edges make the Engine Cockpit look even better.`,
          },
          {
            term: `New Features`,
            description: `New views (like Backend API, Licence, Web Server), give you more power over your running Engine.`,
          },
          {
            term: `Other Improvements`,
            description: `Many other improvements, like the improved Applications overview, make your live easier.`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/9.2/engine-guide/tool-reference/engine-cockpit/index.html`,
          },
        ],
        images: [
          `9.2/engine-cockpit/01-applications.png`,
          `9.2/engine-cockpit/02-live-stats.png`,
          `9.2/engine-cockpit/03-licence.png`,
          `9.2/engine-cockpit/04-backend-api.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Axon Ivy Portal`,
        anchor: `portal92`,
        paragraphs: [
          `The Portal-Team has been working hard to give you a better user experience, supporting:`,
        ],
        features: [
          {
            term: `Forgot password`,
            description: `Simply reset your password using the new built-in feature on the login screen.`,
          },
          {
            term: `Simplified tasks and cases export`,
            description: `Exporting tasks and cases is now even more powerful and easier.`,
          },
          {
            term: `Redesigned process list`,
            description: `The new grid layout gives you a new refreshed overview of your available processes.`,
          },
          {
            term: `Configurable detail pages`,
            description: `The task and case detail pages can now be customized to your needs without a single line of code.`,
          },
          {
            term: `Advanced user specific settings`,
            description: `There are now even more options to configure the Portal to your wishes and preferences. So take a look at the new settings in the My Profile section.`,
          },
        ],
        links: [
          {
            label: `Portal New & Noteworthy`,
            url: `/portal/9.2/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-2`,
          },
        ],
        images: [
          `9.2/portal/01-password.png`,
          `9.2/portal/02-task-case-export.png`,
          `9.2/portal/03-grid-layout.png`,
          `9.2/portal/04-task-detail.png`,
          `9.2/portal/05-case-detail.png`,
          `9.2/portal/06-my-profile.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `9.1`,
    version_title: `Axon.ivy Digital Business Platform 9.1`,
    slogan: `Efficient user scaling and simplified Testing`,
    release_date: new Date(`2020-08-05`),
    migration_guide_url: `/doc/9.1/en/axonivy/migration/index.html`,
    overview: [
      "Numerous memory, performance, UI, and API improvements let the engine efficiently serve hundreds of thousands of users.",
      "Simplified testing supports stable rollouts of large changesets with minimal manual effort via CI pipelines.",
      "Portal receives various user experience and UI improvements.",
      "Also includes an isolated web app context and an LDAP & JMX Browser in the Engine Cockpit.",
    ],
    sections: [
      {
        heading: `Efficient user scaling`,
        anchor: `user-scaling`,
        paragraphs: [
          `We have made great efforts to ensure that our engine can serve hundreds of thousands of users quickly and efficiently. This is achieved through many memory, performance, UI and API improvements. In addition, users can be enabled or disabled.`,
        ],
        features: [
          {
            term: `Disabled users`,
            description: `Users are now disabled instead of deleted. As a result, the task state UNASSIGNED is no longer relevant.`,
          },
          {
            term: `User synchronization`,
            description: `The user synchronization is much faster and has an improved logging.`,
          },
          {
            term: `New user query`,
            description: `There is a new API to easily search users.`,
          },
          {
            term: `UI improvements`,
            description: `The Engine Cockpit can handle huge numbers of users and roles.`,
          },
          {
            term: `Task-/Case query`,
            description: `Faster database queries thanks to a simplified database schema.`,
          },
        ],
        links: [],
        images: [
          `9.1/200k-user/01-200k-users.png`,
          `9.1/200k-user/02-disabled-user.png`,
          `9.1/200k-user/03-managed-user.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Simplified Testing`,
        anchor: `testing`,
        paragraphs: [
          `It has never been easier to write unit tests that verify the quality of your workflow application. Though testing of your components has always been possible, the new Axon.ivy platform makes writing and maintaining tests much easier:`,
        ],
        features: [
          {
            term: `@IvyTest`,
            description: `a JUnit 5 annotation to enable calls against the Ivy environment.`,
          },
          {
            term: `@IvyProcessTest`,
            description: `provides a rich BpmClient API to simulate processes being executed by test users. Assertions on the process flow and the returned data are possible.`,
          },
          {
            term: `@IvyWebTest`,
            description: `orchestrates a real browser in order to simulate users working on your Html Dialogs.`,
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
        code_sample: null,
      },
      {
        heading: `The new shiny Portal`,
        anchor: `portal`,
        paragraphs: [
          `Besides many improvements to the user experience and the user interface, there are some cool new features in the portal!`,
        ],
        features: [
          { term: `Overlay guide`, description: `Welcome guide for new users` },
          {
            term: `My profile`,
            description: `New simplified settings view for email and language`,
          },
          {
            term: `New absence management`,
            description: `A fresh new look to manage absences, with improved deputy features and more transparency`,
          },
        ],
        links: [
          {
            label: `Portal New & Noteworthy`,
            url: `/portal/9.1/doc/portal-developer-guide/introduction/index.html#new-noteworthy-9-1`,
          },
        ],
        images: [
          `9.1/portal/01-overlay-guide.png`,
          `9.1/portal/02-my-profile.png`,
          `9.1/portal/03-absences.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Engine Cockpit 2.0`,
        anchor: `engine-cockpit`,
        paragraphs: [
          `We have worked hard to make the Engine Cockpit even better! And because we want everyone to benefit from these new features, we have ported some of them (like the LDAP Browser and the PMV Dependency view) back to LTS. And we made many small improvements that hopefully make your life easier. Let's have a look at them:`,
        ],
        features: [
          {
            term: `LDAP Browser`,
            description: `Easy browsing of your connected security directory.`,
          },
          {
            term: `PMV Dependency View`,
            description: `Overview over your dependencies between PMVs, with feedback if something is missing.`,
          },
          {
            term: `MBean Monitor`,
            description: `More ways to monitor your running system without installing the VisualVM tool.`,
          },
          {
            term: `Restart Hint`,
            description: `Prominent warning if a change in your configuration requires an engine restart.`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/9.1/engine-guide/tool-reference/engine-cockpit/index.html`,
          },
        ],
        images: [
          `9.1/engine-cockpit/01-ldapBrowser.png`,
          `9.1/engine-cockpit/02-pmvDependencyView.png`,
          `9.1/engine-cockpit/03-mbeansMontior.png`,
          `9.1/engine-cockpit/04-restartHint.png`,
        ],
        code_sample: null,
      },
      {
        heading: `General UI/UX improvements`,
        anchor: `general-ui-ux-improvements`,
        paragraphs: [
          `As we started to make our theme customizable we made a lot of improvements to our internal pages.`,
        ],
        features: [
          {
            term: `Color Customizing`,
            description: `Our Serenity ivy theme provides some css variables to easily change colors.`,
          },
          {
            term: `User friendly error pages`,
            description: `Streamlined and user friendly design of our internal error pages.`,
          },
          {
            term: `Clean info page`,
            description: `New clean and modern server info page.`,
          },
        ],
        links: [
          {
            label: `Color Customizing`,
            url: `/doc/9.1/designer-guide/user-interface/user-dialogs.html#color-customizing`,
          },
        ],
        images: [
          `9.1/ui-improvements/01-info-page.jpg`,
          `9.1/ui-improvements/02-error-page.png`,
        ],
        code_sample: null,
      },
    ],
  },
  {
    id: `8.0`,
    version_title: `Axon.ivy Digital Business Platform 8.0`,
    slogan: `Smart, smarter, Axon.ivy Digital Business Platform`,
    release_date: new Date(`2019-12-04`),
    migration_guide_url: `/doc/8.0/migration-notes`,
    overview: [
      "New Engine Cockpit replaces AdminUI with a rich, fully web-based feature set accessible from any browser or mobile device.",
      "Deployment becomes far easier and highly configurable, eliminating manual installation steps.",
      "Portal completely re-styled with many new features.",
      "Also includes a Setup Wizard, Debian Engine Installer, container support, and native Mac/GTK3 development.",
    ],
    sections: [
      {
        heading: `Engine Cockpit`,
        anchor: `engine-cockpit`,
        paragraphs: [
          `Our new Engine Cockpit has now become a mighty successor of the AdminUI with a rich feature set. It's completely based on web technologies and simply open in your favorite browser or even on mobile devices.`,
        ],
        features: [
          {
            term: `Configuration`,
            description: `System and app configurations can be reviewed and modified effectively.`,
          },
          {
            term: `Administration`,
            description: `Manage your security systems in the cockpit. Add Users, change roles, edit properties, all can be done with the new security tools.`,
          },
          {
            term: `External Services`,
            description: `Database, SOAP or REST web services used by the engine can be viewed, configured and even tested right within the Cockpit. Additionally, you can see your running elastic search server and run queries against it.`,
          },
          {
            term: `License`,
            description: `The Engine license can be updated in the Cockpit. Once your license is near its end of life, administrators can initiate the renewal process right out of the Cockpit.`,
          },
          {
            term: `Monitoring`,
            description: `A new expressive view allows to examine recent logs and offers an export functionality to download them as ZIP files. As a result, file access to the Engine is no longer necessary and data collection becomes very easy.`,
          },
          {
            term: `Applications`,
            description: `Simply manage your running Applications on the Cockpit. Start, stop, release and other actions are possible. Even the deployment of *.iar or *.zip files can be done directly over the web.`,
          },
          {
            term: `System`,
            description: `Managing your administrators or system database has never been never easier! You need to migrate your system database? Do it right from the Cockpit.`,
          },
          {
            term: `More`,
            description: `The Cockpit can do much, much more. Please give it a try!`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/8.0/engine-guide/tool-reference/engine-cockpit/index.html`,
          },
        ],
        images: [
          `8.0/engine-cockpit/01-cockpit-dashboard.png`,
          `8.0/engine-cockpit/02-cockpit-apps.png`,
          `8.0/engine-cockpit/03-cockpit-db.png`,
          `8.0/engine-cockpit/04-cockpit-log.png`,
          `8.0/engine-cockpit/05-cockpit-monitor.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Setup Wizard`,
        anchor: `setup-wizard`,
        paragraphs: [
          `With the new theme and the introduction of the Engine Cockpit, the Engine Config UI doesn't really fit in our product toolset any longer. Because of that, we decided to reengineer this initial setup as a new Setup Wizard.`,
        ],
        features: [
          {
            term: `Write Yaml`,
            description: `As our new configuration lives in yaml files, the new wizard saves your settings correctly.`,
          },
          {
            term: `Better integration`,
            description: `The Setup Wizard is part of the Engine Cockpit, so all parts of the wizard are integrated in the cockpit as well.`,
          },
          {
            term: `Improved Interface`,
            description: `The user interface matches the theme of the 8.0 release.`,
          },
          {
            term: `Better guidance`,
            description: `We are now giving you better feedback to smoothly configure your engine.`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/8.0/engine-guide/tool-reference/setup-wizard.html`,
          },
        ],
        images: [
          `8.0/setup-wizard/01-setup-lic.png`,
          `8.0/setup-wizard/02-setup-admins.png`,
          `8.0/setup-wizard/03-setup-systemdb.png`,
          `8.0/setup-wizard/04-setup-webserver.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Portal`,
        anchor: `portal`,
        paragraphs: [
          `We re-styled the Portal application completely and implemented a lot of new features.`,
        ],
        features: [
          {
            term: `Group Chat`,
            description: `Establish chats with other workflow users instantly, even case related`,
          },
          {
            term: `Announcements`,
            description: `Promote planned maintenance and other global announcements conveniently, in multiple languages`,
          },
          {
            term: `Express data providers`,
            description: `Add your custom data source to provide data for Axon.ivy Express form widgets`,
          },
        ],
        links: [
          {
            label: `Portal New & Noteworthy`,
            url: `/portal/8.0/doc/portal-developer-guide/introduction/index.html#new-and-noteworthy`,
          },
        ],
        images: [
          `8.0/portal/01-portal-chat.png`,
          `8.0/portal/02-portal-announcement.png`,
          `8.0/portal/03-portal-data-provider.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Run in Container`,
        anchor: `run-in-container`,
        paragraphs: [
          `Running the Axon.ivy Engine in an isolated container has become a lot easier.`,
          `This means that the barriers between Docker, Kubernetes, OpenShift and all other container orchestration platforms have been broken down!`,
        ],
        features: [
          {
            term: `Fully isolated`,
            description: `Software running in a container is completely isolated from the outside world.`,
          },
          {
            term: `Reproducible systems`,
            description: `Your system setup becomes fully reproducible in one go since the whole system configuration is defined in a so-called image.`,
          },
          {
            term: `Portable`,
            description: `Build once, run everywhere! Once a docker image is generated it can be run on every system that supports Docker.`,
          },
          {
            term: `Documented infrastructure`,
            description: `The entire Axon.ivy Engine system setup is part of an image and thus fully documented.`,
          },
        ],
        links: [
          {
            label: `Getting started`,
            url: `/doc/8.0/engine-guide/getting-started/docker.html`,
          },
          {
            label: `Axon.ivy Engine Docker Image`,
            url: `https://hub.docker.com/r/axonivy/axonivy-engine/`,
          },
          {
            label: `Docker Examples`,
            url: `https://github.com/axonivy/docker-samples`,
          },
        ],
        images: [`8.0/run-in-container/01-ivy-on-docker.jpg`],
        code_sample: null,
      },
      {
        heading: `Debian Engine Installer`,
        anchor: `debian`,
        paragraphs: [
          `The Axon.ivy Engine is now available as a Debian package. Now Engine operators can benefit from the rich tooling on the preferred platform of most cloud providers.`,
        ],
        features: [
          {
            term: `Simple`,
            description: `Install & run the Engine with one click.`,
          },
          {
            term: `Best practice`,
            description: `Run the Axon.ivy Engine as systemd service and restricts the access to Engine and workflow application files.`,
          },
          {
            term: `Updateable`,
            description: `Install the latest hotfix version without risky manual steps.`,
          },
          {
            term: `Secure`,
            description: `Keep your manual changes in configuration files during updates.`,
          },
          {
            term: `Friendly`,
            description: `Organize files compliant with the Linux file structure and re-use the JVM provided by the system.`,
          },
        ],
        links: [
          {
            label: `Debian : Getting Started`,
            url: `/doc/8.0/engine-guide/getting-started/debian.html`,
          },
          {
            label: `Download Debian package`,
            url: `/permalink/8.0/axonivy-engine.deb`,
          },
        ],
        images: [`8.0/debian/01-debian-package-installer.png`],
        code_sample: null,
      },
      {
        heading: `Highly Configurable`,
        anchor: `highly-configurable`,
        paragraphs: [
          `Successfully deploying your application in your customers environment is now easier than ever. The days of manual installations and the related chatty documentation are over!`,
        ],
        features: [
          {
            term: `Files`,
            description: `The complete configuration of an Axon.ivy Engine is now stored in simple human readable YAML files. Now it is very easy to document the whole truth about the current engine environment within an ivy.yaml file.`,
          },
          {
            term: `Zero Documentation`,
            description: `In the past you had to document the installation of an Axon.ivy Engine because certain settings (e.g. Security System) could only be configured via the Admin UI. Now you can use the ivy.yaml file as your system documentation.`,
          },
          {
            term: `Overridable`,
            description: `Configurations are always overridable with environment variables. This is especially useful in container environments.`,
          },
          {
            term: `Trackable`,
            description: `Configuration changes get logged, showing what has been changed and where. Besides auditing configuration changes, this can also help tracking down problems after changes.`,
          },
        ],
        links: [
          {
            label: `Engine Guide Configuration`,
            url: `/doc/8.0/engine-guide/configuration/`,
          },
          {
            label: `Configuration File Reference`,
            url: `/doc/8.0/engine-guide/configuration/file-reference.html`,
          },
        ],
        images: [],
        code_sample: `# sample ivy.yaml with some often used entries defined
SystemDb:
  Url: jdbc:mariadb://myDbHost:3306/AxonIvySystemDatabase
  UserName: root
  Password: 1234
Administrators:
  admin:
    Password: "\${hash:1234}"
    Email: info@localhost
  devop:
    Password: "\${hash:4321}"
    Email: dev@axonivy.com
EMail:
  Server:
  Host: smtp.gmail.com
  Port: 25
Frontend:
  HostName: workflow.acme.com
  Port: 80`,
      },
      {
        heading: `Instant Deployment`,
        anchor: `deployment`,
        paragraphs: [
          `We believe that highly automated deployments are important. Customers should be able to use the latest features instantly. While developers and operations need a high confidence about the proper execution of their runtime artifacts.`,
          `That's why we extended our deployment interface:`,
        ],
        features: [
          {
            term: `Atomar`,
            description: `The complete feature set of an application can be deployed at once. Just drop a zip file that contains multiple projects that belong to the same application into our engine deploy directory and it will be rolled-out.`,
          },
          {
            term: `Controllable`,
            description: `The new deployment option file gives you the chance to fine tune the deployment process. It allows to enforce configuration updates and to steer the target Process Model Version to use. Now there are no technical reasons to migrate workflow data into a new Process Model Version.`,
          },
          {
            term: `Self-documented`,
            description: `Deployment options can be stored in YAML files or in Maven plugin configurations. The deployment process is therefore documented, visible and reproducible in any environment. A separate documentation in a guide becomes obsolete.`,
          },
          {
            term: `Automated`,
            description: `The deployment to the engine is steered by simple file operations. So almost any scripting environment can be used to automate deployments. The roll-out of a new application version should never take more effort than one click.`,
          },
          {
            term: `Via HTTP`,
            description: `Deployment to remote engines has never been easier! Just upload your new application with one HTTP file transfer and you're done, perfect for your CI/CD environment!`,
          },
        ],
        links: [
          {
            label: `Engine Guide`,
            url: `/doc/8.0/engine-guide/administration/deployment.html`,
          },
          {
            label: `Maven Plugin`,
            url: `https://axonivy.github.io/project-build-plugin`,
          },
          {
            label: `GitHub Examples`,
            url: `https://github.com/axonivy/project-build-examples`,
          },
        ],
        images: [],
        code_sample: null,
      },
      {
        heading: `Modern Platform`,
        anchor: `modern-platform`,
        paragraphs: [
          `We updated the platform of the Designer in order to bring even more fun and productivity into your daily work. Stay ahead!`,
        ],
        features: [
          {
            term: `Dark`,
            description: `Modern themes of the Eclipse platform can be used. You may give the new dark theme a try during your next nightly coding session.`,
          },
          {
            term: `HDPI`,
            description: `High resolution displays are now supported. Feel free to use a brand new device to work with Axon.ivy.`,
          },
          {
            term: `Scripting`,
            description: `Scripting editors now support linking and quick navigation to referenced classes and methods. Use the F3-Button or Ctrl + click to jump instantly to a resource.`,
          },
          {
            term: `Marketplace`,
            description: `The now included Eclipse Marketplace allows you to access the universe of Eclipse tools. This will make you even more efficient.`,
          },
        ],
        links: [
          {
            label: `Eclipse 2019-09`,
            url: `https://www.eclipse.org/downloads/`,
          },
          { label: `Marketplace`, url: `https://marketplace.eclipse.org/` },
        ],
        images: [
          `8.0/modern-platform/01-eclipse-2019-09.png`,
          `8.0/modern-platform/02-script-step.png`,
          `8.0/modern-platform/03-dark-theme-workbench.png`,
        ],
        code_sample: null,
      },
      {
        heading: `Native MAC & GTK3 Development`,
        anchor: `native-mac-gtk3`,
        paragraphs: [
          `Run the Axon.ivy Designer with the operating system you know and love most.`,
        ],
        features: [
          {
            term: `MAC Designer`,
            description: `We released the first native Axon.ivy Designer for Mac OS X. Now you can digitalize your business on a Mac without starting a virtualized OS.`,
          },
          {
            term: `Linux GTK3`,
            description: `The latest designer has been optimized to work with the most popular desktop environments on Linux. As a result, we were able to update the embedded browser, delivering way more accurate results when modern CSS & JavaScript is used.`,
          },
          {
            term: `Process Editor`,
            description: `Many new native UI components are now available for all platforms: Context Menu, Inscription Masks`,
          },
          {
            term: `Html Dialog Editor`,
            description: `It dropped its strict coupling to the JavaFX-based WYSIWYG editor and therefore runs on all platforms.`,
          },
        ],
        links: [],
        images: [`8.0/native-mac-gtk3/01-high-sierra-rest-activity.png`],
        code_sample: null,
      },
      {
        heading: `Customizable Designer`,
        anchor: `customizable-designer`,
        paragraphs: [
          `We made the latest Axon.ivy Designer much more flexible, so that it serves best for your development needs.`,
        ],
        features: [
          {
            term: `Lighter`,
            description: `The Xpert.ivy 3.9 import feature has been retired. The project reporting feature is no longer included. But you can install it via the pre-configured update site.`,
          },
          {
            term: `Up to date`,
            description: `Many developers switched to GIT as their primary source control management system. Now we ship the EGit team provider together with a new version of Subclipse for SVN users. Independent features of the designer such as GIT or SVN can now be updated. Now you are not bound to the Axon.ivy Designer release cycle to get the latest third-party improvements anymore.`,
          },
          {
            term: `Totally yours`,
            description: `You do not require some core parts of the Designer at all? We isolated features of the Designer so that you can uninstall them. Why don't you craft your custom Axon.ivy Designer with the essentials for you and your team?`,
          },
        ],
        links: [],
        images: [`8.0/customizable-designer/01-designer-isolated-features.png`],
        code_sample: null,
      },
      {
        heading: `New Web Service Client Tooling`,
        anchor: `ws-client`,
        paragraphs: [
          `The tooling to call remote Web Services has been completely re-worked and is more powerful than ever.`,
        ],
        features: [
          {
            term: `Simple`,
            description: `Clean and intuitive configuration mask on the Web Service Call activity`,
          },
          {
            term: `Secure`,
            description: `Integrated authentication features for HTTP-BASIC, HTTP-DIGEST, NTLM and WS-Security.`,
          },
          {
            term: `Compliant`,
            description: `A huge set of Web Service specifications (WS-*) are supported and ready to use`,
          },
          {
            term: `Reliable`,
            description: `Logs and monitoring capabilities let you easily identify fragile Web Service communications`,
          },
          {
            term: `Open`,
            description: `Additional client features can easily be contributed by process developers`,
          },
        ],
        links: [
          {
            label: `Designer Guide`,
            url: `/doc/8.0/designer-guide/3rd-party-integration/index.html#web-services`,
          },
          {
            label: `Tutorial Video`,
            url: `/tutorial`,
          },
        ],
        images: [`8.0/new-webservice-client-tooling/01-ws-client-cxf.png`],
        code_sample: null,
      },
      {
        heading: `Custom Fields`,
        anchor: `custom-fields`,
        paragraphs: [
          `Customizing a task and case list based on process data is easier than ever before. Put data in the custom field store of the task or case and it becomes automatically searchable. In addition, it can also be helpful for workflow process reporting.`,
          `Legacy Support: Forget the additional properties, the limited old custom fields, the strange business fields and the legacy categorization. You don't need them anymore. But we are fully backward compatible. All legacy API calls will be mapped to custom fields. All inscribed inscriptions in your project will automatically be converted.`,
        ],
        features: [
          {
            term: `Meaningful Name`,
            description: `Name the custom field as you like.`,
          },
          {
            term: `Searchable`,
            description: `You won't miss any search capabilities. Simply use TaskQuery and CaseQuery API to filter, aggregate and order by custom fields.`,
          },
          {
            term: `Strong Typing`,
            description: `All custom fields are strongly typed. You can choose between STRING, TEXT, NUMBER and TIMESTAMP.`,
          },
        ],
        links: [
          {
            label: `Public API Custom Field`,
            url: `/doc/8.0/public-api/ch/ivyteam/ivy/workflow/custom/field/ICustomFields.html`,
          },
          {
            label: `Public API Query`,
            url: `/doc/8.0/public-api/ch/ivyteam/ivy/workflow/query/TaskQuery.IFilterableColumns.html#customField--`,
          },
        ],
        images: [],
        code_sample: `TaskQuery.create().where()
        .customField().stringField("branchOffice").isEqual("Zug")
      .and()
        .customField().numberField("creditLimit").isGreaterThan(10_000);`,
      },
      {
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
      },
    ],
  },
];
