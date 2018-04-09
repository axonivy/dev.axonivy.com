# New and Noteworthy 7.1

----

#### New Web Service Client Tooling
The tooling to call remote Web Services has been completely re-worked and is more powerful than ever.

![WebService](images/doc/pastedImage2.png "Web Service Request")

* __Simple__: Clean and intuitive configuration mask on the Web Service Call activity
* __Secure__: Integrated authentication features for HTTP-BASIC, HTTP-DIGEST, NTLM and WS-Security.
* __Compliant__: A huge set of Web Service specifications (WS-*) are supported and ready to use
* __Reliable__: Logs and monitoring capabilities let you easily identify fragile Web Service communications
* __Open__: Additional client features can easily be contributed by process developers

<div class="btn-group btn-group-sm" role="group" aria-label="...">
    <a href="https://developer.axonivy.com/doc/7.1.latest/DesignerGuideHtml/ivy.integration.html#ivy-integration-webservice" class="btn btn-default btn-lg">
      <span class="glyphicon glyphicon-book" aria-hidden="true"></span> Designer Guide
    </a>
    <a href="https://developer.axonivy.com/tutorial/" class="btn btn-default btn-lg">
      <span class="glyphicon glyphicon-hd-video" aria-hidden="true"></span> Tutorial Video
    </a>
</div>


#### Instant Deployment
We believe that highly automated deployments are important. Customers should be able to use the
latest features instantly. While developers and operations need a high confidence
about the proper execution of their runtime artifacts.

Thats why we extended our deployment interface:

* __Atomar__: The complete featureset of an application can be deployed at once. Just drop a zip file that contains multiple projects that belong to the same application into our engine `deploy` directory and it will be rolled-out.
* __Controllable__: The new deployment option file gives you the chance to fine tune the deployment process. It allows to enforce configuration updates and to steer the target Process Model Version to use. So there are no technical reasons to migrate workflow data into a new Process Model Version.
* __Self-documented__: Deployment options can be stored in [YAML files](https://developer.axonivy.com/doc/7.1.latest/EngineGuideHtml/administration.html#administration-deployment-directory-options) or in Maven plugin configurations. The deployment process is therefore documented, visible and reproducible in any environment. A separate documentation in a guide becomes obsolete.
* __Automated__: The deployment to the engine is steered by simple file operations. So almost any scripting environment can be used to automate deployments.
The roll-out of a new application version should never take more effort than one click.

<div class="btn-group btn-group-sm" role="group" aria-label="...">
    <a href="https://developer.axonivy.com/doc/7.1.latest/EngineGuideHtml/administration.html#administration.deployment.directory.options" class="btn btn-default btn-lg">
      <span class="glyphicon glyphicon-book" aria-hidden="true"></span> Engine Guide
    </a>
    <a href="https://axonivy.github.io/project-build-plugin" class="btn btn-default btn-lg">
      <span class="glyphicon glyphicon-book" aria-hidden="true"></span> Maven Plugin
    </a>
    <a href="https://github.com/axonivy/project-build-examples" class="btn btn-default btn-lg">
      <span class="glyphicon glyphicon-blackboard" aria-hidden="true"></span> GitHub Examples
    </a>
</div>


#### Customizable Designer
We made the latest Axon.ivy Designer much more flexible, so that it serves best for your development needs.

* __Lighter__:
    * The Xpert.ivy 3.9 import feature has been retired.
    * The project reporting feature is no longer included. But you can install it via the pre-configured update site.
* __Up to date__:
     * Many developers switched to GIT as their primary source control management system. So we ship the _EGit_ team provider together with a new version of _Subclipse_ for SVN users.
     * Independent features of the designer such as GIT or SVN can now be updated. So you are not bound to the Axon.ivy Designer release cycle to get the latest third party improvements.
* __Totally yours__:
     * You do not require some core parts of the Designer at all? We isolated features of the Designer so that you can uninstall them.
     * Why don't you craft your custom Axon.ivy Designer with the essentials for you and your team?
 
![Installation Details](images/doc/pastedImage.png "Installation Details")


### Improvements
* Store and access ivy projects as single IAR file on the engine <a href="https://jira.axonivy.com/jira/browse/XIVY-1115"><span class="glyphicon glyphicon-new-window"></span></a> <span class="feature-badge">performance</span>
* REST Client should consider SSL Client settings of Designer and Server when using https <a href="https://jira.axonivy.com/jira/browse/XIVY-1168"><span class="glyphicon glyphicon-new-window"></span></a> 
* Calling REST Service from browser that already owns an authenticated ivy session <a href="https://jira.axonivy.com/jira/browse/XIVY-1183"><span class="glyphicon glyphicon-new-window"></span></a> 
* Support GIT in Designer <a href="https://jira.axonivy.com/jira/browse/XIVY-2137"><span class="glyphicon glyphicon-new-window"></span></a> 
* Replace AWT IvyScriptEditor in Script Activity with new SWT Editor <a href="https://jira.axonivy.com/jira/browse/XIVY-2265"><span class="glyphicon glyphicon-new-window"></span></a> 
* Officially support Maria DB <a href="https://jira.axonivy.com/jira/browse/XIVY-2269"><span class="glyphicon glyphicon-new-window"></span></a> 
* Automate Designer pre-requisites installation under Linux <a href="https://jira.axonivy.com/jira/browse/XIVY-2376"><span class="glyphicon glyphicon-new-window"></span></a> 
* Make project reporting an independent installable P2 unit <a href="https://jira.axonivy.com/jira/browse/XIVY-2404"><span class="glyphicon glyphicon-new-window"></span></a> 
* Respect editor preferences for Html Dialog views <a href="https://jira.axonivy.com/jira/browse/XIVY-2446"><span class="glyphicon glyphicon-new-window"></span></a> 
* Improve graphical performance on process editor for linux <a href="https://jira.axonivy.com/jira/browse/XIVY-2449"><span class="glyphicon glyphicon-new-window"></span></a> 


### Bug Fixes
* [XIVY-118](https://jira.axonivy.com/jira/browse/XIVY-118) Process editor context menu selected text is white on Windows 10 
* [XIVY-1034](https://jira.axonivy.com/jira/browse/XIVY-1034) Problem when saving the deployment editor after removing the SNAPSHOT from the version 
* [XIVY-1329](https://jira.axonivy.com/jira/browse/XIVY-1329) No new PMV will be created by default when redeploying same library but with new version 
* [XIVY-1673](https://jira.axonivy.com/jira/browse/XIVY-1673) Attachments sent by mail step contains folder path <span class="feature-badge">jira_escalated</span>
* [XIVY-1853](https://jira.axonivy.com/jira/browse/XIVY-1853) REST API for single tasks does not return resumed/created tasks 
* [XIVY-2170](https://jira.axonivy.com/jira/browse/XIVY-2170) Hovered text in context menu of process editor is white <span class="feature-badge">jira_escalated</span>
* [XIVY-2171](https://jira.axonivy.com/jira/browse/XIVY-2171) A task may start on the wrong TaskSwitchGateway output arc 
* [XIVY-2173](https://jira.axonivy.com/jira/browse/XIVY-2173) Sample Call&Wait implementation does not work with multiple PMVs 
* [XIVY-2206](https://jira.axonivy.com/jira/browse/XIVY-2206) File Browse in Control Center fails 
* [XIVY-2209](https://jira.axonivy.com/jira/browse/XIVY-2209) Process Selection in CaseMap-Editor does not work <span class="feature-badge">jira_escalated</span>
* [XIVY-2210](https://jira.axonivy.com/jira/browse/XIVY-2210) Ivy 6.0/7.0 can't join tasks of cases which has been started with Ivy 5.1 
* [XIVY-2214](https://jira.axonivy.com/jira/browse/XIVY-2214) Can not build 7.0.0 projects while a non OSGi engine is in cache 
* [XIVY-2216](https://jira.axonivy.com/jira/browse/XIVY-2216) NullpointerException occurs while logging null values in Designer <span class="feature-badge">jira_escalated</span>
* [XIVY-2224](https://jira.axonivy.com/jira/browse/XIVY-2224) Session of user is still alive after user deletion 
* [XIVY-2238](https://jira.axonivy.com/jira/browse/XIVY-2238) Cleanup JSF ViewScope when closing DialogRuntime 
* [XIVY-2261](https://jira.axonivy.com/jira/browse/XIVY-2261) ISession.logoutSessionUser() clears the HTTP Session attributes of the current request 
* [XIVY-2264](https://jira.axonivy.com/jira/browse/XIVY-2264) Engine start fails after running it as root user <span class="feature-badge">jira_escalated</span>
* [XIVY-2268](https://jira.axonivy.com/jira/browse/XIVY-2268) Wrong parameters in Javadoc for web service process constructor 
* [XIVY-2272](https://jira.axonivy.com/jira/browse/XIVY-2272) RComboBox and RTable fail with an NPE on initialization 
* [XIVY-2300](https://jira.axonivy.com/jira/browse/XIVY-2300) Enforce usage of Java 1.8 webstart by default 
* [XIVY-2359](https://jira.axonivy.com/jira/browse/XIVY-2359) RIA Workflow UI button "Resume All" does not work any more 
* [XIVY-2362](https://jira.axonivy.com/jira/browse/XIVY-2362) Project build maven plugin fails when executing mutliple builds in parallel 
* [XIVY-2378](https://jira.axonivy.com/jira/browse/XIVY-2378) systemctl stop AxonIvyEngine does not stop engine smoothly. Instead the process is killed. 
* [XIVY-2399](https://jira.axonivy.com/jira/browse/XIVY-2399) Fix already known WS client (CXF) bugs 
* [XIVY-2423](https://jira.axonivy.com/jira/browse/XIVY-2423) JSF Workflow UI: trigger escalation and modification of expiry timestamp don't work 
* [XIVY-2429](https://jira.axonivy.com/jira/browse/XIVY-2429) Rarely occuring IndexOutOfBoundsException on process data de-serialisation 
* [XIVY-2458](https://jira.axonivy.com/jira/browse/XIVY-2458) No new PMV will be created by default when redeploying same library but with new version II 
* [IVYPORTAL-3061](https://jira.axonivy.com/jira/browse/IVYPORTAL-3061) ? Session timeout on Modal dialogs <span class="feature-badge">do-not-implement-yet</span>


----

This document is only a brief overview of important new features is provided here.
It is recommended that you consult the respective sections of the updated *Designer Guide*
(via Help > Help Contents > Axon.ivy Designer Guide) if you desire more detailed information about individual new features.

If you are interested in features introduced in the previous releases have a look at [Axon.ivy Digitial Business Platform 7.0 New and Noteworthy](https://developer.axonivy.com/doc/7.0.0/NewAndNoteworthy.html). 