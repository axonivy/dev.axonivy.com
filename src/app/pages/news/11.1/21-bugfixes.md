## Bug Fixes {#bugfixes}

* [XIVY-2985](https://1ivy.atlassian.net/browse/XIVY-2985) EL content assist in Html Dialog editor does not work most of the time 
* [XIVY-3113](https://1ivy.atlassian.net/browse/XIVY-3113) Business data search API is restricted to read maximum 10000 results 
* [XIVY-3312](https://1ivy.atlassian.net/browse/XIVY-3312) IBusinessCase API not visible in designer 
* [XIVY-7770](https://1ivy.atlassian.net/browse/XIVY-7770) Wrong JSF validation warning in HTML Dialog editor with fluent API methods 
* [XIVY-8621](https://1ivy.atlassian.net/browse/XIVY-8621) Bad performance of user detail view in Engine Cockpit if user has 1000+ roles (permission tree lazy loading) <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-8698](https://1ivy.atlassian.net/browse/XIVY-8698) Bad performance of Applications Page in Engine Cockpit  <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-9205](https://1ivy.atlassian.net/browse/XIVY-9205) Maven (M2E) workspace resolution for JAR attachments in IAR is broken 
* [XIVY-9435](https://1ivy.atlassian.net/browse/XIVY-9435) Log Log4J configuration problems to ivy.log 
* [XIVY-9543](https://1ivy.atlassian.net/browse/XIVY-9543) ClassLoading error on HD with primefaces objects on method-signature 
* [XIVY-9566](https://1ivy.atlassian.net/browse/XIVY-9566) CMS resources cached from browser in previous language 
* [XIVY-9625](https://1ivy.atlassian.net/browse/XIVY-9625) Improve empty custom-fields.yaml file and documentation 
* [XIVY-9658](https://1ivy.atlassian.net/browse/XIVY-9658) CMS tree refresh not working for external changes 
* [XIVY-9714](https://1ivy.atlassian.net/browse/XIVY-9714) Process history view is not in sync with process editor selection on Windows 
* [XIVY-9719](https://1ivy.atlassian.net/browse/XIVY-9719) Designer email simulation should use correct mail address 
* [XIVY-9721](https://1ivy.atlassian.net/browse/XIVY-9721) Missing information on process elements on the info menu (e.g. code of script step) in the process editor 
* [XIVY-9722](https://1ivy.atlassian.net/browse/XIVY-9722) Browser refresh starts again a new process instead of refreshing the current user dialog 
* [XIVY-9724](https://1ivy.atlassian.net/browse/XIVY-9724) Process element can be move to negative coordinates if pools or lanes are present in the process editor  
* [XIVY-9741](https://1ivy.atlassian.net/browse/XIVY-9741) Running multiple IvyTest which uses the same EntityManger fails 
* [XIVY-9745](https://1ivy.atlassian.net/browse/XIVY-9745) Importing an old project with dependency to old Portal projects is a big pain 
* [XIVY-9763](https://1ivy.atlassian.net/browse/XIVY-9763) ClassLoader error in maven project build plugin when validating ivy-processes 
* [XIVY-9777](https://1ivy.atlassian.net/browse/XIVY-9777) Select Breakpoint in Breakpoint View causes IvyScript validation error 
* [XIVY-9822](https://1ivy.atlassian.net/browse/XIVY-9822) Browsing public API classes in external browser fails 
* [XIVY-9824](https://1ivy.atlassian.net/browse/XIVY-9824) Drools DRL editor does not work with Java 17. Document to use Java 11.  
* [XIVY-9825](https://1ivy.atlassian.net/browse/XIVY-9825) Screenshot of new process editor (e.g. swimlane) are outdated in documentation 
* [XIVY-9826](https://1ivy.atlassian.net/browse/XIVY-9826) No sources provided for javax.* bundles 
* [XIVY-9828](https://1ivy.atlassian.net/browse/XIVY-9828) Delete or hide default security system if not used in Engine Cockpit <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-9832](https://1ivy.atlassian.net/browse/XIVY-9832) Install button in Axon Ivy Market sometimes disappear 
* [XIVY-9833](https://1ivy.atlassian.net/browse/XIVY-9833) Make links shown in Designer or Engine to the documentation version aware 
* [XIVY-9847](https://1ivy.atlassian.net/browse/XIVY-9847) Improve styling of Primefaces Freya DataTable paginator 
* [XIVY-9861](https://1ivy.atlassian.net/browse/XIVY-9861) White flickering in Dev-wf-ui with iFrame and dark mode 
* [XIVY-9862](https://1ivy.atlassian.net/browse/XIVY-9862) Different Pools and Lanes in same diagram are loaded in wrong order 
* [XIVY-9887](https://1ivy.atlassian.net/browse/XIVY-9887) Open content object browser in IvyScriptEditor causes IllegalStateException 
* [XIVY-9925](https://1ivy.atlassian.net/browse/XIVY-9925) External variable files in project configuration are not correctly encoded on Windows 
* [XIVY-9930](https://1ivy.atlassian.net/browse/XIVY-9930) Conditional breakpoints not supported on some process elements (Alternative gateway, End event, Embedded Sub, ...) 
* [XIVY-9948](https://1ivy.atlassian.net/browse/XIVY-9948) Bad Performance of StandardProcessStartFinder with many Apps and PMVs <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-9975](https://1ivy.atlassian.net/browse/XIVY-9975) Delete packed project (iar) in Designer does not remove it from the CMS view 
* [XIVY-9979](https://1ivy.atlassian.net/browse/XIVY-9979) CMS view doesn't show when project is packed (iar) 
* [XIVY-9980](https://1ivy.atlassian.net/browse/XIVY-9980) CMS delete API does not work correctly 
* [XIVY-9982](https://1ivy.atlassian.net/browse/XIVY-9982) The string truncating mechanism for Microsoft SQL Server with UTF-8 characters does not work properly 
* [XIVY-9987](https://1ivy.atlassian.net/browse/XIVY-9987) Export a process to an SVG image does not work in Designer 
* [XIVY-9989](https://1ivy.atlassian.net/browse/XIVY-9989) Start deployment is not thread-save and leads to flaky tests 
* [XIVY-10008](https://1ivy.atlassian.net/browse/XIVY-10008) OpenAPI3 request body types in ms-graph are not resolved 
* [XIVY-10021](https://1ivy.atlassian.net/browse/XIVY-10021) Maven libraries are not filtered in the AxonIvy project tree 
* [XIVY-10028](https://1ivy.atlassian.net/browse/XIVY-10028) Designer start is slow in development environment 
* [XIVY-10031](https://1ivy.atlassian.net/browse/XIVY-10031) REST Form-Payload field order must respect field order from inscription mask 
* [XIVY-10051](https://1ivy.atlassian.net/browse/XIVY-10051) Generic third-party elements not usable with new Process Editor 
* [XIVY-10057](https://1ivy.atlassian.net/browse/XIVY-10057) Improve Update Version, Release Notes, and Changelog builds 
* [XIVY-10101](https://1ivy.atlassian.net/browse/XIVY-10101) Security-relevant information is shown in the Slow Requests view of Engine Cockpit <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10105](https://1ivy.atlassian.net/browse/XIVY-10105) Session leak with async rest service over SSO or Basic Auth on timeout <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10107](https://1ivy.atlassian.net/browse/XIVY-10107) ClassCastException in UserDialog attribute browser 
* [XIVY-10110](https://1ivy.atlassian.net/browse/XIVY-10110) Rest Call element is sending list query parameters with brackets 
* [XIVY-10111](https://1ivy.atlassian.net/browse/XIVY-10111) Workflow cleanup does not delete document files of cases 
* [XIVY-10112](https://1ivy.atlassian.net/browse/XIVY-10112) After restart of Designer or Demo Engine workflow files are still there 
* [XIVY-10117](https://1ivy.atlassian.net/browse/XIVY-10117) Navigating in Engine Cockpit generates a lot of system db queries to count users <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-10122](https://1ivy.atlassian.net/browse/XIVY-10122) Hide sensitive RestClient properties on detail view in Engine Cockpit <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10126](https://1ivy.atlassian.net/browse/XIVY-10126) Database configuration are not shared along dependent projects 
* [XIVY-10146](https://1ivy.atlassian.net/browse/XIVY-10146) Task notification mails can't be sent when session limit is reached 
* [XIVY-10153](https://1ivy.atlassian.net/browse/XIVY-10153) NPE in portal start time cleaner when tracing is enabled 
* [XIVY-10160](https://1ivy.atlassian.net/browse/XIVY-10160) Stream API throws InaccessibleObjectException in IvyScript 
* [XIVY-10162](https://1ivy.atlassian.net/browse/XIVY-10162) The REST service view in the Engine Cockpit shows/tests not expanded URIs if URI templates are used 
* [XIVY-10165](https://1ivy.atlassian.net/browse/XIVY-10165) Log Viewer in Engine Cockpit cannot handle compressed log files 
* [XIVY-10173](https://1ivy.atlassian.net/browse/XIVY-10173) Key shortcuts for debugging (F5..F8) do not work if process editor has focus on Windows 
* [XIVY-10176](https://1ivy.atlassian.net/browse/XIVY-10176) Isolated OAUTH Token store to avoid services unexpectedly share common authentication <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10192](https://1ivy.atlassian.net/browse/XIVY-10192) NPE during project validation leads to false positive problem markers 
* [XIVY-10193](https://1ivy.atlassian.net/browse/XIVY-10193) Property dialog in Rest Client config shows wrong description default value for some Jersey properties 
* [XIVY-10195](https://1ivy.atlassian.net/browse/XIVY-10195) Use webpack production mode for integrated process editor 
* [XIVY-10209](https://1ivy.atlassian.net/browse/XIVY-10209) Could not register MBean in Designer because of InstanceAlreadyExistsException 
* [XIVY-10218](https://1ivy.atlassian.net/browse/XIVY-10218) Parameter filters of LazyDataModel7 load method contains FilterMeta objects instead of filter values 
* [XIVY-10230](https://1ivy.atlassian.net/browse/XIVY-10230) TextFieldsOperation.containsAllWords(java.lang.String) is no longer byte-code compatible 
* [XIVY-10243](https://1ivy.atlassian.net/browse/XIVY-10243) Small UI issues with the right aligned template and Freya theme 
* [XIVY-10251](https://1ivy.atlassian.net/browse/XIVY-10251) Sometimes an IlegalStateException is thrown when parallel web service calls are made 
* [XIVY-10265](https://1ivy.atlassian.net/browse/XIVY-10265) Setting the original or expiry activator has no effect if it is parked and the parking user is no longer a member of the new activator 
* [XIVY-10266](https://1ivy.atlassian.net/browse/XIVY-10266) Setting the activator does not reset the task if it is parked and the parking user is no longer a member of the new activator 
* [XIVY-10294](https://1ivy.atlassian.net/browse/XIVY-10294) Fix Snake YAML unsafe deserialization vulnerability (CVE-2022-1471) <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10299](https://1ivy.atlassian.net/browse/XIVY-10299) Writing a content object value with the method bytes of ContentObjectWriter does not invalidate file cache 
* [XIVY-10308](https://1ivy.atlassian.net/browse/XIVY-10308) Zombie Designer instances are making WebTests hard to run 
* [XIVY-10314](https://1ivy.atlassian.net/browse/XIVY-10314) Deleting a SecurityContext causes a PersistencyException 
* [XIVY-10315](https://1ivy.atlassian.net/browse/XIVY-10315) User Detail and Role Detail Views in Engine Cockpit shows wrong "Selected Application" link  
* [XIVY-10316](https://1ivy.atlassian.net/browse/XIVY-10316) SecurityContext mismatch between WorkflowContext and HTTP session if a new context is created 
* [XIVY-10396](https://1ivy.atlassian.net/browse/XIVY-10396) Boundary event disappears if wrapping it into an embedded process 
* [XIVY-10419](https://1ivy.atlassian.net/browse/XIVY-10419)  Save does not work after performing a refresh (F5 or CTRL+R) in the process editor 
* [XIVY-10435](https://1ivy.atlassian.net/browse/XIVY-10435) Elasticsearch traces do not appear in Traffic Graph in Engine Cockpit 
* [XIVY-10440](https://1ivy.atlassian.net/browse/XIVY-10440) NPE in ValidationPreferences leads to a lot of false problem markers 
* [XIVY-10447](https://1ivy.atlassian.net/browse/XIVY-10447) REST config editor is blocked because of Jersey properties documentation evaluation takes too much time 
* [XIVY-10448](https://1ivy.atlassian.net/browse/XIVY-10448) User from Azure AD gets disabled when group filter is set but not role mapping is defined 
* [XIVY-10449](https://1ivy.atlassian.net/browse/XIVY-10449) Can not synchronize users from Azure AD if locale can not be parsed 
* [XIVY-10463](https://1ivy.atlassian.net/browse/XIVY-10463) Configuration of thread pools (CorePoolSize, MaximumPoolSize) are not considered during Engine startup 
* [XIVY-10495](https://1ivy.atlassian.net/browse/XIVY-10495) Conversion from restClients.restConfig to rest-clients.yaml fails if first contains special Unicode characters 
* [XIVY-10500](https://1ivy.atlassian.net/browse/XIVY-10500) Roles from dependent project can not be selected in inscription editor Task tab 
* [XIVY-10510](https://1ivy.atlassian.net/browse/XIVY-10510) Could not start embedded Axon Ivy Engine if required Java Maven artifact was imported to workspace 
* [XIVY-10515](https://1ivy.atlassian.net/browse/XIVY-10515) OAuth2 callback-URI broken when using OAauth2 REST client 
* [XIVY-10529](https://1ivy.atlassian.net/browse/XIVY-10529) ivy.log on Designer does not contain log messages of ch.ivyteam.** and runtimelog.** loggers 
* [XIVY-10555](https://1ivy.atlassian.net/browse/XIVY-10555) Remove third party library information from ReadMe 
* [XIVY-10593](https://1ivy.atlassian.net/browse/XIVY-10593) Potential resource leaks with Azure AD integration 
* [XIVY-10659](https://1ivy.atlassian.net/browse/XIVY-10659) IvyScript type interference for Lists broken 
* [XIVY-10664](https://1ivy.atlassian.net/browse/XIVY-10664) Prevent XSS attacks with escaping data in Slow Request and MBeans view of Engine Cockpit <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10674](https://1ivy.atlassian.net/browse/XIVY-10674) Session cookie should have secure flag set if X-Forwarded-Proto is set to https <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10675](https://1ivy.atlassian.net/browse/XIVY-10675) IVYSESSIONID-* cookie should set the secure flag if request is secure or secure cookies are configured in web.xml <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10676](https://1ivy.atlassian.net/browse/XIVY-10676) Reduced size of Embedded Process results in errors when inserting new elements 
* [XIVY-10690](https://1ivy.atlassian.net/browse/XIVY-10690) NPE when hovering over a variable in IvyScript editor that is not declared 
* [XIVY-10694](https://1ivy.atlassian.net/browse/XIVY-10694) After Excel import in CMS there are some entries which has a different new line format 
* [XIVY-10708](https://1ivy.atlassian.net/browse/XIVY-10708) Exception on getStartables() if the responsible role on a process start is deleted 
* [XIVY-10748](https://1ivy.atlassian.net/browse/XIVY-10748) Problems in offline Designer if a market product has dependencies to other market artifacts 
* [XIVY-10788](https://1ivy.atlassian.net/browse/XIVY-10788) Multiline labels on process arcs (edges) are not saved properly 
* [XIVY-10803](https://1ivy.atlassian.net/browse/XIVY-10803) Strange validation errors because process model cannot be read 
* [XIVY-10808](https://1ivy.atlassian.net/browse/XIVY-10808) OutOfMemoryError due to process data class that cannot be found during process data deserialisation 
* [XIVY-10813](https://1ivy.atlassian.net/browse/XIVY-10813) Exception during system database cache invalidation if entity is read from cache while invalidating 
* [XIVY-10831](https://1ivy.atlassian.net/browse/XIVY-10831) Bad performance of system database association cache invalidation <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-10845](https://1ivy.atlassian.net/browse/XIVY-10845) 'any' sql statements are only validated on UI but not by process validation 
* [XIVY-10855](https://1ivy.atlassian.net/browse/XIVY-10855) Windows standby disconnects the process editor 
* [XIVY-10857](https://1ivy.atlassian.net/browse/XIVY-10857) Bad default namespace in the New Axon Ivy Project wizard  
* [XIVY-10859](https://1ivy.atlassian.net/browse/XIVY-10859) Do not allow same qualified name for Data Class and User Dialog 
* [XIVY-10860](https://1ivy.atlassian.net/browse/XIVY-10860) The Designer should enforce to use lower case data attribute names 
* [XIVY-10868](https://1ivy.atlassian.net/browse/XIVY-10868) Branding logo is not considered in notification mails 
* [XIVY-10918](https://1ivy.atlassian.net/browse/XIVY-10918) Cannot create new admin users if named user license exceeded 
* [XIVY-10923](https://1ivy.atlassian.net/browse/XIVY-10923) Field value of p:selectOneMenu should appear left-aligned when using frame right template 
* [XIVY-10934](https://1ivy.atlassian.net/browse/XIVY-10934) Ivy behind IIS (not AJP) - configuration seems not to set up X-Forwarded-Proto and other proxy headers. <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-10947](https://1ivy.atlassian.net/browse/XIVY-10947) Index case or task data not up to date in case multiple changes are done in a short period of time 
* [XIVY-10963](https://1ivy.atlassian.net/browse/XIVY-10963) In HTML Dialog views only the first EL expression in a attribute value is validated 
* [XIVY-10982](https://1ivy.atlassian.net/browse/XIVY-10982) ClassCastException during validation of EL expression with enum type == or != null 
* [XIVY-11029](https://1ivy.atlassian.net/browse/XIVY-11029) Engine Cockpit does sometimes not display the name of a role 
* [XIVY-11036](https://1ivy.atlassian.net/browse/XIVY-11036) HTML Dialog editor preview can not handle flex grids used in our html-dialog-demos 
* [XIVY-11037](https://1ivy.atlassian.net/browse/XIVY-11037) Task modifications can cause multiple new task emails 
* [XIVY-11068](https://1ivy.atlassian.net/browse/XIVY-11068) Enforce REST application/url-encoded params serialization as String 
* [XIVY-11091](https://1ivy.atlassian.net/browse/XIVY-11091) Deployment should fail if a project with an unregistered thirdparty element is deployed 
* [XIVY-11109](https://1ivy.atlassian.net/browse/XIVY-11109) HTML dialog logic methods not validated as bean properties in EL  
* [XIVY-11110](https://1ivy.atlassian.net/browse/XIVY-11110) Favicon.ico in Engine Cockpit is not available 
* [XIVY-11140](https://1ivy.atlassian.net/browse/XIVY-11140) Hide normal sidebar logo in collapsed Freya side menu 
* [XIVY-11161](https://1ivy.atlassian.net/browse/XIVY-11161) EndPage from file selector should always use '/' instead of '\' as file seperator 
* [XIVY-11163](https://1ivy.atlassian.net/browse/XIVY-11163) CMS entries are shown with the wrong icon and can not be opened from the Search view 
* [XIVY-11172](https://1ivy.atlassian.net/browse/XIVY-11172) NPE in Designer annotation processing when project has dependency to packed iar 
* [XIVY-11173](https://1ivy.atlassian.net/browse/XIVY-11173) Menu 'Maven'>'Update Project' opens demo processes 
* [XIVY-11197](https://1ivy.atlassian.net/browse/XIVY-11197) REST form params/multipart enforce Object as String 
* [XIVY-11208](https://1ivy.atlassian.net/browse/XIVY-11208) Dev-Wf-UI tasks search is showing data which shouldn't be visible 
* [XIVY-11209](https://1ivy.atlassian.net/browse/XIVY-11209) Dev-Wf-UI task responsible shows user abbreviation instead of display name 
* [XIVY-11246](https://1ivy.atlassian.net/browse/XIVY-11246) NPE in dev-wf-ui when switching user on task or case detail 
* [XIVY-11254](https://1ivy.atlassian.net/browse/XIVY-11254) Project-build-plugin does deploy dependent packages in wrong order for IvyTest and IvyProcessTest 
* [XIVY-11259](https://1ivy.atlassian.net/browse/XIVY-11259) Custom mail processes don't work if the web.xml session cookie secure flag is true 
* [XIVY-11266](https://1ivy.atlassian.net/browse/XIVY-11266) User and role workflow counts are always 0 in Engine Cockpit  
* [XIVY-11310](https://1ivy.atlassian.net/browse/XIVY-11310) User Synchronisation with Azure Active Directory fails if userPrincipal has special characters like # in it 
* [IVYPORTAL-14497](https://1ivy.atlassian.net/browse/IVYPORTAL-14497) Cannot change language in My Profile (like de_AT, de_CH) 
* [IVYPORTAL-14509](https://1ivy.atlassian.net/browse/IVYPORTAL-14509) Dashboard permissions autocomplete works incorrectly after unselecting all permissions 
* [IVYPORTAL-14637](https://1ivy.atlassian.net/browse/IVYPORTAL-14637) Fix broken links in documentation 
* [IVYPORTAL-14645](https://1ivy.atlassian.net/browse/IVYPORTAL-14645) Portal Permissions are granted automatically after restarting engine 
* [IVYPORTAL-14655](https://1ivy.atlassian.net/browse/IVYPORTAL-14655) Fix Process Image cannot load image when separated Portal app 
* [IVYPORTAL-14712](https://1ivy.atlassian.net/browse/IVYPORTAL-14712) Changing language to Japanese causes NPE in Portal 10.0.1 
* [IVYPORTAL-14851](https://1ivy.atlassian.net/browse/IVYPORTAL-14851) Login does not work https://axonivyengine/{myapp}/login
