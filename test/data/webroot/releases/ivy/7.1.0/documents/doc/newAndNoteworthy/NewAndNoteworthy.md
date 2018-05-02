# New and Noteworthy 7.1

----

#### New Web Service Client Tooling
The tooling to call remote Web Services has been completely re-worked and is more powerful than ever.

![WebService](images/71_wsClient_requestTab.png "Web Service Request")

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
  
![Installation Details](images/71_designer_isolatedFeatures.png "Installation Details")


### Improvements
* Renew/Change the session ID after login <a href="https://jira.axonivy.com/jira/browse/XIVY-349"><span class="glyphicon glyphicon-new-window"></span></a> 
* Store and access ivy projects as single IAR file on the engine <a href="https://jira.axonivy.com/jira/browse/XIVY-1115"><span class="glyphicon glyphicon-new-window"></span></a> <span class="feature-badge">performance</span>
* REST Client should consider SSL Client settings of Designer and Server when using https <a href="https://jira.axonivy.com/jira/browse/XIVY-1168"><span class="glyphicon glyphicon-new-window"></span></a> 
* Calling REST Service from browser that already owns an authenticated ivy session <a href="https://jira.axonivy.com/jira/browse/XIVY-1183"><span class="glyphicon glyphicon-new-window"></span></a> 
* Support GIT in Designer <a href="https://jira.axonivy.com/jira/browse/XIVY-2137"><span class="glyphicon glyphicon-new-window"></span></a> 
* Replace AWT IvyScriptEditor in Script Activity with new SWT Editor <a href="https://jira.axonivy.com/jira/browse/XIVY-2265"><span class="glyphicon glyphicon-new-window"></span></a> 
* Officially support Maria DB <a href="https://jira.axonivy.com/jira/browse/XIVY-2269"><span class="glyphicon glyphicon-new-window"></span></a> 
* Replace AWT Output Tab in Script Activity with new SWT Output Tab <a href="https://jira.axonivy.com/jira/browse/XIVY-2308"><span class="glyphicon glyphicon-new-window"></span></a> 
* Automate Designer pre-requisites installation under Linux <a href="https://jira.axonivy.com/jira/browse/XIVY-2376"><span class="glyphicon glyphicon-new-window"></span></a> 
* Make project reporting an independent installable P2 unit <a href="https://jira.axonivy.com/jira/browse/XIVY-2404"><span class="glyphicon glyphicon-new-window"></span></a> 
* Respect editor preferences for Html Dialog views <a href="https://jira.axonivy.com/jira/browse/XIVY-2446"><span class="glyphicon glyphicon-new-window"></span></a> 
* Improve graphical performance on process editor for linux <a href="https://jira.axonivy.com/jira/browse/XIVY-2449"><span class="glyphicon glyphicon-new-window"></span></a> 


### Bug Fixes
* [XIVY-85](https://jira.axonivy.com/jira/browse/XIVY-85) Enable Edit button on WS endpoint 
* [XIVY-118](https://jira.axonivy.com/jira/browse/XIVY-118) Process editor context menu selected text is white on Windows 10 
* [XIVY-1034](https://jira.axonivy.com/jira/browse/XIVY-1034) Problem when saving the deployment editor after removing the SNAPSHOT from the version 
* [XIVY-1329](https://jira.axonivy.com/jira/browse/XIVY-1329) No new PMV will be created by default when redeploying same library but with new version 
* [XIVY-1673](https://jira.axonivy.com/jira/browse/XIVY-1673) Attachments sent by mail step contains folder path 
* [XIVY-1853](https://jira.axonivy.com/jira/browse/XIVY-1853) REST API for single tasks does not return resumed/created tasks 
* [XIVY-2170](https://jira.axonivy.com/jira/browse/XIVY-2170) Hovered text in context menu of process editor is white 
* [XIVY-2171](https://jira.axonivy.com/jira/browse/XIVY-2171) A task may start on the wrong TaskSwitchGateway output arc 
* [XIVY-2173](https://jira.axonivy.com/jira/browse/XIVY-2173) Sample Call&Wait implementation does not work with multiple PMVs 
* [XIVY-2206](https://jira.axonivy.com/jira/browse/XIVY-2206) File Browse in Control Center fails 
* [XIVY-2209](https://jira.axonivy.com/jira/browse/XIVY-2209) Process Selection in CaseMap-Editor does not work 
* [XIVY-2210](https://jira.axonivy.com/jira/browse/XIVY-2210) Ivy 6.0/7.0 can't join tasks of cases which has been started with Ivy 5.1 
* [XIVY-2214](https://jira.axonivy.com/jira/browse/XIVY-2214) Can not build 7.0.0 projects while a non OSGi engine is in cache 
* [XIVY-2216](https://jira.axonivy.com/jira/browse/XIVY-2216) NullpointerException occurs while logging null values in Designer 
* [XIVY-2224](https://jira.axonivy.com/jira/browse/XIVY-2224) Session of user is still alive after user deletion 
* [XIVY-2238](https://jira.axonivy.com/jira/browse/XIVY-2238) Cleanup JSF ViewScope when closing DialogRuntime 
* [XIVY-2245](https://jira.axonivy.com/jira/browse/XIVY-2245) Unexpected 'End of File' scripting error when mapping REST response 
* [XIVY-2259](https://jira.axonivy.com/jira/browse/XIVY-2259) Empty task activator script fails at runtime 
* [XIVY-2261](https://jira.axonivy.com/jira/browse/XIVY-2261) ISession.logoutSessionUser() clears the HTTP Session attributes of the current request 
* [XIVY-2264](https://jira.axonivy.com/jira/browse/XIVY-2264) Engine start fails after running it as root user 
* [XIVY-2268](https://jira.axonivy.com/jira/browse/XIVY-2268) Wrong parameters in Javadoc for web service process constructor 
* [XIVY-2272](https://jira.axonivy.com/jira/browse/XIVY-2272) RComboBox and RTable fail with an NPE on initialization 
* [XIVY-2300](https://jira.axonivy.com/jira/browse/XIVY-2300) Enforce usage of Java 1.8 webstart by default 
* [XIVY-2333](https://jira.axonivy.com/jira/browse/XIVY-2333) Enterprise server discloses hostname 
* [XIVY-2359](https://jira.axonivy.com/jira/browse/XIVY-2359) RIA Workflow UI button "Resume All" does not work any more 
* [XIVY-2362](https://jira.axonivy.com/jira/browse/XIVY-2362) Project build maven plugin fails when executing mutliple builds in parallel 
* [XIVY-2378](https://jira.axonivy.com/jira/browse/XIVY-2378) systemctl stop AxonIvyEngine does not stop engine smoothly. Instead the process is killed. 
* [XIVY-2399](https://jira.axonivy.com/jira/browse/XIVY-2399) Fix already known WS client (CXF) bugs 
* [XIVY-2423](https://jira.axonivy.com/jira/browse/XIVY-2423) JSF Workflow UI: trigger escalation and modification of expiry timestamp don't work 
* [XIVY-2429](https://jira.axonivy.com/jira/browse/XIVY-2429) Rarely occuring IndexOutOfBoundsException on process data de-serialisation 
* [XIVY-2432](https://jira.axonivy.com/jira/browse/XIVY-2432) CC/BCC-Recipients in mail are not set in Designer 
* [XIVY-2458](https://jira.axonivy.com/jira/browse/XIVY-2458) No new PMV will be created by default when redeploying same library but with new version II 
* [XIVY-2461](https://jira.axonivy.com/jira/browse/XIVY-2461) WSDL namespace mapping dialog does not expose all namespaces 
* [XIVY-2475](https://jira.axonivy.com/jira/browse/XIVY-2475) HTTP authentication (Basic/Digest/NTLM) while reading WSDL file in WebService editor broken. 
* [XIVY-2493](https://jira.axonivy.com/jira/browse/XIVY-2493) Cluster Communication broken because of ClassLoading Problems with OSGi 
* [IVYPORTAL-2737](https://jira.axonivy.com/jira/browse/IVYPORTAL-2737) Correct Session timeout 
* [IVYPORTAL-2844](https://jira.axonivy.com/jira/browse/IVYPORTAL-2844) Enhance - Add favourite Processes 
* [IVYPORTAL-4286](https://jira.axonivy.com/jira/browse/IVYPORTAL-4286) Clean up Express CSS 
* [IVYPORTAL-4289](https://jira.axonivy.com/jira/browse/IVYPORTAL-4289) Clean up Portal style 
* [IVYPORTAL-4365](https://jira.axonivy.com/jira/browse/IVYPORTAL-4365) Fix layout on ~1240 pixels 
* [IVYPORTAL-4386](https://jira.axonivy.com/jira/browse/IVYPORTAL-4386) Add to dashboard button does not work in PortalStatistics 
* [IVYPORTAL-4433](https://jira.axonivy.com/jira/browse/IVYPORTAL-4433) Fix performance bug in user/role selection 
* [IVYPORTAL-4489](https://jira.axonivy.com/jira/browse/IVYPORTAL-4489) Lazy load embedded dialogs on demand 
* [IVYPORTAL-4498](https://jira.axonivy.com/jira/browse/IVYPORTAL-4498) Link to open sidebar is missing 
* [IVYPORTAL-4539](https://jira.axonivy.com/jira/browse/IVYPORTAL-4539) Extended PortalKit supported language cause error III 
* [IVYPORTAL-4812](https://jira.axonivy.com/jira/browse/IVYPORTAL-4812) Search in case list doesn't work for creator 
* [IVYPORTAL-4813](https://jira.axonivy.com/jira/browse/IVYPORTAL-4813) Task list filtering in Multiapp Szenario - Responsible filter for each app 
* [IVYPORTAL-4867](https://jira.axonivy.com/jira/browse/IVYPORTAL-4867) Consistent behaviour in Portal - Leaving task warning 
* [IVYPORTAL-4882](https://jira.axonivy.com/jira/browse/IVYPORTAL-4882) Fix NPE in portal if COERCE_TO_ZERO option is enabled 
* [IVYPORTAL-4942](https://jira.axonivy.com/jira/browse/IVYPORTAL-4942) Design chooser bug - New Colours were not applied after saving 
* [IVYPORTAL-4969](https://jira.axonivy.com/jira/browse/IVYPORTAL-4969) Session expired message, even if session not expired II 
* [IVYPORTAL-5015](https://jira.axonivy.com/jira/browse/IVYPORTAL-5015) List out Portal multi-applications issues 
* [IVYPORTAL-5027](https://jira.axonivy.com/jira/browse/IVYPORTAL-5027) Bug in Task list navigation - Portal Home and full task list 
* [IVYPORTAL-5031](https://jira.axonivy.com/jira/browse/IVYPORTAL-5031) Costumization with Less doesn't change buttons in Exit-Dialog II 
* [IVYPORTAL-5118](https://jira.axonivy.com/jira/browse/IVYPORTAL-5118) Implement "Sticky Task List" for "Skip Task List" 

----

This document is only a brief overview of important new features is provided here.
It is recommended that you consult the respective sections of the updated *Designer Guide*
(via Help > Help Contents > Axon.ivy Designer Guide) if you desire more detailed information about individual new features.

If you are interested in features introduced in the previous releases have a look at [Axon.ivy Digitial Business Platform 7.0 New and Noteworthy](https://developer.axonivy.com/doc/7.0.0/NewAndNoteworthy.html). 
