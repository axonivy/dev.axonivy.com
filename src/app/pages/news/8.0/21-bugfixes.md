## Bug Fixes {#bugfixes}

* [XIVY-85](https://jira.axonivy.com/jira/browse/XIVY-85) Enable Edit button on WS endpoint 
* [XIVY-118](https://jira.axonivy.com/jira/browse/XIVY-118) Process editor context menu selected text is white on Windows 10 
* [XIVY-852](https://jira.axonivy.com/jira/browse/XIVY-852) Default XHTML dialog editor is broken on macOS  
* [XIVY-1011](https://jira.axonivy.com/jira/browse/XIVY-1011) Handle null entries when sorting by expiry date via orderby().nullFirst() or orderBy().nullLast() 
* [XIVY-1034](https://jira.axonivy.com/jira/browse/XIVY-1034) Problem when saving the deployment editor after removing the SNAPSHOT from the version 
* [XIVY-1298](https://jira.axonivy.com/jira/browse/XIVY-1298) Custom error page is not documented 
* [XIVY-1329](https://jira.axonivy.com/jira/browse/XIVY-1329) No new PMV will be created by default when redeploying same library but with new version 
* [XIVY-1672](https://jira.axonivy.com/jira/browse/XIVY-1672) MSSQL: Inserting to CustomVarCharFields fails when inserting more than 900 bytes 
* [XIVY-1673](https://jira.axonivy.com/jira/browse/XIVY-1673) Attachments sent by mail step contains folder path 
* [XIVY-1706](https://jira.axonivy.com/jira/browse/XIVY-1706) JavaScript Builder fails with NPE on WebPage projects 
* [XIVY-1853](https://jira.axonivy.com/jira/browse/XIVY-1853) REST API for single tasks does not return resumed/created tasks 
* [XIVY-1948](https://jira.axonivy.com/jira/browse/XIVY-1948) UI process executes normal even if current task is not in state CREATED/RESUMED 
* [XIVY-2000](https://jira.axonivy.com/jira/browse/XIVY-2000) HtmlDialog from global error handler (handling error from another HtmlDialog) is not shown for Ajax request 
* [XIVY-2112](https://jira.axonivy.com/jira/browse/XIVY-2112) Text overlapping in designer welcome page 
* [XIVY-2168](https://jira.axonivy.com/jira/browse/XIVY-2168) Can't install new Licences over a UI if it has expired 
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
* [XIVY-2488](https://jira.axonivy.com/jira/browse/XIVY-2488) Can not store an object in the business data store with more than 1000 different fields 
* [XIVY-2492](https://jira.axonivy.com/jira/browse/XIVY-2492) Broken pipe when trying to load web assets like fonts or css files 
* [XIVY-2493](https://jira.axonivy.com/jira/browse/XIVY-2493) Cluster Communication broken because of ClassLoading Problems with OSGi 
* [XIVY-2495](https://jira.axonivy.com/jira/browse/XIVY-2495) Displaying of the roles in the AdminUI is extremely slow with a lot of PMVs and Roles 
* [XIVY-2497](https://jira.axonivy.com/jira/browse/XIVY-2497) Serving wrong mime type for jpeg images in cms causes problems with IE 
* [XIVY-2503](https://jira.axonivy.com/jira/browse/XIVY-2503) ViewExpiredException if an error happens after an HtmlDialog in the business process 
* [XIVY-2504](https://jira.axonivy.com/jira/browse/XIVY-2504) Ivy.html().startref(...) is not available within rest service 
* [XIVY-2506](https://jira.axonivy.com/jira/browse/XIVY-2506) JSFWorkflowUI does not show Absences/Substitution in navigation 
* [XIVY-2525](https://jira.axonivy.com/jira/browse/XIVY-2525) JSF NumberConverter does not work properly with p:inputNumber and german locale 
* [XIVY-2535](https://jira.axonivy.com/jira/browse/XIVY-2535) Parameter requestedPage for default login process is wrong 
* [XIVY-2538](https://jira.axonivy.com/jira/browse/XIVY-2538) EmptyStackException occurs if a task is reseted and a user want to submit the form 
* [XIVY-2590](https://jira.axonivy.com/jira/browse/XIVY-2590) Mapping to unqualified ch.ivyteam.ivy.scripting.objects.List<E> fails in rest client 
* [XIVY-2591](https://jira.axonivy.com/jira/browse/XIVY-2591) Validate Database Activity output tab at design time 
* [XIVY-2593](https://jira.axonivy.com/jira/browse/XIVY-2593) JSF view file validation and content assist does not know properties and methods declared in super interfaces 
* [XIVY-2610](https://jira.axonivy.com/jira/browse/XIVY-2610) Gracefully shutdown the engine 
* [XIVY-2619](https://jira.axonivy.com/jira/browse/XIVY-2619) Process search in Designer fails without showing any results 
* [XIVY-2627](https://jira.axonivy.com/jira/browse/XIVY-2627) Open redirect vulnerability in Engine Wf UI <span class="badge badge-pill badge-success">security</span>
* [XIVY-2628](https://jira.axonivy.com/jira/browse/XIVY-2628) Wrong "error" page if one clicks on a link of a inactive PMV 
* [XIVY-2632](https://jira.axonivy.com/jira/browse/XIVY-2632) NPE when joining Task 
* [XIVY-2638](https://jira.axonivy.com/jira/browse/XIVY-2638) HttpOnly flag is not specified on cookie set by Java Webstart request <span class="badge badge-pill badge-success">security</span>
* [XIVY-2657](https://jira.axonivy.com/jira/browse/XIVY-2657) Error information missing on ViewExpiredException 
* [XIVY-2666](https://jira.axonivy.com/jira/browse/XIVY-2666) BPMN element names with umlauts are broken under linux 
* [XIVY-2717](https://jira.axonivy.com/jira/browse/XIVY-2717) Support Maria-DB driver under Linux 
* [XIVY-2747](https://jira.axonivy.com/jira/browse/XIVY-2747) Process Editor freezes under Linux 
* [XIVY-2803](https://jira.axonivy.com/jira/browse/XIVY-2803) Rarely NullPointerException on engine/designer start 
* [XIVY-2810](https://jira.axonivy.com/jira/browse/XIVY-2810) Fix Oxygen Designer packaging/start on macOS 
* [XIVY-2836](https://jira.axonivy.com/jira/browse/XIVY-2836) HD View validation shows false positive warnings for standard components 
* [XIVY-2840](https://jira.axonivy.com/jira/browse/XIVY-2840) Rarely NullPointerException on webserver start 
* [XIVY-2860](https://jira.axonivy.com/jira/browse/XIVY-2860) Support Windows Server 2016 in IIS integration batch files 
* [XIVY-2867](https://jira.axonivy.com/jira/browse/XIVY-2867) Session expired error message when trying to start an already finsished task with a link in a notification mail  
* [XIVY-2868](https://jira.axonivy.com/jira/browse/XIVY-2868) An image from CMS are not correctly included/referenced in a mail if it is not located in the CMS root folder 
* [XIVY-2873](https://jira.axonivy.com/jira/browse/XIVY-2873) Designer may not start because of a race condition in RuleEngineActivator 
* [XIVY-2874](https://jira.axonivy.com/jira/browse/XIVY-2874) Database Connection is not closed when quering database in the SQL Query Dialog of the Database Editor of the Designer 
* [XIVY-2880](https://jira.axonivy.com/jira/browse/XIVY-2880) Overloaded Methods may not correctly be displayed in completion proposal and javadoc help  
* [XIVY-2882](https://jira.axonivy.com/jira/browse/XIVY-2882) Memory Leak in ProcessElementFactory 
* [XIVY-2883](https://jira.axonivy.com/jira/browse/XIVY-2883) Business Data (Elasticsearch) does not work if I start same Designer twice 
* [XIVY-2888](https://jira.axonivy.com/jira/browse/XIVY-2888) Webservice call model invalid when migrating from Axis2 to CXF 
* [XIVY-2889](https://jira.axonivy.com/jira/browse/XIVY-2889) Data Class editor is not correctly initialized when data class is opened from Search view 
* [XIVY-2890](https://jira.axonivy.com/jira/browse/XIVY-2890) Cannot restart engine if old license is no longer valid even if I install a new valid license   
* [XIVY-2891](https://jira.axonivy.com/jira/browse/XIVY-2891) ManagedBeans do not work in *.iar file created with the Designer 
* [XIVY-2893](https://jira.axonivy.com/jira/browse/XIVY-2893) TaskQuery.fromJson may fail with JsonMappingException: Numeric value (XXXX) out of range of int 
* [XIVY-2894](https://jira.axonivy.com/jira/browse/XIVY-2894) Pack/Unpack a project creates unneeded empty files 
* [XIVY-2895](https://jira.axonivy.com/jira/browse/XIVY-2895) Error message of BPM Error is not displayed in error page 
* [XIVY-2898](https://jira.axonivy.com/jira/browse/XIVY-2898) Memory leak in RuleVersionService (Rule Engine) 
* [XIVY-2912](https://jira.axonivy.com/jira/browse/XIVY-2912) Element alignment broken after copy-paste 
* [XIVY-2913](https://jira.axonivy.com/jira/browse/XIVY-2913) Use UTF-8 to encode mail addresses (to, from, cc, bcc, replyTo) 
* [XIVY-2915](https://jira.axonivy.com/jira/browse/XIVY-2915) JSF managed beans, validators or converters of a projects may not be found after redeploy or restart  
* [XIVY-2916](https://jira.axonivy.com/jira/browse/XIVY-2916) Elasticsearch cannot be started under Linux if installation path contains a space 
* [XIVY-2917](https://jira.axonivy.com/jira/browse/XIVY-2917) Can't start Engine to renew licence with Engine-Config or -Cockpit if old licence is expired 
* [XIVY-2920](https://jira.axonivy.com/jira/browse/XIVY-2920) Password is visible in clear text in AdminUI if it is configured in a yaml file even if it is encrypted in the file 
* [XIVY-2922](https://jira.axonivy.com/jira/browse/XIVY-2922) OSGi Bundle patches not in charge if whitespaces in path 
* [XIVY-2931](https://jira.axonivy.com/jira/browse/XIVY-2931) Restart of Task throws EmptyStackException or IvyScriptCastException 
* [XIVY-2954](https://jira.axonivy.com/jira/browse/XIVY-2954) Can not migrate engine because of missing *iar.zip if no system database migration is needed 
* [XIVY-2957](https://jira.axonivy.com/jira/browse/XIVY-2957) Engine started with systemd awaits timeout if exited by a failure 
* [XIVY-2964](https://jira.axonivy.com/jira/browse/XIVY-2964) Html Dialog Editor WYSIWYG selection broken with JRE 191 
* [XIVY-2970](https://jira.axonivy.com/jira/browse/XIVY-2970) Opening an Embedded-Sub InscriptionEditor throws NPE 
* [XIVY-2972](https://jira.axonivy.com/jira/browse/XIVY-2972) Deadlock can occur when importing all ivy sample projects 
* [XIVY-2973](https://jira.axonivy.com/jira/browse/XIVY-2973) ConcurrentModificationException after importing ivy projects 
* [XIVY-2974](https://jira.axonivy.com/jira/browse/XIVY-2974) Bundled ElasticSearch has frequently no data after reboot 
* [XIVY-2984](https://jira.axonivy.com/jira/browse/XIVY-2984) Database Output tab not validated in RDM 
* [XIVY-2992](https://jira.axonivy.com/jira/browse/XIVY-2992) Project build problem after moving to new workspace 
* [XIVY-2993](https://jira.axonivy.com/jira/browse/XIVY-2993) NPE in CMS after closing or deleting a project 
* [XIVY-2994](https://jira.axonivy.com/jira/browse/XIVY-2994) Build problems after importing .iar created with Designer 7.2 
* [XIVY-3004](https://jira.axonivy.com/jira/browse/XIVY-3004) Deadlock while deploying multiple iars to a new application 
* [XIVY-3012](https://jira.axonivy.com/jira/browse/XIVY-3012) ConcurrentModificationException in request history 
* [XIVY-3020](https://jira.axonivy.com/jira/browse/XIVY-3020) IsNull-Query for additional property returns wrong result 
* [XIVY-3024](https://jira.axonivy.com/jira/browse/XIVY-3024) Copy & paste in process editor does not respect view port 
* [XIVY-3042](https://jira.axonivy.com/jira/browse/XIVY-3042) Designer bug dialog fails to render linebreaks in error message 
* [XIVY-3048](https://jira.axonivy.com/jira/browse/XIVY-3048) Goto Data Class action broken when viewing embedded Subprocess 
* [XIVY-3056](https://jira.axonivy.com/jira/browse/XIVY-3056) Memory Leak with Oracle as System Database 
* [XIVY-3057](https://jira.axonivy.com/jira/browse/XIVY-3057) isEqual/isEqualIgnoreCase Queries do not work on customTextFields and additonalProperties with MS-SQL DB 
* [XIVY-3058](https://jira.axonivy.com/jira/browse/XIVY-3058) CMS Search Index creation fails with NPE 
* [XIVY-3059](https://jira.axonivy.com/jira/browse/XIVY-3059) Multithreading issues in AXIS Web Service Client Call 
* [XIVY-3062](https://jira.axonivy.com/jira/browse/XIVY-3062) Referenced TaskExpiry error not updated during copy&paste 
* [XIVY-3073](https://jira.axonivy.com/jira/browse/XIVY-3073) ConcurrentModificationException when using async p:remotecommands 
* [XIVY-3107](https://jira.axonivy.com/jira/browse/XIVY-3107) PersistentObjectDeletedException in SessionCounter when deleting User 
* [XIVY-3108](https://jira.axonivy.com/jira/browse/XIVY-3108) ViewExpiredExceptions is logged on Level INFO with full stacktrace 
* [XIVY-3117](https://jira.axonivy.com/jira/browse/XIVY-3117) CXF WebService Generation fails if included xsd needs redirecting 
* [XIVY-3118](https://jira.axonivy.com/jira/browse/XIVY-3118) Task notification mail sending is slow 
* [XIVY-3127](https://jira.axonivy.com/jira/browse/XIVY-3127) NoSuchElementException in EndlessLoopDetectionJob 
* [XIVY-3128](https://jira.axonivy.com/jira/browse/XIVY-3128) StackOverflowException in JavaBeanUtil while logging Axis1 or Axis2 WebService error 
* [XIVY-3134](https://jira.axonivy.com/jira/browse/XIVY-3134) Task notification mail job may trigger unneeded portal home requests causing high cpu usage 
* [XIVY-3137](https://jira.axonivy.com/jira/browse/XIVY-3137) High CPU load (100%) if you debug the Designer inside the Designer 
* [XIVY-3139](https://jira.axonivy.com/jira/browse/XIVY-3139) Find invovled cases since MySQL 8.0.12 extremly slow 
* [XIVY-3141](https://jira.axonivy.com/jira/browse/XIVY-3141) Timeout while synchronizing 50'000 users with Novell eDirectory 
* [XIVY-3153](https://jira.axonivy.com/jira/browse/XIVY-3153) NPE in CMS when opening TaskSwitchEvent Inscription Mask within packed project 
* [XIVY-3167](https://jira.axonivy.com/jira/browse/XIVY-3167) HtmlMailConverter endless port occupation 
* [XIVY-3169](https://jira.axonivy.com/jira/browse/XIVY-3169) Engine Cockpit error if no app is deployed on applications view 
* [XIVY-3170](https://jira.axonivy.com/jira/browse/XIVY-3170) CustomTimestampField cache issue if it's called the first time 
* [XIVY-3173](https://jira.axonivy.com/jira/browse/XIVY-3173) Ivy project rename error in data classes 
* [XIVY-3178](https://jira.axonivy.com/jira/browse/XIVY-3178) TimeoutException during building of ivy project 
* [XIVY-3179](https://jira.axonivy.com/jira/browse/XIVY-3179) Engine Cockpit array error if a app file deployment happens and this app is opened in detail view 
* [XIVY-3188](https://jira.axonivy.com/jira/browse/XIVY-3188) Method customField() is not documented and not marked as PublicAPI in TaskQuery and CaseQuery 
* [XIVY-3191](https://jira.axonivy.com/jira/browse/XIVY-3191) Active Directory User synchronisation not imports all users if the import user group has more than 1500 entries 
* [XIVY-3193](https://jira.axonivy.com/jira/browse/XIVY-3193) CXF generated WSDL in Client jar does not map included XSDs 
* [XIVY-3197](https://jira.axonivy.com/jira/browse/XIVY-3197) Editor 'Jump to Dialog' broken for Dialogs with input Parameters 
* [XIVY-3204](https://jira.axonivy.com/jira/browse/XIVY-3204) Html dialog editor cache problems 
* [XIVY-3206](https://jira.axonivy.com/jira/browse/XIVY-3206) Maven Classpath container not auto-added 
* [XIVY-3207](https://jira.axonivy.com/jira/browse/XIVY-3207) Linux TreeTable NPE in AWT Inscriptions 
* [XIVY-3210](https://jira.axonivy.com/jira/browse/XIVY-3210) BigDecimals type is occasionally serialized as long which leads to corrupt indexes 
* [XIVY-3211](https://jira.axonivy.com/jira/browse/XIVY-3211) Engine Config UI tempts users to write overquoted YAML files 
* [XIVY-3212](https://jira.axonivy.com/jira/browse/XIVY-3212) Setting Advanced Webserver configs overwrites already set Port vals 
* [XIVY-3213](https://jira.axonivy.com/jira/browse/XIVY-3213) Post Task Construct code block provide inaccessible 'out' variable on RequestStart 
* [XIVY-3214](https://jira.axonivy.com/jira/browse/XIVY-3214) Yaml Writer can not write subnode to property if it already have a value 
* [XIVY-3215](https://jira.axonivy.com/jira/browse/XIVY-3215) TaskMail generator fails if AJP is enabled 
* [XIVY-3220](https://jira.axonivy.com/jira/browse/XIVY-3220) Clarify the wildcard pattern usages in signal codes 
* [XIVY-3222](https://jira.axonivy.com/jira/browse/XIVY-3222) Resolving JSF variable is not thread save 
* [XIVY-3223](https://jira.axonivy.com/jira/browse/XIVY-3223) Process context menu commands connect/wrap/openDoc partially broken 
* [XIVY-3226](https://jira.axonivy.com/jira/browse/XIVY-3226) False positive signature validation errors on SubProcess StartEvent 
* [XIVY-3233](https://jira.axonivy.com/jira/browse/XIVY-3233) Turn off flaky webeditor RCPTT tests 
* [XIVY-3234](https://jira.axonivy.com/jira/browse/XIVY-3234) Taskmail links point to localhost instead of frontend server 
* [XIVY-3235](https://jira.axonivy.com/jira/browse/XIVY-3235) Load extensions in dropins in first start 
* [XIVY-3237](https://jira.axonivy.com/jira/browse/XIVY-3237) Reindex of business data fails with OutOfMemory 
* [XIVY-3240](https://jira.axonivy.com/jira/browse/XIVY-3240) Cms template with placeholder not working if there are escape chars 
* [XIVY-3245](https://jira.axonivy.com/jira/browse/XIVY-3245) Designer Project Reporting (Birt) does not work 
* [XIVY-3246](https://jira.axonivy.com/jira/browse/XIVY-3246) Analyze and fix known issues with Primefaces 7 migration 
* [XIVY-3247](https://jira.axonivy.com/jira/browse/XIVY-3247) Wrong Business Calendar will be used when multiple tasks configured 
* [XIVY-3249](https://jira.axonivy.com/jira/browse/XIVY-3249) Nullpointer exception thrown when authenticate a non existing user with empty password 
* [XIVY-3250](https://jira.axonivy.com/jira/browse/XIVY-3250) Designer crashes with misspelled html tags in webeditor 
* [XIVY-3252](https://jira.axonivy.com/jira/browse/XIVY-3252) Designer configuration editor context menu unavailable 
* [XIVY-3258](https://jira.axonivy.com/jira/browse/XIVY-3258) Deadlock in Designer while importing Portal and Project Graph view is open 
* [XIVY-3262](https://jira.axonivy.com/jira/browse/XIVY-3262) Static JSF pages don't work on Windows if the page is in a subfolder 
* [XIVY-3263](https://jira.axonivy.com/jira/browse/XIVY-3263) In the console.log the following entries appears without timestamp 'start windows service control:4' 
* [XIVY-3265](https://jira.axonivy.com/jira/browse/XIVY-3265) Business Data is limited to maximum 64k characters if using MySql system database 
* [XIVY-3277](https://jira.axonivy.com/jira/browse/XIVY-3277) Patch Primefaces 6.1 to fix Bug #873 (selectManyMenu only selects one) 
* [XIVY-3279](https://jira.axonivy.com/jira/browse/XIVY-3279) Patch Primefaces 6.1 to fix Bug #3755 (photocam: was blocked by chrome) 
* [XIVY-3283](https://jira.axonivy.com/jira/browse/XIVY-3283) Fix SWING Inscription crash on Linux 
* [XIVY-3288](https://jira.axonivy.com/jira/browse/XIVY-3288) IvyAddOns writes debug information to the console output 'docx' and exception traces 
* [XIVY-3289](https://jira.axonivy.com/jira/browse/XIVY-3289) After reindex of business data some records may be missing in the index with Sql Server 2016 and higher and microsoft jdbc driver 
* [XIVY-3291](https://jira.axonivy.com/jira/browse/XIVY-3291) Keyword infinity is not supported in systemd versions older than version 229 (e.g. RHEL 7) 
* [XIVY-3293](https://jira.axonivy.com/jira/browse/XIVY-3293) IvyScriptParserException is thrown by bpm engine if macro contains \" 
* [XIVY-3296](https://jira.axonivy.com/jira/browse/XIVY-3296) Case Map Example area hides Add Sidestep Menu in case map editor 
* [XIVY-3297](https://jira.axonivy.com/jira/browse/XIVY-3297) Deadlock and therefore UI freeze during Designer start when synchronizing breakpoints 
* [XIVY-3298](https://jira.axonivy.com/jira/browse/XIVY-3298) System database conversion from < 7.3 to >= 7.3 may fail with unique constrain violation error because of duplicated task or case additional properties 
* [XIVY-3305](https://jira.axonivy.com/jira/browse/XIVY-3305) NPE in IvyJsfIntegrationHelper during Logging 
* [XIVY-3309](https://jira.axonivy.com/jira/browse/XIVY-3309) CMS Editor for Text Content Objects broken 
* [XIVY-3310](https://jira.axonivy.com/jira/browse/XIVY-3310) Copying process elements switched to SWT throws NPE 
* [XIVY-3315](https://jira.axonivy.com/jira/browse/XIVY-3315) Suppress server information on error screen 
* [XIVY-3319](https://jira.axonivy.com/jira/browse/XIVY-3319) Daily mail wrongfully logs 302 moved temporarily 
* [XIVY-3325](https://jira.axonivy.com/jira/browse/XIVY-3325) Control center reacts badly 
* [XIVY-3336](https://jira.axonivy.com/jira/browse/XIVY-3336) SSL Designer client settings not working for self-signed certs 
* [XIVY-3339](https://jira.axonivy.com/jira/browse/XIVY-3339) Deadlock when importing PortalTemplate with M2 wizard 
* [XIVY-3340](https://jira.axonivy.com/jira/browse/XIVY-3340) Engine Config UI can't start with a license with no expiry date 
* [XIVY-3341](https://jira.axonivy.com/jira/browse/XIVY-3341) Elasticsearch start fails when migrating to 8.0 
* [XIVY-3342](https://jira.axonivy.com/jira/browse/XIVY-3342) SystemDb password is always encrypted on SystemDb creation 
* [XIVY-3343](https://jira.axonivy.com/jira/browse/XIVY-3343) Can not convert system database while startup of engine with official axonivy docker image 
* [XIVY-3345](https://jira.axonivy.com/jira/browse/XIVY-3345) Open inscription masks fast as a fox 
* [XIVY-3348](https://jira.axonivy.com/jira/browse/XIVY-3348) ESC key closes my inscription mask without warning that there are unsaved changes 
* [XIVY-3352](https://jira.axonivy.com/jira/browse/XIVY-3352) Case and task category tree generates wrong tree hierarchy 
* [XIVY-3353](https://jira.axonivy.com/jira/browse/XIVY-3353) ConfigUI crashes with never expiring license 
* [XIVY-3354](https://jira.axonivy.com/jira/browse/XIVY-3354) Licence with special characters e.g. umlauts are not valid 
* [XIVY-3361](https://jira.axonivy.com/jira/browse/XIVY-3361) BPMN processes are corrupt after import 
* [XIVY-3376](https://jira.axonivy.com/jira/browse/XIVY-3376) Password label hides password value if password is entered by brower auto fill 
* [XIVY-3383](https://jira.axonivy.com/jira/browse/XIVY-3383) Strange error message if project-build-plugin is run with old java version. 
* [XIVY-3384](https://jira.axonivy.com/jira/browse/XIVY-3384) Improve info log of goal default-installEngine with chosen engine directory 
* [XIVY-3386](https://jira.axonivy.com/jira/browse/XIVY-3386) MyFaces Resource Caching is enabled in Designer 
* [XIVY-3391](https://jira.axonivy.com/jira/browse/XIVY-3391) Creating a DataClass field via QuickFix will always write FQN to the file 
* [XIVY-3395](https://jira.axonivy.com/jira/browse/XIVY-3395) Reimplement multilanguage Task Annotation mails in the standard 
* [XIVY-3396](https://jira.axonivy.com/jira/browse/XIVY-3396) CaseQuery CaseScope is ignored when creating the TaskQuery first 
* [XIVY-3403](https://jira.axonivy.com/jira/browse/XIVY-3403) Security System detail view in Cockpit shows password in DOM 
* [XIVY-3404](https://jira.axonivy.com/jira/browse/XIVY-3404) Allow to add IAR resource which already exist in project basedir 
* [XIVY-3405](https://jira.axonivy.com/jira/browse/XIVY-3405) Execution of method was not successful in Html Dialog 
* [XIVY-3407](https://jira.axonivy.com/jira/browse/XIVY-3407) Opening a CaseMap in Designer logs DI errors 
* [XIVY-3411](https://jira.axonivy.com/jira/browse/XIVY-3411) Fix possible XSS vulnerability on end.jsp page 
* [XIVY-3416](https://jira.axonivy.com/jira/browse/XIVY-3416) Casemap Editor is unusable on Linux 
* [XIVY-3421](https://jira.axonivy.com/jira/browse/XIVY-3421) Html Dialog Editor does not consider a theme that is configured in a layout 
* [XIVY-3422](https://jira.axonivy.com/jira/browse/XIVY-3422) Axis1 classes cannot be compiled after project is migrated to latest project version (Java 11) 
* [XIVY-3424](https://jira.axonivy.com/jira/browse/XIVY-3424) JSF Error Handler broken in Designer 
* [XIVY-3433](https://jira.axonivy.com/jira/browse/XIVY-3433) NullPointerException if sending signal without being in a task/case 
* [XIVY-3439](https://jira.axonivy.com/jira/browse/XIVY-3439) Drools DRL editor support for java 11 
* [XIVY-3440](https://jira.axonivy.com/jira/browse/XIVY-3440) errorPage.getLocale() throws NPE in ErrorPage 
* [XIVY-3444](https://jira.axonivy.com/jira/browse/XIVY-3444) ViewExpiredException when user from other app in same browser logs out 
* [XIVY-3446](https://jira.axonivy.com/jira/browse/XIVY-3446) After initialization of alternative arrow colors are lost 
* [XIVY-3447](https://jira.axonivy.com/jira/browse/XIVY-3447) Subclipse client JavaHL breaks preference page 
* [XIVY-3454](https://jira.axonivy.com/jira/browse/XIVY-3454) Creating Dialog Event/Method via quickfix is not aligned in logic 
* [XIVY-3458](https://jira.axonivy.com/jira/browse/XIVY-3458) Messages in Flash do not work on end-page 
* [XIVY-3459](https://jira.axonivy.com/jira/browse/XIVY-3459) Enable End Page edit command and menu entry 
* [XIVY-3463](https://jira.axonivy.com/jira/browse/XIVY-3463) BigDecimals without precision in Lists 
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
* [IVYPORTAL-5276](https://jira.axonivy.com/jira/browse/IVYPORTAL-5276) Enhance Task list - Start button and more option buttons 
* [IVYPORTAL-5384](https://jira.axonivy.com/jira/browse/IVYPORTAL-5384) No Error Dialog if general Exception happens 
* [IVYPORTAL-5760](https://jira.axonivy.com/jira/browse/IVYPORTAL-5760) Email settings not working for users not having all apps 
* [IVYPORTAL-5838](https://jira.axonivy.com/jira/browse/IVYPORTAL-5838) Exception when click left menu and select leave task 
* [IVYPORTAL-6069](https://jira.axonivy.com/jira/browse/IVYPORTAL-6069) Consistent behaviour for searching application users in portal admin 
* [IVYPORTAL-6300](https://jira.axonivy.com/jira/browse/IVYPORTAL-6300) Open redirect vulnerability in Portal Wf UI 
* [IVYPORTAL-6303](https://jira.axonivy.com/jira/browse/IVYPORTAL-6303) selectonemenu and selectcheckboxmenu menu caret icon and filter style 
* [IVYPORTAL-6340](https://jira.axonivy.com/jira/browse/IVYPORTAL-6340) UI Problem in User Menu 
* [IVYPORTAL-6341](https://jira.axonivy.com/jira/browse/IVYPORTAL-6341) Extend TaskQueryOrderBy for task without tasks 
* [IVYPORTAL-6346](https://jira.axonivy.com/jira/browse/IVYPORTAL-6346) Language settings in small screens 
* [IVYPORTAL-6367](https://jira.axonivy.com/jira/browse/IVYPORTAL-6367) Identify and handle localStorage Access Denied 
* [IVYPORTAL-6376](https://jira.axonivy.com/jira/browse/IVYPORTAL-6376) User "admin" gets automatically permissions 
* [IVYPORTAL-6446](https://jira.axonivy.com/jira/browse/IVYPORTAL-6446) Portal slows down every AJAX request with unnecessary background requests 
* [IVYPORTAL-6536](https://jira.axonivy.com/jira/browse/IVYPORTAL-6536) Handle performance & fix for standard Portal II 
* [IVYPORTAL-6539](https://jira.axonivy.com/jira/browse/IVYPORTAL-6539) Statistics - Task Categories of case missing 
* [IVYPORTAL-6540](https://jira.axonivy.com/jira/browse/IVYPORTAL-6540) Hide technical Stuff - Optimization 
* [IVYPORTAL-6648](https://jira.axonivy.com/jira/browse/IVYPORTAL-6648) Primefaces Elements in DIV tags problem - Alignment 
* [IVYPORTAL-6851](https://jira.axonivy.com/jira/browse/IVYPORTAL-6851) Too much whitespace in Task Header 
* [IVYPORTAL-6894](https://jira.axonivy.com/jira/browse/IVYPORTAL-6894) Fix bugs and improve code for story Remove PortalConnector 
* [IVYPORTAL-7464](https://jira.axonivy.com/jira/browse/IVYPORTAL-7464) Fix width of search bar not responsive 
* [IVYPORTAL-7537](https://jira.axonivy.com/jira/browse/IVYPORTAL-7537) Express: Order of fields changes from definition to execution II 
* [IVYPORTAL-7647](https://jira.axonivy.com/jira/browse/IVYPORTAL-7647) Improve portal exception handle 
* [IVYPORTAL-7799](https://jira.axonivy.com/jira/browse/IVYPORTAL-7799) Processchain numbers are black in circle shape; set buttons text to white in LESS
