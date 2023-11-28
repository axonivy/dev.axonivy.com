## Bug Fixes {#bugfixes}

* [XIVY-3858](https://1ivy.atlassian.net/browse/XIVY-3858) Managed Beans not working after deleting 'processes' folder 
* [XIVY-3885](https://1ivy.atlassian.net/browse/XIVY-3885) Mail Notification does not work with a disabled HTTP port 
* [XIVY-4481](https://1ivy.atlassian.net/browse/XIVY-4481) Uploaded Files does not recognize when the username has changed  
* [XIVY-4535](https://1ivy.atlassian.net/browse/XIVY-4535) If I reconfigure the log file location in log4j2.xml cockpit will not show any log files 
* [XIVY-5095](https://1ivy.atlassian.net/browse/XIVY-5095) MySQL can not be migrated if the database name contains "-" 
* [XIVY-7745](https://1ivy.atlassian.net/browse/XIVY-7745) ActiveDirectory configuration of user properties to AD attribute is not case-insensitive 
* [XIVY-8666](https://1ivy.atlassian.net/browse/XIVY-8666) CXF web service NTLM authentication failure <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-9210](https://1ivy.atlassian.net/browse/XIVY-9210) Strange exception javax/servlet/jsp/jstl/core/Config when calling non-existing xhtml page e.g. /dev-workflow-ui/faces/home.XHTMLblabla 
* [XIVY-9844](https://1ivy.atlassian.net/browse/XIVY-9844) Long start-up time in @IvyTest <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-10142](https://1ivy.atlassian.net/browse/XIVY-10142) User and role detail view in the Engine Cockpit makes thousands of database queries to load permissions 
* [XIVY-10189](https://1ivy.atlassian.net/browse/XIVY-10189) Certificate import not working in Designer SSL preferences  
* [XIVY-10530](https://1ivy.atlassian.net/browse/XIVY-10530) SQLServerException in user details view in Engine Cockpit with a lot of roles and SQL Server system database 
* [XIVY-10604](https://1ivy.atlassian.net/browse/XIVY-10604) Project Graph view fails to load because of an NPE 
* [XIVY-10837](https://1ivy.atlassian.net/browse/XIVY-10837) Update Maven Project sometimes causes process data class related validation errors 
* [XIVY-11174](https://1ivy.atlassian.net/browse/XIVY-11174) Cannot generate OpenAPI client from huge YAML file 
* [XIVY-11242](https://1ivy.atlassian.net/browse/XIVY-11242) Engine cannot start because of NoClassDefFoundError 
* [XIVY-11318](https://1ivy.atlassian.net/browse/XIVY-11318) Elasticsearch is calling Axon Ivy Engine in the Traffic Graph view instead of vice versa 
* [XIVY-11342](https://1ivy.atlassian.net/browse/XIVY-11342) No error is reported on UI if I try to log in but am not able to because the session limit has been reached 
* [XIVY-11343](https://1ivy.atlassian.net/browse/XIVY-11343) Error in the log after license upload in the setup wizard 
* [XIVY-11346](https://1ivy.atlassian.net/browse/XIVY-11346) Do not log "triggering indexing because of outdated template" if no objects exist to index 
* [XIVY-11352](https://1ivy.atlassian.net/browse/XIVY-11352) Resource leak in Engine Cockpit when downloading logs and generating support report 
* [XIVY-11358](https://1ivy.atlassian.net/browse/XIVY-11358) Two dependent projects that both contain web service clients cause Ivy validation problem warnings  
* [XIVY-11363](https://1ivy.atlassian.net/browse/XIVY-11363) IvyTest AppFixture API should allow setting config lists 
* [XIVY-11367](https://1ivy.atlassian.net/browse/XIVY-11367) If the filename of the license is named 'demo.lic' the Axon Ivy Engine does not recognise it 
* [XIVY-11370](https://1ivy.atlassian.net/browse/XIVY-11370) Default values of IdentityProvider user synchronization properties are not respected 
* [XIVY-11409](https://1ivy.atlassian.net/browse/XIVY-11409) Freya theme switch does not apply to newly started processes 
* [XIVY-11411](https://1ivy.atlassian.net/browse/XIVY-11411) NPE problem marker on all Rest Client configuration files in the workspace if one has a corrupt UUID 
* [XIVY-11445](https://1ivy.atlassian.net/browse/XIVY-11445) Improve and correct documentation regarding Duration type 
* [XIVY-11471](https://1ivy.atlassian.net/browse/XIVY-11471) Relax the process start path format validation 
* [XIVY-11484](https://1ivy.atlassian.net/browse/XIVY-11484) Improve mod to p.json process conversion from 8.0 to 10.0 
* [XIVY-11525](https://1ivy.atlassian.net/browse/XIVY-11525) Maven project build plugin fails to validate IvyScript on Windows if the .m2 directory is located on another drive than the project 
* [XIVY-11577](https://1ivy.atlassian.net/browse/XIVY-11577) Reconnect of an output arc of an alternative gateway is broken 
* [XIVY-11578](https://1ivy.atlassian.net/browse/XIVY-11578) WebSocket protocol not supported for Apache httpd and IIS proxy configuration 
* [XIVY-11579](https://1ivy.atlassian.net/browse/XIVY-11579) Problems adding languages to CMS with script/encryption specified 
* [XIVY-11589](https://1ivy.atlassian.net/browse/XIVY-11589) Duration.clone() only clones the seconds instead of all fields 
* [XIVY-11600](https://1ivy.atlassian.net/browse/XIVY-11600) JUnit IvyTest not working if a project is packaged 
* [XIVY-11652](https://1ivy.atlassian.net/browse/XIVY-11652) Improve new Ivy project wizard Default Namespace generation 
* [XIVY-11657](https://1ivy.atlassian.net/browse/XIVY-11657) Can not compile a project with the maven build plugin if there are special chars in the path 
* [XIVY-11667](https://1ivy.atlassian.net/browse/XIVY-11667) Project conversion does not work in Dev-Designer if the portal version cannot be evaluated 
* [XIVY-11727](https://1ivy.atlassian.net/browse/XIVY-11727) Exception when Axon Ivy Engine will be stopped directly after starting 
* [XIVY-11740](https://1ivy.atlassian.net/browse/XIVY-11740) Function Browser in SWT Inscription mask does not open 
* [XIVY-11758](https://1ivy.atlassian.net/browse/XIVY-11758) Project conversion fails if one HTML Dialog View file can not be converted 
* [XIVY-11766](https://1ivy.atlassian.net/browse/XIVY-11766) Could not remove User Dialog because Dialog was already deleted 
* [XIVY-11799](https://1ivy.atlassian.net/browse/XIVY-11799) Correctly spell e.g., and i.e., in the documentation 
* [XIVY-11801](https://1ivy.atlassian.net/browse/XIVY-11801) Improve Signavio BPMN2 compatibility 
* [XIVY-11995](https://1ivy.atlassian.net/browse/XIVY-11995) Don't allow the creation of a new security system with the same name as an existing security system in the Engine Cockpit 
* [XIVY-12052](https://1ivy.atlassian.net/browse/XIVY-12052) Empty Locale not supported as user language 
* [XIVY-12077](https://1ivy.atlassian.net/browse/XIVY-12077) IllegalStateException Project was closed or deleted. Class loader is no longer accessable after deployment. 
* [XIVY-12125](https://1ivy.atlassian.net/browse/XIVY-12125) OpenAPI code generation fails to create date-time instances 
* [XIVY-12129](https://1ivy.atlassian.net/browse/XIVY-12129) Project conversion 8->10 of org.primefaces.model.DefaultStreamedContent does not work 
* [XIVY-12130](https://1ivy.atlassian.net/browse/XIVY-12130) After project conversion 8->10 an IvyScript macro that expands in.anyNumber introduces a breaking change   
* [XIVY-12131](https://1ivy.atlassian.net/browse/XIVY-12131) Data attribute names in IvyScript are case-insensitive which leads to confusing results   
* [XIVY-12134](https://1ivy.atlassian.net/browse/XIVY-12134) IvyTest fails to work with custom Valve installed as drop-in bundle 
* [XIVY-12240](https://1ivy.atlassian.net/browse/XIVY-12240) Engine Cockpit Logs view does not show content on Debian-based installation 
* [XIVY-12256](https://1ivy.atlassian.net/browse/XIVY-12256) Windows Service Registration - Quote path, work with quoted path 
* [XIVY-12325](https://1ivy.atlassian.net/browse/XIVY-12325) NPE in ServiceManager during startup of enterprise engine 
* [XIVY-12329](https://1ivy.atlassian.net/browse/XIVY-12329) IvyScript content assist shows a lot of attributes for ivy.case. 
* [XIVY-12330](https://1ivy.atlassian.net/browse/XIVY-12330) IvyScript content assist broken for ivy.case. 
* [XIVY-12366](https://1ivy.atlassian.net/browse/XIVY-12366) Custom application property migration to YAML file fails 
* [XIVY-12397](https://1ivy.atlassian.net/browse/XIVY-12397) Engine fails to boot after migration due to SecuritySystem with the name 'System' from an older version 
* [XIVY-12398](https://1ivy.atlassian.net/browse/XIVY-12398)  Migration of an Engine to LTS 10, creates an unneeded 'demo-portal' SecuritySystem 
* [XIVY-12502](https://1ivy.atlassian.net/browse/XIVY-12502) Engine Cockpit needs refresh when changing the configuration of a Web Service Client 
* [XIVY-12503](https://1ivy.atlassian.net/browse/XIVY-12503) Engine Cockpit  re-creates deleted database property on browser refresh 
* [XIVY-12520](https://1ivy.atlassian.net/browse/XIVY-12520) The language of the user will be set to empty after every user synchronization 
* [XIVY-12525](https://1ivy.atlassian.net/browse/XIVY-12525) Axon Ivy Engine must be restarted when IvyComposites interfaces (XHTML) will be changed in a deployment 
* [XIVY-12528](https://1ivy.atlassian.net/browse/XIVY-12528) Executing a database step in a loop is slow <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-12558](https://1ivy.atlassian.net/browse/XIVY-12558) New task and daily task summary emails are sent to disabled users 
* [XIVY-12560](https://1ivy.atlassian.net/browse/XIVY-12560) Role selector shows invalid entries (CREATOR, etc) on start elements 
* [XIVY-12583](https://1ivy.atlassian.net/browse/XIVY-12583) ivy.var.XXX does not work at all if a variable is defined in variables.yaml without a default value and overridden with a value in app.yaml 
* [XIVY-12584](https://1ivy.atlassian.net/browse/XIVY-12584) Remove dialog element from dialog logic's process palette 
* [XIVY-12664](https://1ivy.atlassian.net/browse/XIVY-12664) Application start fails if app.yaml's can not be written 
* [XIVY-12678](https://1ivy.atlassian.net/browse/XIVY-12678) IvyTest runtime error because of non-breakable circular DI of IvyValidatorFactory 
* [XIVY-12743](https://1ivy.atlassian.net/browse/XIVY-12743) Weird behaviors when clicking Enter in different Engine Cockpit views. E.g., role gets deleted when you press enter in an input field 
* [XIVY-12766](https://1ivy.atlassian.net/browse/XIVY-12766) RestClient can not make OAuth2 authentication if OAuth2 provider returns expires_in as String instead of Integer 
* [XIVY-12769](https://1ivy.atlassian.net/browse/XIVY-12769) The Sessions view in Engine Cockpit does not work if an HTTP session has been invalidated 
* [XIVY-12773](https://1ivy.atlassian.net/browse/XIVY-12773) NPE in Engine Cockpit when using custom authentication feature for web service client or rest client which does not follow a naming concept 
* [XIVY-12798](https://1ivy.atlassian.net/browse/XIVY-12798) Thread context logging is broken 
* [XIVY-12827](https://1ivy.atlassian.net/browse/XIVY-12827) ClassCastException if one tries to grant or deny certain Portal permission in Engine Cockpit 
* [XIVY-12845](https://1ivy.atlassian.net/browse/XIVY-12845) ViewExpiredException if one refreshes the process viewer in Portal 
* [XIVY-12887](https://1ivy.atlassian.net/browse/XIVY-12887) JSON Inscription view and History view do not show initial selection 
* [XIVY-12964](https://1ivy.atlassian.net/browse/XIVY-12964) Deployment of all REST services of all applications on an Engine fails if there is a problem with class scanning in one single project 
* [XIVY-12965](https://1ivy.atlassian.net/browse/XIVY-12965) Sometimes a ResourceException is thrown during the Export of a project into an IAR file from the Designer 
* [XIVY-12970](https://1ivy.atlassian.net/browse/XIVY-12970) REST Client connection tester in Engine Cockpit should not report error on error code 400 (BAD REQUEST) 
* [IVYPORTAL-14989](https://1ivy.atlassian.net/browse/IVYPORTAL-14989) Security vulnerability in portal functional processes <span class="badge badge-pill badge-success badge-security">security</span>
* [IVYPORTAL-15011](https://1ivy.atlassian.net/browse/IVYPORTAL-15011) Exception when load filter set has filter condition of custom column 
* [IVYPORTAL-15046](https://1ivy.atlassian.net/browse/IVYPORTAL-15046) Browser refresh starts again a new process instead of refreshing the current user dialog 
* [IVYPORTAL-15104](https://1ivy.atlassian.net/browse/IVYPORTAL-15104) Display wrong default language in iFrame and language setting 
* [IVYPORTAL-15114](https://1ivy.atlassian.net/browse/IVYPORTAL-15114) Process is not populated when editing Dashboard Process Widget 
* [IVYPORTAL-15165](https://1ivy.atlassian.net/browse/IVYPORTAL-15165) "More Information" link not show on dashboard 
* [IVYPORTAL-15299](https://1ivy.atlassian.net/browse/IVYPORTAL-15299) Dashboard Process widget: cannot select External Link 
* [IVYPORTAL-15307](https://1ivy.atlassian.net/browse/IVYPORTAL-15307) Process chain causes error when setting step with JavaScript from IFrame 
* [IVYPORTAL-15327](https://1ivy.atlassian.net/browse/IVYPORTAL-15327) Permissions not updated 
* [IVYPORTAL-15357](https://1ivy.atlassian.net/browse/IVYPORTAL-15357) Case category in case list displayed incorrectly 
* [IVYPORTAL-15364](https://1ivy.atlassian.net/browse/IVYPORTAL-15364) Express end page not work properly 
* [IVYPORTAL-15418](https://1ivy.atlassian.net/browse/IVYPORTAL-15418) Reset password email has wrong format 
* [IVYPORTAL-15434](https://1ivy.atlassian.net/browse/IVYPORTAL-15434) Iframe height in TaskTemplate calculated after Primefaces load UI inside 
* [IVYPORTAL-15553](https://1ivy.atlassian.net/browse/IVYPORTAL-15553) Fix statistics expired chart not filter correctly 
* [IVYPORTAL-15618](https://1ivy.atlassian.net/browse/IVYPORTAL-15618) Fix process item not display correctly on dashboard 
* [IVYPORTAL-15619](https://1ivy.atlassian.net/browse/IVYPORTAL-15619) Portal without menu frame not align correctly 
* [IVYPORTAL-15639](https://1ivy.atlassian.net/browse/IVYPORTAL-15639) Cannot find callable subprocess from override HTML dialog 
* [IVYPORTAL-15799](https://1ivy.atlassian.net/browse/IVYPORTAL-15799) Fix Process Viewer doesn't work on Portal 
* [IVYPORTAL-15815](https://1ivy.atlassian.net/browse/IVYPORTAL-15815) Exception with UUID on Case note history 
* [IVYPORTAL-15920](https://1ivy.atlassian.net/browse/IVYPORTAL-15920) NPE when load filter set of a dashboard widget 
* [IVYPORTAL-15963](https://1ivy.atlassian.net/browse/IVYPORTAL-15963) SQLServerException error in Statistic page 
* [IVYPORTAL-15994](https://1ivy.atlassian.net/browse/IVYPORTAL-15994) Wrong number of task and case in dashboard widget information 
* [IVYPORTAL-15997](https://1ivy.atlassian.net/browse/IVYPORTAL-15997) Process Widget Sort By Index Bug 
* [IVYPORTAL-16114](https://1ivy.atlassian.net/browse/IVYPORTAL-16114) Exception in compact process 
* [IVYPORTAL-16170](https://1ivy.atlassian.net/browse/IVYPORTAL-16170) NPE when load Portal configuration page with old JSON 