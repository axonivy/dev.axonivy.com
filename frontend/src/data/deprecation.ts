import type { TFunction } from "i18next";

export type Deprecation = {
  name: string;
  nameHref?: string;
  successor?: string;
  successorHref?: string;
  released: Version;
  deprecated: Version;
  removed?: Version;
  description: string;
};

type Version = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export default function getDeprecations(t: TFunction): Deprecation[] {
  return [
    {
      name: t("deprecation.features.dropin"),
      nameHref:
        "https://developer.axonivy.com/doc/12.0/en/concepts/3rd-party-integration/process-extensions.html#dropin-elements",
      successor: t("deprecation.successors.programElements"),
      successorHref:
        "https://developer.axonivy.com/doc/14.0/en/getting-productive/connectivity/process-extensions.html#extendible-process-elements",
      released: 4,
      deprecated: 12,
      removed: 14,
      description:
        "The Dropin Process Element extension point was removed in favor of the simpler Program Elements in project.",
    },
    {
      name: t("deprecation.features.ntlm"),
      nameHref:
        "https://community.axonivy.com/d/1257-usage-of-ntlm-authentication-for-rest-and-soap-services",
      successor: t("deprecation.successors.authentication"),
      successorHref:
        "https://community.axonivy.com/d/1257-usage-of-ntlm-authentication-for-rest-and-soap-services",
      released: 5,
      deprecated: 12,
      removed: 14,
      description:
        "Support for NTLM has been deprecated with Apache HTTP Client 5 library that is used by the REST and SOAP WebService client implementations. Also Microsoft recommends to use more modern and more secure authentication methods.",
    },
    {
      name: t("deprecation.features.eclipseDesigner"),
      nameHref:
        "https://community.axonivy.com/d/1149-maintenance-mode-of-the-eclipse-based-pro-designer",
      successor: t("deprecation.successors.vscodeDesigner"),
      successorHref:
        "https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-14",
      released: 4,
      deprecated: 13,
      removed: 14,
      description:
        "The Eclipse-based PRO Designer will be replaced by the VS Code PRO Designer Extension.",
    },
    {
      name: t("deprecation.features.drools"),
      nameHref: "/doc/12.0/en/designer-guide/how-to/rule-engine.html",
      successor: "",
      successorHref: "",
      released: 7,
      deprecated: 12,
      removed: 14,
      description:
        "The Rule Engine Process Element and the Rules Public API based on Drools. Rules could be written using either DRL or Excel files.",
    },
    {
      name: t("deprecation.features.fontAwesome"),
      successor: t("deprecation.successors.tabler"),
      nameHref:
        "https://community.axonivy.com/d/1225-icon-library-update-in-axon-ivy-lts-14",
      released: 5,
      deprecated: 14,
      removed: 16,
      description:
        "The included font awesome icons have been deprecated and will no longer be shipped by default in the future. Use the tabler icons available in the platform.",
    },
    {
      name: t("deprecation.features.streamline"),
      successor: t("deprecation.successors.tabler"),
      nameHref:
        "https://community.axonivy.com/d/1225-icon-library-update-in-axon-ivy-lts-14",
      released: 10,
      deprecated: 14,
      removed: 16,
      description:
        "The included streamline icons have been deprecated and will no longer be shipped by default in the future. Use the tabler icons available in the platform.",
    },
    {
      name: t("deprecation.features.guava"),
      nameHref: "https://github.com/google/guava",
      successor: t("deprecation.successors.jdk"),
      successorHref: "https://docs.oracle.com/en/java/javase/11/",
      released: 3,
      deprecated: 10,
      description:
        "The Java library Guava is provided currently on the ivy project classpath. It will be removed in future. Use the utilities from the JDK.",
    },
    {
      name: t("deprecation.features.commonsLang"),
      nameHref: "https://commons.apache.org/proper/commons-lang/",
      successor: t("deprecation.successors.commonsLang"),
      successorHref: "https://commons.apache.org/proper/commons-lang/",
      released: 3,
      deprecated: 10,
      removed: 14,
      description:
        "The Java library Apache Commons Lang 2 is provided currently on the ivy project classpath. It will be removed in future. Use Apache Commons Lang 3 which is provided on the ivy project classpath.",
    },
    {
      name: t("deprecation.features.commonsCollection"),
      nameHref:
        "https://commons.apache.org/proper/commons-collections/release_3_2_2.html",
      successor: t("deprecation.successors.commonsCollection"),
      successorHref:
        "https://commons.apache.org/proper/commons-collections/release_4_4.html",
      released: 3,
      deprecated: 10,
      removed: 14,
      description:
        "The Java library Apache Commons Collection 3 is provided currently on the ivy project classpath. It will be removed in future. Use Apache Commons Collection 4 which is provided on the ivy project classpath.",
    },
    {
      name: t("deprecation.features.httpClient"),
      nameHref: "https://hc.apache.org/index.html",
      successor: t("deprecation.successors.httpClient"),
      successorHref:
        "https://openjdk.java.net/groups/net/httpclient/intro.html",
      released: 3,
      deprecated: 10,
      description:
        "The Java library Apache Http Client is provided currently on the ivy project classpath. It will be removed in future. Use the HTTP Client from the JDK.",
    },
    {
      name: t("deprecation.features.serenity"),
      nameHref:
        "/doc/10.0/en/designer-guide/user-interface/user-dialogs/html-dialog-themes.html#serenity-themes-deprecated",
      successor: t("deprecation.successors.freya"),
      successorHref:
        "/doc/10.0/en/designer-guide/user-interface/user-dialogs/html-dialog-themes.html#freya-themes",
      released: 8,
      deprecated: 10,
      removed: 13,
      description:
        "Primefaces no longer supports Serenity Theme. Consider switching to Freya Theme",
    },
    {
      name: t("deprecation.features.overriding"),
      nameHref: "/doc/8.0/en/designer-guide/how-to/overrides.html#case-scope",
      successor: t("deprecation.successors.overriding"),
      successorHref:
        "/doc/8.0/en/designer-guide/how-to/overrides.html#strict-overriding",
      released: 5,
      deprecated: 8,
      removed: 13,
      description:
        "The Case Scope Overriding is deprecated in favor of Strict Overriding.",
    },
    {
      name: t("deprecation.features.drlEditor"),
      nameHref: "/doc/10.0/en/designer-guide/how-to/rule-engine.html",
      successor: t("deprecation.successors.drlEditor"),
      successorHref:
        "https://community.axonivy.com/d/560-drl-editor-will-be-removed-with-axon-ivy-113",
      released: 7,
      deprecated: 10,
      removed: 12,
      description: "Syntax Highlighting for DRL files.",
    },
    {
      name: t("deprecation.features.dialogId"),
      nameHref:
        "/doc/10.0/en/designer-guide/process-modeling/process-elements/user-dialog.html#call-tab",
      released: 4,
      deprecated: 10,
      removed: 12,
      description: "Dynamic HTML Dialog id from a data class attribute.",
    },
    {
      name: t("deprecation.features.environments"),
      nameHref: "/doc/8.0/en/designer-guide/configuration/environments.html",
      successor: t("deprecation.successors.configuration"),
      successorHref:
        "https://community.axonivy.com/d/142-environments-will-disappear-in-the-long-term",
      released: 4,
      deprecated: 10,
      removed: 12,
      description:
        "Environments are deprecated and we won't invest in new features. Please use containers or correct configurations instead.",
    },
    {
      name: t("deprecation.features.ajp"),
      nameHref: "/doc/8.0/en/engine-guide/integration/apache-httpd.html",
      successor: t("deprecation.successors.http"),
      successorHref: "/doc/10.0/en/engine-guide/integration/index.html",
      released: 4,
      deprecated: 10,
      removed: 12,
      description:
        "The AJP Protocol is deprecated. Please use the HTTP or HTTPS Protocol instead.",
    },
    {
      name: t("deprecation.features.webPage"),
      nameHref:
        "/doc/10.0/en/designer-guide/process-modeling/process-elements/web-page.html",
      successor: t("deprecation.successors.htmlDialog"),
      successorHref:
        "/doc/10.0/en/designer-guide/user-interface/user-dialogs/html-dialogs.html",
      released: 4,
      deprecated: 8,
      removed: 12,
      description: "The WebPage activity process element.",
    },
    {
      name: t("deprecation.features.birt"),
      nameHref: "/doc/8.0/en/market/extension/reporting.html",
      released: 4,
      deprecated: 8,
      removed: 10,
      description: "The Process Reporting extension tool BIRT is removed.",
    },
    {
      name: t("deprecation.features.callAndWait"),
      nameHref:
        "/doc/8.0/en/designer-guide/process-modeling/process-elements/call-and-wait.html",
      released: 4,
      deprecated: 8,
      removed: 10,
      description: "The Call & Wait intermediate process element.",
    },
    {
      name: t("deprecation.features.cmsPage"),
      nameHref:
        "/doc/8.0/en/designer-guide/user-interface/web-page/html-content-in-the-cms.html",
      successor: t("deprecation.successors.htmlDialog"),
      successorHref:
        "/doc/10.0/en/designer-guide/user-interface/user-dialogs/html-dialogs.html",
      released: 3,
      deprecated: 8,
      removed: 10,
      description:
        "The cms page (also Smart Table) feature has been removed. Use html dialog to implement user interfaces.",
    },
    {
      name: t("deprecation.features.rtf"),
      nameHref: "https://market.axonivy.com/doc-factory",
      successor: t("deprecation.successors.docFactory"),
      successorHref: "https://market.axonivy.com/doc-factory",
      released: 3,
      deprecated: 8,
      removed: 10,
      description:
        "Macro expansion in RTF documents has been removed. Use the doc factory to generate documents.",
    },
    {
      name: t("deprecation.features.axis"),
      nameHref:
        "/doc/8.0/en/designer-guide/configuration/webservice-clients.html",
      successor: t("deprecation.successors.cxf"),
      successorHref:
        "/doc/10.0/en/designer-guide/configuration/webservice-clients.html",
      released: 3,
      deprecated: 8,
      removed: 10,
      description:
        "The Axis web service client technology stack has been removed. Use the brand new CXF web service client stack.",
    },
    {
      name: t("deprecation.features.classicEditor"),
      successor: t("deprecation.successors.bpmnEditor"),
      released: 3,
      deprecated: 8,
      removed: 10,
      description:
        "Processes drawn vertically (labels outside of activities, vertical swimlanes)",
    },
    {
      name: t("deprecation.features.cmsMetadata"),
      nameHref: "/doc/8.0/en/public-api/ch/ivyteam/ivy/cm/IContentObject.html",
      successor: t("deprecation.successors.cms"),
      successorHref: "https://community.axonivy.com/d/245-modern-cms",
      released: 3,
      deprecated: 7,
      removed: 10,
      description:
        "There was a .meta file for each CMS entry. This file is completely removed in favor of a modern CMS structure.",
    },
    {
      name: t("deprecation.features.richDialog"),
      nameHref:
        "/doc/7.0/en/DesignerGuideHtml/ivy.userinterface.html#ivy-richdialogs",
      successor: t("deprecation.successors.htmlDialog"),
      successorHref:
        "/doc/10.0/en/designer-guide/user-interface/user-dialogs/html-dialogs.html",
      released: 4,
      deprecated: 7,
      removed: 8,
      description:
        "The rich dialog technology stack has been removed. Use html dialog to implement user interfaces.",
    },
    {
      name: t("deprecation.features.projectImport"),
      nameHref:
        "/doc/7.0/en/DesignerGuideHtml/ivy.processmodeling.html#ivy-project-convert39",
      released: 5,
      deprecated: 8,
      removed: 8,
      description:
        "The 3.9 project importer has been removed. Import 3.9 with e.g. Axon Ivy Designer 5.0 and then use the latest Designer to migrate to the latest version.",
    },
  ];
}
