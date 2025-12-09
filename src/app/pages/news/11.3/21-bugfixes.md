## Bug Fixes {#bugfixes}

* [XIVY-6821](https://axon-ivy.atlassian.net/browse/XIVY-6821) Error 409 if the same user starts a task in a different session 
* [XIVY-8066](https://axon-ivy.atlassian.net/browse/XIVY-8066) Designer breaks if you install additional plugins 
* [XIVY-9800](https://axon-ivy.atlassian.net/browse/XIVY-9800) Migration wizard task 'system database backup' does nothing 
* [XIVY-12544](https://axon-ivy.atlassian.net/browse/XIVY-12544) Fix typos in HTML Dialog Themes documentation 
* [XIVY-12562](https://axon-ivy.atlassian.net/browse/XIVY-12562) CMS Browser for Mail inscription mask 
* [XIVY-12966](https://axon-ivy.atlassian.net/browse/XIVY-12966) Deploy REST services for released PMVs 
* [XIVY-12981](https://axon-ivy.atlassian.net/browse/XIVY-12981) Restart button visible in Engine Cockpit bundled with Designer 
* [XIVY-12985](https://axon-ivy.atlassian.net/browse/XIVY-12985) Raise drools to 8.44.0/7.74.1 to fix CVE-2021-41411 <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-12999](https://axon-ivy.atlassian.net/browse/XIVY-12999) Engine Cockpit should not write defaults to ivy.yaml file 
* [XIVY-13004](https://axon-ivy.atlassian.net/browse/XIVY-13004) A cluster slave node cannot start sometimes because of PersistentObjectDeletedException 
* [XIVY-13006](https://axon-ivy.atlassian.net/browse/XIVY-13006) OperationNotSupportedException if one sorts tables of start events, intermediate events, security systems, or flight recordings in Engine Cockpit 
* [XIVY-13034](https://axon-ivy.atlassian.net/browse/XIVY-13034) Notification settings on a User are ignored for Tasks assigned to a Role 
* [XIVY-13052](https://axon-ivy.atlassian.net/browse/XIVY-13052) Cannot select and therefore copy code/expression overlay in the mapping table 
* [XIVY-13053](https://axon-ivy.atlassian.net/browse/XIVY-13053) Cannot start Elasticsearch server if another instance is already running 
* [XIVY-13104](https://axon-ivy.atlassian.net/browse/XIVY-13104) The BPM error dialog leaks too much information to the end user <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-13107](https://axon-ivy.atlassian.net/browse/XIVY-13107) System database migration from LTS-8 to LTS-10 fails with "Cannot insert null into IWA_SecurityMember.NAME" 
* [XIVY-13108](https://axon-ivy.atlassian.net/browse/XIVY-13108) Potential Resources Leaks in Microsoft Teams Notification 
* [XIVY-13119](https://axon-ivy.atlassian.net/browse/XIVY-13119) User and Role Editor throw ClassCastException on save 
* [XIVY-13126](https://axon-ivy.atlassian.net/browse/XIVY-13126) Connection leak if one does not commit/rollback JPA transaction but closes entity manager correctly 
* [XIVY-13146](https://axon-ivy.atlassian.net/browse/XIVY-13146) Fix typos in error messages in ProcessDataPersistenceService 
* [XIVY-13164](https://axon-ivy.atlassian.net/browse/XIVY-13164) Workflow REST API provides wrong process and task start links 
* [XIVY-13226](https://axon-ivy.atlassian.net/browse/XIVY-13226) Flickering in developer workflow UI when using dark mode and frame-based dialogs 
* [XIVY-13236](https://axon-ivy.atlassian.net/browse/XIVY-13236) Broken link to documentation in engine file deploy/README.txt 
* [XIVY-13246](https://axon-ivy.atlassian.net/browse/XIVY-13246) EL conversion fails if the value of an attribute contains a new line 
* [XIVY-13257](https://axon-ivy.atlassian.net/browse/XIVY-13257) DomainUserName class is missing the toString method for logging 
* [XIVY-13277](https://axon-ivy.atlassian.net/browse/XIVY-13277) Improve project deployment documentation 
* [XIVY-13308](https://axon-ivy.atlassian.net/browse/XIVY-13308) Improve application view and deletion of App, PM, PMV in Engine Cockpit 
* [XIVY-13321](https://axon-ivy.atlassian.net/browse/XIVY-13321) Show error if the project in the designer workspace has a newer major version 
* [XIVY-13322](https://axon-ivy.atlassian.net/browse/XIVY-13322) Support inout mode parameter in SOAP WS inscription view 
* [XIVY-13330](https://axon-ivy.atlassian.net/browse/XIVY-13330) Axon Ivy Engine can not be started after migration when 'system' security system already exists 
* [XIVY-13334](https://axon-ivy.atlassian.net/browse/XIVY-13334) Can not synchronize user for ActiveDirectory or Novell eDirectory if referral contains a reference to another directory 
* [XIVY-13335](https://axon-ivy.atlassian.net/browse/XIVY-13335) StackOverflowException at test runtime on the creation of IvyValidatorFactory 
* [XIVY-13343](https://axon-ivy.atlassian.net/browse/XIVY-13343) Designer freeze during build 
* [XIVY-13345](https://axon-ivy.atlassian.net/browse/XIVY-13345) Update documentation about counting NWU and CCU 
* [XIVY-13358](https://axon-ivy.atlassian.net/browse/XIVY-13358) Role mappings and other configurations are not migrated if the app has the same name as the security system 
* [XIVY-13396](https://axon-ivy.atlassian.net/browse/XIVY-13396) Fix exceptions in ivy.log when using migration wizard and copy keystore and trust store files 
* [XIVY-13397](https://axon-ivy.atlassian.net/browse/XIVY-13397) Migration Wizard file diff removes backslashes in the comparison view for Windows path 
* [XIVY-13398](https://axon-ivy.atlassian.net/browse/XIVY-13398) Loading CMS with over 3MB size fails 
* [XIVY-13399](https://axon-ivy.atlassian.net/browse/XIVY-13399) Can not add workflow document for anonymous users 
* [XIVY-13475](https://axon-ivy.atlassian.net/browse/XIVY-13475) Copy already existing app.yaml during migration to all env folders so that the runtime behavior for loading configurations is still the same 
* [XIVY-13479](https://axon-ivy.atlassian.net/browse/XIVY-13479) Respect security context when re-indexing business data in Elasticsearch 
* [XIVY-13481](https://axon-ivy.atlassian.net/browse/XIVY-13481) System database config can get lost after the migration wizard finishes 
* [XIVY-13492](https://axon-ivy.atlassian.net/browse/XIVY-13492) Migration Wizard complains about the wrong database version if you don't have access to the system database 
* [XIVY-13499](https://axon-ivy.atlassian.net/browse/XIVY-13499) Alternative gateways lose condition when it is wrapped 
* [XIVY-13500](https://axon-ivy.atlassian.net/browse/XIVY-13500) Jump into embedded sub takes current viewport which may be wrong 
* [XIVY-13505](https://axon-ivy.atlassian.net/browse/XIVY-13505) CallStack information on the End or Page End element might be wrong 
* [XIVY-13539](https://axon-ivy.atlassian.net/browse/XIVY-13539) Add logs to analyze slow engine startup due to password encryption in config files <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-13584](https://axon-ivy.atlassian.net/browse/XIVY-13584) IvyTest is not executable under Windows if paths contain special chars 
* [XIVY-13587](https://axon-ivy.atlassian.net/browse/XIVY-13587) New task email notifications are interrupted after trying to send to an invalid email address 
* [XIVY-13593](https://axon-ivy.atlassian.net/browse/XIVY-13593) Edit Variable dialog in Engine Cockpit has a layout problem 
* [XIVY-13595](https://axon-ivy.atlassian.net/browse/XIVY-13595) Add p:ajaxExceptionHandler to Setup wizard in Engine Cockpit 
* [XIVY-13622](https://axon-ivy.atlassian.net/browse/XIVY-13622) Fix critical CVE-2024-1597 of PostgreSQL driver <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-13623](https://axon-ivy.atlassian.net/browse/XIVY-13623) Fix high CVE-2024-25710 and CVE-2024-26308 of Apache Commons Compress <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-13625](https://axon-ivy.atlassian.net/browse/XIVY-13625) Redirect to the wrong URL when clicking on Login with Microsoft with IIS as a reverse proxy <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-13628](https://axon-ivy.atlassian.net/browse/XIVY-13628) Fix medium CVE-2023-44483 of Apache Santuario XML Security <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-13632](https://axon-ivy.atlassian.net/browse/XIVY-13632) mod to json conversion switches the default value of "attach to case" flag  
* [XIVY-13677](https://axon-ivy.atlassian.net/browse/XIVY-13677) Process element is moved on text selection in inscription mask 
* [XIVY-13721](https://axon-ivy.atlassian.net/browse/XIVY-13721) Colors applied to the Alternative gateway are lost 
* [XIVY-13730](https://axon-ivy.atlassian.net/browse/XIVY-13730) InaccessibleObjectException due to missing java.sql add-opens 
* [XIVY-13769](https://axon-ivy.atlassian.net/browse/XIVY-13769) Don't synch a user on login over SSO if UserSynch.OnLogin is false in ivy.yaml 
* [XIVY-13789](https://axon-ivy.atlassian.net/browse/XIVY-13789) Sometimes IvyScript errors are not marked properly in Monaco editor 
* [XIVY-13792](https://axon-ivy.atlassian.net/browse/XIVY-13792) Generating WebService client fails due to invalid target namespace 
* [XIVY-13809](https://axon-ivy.atlassian.net/browse/XIVY-13809) Handle the underline character in typedefs in CXF soap client 
* [XIVY-13859](https://axon-ivy.atlassian.net/browse/XIVY-13859) Documentation: still talks about "environments" 
* [XIVY-13890](https://axon-ivy.atlassian.net/browse/XIVY-13890) Engine sometimes can not start because of ConcurrentHashMap recursive update 
* [XIVY-13892](https://axon-ivy.atlassian.net/browse/XIVY-13892) Primefaces project conversion fails with HTTP response code 429 
* [XIVY-13894](https://axon-ivy.atlassian.net/browse/XIVY-13894) CMS import ignores (eats) empty columns  
* [XIVY-13895](https://axon-ivy.atlassian.net/browse/XIVY-13895) Designer hangs when deleting opened (unchanged) CMS entries 
* [XIVY-13928](https://axon-ivy.atlassian.net/browse/XIVY-13928) Rest Services from inactive PMV's are loaded 
* [XIVY-13949](https://axon-ivy.atlassian.net/browse/XIVY-13949) Process editor connectors sometimes not visible after inscription view resize 
* [XIVY-13952](https://axon-ivy.atlassian.net/browse/XIVY-13952) Error in web service YAML deserialize when endpoints are empty 
* [XIVY-13958](https://axon-ivy.atlassian.net/browse/XIVY-13958) Do not escape special characters in web notifications 
* [XIVY-13988](https://axon-ivy.atlassian.net/browse/XIVY-13988) Do not load environment-based configurations as they are no longer supported 
* [XIVY-13989](https://axon-ivy.atlassian.net/browse/XIVY-13989) Designer deadlock while stopping process engines (git branching) 
* [XIVY-13991](https://axon-ivy.atlassian.net/browse/XIVY-13991) Tasks are sometimes not joined 
* [XIVY-14019](https://axon-ivy.atlassian.net/browse/XIVY-14019) User synch resets manually changed language back to identity provider language 
* [XIVY-14061](https://axon-ivy.atlassian.net/browse/XIVY-14061) NPE in Engine Cockpit in rest client detail view if rest client is only defined in app.yaml but not in the project 
* [XIVY-14082](https://axon-ivy.atlassian.net/browse/XIVY-14082) Dev-WF-UI leaks all cases if you use a filter <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-14140](https://axon-ivy.atlassian.net/browse/XIVY-14140) Error Icon for error processes 
* [IVYPORTAL-15916](https://axon-ivy.atlassian.net/browse/IVYPORTAL-15916) Session expires despite user interaction on the UI 
* [IVYPORTAL-16225](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16225) Welcome widget get Javascript exception 
* [IVYPORTAL-16226](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16226) Cannot load process in combined mode 
* [IVYPORTAL-16227](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16227) Dashboard process widget does not show image for External Link type 
* [IVYPORTAL-16233](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16233) Portal Permissions not set to role Everybody when deploying the portal 
* [IVYPORTAL-16307](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16307) Error on display Widget information of Task/Case widget 
* [IVYPORTAL-16428](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16428) XSS Vulnerabilty in Portal <span class="badge badge-pill badge-success badge-security">security</span>
* [IVYPORTAL-16476](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16476) Process Steps do not render correctly 
* [IVYPORTAL-16551](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16551) Queries of task and case widgets have unnecessary extended parts 
* [IVYPORTAL-16560](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16560) Process doesn't work in the custom process widget 
* [IVYPORTAL-16564](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16564) Process Labels cutoff 
* [IVYPORTAL-16579](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16579) Incorrect alignment header of Case/Task widgets when has vertical scrollbar 
* [IVYPORTAL-16739](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16739) Screen reloaded if TaskTemplateIFrame has 'taskUrl=blank' 
* [IVYPORTAL-16809](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16809) Edit Permission Doesn't Show Predefine Permission 
* [IVYPORTAL-16825](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16825) Too many external Links lead to bad performance 
* [IVYPORTAL-16872](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16872) AJAX indicator block the error dialog 
* [IVYPORTAL-16910](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16910) Error when leaving a task due to ITask.getCase() throws exception 
* [IVYPORTAL-16924](https://axon-ivy.atlassian.net/browse/IVYPORTAL-16924) Process chain is missing after migrating to Portal 10 