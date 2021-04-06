## Bug Fixes {#bugfixes}

* [XIVY-2977](https://jira.axonivy.com/jira/browse/XIVY-2977) Integration tests for DocFactory 
* [XIVY-3253](https://jira.axonivy.com/jira/browse/XIVY-3253) WebService Process is executed even though parameter mapping has failed 
* [XIVY-3282](https://jira.axonivy.com/jira/browse/XIVY-3282) Can't find repo data after Signal call 
* [XIVY-3436](https://jira.axonivy.com/jira/browse/XIVY-3436) Global Variables which contains underscores can not be overriden with environment variables 
* [XIVY-3515](https://jira.axonivy.com/jira/browse/XIVY-3515) Better fieldName suggestion on html dialog creation to prevent JSF 'property not found' exceptions 
* [XIVY-3844](https://jira.axonivy.com/jira/browse/XIVY-3844) Wrong Hotkeys when selecting Types or Content in some Inscription Masks 
* [XIVY-3851](https://jira.axonivy.com/jira/browse/XIVY-3851) Prevent that a lot of MissingResourceException are thrown when processing a JSF resource request 
* [XIVY-3886](https://jira.axonivy.com/jira/browse/XIVY-3886) Performance Log Valve always prints session=null 
* [XIVY-4053](https://jira.axonivy.com/jira/browse/XIVY-4053) Frequently occurring NPE in ProcessEditor on Mac and sometimes in Windows 
* [XIVY-4054](https://jira.axonivy.com/jira/browse/XIVY-4054) IllegalArgumentException logged when entering ScriptCellEditor 
* [XIVY-4145](https://jira.axonivy.com/jira/browse/XIVY-4145) User is not synchronized after failed login <span class="badge badge-pill badge-success">security</span>
* [XIVY-4152](https://jira.axonivy.com/jira/browse/XIVY-4152) Improve DataCache docs regarding valid literals for lifetime and fixed time attributes 
* [XIVY-4205](https://jira.axonivy.com/jira/browse/XIVY-4205) Disable Task-Mail notifications job for inactive Applications <span class="badge badge-pill badge-success">security</span>
* [XIVY-4297](https://jira.axonivy.com/jira/browse/XIVY-4297) CXF Web Service Client comes in trouble under high pressure 
* [XIVY-4309](https://jira.axonivy.com/jira/browse/XIVY-4309) Designer Process Performance view cannot go to process element 
* [XIVY-4333](https://jira.axonivy.com/jira/browse/XIVY-4333) Can't open multiple resources in a row with the Axon Ivy Project navigator 
* [XIVY-4446](https://jira.axonivy.com/jira/browse/XIVY-4446) NullPointerException when calling Task#canUserResumeTask 
* [XIVY-4470](https://jira.axonivy.com/jira/browse/XIVY-4470) engine animation speed change throwes an error if you close a project 
* [XIVY-4510](https://jira.axonivy.com/jira/browse/XIVY-4510) REST activity fails to send query param with dollar sign ($) 
* [XIVY-4516](https://jira.axonivy.com/jira/browse/XIVY-4516) REST runtime logs do not expose HTTP headers 
* [XIVY-4531](https://jira.axonivy.com/jira/browse/XIVY-4531) Last InscriptionEditor tab invisible on Mac 
* [XIVY-4550](https://jira.axonivy.com/jira/browse/XIVY-4550) DB element inscription blocks the UI and occasionally throws OutOfMemoryException 
* [XIVY-4555](https://jira.axonivy.com/jira/browse/XIVY-4555) NPE in ProcessModelVersion.getProjectUri() if project of pmv is missing 
* [XIVY-4559](https://jira.axonivy.com/jira/browse/XIVY-4559) Deployment of REST services defined in projects fails if any released PMV has no project 
* [XIVY-4561](https://jira.axonivy.com/jira/browse/XIVY-4561) REST services returns 204 (NO_CONTENT) if PMV is inactive instead of 503 (SERVICE_UNAVAILABLE) 
* [XIVY-4566](https://jira.axonivy.com/jira/browse/XIVY-4566) ClassCastException in system event listener after redeployment of project with the listener class 
* [XIVY-4586](https://jira.axonivy.com/jira/browse/XIVY-4586) Support UserTasks in BpmClient tests 
* [XIVY-4590](https://jira.axonivy.com/jira/browse/XIVY-4590) temp_folder.listFiles() returns files that are permament  
* [XIVY-4591](https://jira.axonivy.com/jira/browse/XIVY-4591) WebServiceStarts are not deployed to BpmProcessTest engine 
* [XIVY-4592](https://jira.axonivy.com/jira/browse/XIVY-4592) RestServices are not correctly started in BpmProcessTest engine 
* [XIVY-4612](https://jira.axonivy.com/jira/browse/XIVY-4612) Rest client connection not closed when return type is not set 
* [XIVY-4671](https://jira.axonivy.com/jira/browse/XIVY-4671) Implementation of JAXB-API not found during WebService Call or WebService Process Service construction 
* [XIVY-4682](https://jira.axonivy.com/jira/browse/XIVY-4682) Weird log entries if database connection with MS SQL Server Driver is lost during Insert by the database element 
* [XIVY-4710](https://jira.axonivy.com/jira/browse/XIVY-4710) SingleSignOnValve does not support async request processing 
* [XIVY-4711](https://jira.axonivy.com/jira/browse/XIVY-4711) Method Recordset.add(CompositeObject) causes WARN logs 
* [XIVY-4716](https://jira.axonivy.com/jira/browse/XIVY-4716) Error in logs when creating an error report 
* [XIVY-4727](https://jira.axonivy.com/jira/browse/XIVY-4727) Deployment error while validating User Task 
* [XIVY-4738](https://jira.axonivy.com/jira/browse/XIVY-4738) Cannot configure empty value for global variables in Cockpit 
* [XIVY-4746](https://jira.axonivy.com/jira/browse/XIVY-4746) Update javassist to 3.27.0-GA that static mocking with powermock works 
* [XIVY-4748](https://jira.axonivy.com/jira/browse/XIVY-4748) New Axon Ivy Test Project has wrong Default Namespace 
* [XIVY-4801](https://jira.axonivy.com/jira/browse/XIVY-4801) Primefaces DataTable: NullPointerException with multiViewState=true 
* [XIVY-4818](https://jira.axonivy.com/jira/browse/XIVY-4818) Task post-construct code block way too small 
* [XIVY-4823](https://jira.axonivy.com/jira/browse/XIVY-4823) Including same image multiple times in mail step are shown only once 
* [XIVY-4828](https://jira.axonivy.com/jira/browse/XIVY-4828) DB Step Element throw error "Cannot evaluate last inserted id" if primary key is not long 
* [XIVY-4842](https://jira.axonivy.com/jira/browse/XIVY-4842) Fix BusinessData filter API Javadoc 
* [XIVY-4867](https://jira.axonivy.com/jira/browse/XIVY-4867) Rename deploy option labels in the cockpit 
* [XIVY-4877](https://jira.axonivy.com/jira/browse/XIVY-4877) Excel export demo don't work with our docker engine 
* [XIVY-4887](https://jira.axonivy.com/jira/browse/XIVY-4887) Javadoc for IvyScript Number class is wrong for some conversion methods (e.g floatValue) 
* [XIVY-4891](https://jira.axonivy.com/jira/browse/XIVY-4891) BusinessCalendar fixed days are may be written in wrong format from the core 
* [XIVY-4893](https://jira.axonivy.com/jira/browse/XIVY-4893) NPE on Engine Cockpit PMV Detail view if required projects has an unspecified version 
* [XIVY-4898](https://jira.axonivy.com/jira/browse/XIVY-4898) ClassCastException antlr.CommonToken cannot be cast to antlr.Token 
* [XIVY-4904](https://jira.axonivy.com/jira/browse/XIVY-4904) There could occur an NPE while insert data over the DB Element 
* [XIVY-4907](https://jira.axonivy.com/jira/browse/XIVY-4907) First Tab occasionally 'blank' on inscription editor 
* [XIVY-4909](https://jira.axonivy.com/jira/browse/XIVY-4909) Dialog/UserTask present wrong start signature 
* [XIVY-4963](https://jira.axonivy.com/jira/browse/XIVY-4963) Endless loop in HttpClient Worker Thread with TLS 1.3 
* [XIVY-4993](https://jira.axonivy.com/jira/browse/XIVY-4993) Propagate reverse proxy URI info to ivy engine 
* [XIVY-5013](https://jira.axonivy.com/jira/browse/XIVY-5013) Make Axis2 HttpClient Connection pool configurable 
* [XIVY-5018](https://jira.axonivy.com/jira/browse/XIVY-5018) If pm is deleted which contains required pmvs dependent pmvs aren't correctly updated 
* [XIVY-5019](https://jira.axonivy.com/jira/browse/XIVY-5019) Html Dialog Validation takes very long 
* [XIVY-5020](https://jira.axonivy.com/jira/browse/XIVY-5020) Sometimes Ctrl+Space takes very long in the Html Dialog Editor (UI freeze) 
* [XIVY-5022](https://jira.axonivy.com/jira/browse/XIVY-5022) Html Dialog Editor takes very long in first startup 
* [XIVY-5037](https://jira.axonivy.com/jira/browse/XIVY-5037) Update statistic reports wrong host name host.docker.internal if Docker for Windows is installed on machine 
* [XIVY-5038](https://jira.axonivy.com/jira/browse/XIVY-5038) Open Rest Request Inscription fast and async 
* [XIVY-5040](https://jira.axonivy.com/jira/browse/XIVY-5040) Engine cannot restart same web service start in different apps 
* [XIVY-5075](https://jira.axonivy.com/jira/browse/XIVY-5075) DB Activity can not deal with Postgres schemas  
* [XIVY-5085](https://jira.axonivy.com/jira/browse/XIVY-5085) Copy Paste of Web Service Process Start throws an error 
* [XIVY-5131](https://jira.axonivy.com/jira/browse/XIVY-5131) Maven-install fails on second attempts in same workspace 
* [XIVY-5134](https://jira.axonivy.com/jira/browse/XIVY-5134) CMS values lost without feedback on Mac 
* [XIVY-5150](https://jira.axonivy.com/jira/browse/XIVY-5150) Overrides Editor not displaying it's entries after opening on Mac 
* [XIVY-5151](https://jira.axonivy.com/jira/browse/XIVY-5151) Override Editor fails to add new overrides without feedback 
* [XIVY-5152](https://jira.axonivy.com/jira/browse/XIVY-5152) Can not generate OpenAPI client for 'Genesis' swagger-20 definition 
* [XIVY-5217](https://jira.axonivy.com/jira/browse/XIVY-5217) Task expiry code timeout proposal delivers wrong timestamp 
* [XIVY-5239](https://jira.axonivy.com/jira/browse/XIVY-5239) Distracting standard output when running @IvyProcessTest  
* [XIVY-5284](https://jira.axonivy.com/jira/browse/XIVY-5284) Engine does not start: MBean for parameter object is already registered 
* [XIVY-5288](https://jira.axonivy.com/jira/browse/XIVY-5288) Can not connect Note to Embedded Subprocess 
* [XIVY-5309](https://jira.axonivy.com/jira/browse/XIVY-5309) Engine Cockpit can't show more than 3 role hierarchy 
* [XIVY-5314](https://jira.axonivy.com/jira/browse/XIVY-5314) Cannot reliably sort business data with more than one fields 
* [XIVY-5334](https://jira.axonivy.com/jira/browse/XIVY-5334) Cockpit: Every test of a External Database blocks a connection 
* [XIVY-5341](https://jira.axonivy.com/jira/browse/XIVY-5341) Resilient error handling when app.yaml is not well formatted 
* [XIVY-5342](https://jira.axonivy.com/jira/browse/XIVY-5342) Pre Conditions using BusinessData on CaseMap SideSteps evaluate false 
* [XIVY-5410](https://jira.axonivy.com/jira/browse/XIVY-5410) ivyScript File class does not work in process tests (NPE) 
* [XIVY-5411](https://jira.axonivy.com/jira/browse/XIVY-5411) Migration to 9.1 is failing due constraint violation exception 
* [XIVY-5454](https://jira.axonivy.com/jira/browse/XIVY-5454) NPE when sending task mails 
* [XIVY-5460](https://jira.axonivy.com/jira/browse/XIVY-5460) Grey process editor on first open 
* [XIVY-5467](https://jira.axonivy.com/jira/browse/XIVY-5467) Can't use pe:inputPhone 
* [XIVY-5505](https://jira.axonivy.com/jira/browse/XIVY-5505) Release Notes does not contain all issues 
* [XIVY-5569](https://jira.axonivy.com/jira/browse/XIVY-5569) Deployment Service vulnerable to Path Traversal Attack <span class="badge badge-pill badge-success">security</span>
* [XIVY-5629](https://jira.axonivy.com/jira/browse/XIVY-5629) Upgrade Tomcat to 9.0.43 to fix CVE-2021-25122 <span class="badge badge-pill badge-success">security</span>
* [XIVY-5635](https://jira.axonivy.com/jira/browse/XIVY-5635) MyFaces throws NullPointerException when using attributes in composite component 
* [XIVY-5641](https://jira.axonivy.com/jira/browse/XIVY-5641) SYSTEM user gets synched during Task Mail Notification 
* [XIVY-5699](https://jira.axonivy.com/jira/browse/XIVY-5699) Axon Ivy Engine Docker image has broken package dependencies 
* [XIVY-5765](https://jira.axonivy.com/jira/browse/XIVY-5765) WS Axis2 calls with insecure SSL setting do not work 
* [XIVY-5794](https://jira.axonivy.com/jira/browse/XIVY-5794) Theme related web assets (css, images) not refreshed in browser 
* [XIVY-5843](https://jira.axonivy.com/jira/browse/XIVY-5843) Not all POI libraries on Designer classpath 
* [XIVY-5870](https://jira.axonivy.com/jira/browse/XIVY-5870) No OpenAPi support in Rest Inscription if element is in dependent project 
* [IVYPORTAL-11023](https://jira.axonivy.com/jira/browse/IVYPORTAL-11023) Group chat list not updated 
* [IVYPORTAL-11056](https://jira.axonivy.com/jira/browse/IVYPORTAL-11056) Height of User Default Process is not good 
* [IVYPORTAL-11104](https://jira.axonivy.com/jira/browse/IVYPORTAL-11104) Improve the iframe area of portal. high and width 
* [IVYPORTAL-11167](https://jira.axonivy.com/jira/browse/IVYPORTAL-11167) Not match announcement 
* [IVYPORTAL-11514](https://jira.axonivy.com/jira/browse/IVYPORTAL-11514) Session Expiry when using IFrame 
* [IVYPORTAL-11523](https://jira.axonivy.com/jira/browse/IVYPORTAL-11523) Improve: save task filter  
* [IVYPORTAL-11536](https://jira.axonivy.com/jira/browse/IVYPORTAL-11536) Improve TaskTemplate-8 - java.lang.IndexOutOfBoundsException" 
* [IVYPORTAL-11615](https://jira.axonivy.com/jira/browse/IVYPORTAL-11615) Express task - Selection Date component is broken 
* [IVYPORTAL-11616](https://jira.axonivy.com/jira/browse/IVYPORTAL-11616) Start Adhoc task - a growl message is throwing with error type 
* [IVYPORTAL-11660](https://jira.axonivy.com/jira/browse/IVYPORTAL-11660) Fix alignment in Express 
* [IVYPORTAL-11784](https://jira.axonivy.com/jira/browse/IVYPORTAL-11784) Growl Message for express user task with email do not show error 
* [IVYPORTAL-11801](https://jira.axonivy.com/jira/browse/IVYPORTAL-11801) Bug Express - Able to start 
* [IVYPORTAL-11842](https://jira.axonivy.com/jira/browse/IVYPORTAL-11842) Values of SideSteps are NOT updated with skipping TaskList in CaseMap 
