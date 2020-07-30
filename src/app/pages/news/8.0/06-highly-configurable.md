## Highly Configurable {#highly-configurable}

Successfully deploying your application in your customers environment is now easier than ever. The days of manual installations and the related chatty documentation are over!

	# sample ivy.yaml with some often used entries defined
	SystemDb:
	  Url: jdbc:mariadb://myDbHost:3306/AxonIvySystemDatabase
	  UserName: root
	  Password: 1234
	Administrators:
	  admin:
	    Password: "${hash:1234}"
	    Email: info@localhost
	  devop:
	    Password: "${hash:4321}"
	    Email: dev@axonivy.com
	EMail:
	  Server:
	  Host: smtp.gmail.com
	  Port: 25
	Frontend:
	  HostName: workflow.acme.com
	  Port: 80

 * __FILES__: The complete configuration of an Axon.ivy Engine is now stored in simple human readable `YAML` files. Now it is very easy to document the whole truth about the current engine environment within an `ivy.yaml` file. 
 * __ZERO DOCUMENTATION__: In the past you had to document the installation of an Axon.ivy Engine because certain settings (e.g. Security System) could only be configured via the Admin UI. Now you can use the `ivy.yaml` file as your system documentation.
 * __OVERRIDABLE__: Configurations are always overridable with environment variables. This is especially useful in container environments.
 * __TRACKABLE__: Configuration changes get logged, showing what has been changed and where. Besides auditing configuration changes, this can also help tracking down problems after changes.

<div class="short-links">
	<a href="${docBaseUrl}/engine-guide/configuration/" target="_blank" rel="noopener noreferrer">
	  <i class="fas fa-book"></i> Engine Guide Configuration
	</a>
	<a href="${docBaseUrl}/engine-guide/configuration/file-reference.html" target="_blank" rel="noopener noreferrer">
	  <i class="fas fa-book"></i> Configuration File Reference
	</a>
</div>
