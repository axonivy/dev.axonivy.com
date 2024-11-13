## Bug Fixes {#bugfixes}

Also have a look at bug fixes for LE versions: [11.1](11.1#bugfixes), [11.2](11.2#bugfixes), and [11.3](11.3#bugfixes)

* [XIVY-2892](https://1ivy.atlassian.net/browse/XIVY-2892) Process from LOCKED ProcessModelVersion can be started 
* [XIVY-10025](https://1ivy.atlassian.net/browse/XIVY-10025) Inherited REST-Client icons are duplicated into the JSON process model 
* [XIVY-13308](https://1ivy.atlassian.net/browse/XIVY-13308) Improve application view and deletion of App, PM, PMV in Engine Cockpit 
* [XIVY-13563](https://1ivy.atlassian.net/browse/XIVY-13563) Quick Action Menu Popup opens outside of process editor window border and cannot be used 
* [XIVY-13716](https://1ivy.atlassian.net/browse/XIVY-13716) Attributes and methods of super class or interfaces not shown in JSF code completion 
* [XIVY-13757](https://1ivy.atlassian.net/browse/XIVY-13757) Microsoft SMTP service throws concurrent connections limit exceeded 
* [XIVY-13778](https://1ivy.atlassian.net/browse/XIVY-13778) IvyScript field lookup fails if child and parent class have field with same name 
* [XIVY-13890](https://1ivy.atlassian.net/browse/XIVY-13890) Engine sometimes can not start because of ConcurrentHashMap recursive update 
* [XIVY-13977](https://1ivy.atlassian.net/browse/XIVY-13977) Engine Cockpit user gravatar images broken if no-internet-connection or gravatar blocked 
* [XIVY-13984](https://1ivy.atlassian.net/browse/XIVY-13984) Fix wrong URL for openapi.json in Designer in the documentation 
* [XIVY-13991](https://1ivy.atlassian.net/browse/XIVY-13991) Tasks are sometimes not joined 
* [XIVY-14020](https://1ivy.atlassian.net/browse/XIVY-14020) Rules cannot be run via IvyTest in the Designer 
* [XIVY-14021](https://1ivy.atlassian.net/browse/XIVY-14021) Type-search in the Web-IDE does not work 
* [XIVY-14033](https://1ivy.atlassian.net/browse/XIVY-14033) Copy configuration files does only copy a subset of configuration 
* [XIVY-14075](https://1ivy.atlassian.net/browse/XIVY-14075) File uploaded with p:fileUpload cannot be mapped to nested process data 
* [XIVY-14101](https://1ivy.atlassian.net/browse/XIVY-14101) Deadlock after BPMN export 
* [XIVY-14112](https://1ivy.atlassian.net/browse/XIVY-14112) Deadlock after open many projects 
* [XIVY-14120](https://1ivy.atlassian.net/browse/XIVY-14120) Process Debugging unable to step into "overridden" process 
* [XIVY-14132](https://1ivy.atlassian.net/browse/XIVY-14132) CaseMap deployment validation does not check for missing stages or missing processes 
* [XIVY-14148](https://1ivy.atlassian.net/browse/XIVY-14148) Whitespace problem with EngineConfigCli 
* [XIVY-14149](https://1ivy.atlassian.net/browse/XIVY-14149) CMS copy of deep trees is not working reliably 
* [XIVY-14150](https://1ivy.atlassian.net/browse/XIVY-14150) CMS copy & paste of large, shallow structure results in NPE 
* [XIVY-14187](https://1ivy.atlassian.net/browse/XIVY-14187) Set Ivy-Context-Environment for "Persistence Configuration Editor" before Generate Schema 
* [XIVY-14192](https://1ivy.atlassian.net/browse/XIVY-14192) Process Viewer allows editing of the model resulting in errors 
* [XIVY-14204](https://1ivy.atlassian.net/browse/XIVY-14204) NPE in Database Inscription Mask 
* [XIVY-14214](https://1ivy.atlassian.net/browse/XIVY-14214) Eclipse Market place does not work 
* [XIVY-14247](https://1ivy.atlassian.net/browse/XIVY-14247) Don't synch user when login with Azure Entra ID and UserSynch.OnLogin is disabled <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-14251](https://1ivy.atlassian.net/browse/XIVY-14251) When showing web notifications a user gets synchronized with the identity provider <span class="badge badge-pill badge-success badge-security">security</span>
* [XIVY-14257](https://1ivy.atlassian.net/browse/XIVY-14257) Renaming a CMS folder takes forever 
* [XIVY-14274](https://1ivy.atlassian.net/browse/XIVY-14274) Process SVG export broken 
* [XIVY-14365](https://1ivy.atlassian.net/browse/XIVY-14365) java.lang.RuntimeException in workflow statistic API if you have a case with category "Procurement/Request" 
* [XIVY-14382](https://1ivy.atlassian.net/browse/XIVY-14382) Autocomplete overwrites search input of tables in Engine Cockpit 
* [XIVY-14397](https://1ivy.atlassian.net/browse/XIVY-14397) File#makePersistent fails if directory structure does not exist 
* [XIVY-14414](https://1ivy.atlassian.net/browse/XIVY-14414) NPE when directly navigating to /demo-portal/starts after starting Axon Ivy Engine 
* [XIVY-14415](https://1ivy.atlassian.net/browse/XIVY-14415) Slow Designer and deployment due to frequent application configuration reloads <span class="badge badge-pill badge-success badge-performance">performance</span>
* [XIVY-14430](https://1ivy.atlassian.net/browse/XIVY-14430) Process Editor: colorized connectors are not showing the execution state 
* [XIVY-14437](https://1ivy.atlassian.net/browse/XIVY-14437) Siblings during variables.yaml conversion are not created correctly 
* [XIVY-14510](https://1ivy.atlassian.net/browse/XIVY-14510) Engine Cockpit: Language and Formatting Language settings 
* [XIVY-14525](https://1ivy.atlassian.net/browse/XIVY-14525) Eclipse workspace occasionally blocked after installing Market product 
* [XIVY-14542](https://1ivy.atlassian.net/browse/XIVY-14542) WebService processes are not animated with the new process editor 
* [XIVY-14585](https://1ivy.atlassian.net/browse/XIVY-14585) Memory leak in persistency association caches for empty associations 
* [XIVY-14655](https://1ivy.atlassian.net/browse/XIVY-14655) Microsoft IIS script is broken: Enable Proxy does not work 
* [XIVY-14667](https://1ivy.atlassian.net/browse/XIVY-14667) Primefaces Datepicker throws runtime exception on invalid-date inputs 
* [XIVY-14729](https://1ivy.atlassian.net/browse/XIVY-14729) Reconnect connection from web editors to backend after OS hibernation 
* [XIVY-14786](https://1ivy.atlassian.net/browse/XIVY-14786) Data classes are duplicated during data class to JSON conversion on windows 
* [XIVY-14795](https://1ivy.atlassian.net/browse/XIVY-14795) Variables without a value in `variables.yaml` are changed to `"null"` when saving with the Variables Editor 
* [XIVY-14798](https://1ivy.atlassian.net/browse/XIVY-14798) No false positive problems after removing the expiry error handler of a UserTask 
* [XIVY-14799](https://1ivy.atlassian.net/browse/XIVY-14799) Content of disabled fields is not selectable for copy/paste 
* [XIVY-14845](https://1ivy.atlassian.net/browse/XIVY-14845) Fix dev-wf-ui tasks and cases search and ordering  
* [XIVY-14856](https://1ivy.atlassian.net/browse/XIVY-14856) persistence.xml conversion fails if it includes umlauts on windows 
* [XIVY-14953](https://1ivy.atlassian.net/browse/XIVY-14953) UX of Monitor/OS view in the Cockpit 
* [XIVY-14992](https://1ivy.atlassian.net/browse/XIVY-14992) Jump into does not work with Process Viewer if the target is in a dependent project 
* [XIVY-15025](https://1ivy.atlassian.net/browse/XIVY-15025) Variable and Dataclass editors: making a change in an input field moves the cursor to the end of the input 
* [XIVY-15030](https://1ivy.atlassian.net/browse/XIVY-15030) Can not start process start which is not shown on start list out of the process editor 
* [XIVY-15135](https://1ivy.atlassian.net/browse/XIVY-15135) Thread safe loading of Process standard module 
* [XIVY-15151](https://1ivy.atlassian.net/browse/XIVY-15151) Show problems of elements in embedded sub-process on parent activity 
* [XIVY-15153](https://1ivy.atlassian.net/browse/XIVY-15153) copy/paste shortcuts do not work in monaco editor 
* [XIVY-15166](https://1ivy.atlassian.net/browse/XIVY-15166) Renaming wording Elastic Search to Search Engine in the documentation 
* [XIVY-15167](https://1ivy.atlassian.net/browse/XIVY-15167) Forms are not build after changes in the data class or logic in Neo 
* [XIVY-15197](https://1ivy.atlassian.net/browse/XIVY-15197) No longer list all Records in javadoc of public api 
* [XIVY-15265](https://1ivy.atlassian.net/browse/XIVY-15265) ivy.var does not work after importing an existing Axon Ivy Project 
* [XIVY-15284](https://1ivy.atlassian.net/browse/XIVY-15284) Form Editor validation problem: false positiv 
* [XIVY-15292](https://1ivy.atlassian.net/browse/XIVY-15292) Data Class is not build after modification in Neo 
* [XIVY-15332](https://1ivy.atlassian.net/browse/XIVY-15332) Fix small issues for the release 
* [XIVY-15411](https://1ivy.atlassian.net/browse/XIVY-15411) Force delete of the process model in Engine Cockpit does not work 
* [IVYPORTAL-16400](https://1ivy.atlassian.net/browse/IVYPORTAL-16400) Customize Global Growl Message doesn't work 
* [IVYPORTAL-16411](https://1ivy.atlassian.net/browse/IVYPORTAL-16411) Performance issue when filtering a list users by role 
* [IVYPORTAL-16646](https://1ivy.atlassian.net/browse/IVYPORTAL-16646) [ASK PO TO RESOLVE] Portal LE: Custom additional Case details page point to old Ivy-8 instance 
* [IVYPORTAL-16925](https://1ivy.atlassian.net/browse/IVYPORTAL-16925) Welcome widget does not show image when configured as Base64 in dashboard JSON  
* [IVYPORTAL-17122](https://1ivy.atlassian.net/browse/IVYPORTAL-17122) Back button in Case details issue 
* [IVYPORTAL-17182](https://1ivy.atlassian.net/browse/IVYPORTAL-17182) Session times out silently for LE 
* [IVYPORTAL-17185](https://1ivy.atlassian.net/browse/IVYPORTAL-17185) Handle versions for dashboard, dashboard template JSON files 
* [IVYPORTAL-17273](https://1ivy.atlassian.net/browse/IVYPORTAL-17273) Manipulate expiry in task detail in portal doesn't produce correct behaviour 
* [IVYPORTAL-17358](https://1ivy.atlassian.net/browse/IVYPORTAL-17358) [ANSWERED - WAIT CLIENT] Process chain doesn't render correctly with special characters 
* [IVYPORTAL-17391](https://1ivy.atlassian.net/browse/IVYPORTAL-17391) Wrong language message after session is killed  
* [IVYPORTAL-17405](https://1ivy.atlassian.net/browse/IVYPORTAL-17405) Wrong translation in Portal 
* [IVYPORTAL-17408](https://1ivy.atlassian.net/browse/IVYPORTAL-17408) DB query for filter in task/case widget is executed 3 times 
* [IVYPORTAL-17535](https://1ivy.atlassian.net/browse/IVYPORTAL-17535) Focus on the search icon + pressing enter not working 
* [IVYPORTAL-17553](https://1ivy.atlassian.net/browse/IVYPORTAL-17553) TaskWriteExpiryTimestamp does not work as expected 
* [IVYPORTAL-17567](https://1ivy.atlassian.net/browse/IVYPORTAL-17567) Homepage Selection leads to empty Page with misleading error log message 
* [IVYPORTAL-17763](https://1ivy.atlassian.net/browse/IVYPORTAL-17763) Display Case custom field on Task widget 