## Bug Fixes {#bugfixes}

* [XIVY-2120](https://axonivy.atlassian.net/browse/XIVY-2120) Do not start error process while rejoining tasks 
* [XIVY-3122](https://axonivy.atlassian.net/browse/XIVY-3122) JaxRS Client API does not work in non web server request threads (e.g SYSTEM user threads) 
* [XIVY-3394](https://axonivy.atlassian.net/browse/XIVY-3394) Deadlock in Java Editor with Content Assist 
* [XIVY-3610](https://axonivy.atlassian.net/browse/XIVY-3610) deploy.options.yaml as part of an ivy project (iar) is not considered 
* [XIVY-4450](https://axonivy.atlassian.net/browse/XIVY-4450) Drag&Drop CMS-Objects to XHTML broken 
* [XIVY-4707](https://axonivy.atlassian.net/browse/XIVY-4707) Unique constrain violated exception when trying to create process start within multiple threads 
* [XIVY-5160](https://axonivy.atlassian.net/browse/XIVY-5160) Tasks executed by System have other ContextClassLoader than executed by a user 
* [XIVY-5261](https://axonivy.atlassian.net/browse/XIVY-5261) IllegalArgumentException: taskElement.kind must be X but is Z 
* [XIVY-5453](https://axonivy.atlassian.net/browse/XIVY-5453) Designer switches to Process Model perspective after defining an override process 
* [XIVY-5615](https://axonivy.atlassian.net/browse/XIVY-5615) Performance problems of IvyScript in huge SmartTables 
* [XIVY-5905](https://axonivy.atlassian.net/browse/XIVY-5905) CXF WsSecurity feature fails at runtime with classloading failure of: SAAJMetaFactoryImpl  
* [XIVY-5933](https://axonivy.atlassian.net/browse/XIVY-5933) Slow TaskEnd frame redirect, causes Jsf Users to wait and see white pages 
* [XIVY-5935](https://axonivy.atlassian.net/browse/XIVY-5935) Can't query for Boolean values with Ivy.repo().search() after migrating to LTS 8 
* [XIVY-5943](https://axonivy.atlassian.net/browse/XIVY-5943) Can't define a large list of ignored JAX-WS policies towards the same namespace 
* [XIVY-5944](https://axonivy.atlassian.net/browse/XIVY-5944) CMS export throws UnsupportedCharsetException: Big5 
* [XIVY-5977](https://axonivy.atlassian.net/browse/XIVY-5977) Can't distinguish inherited and locally defined member in EngineCockpit 
* [XIVY-5987](https://axonivy.atlassian.net/browse/XIVY-5987) Can't open any HtmlDialog occasionally until restart, due to FacesConverter NPE 
* [XIVY-5988](https://axonivy.atlassian.net/browse/XIVY-5988) Can't inscribe with OpenAPI support, due to empty schemas 
* [XIVY-5990](https://axonivy.atlassian.net/browse/XIVY-5990) Case integrity violation exception when setting up multiple cases by API in Designer 
* [XIVY-5993](https://axonivy.atlassian.net/browse/XIVY-5993) NullPointerException when searching SubProcessStarts 
* [XIVY-6055](https://axonivy.atlassian.net/browse/XIVY-6055) The datatype selector occasionally select the wrong type 
* [XIVY-6061](https://axonivy.atlassian.net/browse/XIVY-6061) Wrong additional configuration entry for list values in Engine Cockpit 
* [XIVY-6070](https://axonivy.atlassian.net/browse/XIVY-6070) Rejoining of tasks does not work on CallAndWait  
* [XIVY-6072](https://axonivy.atlassian.net/browse/XIVY-6072) p:columnToggler toggles wrong column on click 
* [XIVY-6073](https://axonivy.atlassian.net/browse/XIVY-6073) Content and Formatting chooser offers only English locales 
* [XIVY-6075](https://axonivy.atlassian.net/browse/XIVY-6075) Variables in external files have encoding issues under windows 
* [XIVY-6094](https://axonivy.atlassian.net/browse/XIVY-6094) User search in Cockpit shows wrong users 
* [XIVY-6097](https://axonivy.atlassian.net/browse/XIVY-6097) ivy.var in inconsistent state before deploying at DesignTime 
* [XIVY-6113](https://axonivy.atlassian.net/browse/XIVY-6113) Editor layout overflows on long WSDL or REST URIs 
* [XIVY-6148](https://axonivy.atlassian.net/browse/XIVY-6148) Corrupt Call-Sub element in process if added via Connector-Browser 
* [XIVY-6152](https://axonivy.atlassian.net/browse/XIVY-6152) Can't open ContextMenu on ErrorBoundaryEvent 
* [XIVY-6159](https://axonivy.atlassian.net/browse/XIVY-6159) OpenDemo installer NPE when using DocFactory 
* [XIVY-6160](https://axonivy.atlassian.net/browse/XIVY-6160) Icons of 'callable sub' rendered as ERROR on IAR project 
* [XIVY-6184](https://axonivy.atlassian.net/browse/XIVY-6184) Do not show text provided in request uri in error pages <span class="badge badge-pill badge-success">security</span>
* [XIVY-6233](https://axonivy.atlassian.net/browse/XIVY-6233) Process editor preview in Preferences page does not show any elements 
* [XIVY-6234](https://axonivy.atlassian.net/browse/XIVY-6234) JSessionId encoded in redirect URL if application home is requested <span class="badge badge-pill badge-success">security</span>
* [XIVY-6239](https://axonivy.atlassian.net/browse/XIVY-6239) Scrolling in process editor is extreme slow when using mouse wheel 
* [XIVY-6247](https://axonivy.atlassian.net/browse/XIVY-6247) deploy.options.yaml as part of an ivy project (iar) is not considered 
* [XIVY-6284](https://axonivy.atlassian.net/browse/XIVY-6284) Common java package prefixes are not displayed in Axon Ivy Projects in flat package presentation 
* [XIVY-6285](https://axonivy.atlassian.net/browse/XIVY-6285) Timeout while activating PMV during deployment 
* [XIVY-6302](https://axonivy.atlassian.net/browse/XIVY-6302) Session Pollution (Memory Leak) in HTML Dialogs  
* [XIVY-6303](https://axonivy.atlassian.net/browse/XIVY-6303) Unreadable deploy.options.yaml (no read rights) is deleted but not considered 
* [XIVY-6323](https://axonivy.atlassian.net/browse/XIVY-6323) NPE when using non standard decorator icon in process template 
* [XIVY-6358](https://axonivy.atlassian.net/browse/XIVY-6358) Webservice input parameter mapping omits top-level type 
* [XIVY-6366](https://axonivy.atlassian.net/browse/XIVY-6366) Global Variables list does not get updated in Cockpit after change when filtered 
* [XIVY-6375](https://axonivy.atlassian.net/browse/XIVY-6375) NPE when copying a Rest, WS or DB Call element 
* [XIVY-6382](https://axonivy.atlassian.net/browse/XIVY-6382) Can't use OpenAPI inscription of ivy-generated openapi.json 
* [XIVY-6393](https://axonivy.atlassian.net/browse/XIVY-6393) DB Inscription connection is broken 
* [XIVY-6405](https://axonivy.atlassian.net/browse/XIVY-6405) Slow process engine execution because of thread context logging 
* [XIVY-6438](https://axonivy.atlassian.net/browse/XIVY-6438) Console output when migrating an Axon Ivy Engine 
* [XIVY-6439](https://axonivy.atlassian.net/browse/XIVY-6439) Migrating CXF web service clients of an running Axon Ivy Engine  
* [XIVY-6447](https://axonivy.atlassian.net/browse/XIVY-6447) Write password properties encrypted to app.yaml 
* [XIVY-6487](https://axonivy.atlassian.net/browse/XIVY-6487) Rest yaml project conversion is broken for multiple environments 
* [XIVY-6513](https://axonivy.atlassian.net/browse/XIVY-6513) Formats from a migrated engine with legacy projects won't work 
* [XIVY-6564](https://axonivy.atlassian.net/browse/XIVY-6564) Be compliant with Jdbc Connection and Statement specification 
* [XIVY-6601](https://axonivy.atlassian.net/browse/XIVY-6601) M2E NPE after Updating IAR with MavenLibs 
* [XIVY-6602](https://axonivy.atlassian.net/browse/XIVY-6602) NPE after importing connectivityDemos+Test from Ivy-Samples wizard. 
* [XIVY-6607](https://axonivy.atlassian.net/browse/XIVY-6607) Improve Documents API performance if the creator/modifing user does not exist 
* [XIVY-6629](https://axonivy.atlassian.net/browse/XIVY-6629) Engine Cockpit: Duplicated Permissions strange grant/deny behavior 
* [XIVY-6632](https://axonivy.atlassian.net/browse/XIVY-6632) Engine Cockpit: Configs are not correctly updated if search is active 
* [XIVY-6633](https://axonivy.atlassian.net/browse/XIVY-6633) Fix InvalidPathException when loading generic Type 
* [XIVY-6650](https://axonivy.atlassian.net/browse/XIVY-6650) REST Client with Apache Connector can not send POST requests because Content-length is not set 
* [XIVY-6651](https://axonivy.atlassian.net/browse/XIVY-6651) Case or task name is too long when using Oracle as system database 
* [XIVY-6662](https://axonivy.atlassian.net/browse/XIVY-6662) Primeface Text Editor requires HTML Sanitizer 
* [XIVY-6663](https://axonivy.atlassian.net/browse/XIVY-6663) German and French locales are missing for different Primefaces components like Datepicker 
* [XIVY-6675](https://axonivy.atlassian.net/browse/XIVY-6675)  Integrity constraint violation exception when setting custom field 
* [XIVY-6676](https://axonivy.atlassian.net/browse/XIVY-6676) Designer crash after NPE in Process Editor on macOS 
* [XIVY-6690](https://axonivy.atlassian.net/browse/XIVY-6690) Cannot set process element icons with spaces in the image file name 
* [XIVY-6708](https://axonivy.atlassian.net/browse/XIVY-6708) Javascript error in primeface datepicker (Upgrade to Primefaces 7.0.24) 
* [XIVY-6735](https://axonivy.atlassian.net/browse/XIVY-6735) Overriden HTML component does not work sometimes 
* [XIVY-6737](https://axonivy.atlassian.net/browse/XIVY-6737) Client is not correctly logged in performance log if engine is located behind a reverse proxy <span class="badge badge-pill badge-success">performance</span>
* [XIVY-6763](https://axonivy.atlassian.net/browse/XIVY-6763) RestClient cache uses deprecated feature versions 
* [XIVY-6764](https://axonivy.atlassian.net/browse/XIVY-6764) Deploy version 8 ivy project to 9.3 engine throws an NPE 
* [XIVY-6766](https://axonivy.atlassian.net/browse/XIVY-6766) Property not found in EL if second char is uppercase 
* [XIVY-6805](https://axonivy.atlassian.net/browse/XIVY-6805) Help users to define variables in the variables.yaml 
* [XIVY-6806](https://axonivy.atlassian.net/browse/XIVY-6806) Override Definitions Dialog blocks UI 
* [XIVY-6814](https://axonivy.atlassian.net/browse/XIVY-6814) CXF Endpoint cache has periodically cache misses which leads to bad performance 
* [XIVY-6824](https://axonivy.atlassian.net/browse/XIVY-6824) DocFactory isFormatSupported wrong result if format starts with dot. 
* [XIVY-6832](https://axonivy.atlassian.net/browse/XIVY-6832) Developer user may execute system task in Designer if task list is skipped 
* [XIVY-6861](https://axonivy.atlassian.net/browse/XIVY-6861) CMS editor should not be override aware 
* [XIVY-6927](https://axonivy.atlassian.net/browse/XIVY-6927) Can not create test project when test project is under a module project 
* [XIVY-6941](https://axonivy.atlassian.net/browse/XIVY-6941) IvyProcessTest is failing with error "Could not resolve required dependencies" 
* [XIVY-6942](https://axonivy.atlassian.net/browse/XIVY-6942) Remove macro expansion support in RTF files 
* [XIVY-6945](https://axonivy.atlassian.net/browse/XIVY-6945) Role members of roles are not deployed correctly on Designer 
* [XIVY-6948](https://axonivy.atlassian.net/browse/XIVY-6948) Can not create rest client on windows with no internet connection sometimes 
* [XIVY-6975](https://axonivy.atlassian.net/browse/XIVY-6975) Custom BpmError message is ignored in Rest Client response code 
* [IVYPORTAL-12006](https://axonivy.atlassian.net/browse/IVYPORTAL-12006) Clean process filter after switching mode 
* [IVYPORTAL-12077](https://axonivy.atlassian.net/browse/IVYPORTAL-12077) Changed portal start - Empty Page after clicking on Show More Link 
* [IVYPORTAL-12085](https://axonivy.atlassian.net/browse/IVYPORTAL-12085) Related Business Case not visible on Technical Case level 
* [IVYPORTAL-12096](https://axonivy.atlassian.net/browse/IVYPORTAL-12096) Empty page is displayed when user opens case information in IFrame 
* [IVYPORTAL-12148](https://axonivy.atlassian.net/browse/IVYPORTAL-12148) Detect date pattern by browser locale with Type DEFAULT 
* [IVYPORTAL-12199](https://axonivy.atlassian.net/browse/IVYPORTAL-12199) History of case details does not include all DONE tasks 
* [IVYPORTAL-12369](https://axonivy.atlassian.net/browse/IVYPORTAL-12369) Configuring Error page does not work 
* [IVYPORTAL-12386](https://axonivy.atlassian.net/browse/IVYPORTAL-12386) Update doc for Process More Information 
* [IVYPORTAL-12403](https://axonivy.atlassian.net/browse/IVYPORTAL-12403) Drilldown, Go to task list of Task By Expiry chart does not work in Drilldown page 
* [IVYPORTAL-12408](https://axonivy.atlassian.net/browse/IVYPORTAL-12408) Add example for customizing CaseDetails, TaskDetails page 
* [IVYPORTAL-12417](https://axonivy.atlassian.net/browse/IVYPORTAL-12417) Fix for Html Dialog Session Polution (Memory Leak) 
* [IVYPORTAL-12467](https://axonivy.atlassian.net/browse/IVYPORTAL-12467) Update doc for customizing TaskWidget on defaultColumns 
* [IVYPORTAL-12478](https://axonivy.atlassian.net/browse/IVYPORTAL-12478) Implement script/virus check for the Express Management 
* [IVYPORTAL-12481](https://axonivy.atlassian.net/browse/IVYPORTAL-12481) Enhance the ShowProcessOverview link in the CaseInformation dialog 
* [IVYPORTAL-12483](https://axonivy.atlassian.net/browse/IVYPORTAL-12483) TagException on ErrorPage.xhtml - Missing required attribute 'pfException' 
* [IVYPORTAL-12546](https://axonivy.atlassian.net/browse/IVYPORTAL-12546) Homepage selection always open PortalTemplate components 
* [IVYPORTAL-12603](https://axonivy.atlassian.net/browse/IVYPORTAL-12603) Fix recursion iframe for Portal error page 
* [IVYPORTAL-12742](https://axonivy.atlassian.net/browse/IVYPORTAL-12742) Ticket #94665 "Portal 8.0.18 - unhandled FacesMessages" 
* [IVYPORTAL-12834](https://axonivy.atlassian.net/browse/IVYPORTAL-12834) Add SNAPSHOT plugin repository to pom files of Portal projects 
* [IVYPORTAL-12835](https://axonivy.atlassian.net/browse/IVYPORTAL-12835) Portal Case/Task category different with Ivy 
* [IVYPORTAL-12846](https://axonivy.atlassian.net/browse/IVYPORTAL-12846) Calendar set year 1970 when hide year in Settings is set to true 
* [IVYPORTAL-12854](https://axonivy.atlassian.net/browse/IVYPORTAL-12854) Portal Global Ajax Exception Handler does not work correctly 