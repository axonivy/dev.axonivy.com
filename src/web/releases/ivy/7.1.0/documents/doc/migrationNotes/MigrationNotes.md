# Migration Notes for 7.x

----

## Migrating from 7.0 to 7.1

### Removed Libraries from Project Classpath
Some libraries have been removed from the project class path and are no longer available to the Ivy project. If you still need them, you can add them manually to the Ivy project. There is one big advantage: You can now use it in the version you need. It concerns the following libraries:

* Lucene: `lucene-core-4.5.1.jar`, `lucene-analyzers-common-4.5.1.jar`, `lucene-queryparser-4.5.1.jar`
* JGroups: `jgroups-3.3.4.Final.jar`
* Freemarker: `freemarker-2.3.23.jar`
* Spring Security Crypto: `spring-security-crypto-4.2.3.RELEASE.jar`
* DB Libraries: `ecs-1.4.2.jar`, `hsqldb-1.8.0.10.jar`, `jt400-7.3.0.3.jar`, `jtds-1.3.1.jar`, `mysql-connector-java-5.1.42.jar`, `ojdbc8-12.2.0.1.jar`, `postgresql-42.1.3.jar`, `mssql-jdbc-6.2.1.jre8.jar`

### Library upgrades
* Upgraded Tomcat to version 8.5.29
* Upgraded Apache CXF (used by Web Service Processes and CXF Web Service Clients) to version 3.2.2
* Upgraded all Java libraries to its latest maintenance release (Guava, Apache Commons, Jackson, JDBC Drivers, ...)

### REST services: CSRF-protection now enabled by default
CSRF-protection is now enabled by default on all REST services provided by ivy (including services provided by the mobile workflow API and services provided by custom ivy projects).

To call a modifying REST service via `PUT`, `POST` or `DELETE` the caller needs to provide a HTTP Header called `X-Requested-By` with any value e.g. ivy. This is the Jersey provided protection of REST services against cross-site request forgery (CSRF). If the CSRF header is not provided on a modifying REST request the request will fail with an HTTP Status `400` (Bad Request).
Custom REST services via `GET`, `HEAD` or `OPTIONS` should therefore be implemented in a way that they don't modify data.

The CSRF protection for REST services can be server-wide disabled by setting the system property `WebServer.REST.CSRF.Protection` to false. However, that is not recommended.


### The engine operates with packed projects
The engine is now able to execute projects in packed zip or iar files. 
If you deploy a new project to the engine, the new Process Model Versions will now contain a packed file instead of an expanded project directory by default. 

Already deployed projects keep their expanded directory format.

##### Read-only projects
The packed projects are read-only projects. So if you try to change the contents of such a project at runtime it will fail with a `java.nio.file.ReadOnlyFileSystemException`.

##### Get write access
If write access is necessary, for instance because the `ivy.cms` write API is used, the related project must be made writable. This can be done by deploying the project as an expanded project:

* with the maven `project-build-plugin`, the configuration parameter <a href="http://axonivy.github.io/project-build-plugin/snapshot/7.1/deploy-to-engine-mojo.html#deployTargetFileFormat">deployTargetFileFormat</a> must be set to `EXPANDED`. 
* with the `deploy` directory, it can be enforced by providing an `options.yaml` file with the following content
<pre><code>target
  fileFormat : EXPANDED</code></pre>
* with the Admin UI, the deployment wizard will always expand directories. 
 

### IvyAddOns split into multiple projects
If your project depends on IvyAddOns we recommend that you migrate to the latest IvyAddOns.
However, the IvyAddOns Project that was delivered with earlier versions of the Axon.ivy Designer has been split into multiple projects:

* IvyAddOnsCommons  (ch.ivyteam.ivy.addons:commons) - Provides WaitForAsyncProcess, ResourceHelper, EnvironmentHelper, WaitTillLastTaskOfCase, ProcessParameter, QRCode, Sudo, ...
* DocFactory (ch.ivyteam.ivy.addons:doc-factory) - Provides Aspose DocFactory to create Word, PDF, Excel, Powerpoint documents
* FileManagerApi (ch.ivyteam.ivy.addons:file-manager-api) Provides an extended file manager API
* IvyAddOns (ch.ivyteam.ivy.addons:ch.ivyteam.ivy.addons) Empty facade project that depends on IvyAddOnsCommons, DocFactory and FileManagerApi. For backwards compatibility of old projects that depend on IvyAddOns.
* IvyAddOnsRichDialog (ch.ivyteam.ivy.addons:rich-dialog)- Provides all the functionality for Rich Dialogs like: File Manager, Dynamic Dialogs, Event Log, ...

With the latest Axon.ivy Designer we only deliver the DocFactory project. If your project only needs DocFactory features simple remove the IvyAddOns dependency and add a dependency to the new DocFactory project.

If you depend on other features then contact our support to get the appropriate new projects. Now, you can remove the dependency to IvyAddOns and replace them with dependencies to the appropriate new projects.

If you do not want to change the dependencies, then download the new IvyAddOns project. This project is an empty facade project that only defines dependencies to the other new IvyAddOns projects (IvyAddOnsCommons, DocFactory and FileManagerApi).

If you need Rich Dialog features of IvyAddOns then download the new IvyAddOnsRichDialog project. This project contains all the Rich Dialog features and a dependency to the new IvyAddOns project.

The following IvyAddOns API's have been removed or moved because of the split:

* The following Html Dialog specific File Manager classes were removed:
    * `ch.ivyteam.ivy.addons.filemanager.html.configuration.HtmlConfigurationController`
    * `ch.ivyteam.ivy.addons.filemanager.html.enums.Environment`
    * `ch.ivyteam.ivy.addons.filemanager.html.thumbnailer.HtmlFileManagerThumbnailer`
* The following specific thumbnailer jars and their dependencies have been removed:
     * lib/thumbnailer/thumbnailer\_plugin_images-*.jar
     * lib/thumbnailer/thumbnailer\_plugin_mime.*.jar
     * lib/thumbnailer/thumbnailer\_plugin_msoffice.*.jar
     * lib/thumbnailer/thumbnailer\_plugin_pdf.*.jar
     * lib/thumbnailer/*.jar (dependencies)
* The already deprecated Rich Dialog specific constructors from class `ch.ivyteam.ivy.addons.docfactory.AsposeDocFactory` have been removed.
* The method `saveStringAsJavaFile` has been removed from class `ch.ivyteam.ivy.addons.filemanager.FileHandler`.
* The following methods from class `ch.ivyteam.ivy.addons.filemanager.FileHandler` has been moved to class `ch.ivyteam.ivy.addons.filemanager.RichDialogFileHandler`
If your projects use any of those methods or classes then you will get errors in the Designer and you need to fix them:
     * `upload`
     * `download`
     * `getTreePath`
     * `getSystemPropertyNames`
     * `getUserParametersNames`
     * `formatPathWithClientSeparator`
     * `getClientFileSeparator`


### Macros in Authentication Section of Web Service Call Inscription

The fields in the authentication section on the web service inscription mask are automatically converted to properties.
You were able to use macros in these fields, which will be converted to valid ivy script. There is one special case which
won't be supported anymore: Macro expansion within macro expansion. For example: The macro `<%= ivy.co("/pathInCms") %>` reads the content from the specified cms path. If there is also macro in the specified cms path, this macro will not be expanded anymore.

### Import a Xpert.ivy 3.9 is no longer possible
The support to import a Xpert.ivy 3.9 project into Axon.ivy Designer has been removed. If you need to convert a Xpert.ivy 3.9 project use Axon.ivy Designer 7.0 or earlier.

### Renew / Change the session ID after login
To prevent from the **Session Fixation**  attack Axon.ivy renews / changes the session ID after login.
If you have any trouble with it (e.g. in combination with RIA applications) you can disable this by changing the system property `WebServer.RenewSessionIdOnLogin` to `false`.
If you migrate from 7.0.4 the feature is per default disabled and also stays disabled after migration.
We highly recommend to enable this feature by changing the system property `WebServer.RenewSessionIdOnLogin` to `true`.
