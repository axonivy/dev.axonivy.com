## Bug Fixes {#bugfixes}

* [XIVY-3394](https://axon-ivy.atlassian.net/browse/XIVY-3394) Deadlock in Java Editor with Content Assist 
* [XIVY-9195](https://axon-ivy.atlassian.net/browse/XIVY-9195) Sometimes 404 for different pages in engine cockpit 
* [XIVY-9208](https://axon-ivy.atlassian.net/browse/XIVY-9208) SubProcessCall via REST does not allow Overrides 
* [XIVY-9241](https://axon-ivy.atlassian.net/browse/XIVY-9241) Engine Cockpit Yaml Editor Ctrl+Space sometimes not show up 
* [XIVY-9271](https://axon-ivy.atlassian.net/browse/XIVY-9271) Creating a security system with illegal names in engine cockpit is possible (e.g. ?) 
* [XIVY-9320](https://axon-ivy.atlassian.net/browse/XIVY-9320) Embedded Sub start and end should display the connected element 
* [XIVY-9348](https://axon-ivy.atlassian.net/browse/XIVY-9348) Sometimes save does not work in new process editor 
* [XIVY-9392](https://axon-ivy.atlassian.net/browse/XIVY-9392) Browser caches Engine process viewer too hard 
* [XIVY-9398](https://axon-ivy.atlassian.net/browse/XIVY-9398) project-build-plugin validation fails to use m2 deps 
* [XIVY-9401](https://axon-ivy.atlassian.net/browse/XIVY-9401) Update Designer quick start tutorial (some texts still refers to old process editor) 
* [XIVY-9402](https://axon-ivy.atlassian.net/browse/XIVY-9402) Fix Designer help button (F1) issues 
* [XIVY-9403](https://axon-ivy.atlassian.net/browse/XIVY-9403) Rename HtmlDialog: references are not updated 
* [XIVY-9406](https://axon-ivy.atlassian.net/browse/XIVY-9406) SSL Client Preferences: Enable insecure SSL requires designer restart 
* [XIVY-9407](https://axon-ivy.atlassian.net/browse/XIVY-9407) Designer Overrides open replacement causes editor error 
* [XIVY-9408](https://axon-ivy.atlassian.net/browse/XIVY-9408) Overrides Editor does not show overridden content objects 
* [XIVY-9437](https://axon-ivy.atlassian.net/browse/XIVY-9437) Opening the Html Dialog Editor fails with a NPE when building palette entries 
* [XIVY-9438](https://axon-ivy.atlassian.net/browse/XIVY-9438) PMV cache cleaner job fails with a NullPointerException 
* [XIVY-9453](https://axon-ivy.atlassian.net/browse/XIVY-9453) Eclipse workspace blocked after changing files manually 
* [XIVY-9459](https://axon-ivy.atlassian.net/browse/XIVY-9459) Workflow-Demos: Procurement flow - request log is always empty 
* [XIVY-9460](https://axon-ivy.atlassian.net/browse/XIVY-9460) EndPage can not handle backward slashes when xhtml view is selected 
* [XIVY-9462](https://axon-ivy.atlassian.net/browse/XIVY-9462) After login via Azure AD: the session in the portal application seems not to be authenticated 
* [XIVY-9467](https://axon-ivy.atlassian.net/browse/XIVY-9467) Primefaces widgets calendar and datePicker do not work under Linux sometimes 
* [XIVY-9471](https://axon-ivy.atlassian.net/browse/XIVY-9471) Don't migrate non existing role mappings from db to ivy.yaml 
* [XIVY-9508](https://axon-ivy.atlassian.net/browse/XIVY-9508) Market installer fails: as mavenizer already supplied dependency 
* [XIVY-9512](https://axon-ivy.atlassian.net/browse/XIVY-9512) Project Conversion is offered and runnable for IvyArchive projects 
* [XIVY-9515](https://axon-ivy.atlassian.net/browse/XIVY-9515) Security System Detail page in engine cockpit shows Azure Active Directory instead of ivy Security System when no provider is configured in ivy.yaml 
* [XIVY-9516](https://axon-ivy.atlassian.net/browse/XIVY-9516) When changing identity provider in engine cockpit it removes all settings according to the security system 
* [XIVY-9518](https://axon-ivy.atlassian.net/browse/XIVY-9518) Font Awesome Icons are not working in dev workflow-ui if the root is blocked 
* [XIVY-9520](https://axon-ivy.atlassian.net/browse/XIVY-9520) Rename "Connectors" in process editor palette to "Extensions" 
* [XIVY-9521](https://axon-ivy.atlassian.net/browse/XIVY-9521) Users synchronized from Azure Active Directory won't get disabled if they do not exist anymore 
* [XIVY-9522](https://axon-ivy.atlassian.net/browse/XIVY-9522) Engine Cockpit can not handle usernames with # 
* [XIVY-9523](https://axon-ivy.atlassian.net/browse/XIVY-9523) Migration of an App with an external Security System goes wrong 
* [XIVY-9534](https://axon-ivy.atlassian.net/browse/XIVY-9534) IRole#createChildRole creates new role always at top level 
* [XIVY-9544](https://axon-ivy.atlassian.net/browse/XIVY-9544) Execution in designer is slowed down by invisible animation in the background 
* [XIVY-9545](https://axon-ivy.atlassian.net/browse/XIVY-9545) NPE: Cannot invoke "WorkflowProcessModelVersion.getName()" because "pmv" is null 
* [XIVY-9546](https://axon-ivy.atlassian.net/browse/XIVY-9546) Create new ProjectConversion for updating project-build-plugin using EngineConfigCLI 
* [XIVY-9547](https://axon-ivy.atlassian.net/browse/XIVY-9547) Design-Time Classpath duplicates libraries from dependent IAR projects 
* [XIVY-9548](https://axon-ivy.atlassian.net/browse/XIVY-9548) New Process Editor: Wrap into subprocess not possible for single activity 
* [XIVY-9549](https://axon-ivy.atlassian.net/browse/XIVY-9549) New Process Editor: Wrap into subprocess error 
* [XIVY-9550](https://axon-ivy.atlassian.net/browse/XIVY-9550) ELException: Error reading caseMap on type CasesDetailsIvyDevWfBean 
* [XIVY-9556](https://axon-ivy.atlassian.net/browse/XIVY-9556) Process editor command "Fit to screen" truncates head of model 
* [XIVY-9558](https://axon-ivy.atlassian.net/browse/XIVY-9558) Can create role in security context A with parent in security context B (by API) 
* [XIVY-9561](https://axon-ivy.atlassian.net/browse/XIVY-9561) DocFactory subprocess is not converted correctly 
* [XIVY-9562](https://axon-ivy.atlassian.net/browse/XIVY-9562) Designer workspace is locked through concurrent refresh operations 
* [XIVY-9563](https://axon-ivy.atlassian.net/browse/XIVY-9563) New Process Group Wizard broken in empty GIT project 
* [XIVY-9578](https://axon-ivy.atlassian.net/browse/XIVY-9578) (Mac) SSL Client Preferences: default key/truststore files do not exist 
* [XIVY-9585](https://axon-ivy.atlassian.net/browse/XIVY-9585) Mail steps do not properly migrate html mails when content comes from cms 
* [XIVY-9587](https://axon-ivy.atlassian.net/browse/XIVY-9587) ivy.cms.getContentObjectValue() no longer fallbacks to default value 
* [XIVY-9589](https://axon-ivy.atlassian.net/browse/XIVY-9589) New process editor: color menu edit out of button if color name is big 
* [XIVY-9590](https://axon-ivy.atlassian.net/browse/XIVY-9590) Dev-Wf-Ui theme switch causes browser console log 
* [XIVY-9594](https://axon-ivy.atlassian.net/browse/XIVY-9594) WebEditor missing freya style 
* [XIVY-9595](https://axon-ivy.atlassian.net/browse/XIVY-9595) Doc: Fix links to tools-reference (renamed to reference) 
* [XIVY-9599](https://axon-ivy.atlassian.net/browse/XIVY-9599) Streamline Theme mode of WF-UI with Process Viewer 
* [XIVY-9600](https://axon-ivy.atlassian.net/browse/XIVY-9600) Designer at times not able to start due to Plugin-Activation failures 
* [XIVY-9602](https://axon-ivy.atlassian.net/browse/XIVY-9602) Deletion of Security System in the Engine Cockpit causes error 
* [XIVY-9608](https://axon-ivy.atlassian.net/browse/XIVY-9608) Stop Threads of the process editor on closing 
* [XIVY-9610](https://axon-ivy.atlassian.net/browse/XIVY-9610) Wrap to subprocess: Ugly gate/waypoint positions 
* [XIVY-9612](https://axon-ivy.atlassian.net/browse/XIVY-9612) Primefaces attribute renaming during project conversion may not work if tag contains spaces before > 
* [XIVY-9624](https://axon-ivy.atlassian.net/browse/XIVY-9624) Engine Cockpit: Show running spinner while deployment 
* [XIVY-9626](https://axon-ivy.atlassian.net/browse/XIVY-9626) project-build-plugin must not automatically migrate projects during build 
* [XIVY-9627](https://axon-ivy.atlassian.net/browse/XIVY-9627) Freya Theme: Scrollbars in Chrome/Edge are always light 
* [XIVY-9628](https://axon-ivy.atlassian.net/browse/XIVY-9628) New process editor: copy to negative area is possible 
* [XIVY-9662](https://axon-ivy.atlassian.net/browse/XIVY-9662) cms.getSupportedLanguages() returns empty locale 
* [XIVY-9713](https://axon-ivy.atlassian.net/browse/XIVY-9713) Labels are positioned somewhere after a BPMN import 
* [XIVY-9716](https://axon-ivy.atlassian.net/browse/XIVY-9716) Process Editor is not always showing up the Quick-Action Bar 
* [XIVY-9738](https://axon-ivy.atlassian.net/browse/XIVY-9738) Can not convert some process mod files to json 
* [XIVY-9739](https://axon-ivy.atlassian.net/browse/XIVY-9739) Don't associated mod and json files with new process editor 
* [XIVY-9740](https://axon-ivy.atlassian.net/browse/XIVY-9740) No error in conversion log when a process could not be converted to json 
* [XIVY-9751](https://axon-ivy.atlassian.net/browse/XIVY-9751) Dialog Editor can not handle dialog components 
* [XIVY-9756](https://axon-ivy.atlassian.net/browse/XIVY-9756) Warning in ivy.log when Process Editor in External Browser is closed 
* [XIVY-9770](https://axon-ivy.atlassian.net/browse/XIVY-9770) Superfluous log warnings in designer "no validator for label-edit" 
* [XIVY-9772](https://axon-ivy.atlassian.net/browse/XIVY-9772) Import in cms from URL does not work 
* [IVYPORTAL-14328](https://axon-ivy.atlassian.net/browse/IVYPORTAL-14328) Error when adding a welcome widget to private dashboard 
* [IVYPORTAL-14349](https://axon-ivy.atlassian.net/browse/IVYPORTAL-14349) DateUtils throw exception when using MySQL as System-DB
