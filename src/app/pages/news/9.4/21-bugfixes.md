## Bug Fixes {#bugfixes}

* [XIVY-2436](https://1ivy.atlassian.net/browse/XIVY-2436) String value with size > 100 is cropped in CMS 
* [XIVY-2872](https://1ivy.atlassian.net/browse/XIVY-2872) Mail steps adds wrong attachment to the email 
* [XIVY-4020](https://1ivy.atlassian.net/browse/XIVY-4020) Process Editor selection move: removes ARC kinks 
* [XIVY-5023](https://1ivy.atlassian.net/browse/XIVY-5023) Swagger UI cannot be displayed in internal web browser view 
* [XIVY-5074](https://1ivy.atlassian.net/browse/XIVY-5074) CMS getChildren on Engine in wrong order 
* [XIVY-5093](https://1ivy.atlassian.net/browse/XIVY-5093) NPE on Import Wizard (Existing Projects into Workspace) if packed project (iar) is selected 
* [XIVY-5458](https://1ivy.atlassian.net/browse/XIVY-5458) Content of E-Mail Step inscription cannot be edited on Mac Designer 
* [XIVY-5459](https://1ivy.atlassian.net/browse/XIVY-5459) DB inscription can sometimes not be edited on Mac Designer 
* [XIVY-5861](https://1ivy.atlassian.net/browse/XIVY-5861) No Buttons visible in E-Mail Step Tabs on first open 
* [XIVY-6425](https://1ivy.atlassian.net/browse/XIVY-6425) Query in DB Activity Step does not get validated 
* [XIVY-6463](https://1ivy.atlassian.net/browse/XIVY-6463) DB Activity loses query configuration when renaming a table 
* [XIVY-6748](https://1ivy.atlassian.net/browse/XIVY-6748) Fix 404 in dev-workflow-ui if no projects imported 
* [XIVY-6752](https://1ivy.atlassian.net/browse/XIVY-6752) DB Activity write-query doesn't evaluate functions 
* [XIVY-7184](https://1ivy.atlassian.net/browse/XIVY-7184) 404 Error on Backend API in Engine Cockpit if application context is not started yet 
* [XIVY-7227](https://1ivy.atlassian.net/browse/XIVY-7227) REST client properties and web service client properties values are not updated 
* [XIVY-7237](https://1ivy.atlassian.net/browse/XIVY-7237) CVE-2021-44228 : Log4Shell remote code execution - Update to Log4j2 version 2.15.0 <span class="badge badge-pill badge-success">security</span>
* [XIVY-7253](https://1ivy.atlassian.net/browse/XIVY-7253) Maven dependency appears twice in Axon Ivy Libraries 
* [XIVY-7254](https://1ivy.atlassian.net/browse/XIVY-7254) Wrong member type due to transitive dependency (Cannot cast from a to a) 
* [XIVY-7257](https://1ivy.atlassian.net/browse/XIVY-7257) Unique constraints violation with multiple projects defining the same role 
* [XIVY-7258](https://1ivy.atlassian.net/browse/XIVY-7258) False positive validation errors, complains on AXIS2 usage for empty WebService Clients 
* [XIVY-7262](https://1ivy.atlassian.net/browse/XIVY-7262) CVE-2021-45046: ThreadContext DoS - Update to Log4j2 version 2.16.0 <span class="badge badge-pill badge-success">security</span>
* [XIVY-7275](https://1ivy.atlassian.net/browse/XIVY-7275) Optimize market custom installation (CTRL + ALT + I) 
* [XIVY-7284](https://1ivy.atlassian.net/browse/XIVY-7284) Fix typos in developer workflow UI 
* [XIVY-7314](https://1ivy.atlassian.net/browse/XIVY-7314) CVE-2021-45105: infinite recursion in lookup evaluation - Update to Log4j2 version 2.17.0 <span class="badge badge-pill badge-success">security</span>
* [XIVY-7334](https://1ivy.atlassian.net/browse/XIVY-7334) Show dev-workfluw-ui even if no project is open in designer 
* [XIVY-7343](https://1ivy.atlassian.net/browse/XIVY-7343) NPE when accessing PMV which is not linked to an existing project 
* [XIVY-7349](https://1ivy.atlassian.net/browse/XIVY-7349) CVE-2021-44832 : RCE via JDBC Appender - Update to Log4j2 version 2.17.1 <span class="badge badge-pill badge-success">security</span>
* [XIVY-7408](https://1ivy.atlassian.net/browse/XIVY-7408) Ivy is not able to read ivy project artifact version and group id from parent pom 
* [XIVY-7466](https://1ivy.atlassian.net/browse/XIVY-7466) Windows Launcher Binaries broken: could not load module libraries of jre/bin/server/jvm.dll 
* [XIVY-7501](https://1ivy.atlassian.net/browse/XIVY-7501) Character based content from CMS are served in ISO-8859-1 instead of UTF-8 
* [XIVY-7507](https://1ivy.atlassian.net/browse/XIVY-7507) CMS pages are served always with default OS encoding 
* [XIVY-7530](https://1ivy.atlassian.net/browse/XIVY-7530) Function Browser does not work anymore in old AWT based script editors 
* [XIVY-7541](https://1ivy.atlassian.net/browse/XIVY-7541) REST Client process element does not store OpenAPI enable/disabled state 
* [XIVY-7594](https://1ivy.atlassian.net/browse/XIVY-7594) Fix org.apache.commons.io duplication because of GLSP server 
* [XIVY-7673](https://1ivy.atlassian.net/browse/XIVY-7673) ivy.vars are only resolved in RELEASED pmv but not in DEPRECATED pmv 
* [XIVY-7683](https://1ivy.atlassian.net/browse/XIVY-7683) Change case of user name in AD will not be synchronized  <span class="badge badge-pill badge-success">security</span>
* [XIVY-7688](https://1ivy.atlassian.net/browse/XIVY-7688) Other user input is lost if Referral or Dereference Aliases is changed in Engine Cockpit AD setting  
* [XIVY-7701](https://1ivy.atlassian.net/browse/XIVY-7701) Bad performance of macro expander and CMS if override project is configured 
* [XIVY-7716](https://1ivy.atlassian.net/browse/XIVY-7716) migrate-project command corrupts mod with third-party elements 
* [XIVY-7731](https://1ivy.atlassian.net/browse/XIVY-7731) Project configurations of deprecated PMV are not available during runtime 
* [XIVY-7746](https://1ivy.atlassian.net/browse/XIVY-7746) Error in Engine Cockpit LDAP Browser on nodes that has an escaped LDAP Name 
* [XIVY-7766](https://1ivy.atlassian.net/browse/XIVY-7766) NPE in Log when deleting a project 
* [XIVY-7780](https://1ivy.atlassian.net/browse/XIVY-7780) CMS inline editor does not work on Linux 
* [XIVY-7808](https://1ivy.atlassian.net/browse/XIVY-7808) Changing project dependencies (with our editor), removes iar-integration-test packaging 
* [XIVY-7810](https://1ivy.atlassian.net/browse/XIVY-7810) GLSP Error sometimes when opening, closing, packing, unpacking projects 
* [XIVY-7821](https://1ivy.atlassian.net/browse/XIVY-7821) Tab navigation and type selection does not work on Parameter table 
* [XIVY-7856](https://1ivy.atlassian.net/browse/XIVY-7856) IllegalStateException "project resources of pmv 'xyz' not found" during startup of cluster slave  
* [XIVY-7922](https://1ivy.atlassian.net/browse/XIVY-7922) Missing icons without an internet connection 
* [XIVY-7926](https://1ivy.atlassian.net/browse/XIVY-7926) New process editor has encoding problems if start label contains e.g <>  
* [XIVY-7928](https://1ivy.atlassian.net/browse/XIVY-7928) New process editor can't open process in test projects 
* [XIVY-7944](https://1ivy.atlassian.net/browse/XIVY-7944) jsessionid in PrimeFaces resource URL if no session is set yet <span class="badge badge-pill badge-success">security</span>
* [XIVY-7948](https://1ivy.atlassian.net/browse/XIVY-7948) Role substitute still valid even if role was removed form user 
* [XIVY-7971](https://1ivy.atlassian.net/browse/XIVY-7971) CMS import is slow when cms is huge 
* [XIVY-7972](https://1ivy.atlassian.net/browse/XIVY-7972) Resource not found warn log if a mail is sent with authentication 
* [XIVY-7974](https://1ivy.atlassian.net/browse/XIVY-7974) ctrl + s does not work in the new process editor under Windows 
* [XIVY-7975](https://1ivy.atlassian.net/browse/XIVY-7975) Make generating the database schema for environments work again 
* [XIVY-7978](https://1ivy.atlassian.net/browse/XIVY-7978) CXF does sometimes not find the operation on a cached endpoint 
* [XIVY-7992](https://1ivy.atlassian.net/browse/XIVY-7992) ConcurrentModificationException at cluster node startup 
* [XIVY-8001](https://1ivy.atlassian.net/browse/XIVY-8001) SubProcessCall PublicAPI needs system and ProcessModelVersionReadAll permission 
* [XIVY-8010](https://1ivy.atlassian.net/browse/XIVY-8010) Internal Case Map Editor does not work under Linux 
* [XIVY-8025](https://1ivy.atlassian.net/browse/XIVY-8025) IAR packaging fails to include dependencies from reactor 
* [XIVY-8047](https://1ivy.atlassian.net/browse/XIVY-8047) Cant set custom icon of subprocess call if the called process start already has a custom icon 
* [XIVY-8083](https://1ivy.atlassian.net/browse/XIVY-8083) 404 errors when trying to start a process when tasks need to be reset during docker container start 
* [XIVY-8115](https://1ivy.atlassian.net/browse/XIVY-8115) Error Boundary Event on Call Sub Process throws IvyScriptCastException instead of catch error 
* [XIVY-8125](https://1ivy.atlassian.net/browse/XIVY-8125) Eclipse Key Bindings not working in new Process Editor 
* [XIVY-8151](https://1ivy.atlassian.net/browse/XIVY-8151) TaskSwitchGateway is not updated with Tasks after output connectors added in the new Process Editor 
* [XIVY-8199](https://1ivy.atlassian.net/browse/XIVY-8199) Can't select any operation after re-generating wsClient to different namespace 
* [XIVY-8246](https://1ivy.atlassian.net/browse/XIVY-8246) Cluster slave instances always responses status 500 after it is started successfully 
* [XIVY-8250](https://1ivy.atlassian.net/browse/XIVY-8250) CMS cache not invalidate after deployment 
* [XIVY-8252](https://1ivy.atlassian.net/browse/XIVY-8252) Failed to create the part's control when opening CMS editor 
* [XIVY-8272](https://1ivy.atlassian.net/browse/XIVY-8272) An NPE error is sometimes logged while cluster slave is started 
* [XIVY-8279](https://1ivy.atlassian.net/browse/XIVY-8279) ivy Project conversion 80000-94000 failed because of arcStyle 
* [XIVY-8280](https://1ivy.atlassian.net/browse/XIVY-8280) Improve double click action on elements to open inscription 
* [XIVY-8281](https://1ivy.atlassian.net/browse/XIVY-8281) Problem with Umlauts in element inscription 
* [XIVY-8314](https://1ivy.atlassian.net/browse/XIVY-8314) Prioritize RELEASED PMV over other PMVs on Strict Override evaluation 
* [XIVY-8334](https://1ivy.atlassian.net/browse/XIVY-8334) Frame problem in designer if a process is started via Process Editor action 
* [XIVY-8371](https://1ivy.atlassian.net/browse/XIVY-8371) f:convertDateTime no longer works with IvyScript Date, Time and DateTime data types 
* [XIVY-8400](https://1ivy.atlassian.net/browse/XIVY-8400) NPE in "Browse Dossier Demo (Lazy)" in Workflow Demo 
* [XIVY-8402](https://1ivy.atlassian.net/browse/XIVY-8402) Improve stability of GLSP server 
* [XIVY-8422](https://1ivy.atlassian.net/browse/XIVY-8422) Rest API servlet crashes after jersey model validation error 
* [XIVY-8429](https://1ivy.atlassian.net/browse/XIVY-8429) OpenApi code generator error dialog don't show full error result 
* [XIVY-8462](https://1ivy.atlassian.net/browse/XIVY-8462) Remove googleapi font request from dev-wf-ui 
* [XIVY-8500](https://1ivy.atlassian.net/browse/XIVY-8500) Could not read maven project since eclipse 2022-03 
* [XIVY-8549](https://1ivy.atlassian.net/browse/XIVY-8549) IOException if DataTable is embedded in  DynaForm and Composite 
* [XIVY-8566](https://1ivy.atlassian.net/browse/XIVY-8566) Multiselect autocomplete not working with Serenity and PrimeFaces 11 
* [XIVY-8603](https://1ivy.atlassian.net/browse/XIVY-8603) CMS file with underscores does not work 
* [XIVY-8633](https://1ivy.atlassian.net/browse/XIVY-8633) Multiple Users can start the same Task of a User Task 
* [XIVY-8634](https://1ivy.atlassian.net/browse/XIVY-8634) Default color may is listed twice in the color palette in the new process editor 
* [XIVY-8686](https://1ivy.atlassian.net/browse/XIVY-8686) Project conversion does not work on re-deployment 
* [XIVY-8697](https://1ivy.atlassian.net/browse/XIVY-8697) Referenced Error Start and Error Boundary unlinked after changing BPMN activity type 
* [XIVY-8704](https://1ivy.atlassian.net/browse/XIVY-8704) Bpmn2 export produces strange waypoints with json processes 
* [XIVY-8733](https://1ivy.atlassian.net/browse/XIVY-8733) Designer crash after pressing Ctrl-W in new process editor 
* [XIVY-8759](https://1ivy.atlassian.net/browse/XIVY-8759) Link on Axon Ivy Logo is broken in dev-wf-ui in Designer mode 
* [XIVY-8781](https://1ivy.atlassian.net/browse/XIVY-8781) mod to json conversion fails on incomplete lane-data 
* [XIVY-8783](https://1ivy.atlassian.net/browse/XIVY-8783) colors used multiple times in the same process are lost 
* [XIVY-8790](https://1ivy.atlassian.net/browse/XIVY-8790) Deployment and License Upload not working if REST Servlet is disabled 
* [XIVY-8807](https://1ivy.atlassian.net/browse/XIVY-8807) Custom icons broken in new process editor 
* [XIVY-8815](https://1ivy.atlassian.net/browse/XIVY-8815) json-serialization omits multiline conditions 
* [XIVY-8824](https://1ivy.atlassian.net/browse/XIVY-8824) PersistencyException when deleting a role in the cockpit with PostgreSQL 
* [XIVY-8830](https://1ivy.atlassian.net/browse/XIVY-8830) DB insert/update script-editor produces false positive errors and invalid statements 
* [XIVY-8841](https://1ivy.atlassian.net/browse/XIVY-8841) Avoid flickering process-lines on 'migrate-project' command 
* [XIVY-8843](https://1ivy.atlassian.net/browse/XIVY-8843) Bend points loose if element is added onto connection 
* [XIVY-8849](https://1ivy.atlassian.net/browse/XIVY-8849) Insert element on connection which has an bend point is maybe wrong 
* [XIVY-8904](https://1ivy.atlassian.net/browse/XIVY-8904) Email header content cannot be deleted in the inscription mask 
* [XIVY-8926](https://1ivy.atlassian.net/browse/XIVY-8926) ITask.getCategory throws NPE if project of task PMV is missing 
* [XIVY-8933](https://1ivy.atlassian.net/browse/XIVY-8933) Portal cannot create add hoc task for case if case is not in same application as Portal 
* [XIVY-8995](https://1ivy.atlassian.net/browse/XIVY-8995) Removing REST Client does not remove the generated .jar file 
* [XIVY-9058](https://1ivy.atlassian.net/browse/XIVY-9058) DB migration 8 to 9 writes outdated values to app.yaml 
* [XIVY-9061](https://1ivy.atlassian.net/browse/XIVY-9061) Deployment validation asserts wrong number of Task outputs 
* [XIVY-9076](https://1ivy.atlassian.net/browse/XIVY-9076) NPE on ICustomFieldMeta.tasks() if a project is missing 
* [XIVY-9102](https://1ivy.atlassian.net/browse/XIVY-9102) PMV details views fails with an NPE while reloading its state 
* [XIVY-9103](https://1ivy.atlassian.net/browse/XIVY-9103) Re-Deployment of a base project activates manually stopped dependent ProcessModels 
* [XIVY-9156](https://1ivy.atlassian.net/browse/XIVY-9156) Cockpit system database save problems with additional properties 
* [XIVY-9201](https://1ivy.atlassian.net/browse/XIVY-9201) RuntimeLog view occasionally not showing any logs 
* [XIVY-9207](https://1ivy.atlassian.net/browse/XIVY-9207) Execution of job SynchJob failed due to user language 
* [XIVY-9209](https://1ivy.atlassian.net/browse/XIVY-9209) InX undefined for TaskSwitchGateway connectors 
* [XIVY-9211](https://1ivy.atlassian.net/browse/XIVY-9211) Default error page does not work in Designer and Engine 
* [XIVY-9213](https://1ivy.atlassian.net/browse/XIVY-9213) Search in engine cockpit variables overview does not work after switching tab. 
* [XIVY-9215](https://1ivy.atlassian.net/browse/XIVY-9215) Link on error page to home page broken 
* [XIVY-9233](https://1ivy.atlassian.net/browse/XIVY-9233) Blanks in Base URL let cockpit fail 
* [XIVY-9242](https://1ivy.atlassian.net/browse/XIVY-9242) Backend API page in cockpit not working with context 
* [XIVY-9269](https://1ivy.atlassian.net/browse/XIVY-9269) Engine Cockpit: Role Detail View is not working when no Application exists 
* [XIVY-9270](https://1ivy.atlassian.net/browse/XIVY-9270) Some System DBs accept multiple roles with same name if whitespace is added 
* [XIVY-9281](https://1ivy.atlassian.net/browse/XIVY-9281) Opening inscription fails on pre 8.0 project with an NPE 
* [XIVY-9284](https://1ivy.atlassian.net/browse/XIVY-9284) Engine Cockpit branding image upload shows error even if upload successful 
* [XIVY-9297](https://1ivy.atlassian.net/browse/XIVY-9297) Inscription editor blocked for several minutes when editing large object trees 
* [XIVY-9299](https://1ivy.atlassian.net/browse/XIVY-9299) REST method browser takes over 20 seconds to display methods 
* [XIVY-9336](https://1ivy.atlassian.net/browse/XIVY-9336) Engine Migration Wizard: Buttons should be aligned to the correct window 
* [XIVY-9342](https://1ivy.atlassian.net/browse/XIVY-9342) User and Role count in the title is not updated if security system is switched 
* [XIVY-9388](https://1ivy.atlassian.net/browse/XIVY-9388) Can not cleanup JSF view scope when HTTP session expires 
* [IVYPORTAL-13134](https://1ivy.atlassian.net/browse/IVYPORTAL-13134) The left menu marks the wrong item selected 
* [IVYPORTAL-13140](https://1ivy.atlassian.net/browse/IVYPORTAL-13140) My Profile on Ivy Portal 9.3 
* [IVYPORTAL-13165](https://1ivy.atlassian.net/browse/IVYPORTAL-13165) Admin user cannot edit/delete absences of normal users in the current or future  
* [IVYPORTAL-13450](https://1ivy.atlassian.net/browse/IVYPORTAL-13450) Rounding position when scrolling task list 
* [IVYPORTAL-13539](https://1ivy.atlassian.net/browse/IVYPORTAL-13539) Delegation task disables user selection if previously entered incorrectly 
* [IVYPORTAL-13544](https://1ivy.atlassian.net/browse/IVYPORTAL-13544) Absences configuration did not work on the same day 
* [IVYPORTAL-13804](https://1ivy.atlassian.net/browse/IVYPORTAL-13804) Language support is not handled correctly 
* [IVYPORTAL-14018](https://1ivy.atlassian.net/browse/IVYPORTAL-14018) State not loaded when apply saved filter in full task list 
* [IVYPORTAL-14147](https://1ivy.atlassian.net/browse/IVYPORTAL-14147) Back link of custom Case Details, Task Details pages does not work on Firefox 
* [IVYPORTAL-14152](https://1ivy.atlassian.net/browse/IVYPORTAL-14152) Portal Widget Resize 