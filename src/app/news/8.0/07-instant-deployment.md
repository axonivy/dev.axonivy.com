## Instant Deployment
We believe that highly automated deployments are important. Customers should be able to use the 
latest features instantly. While developers and operations need a high confidence
about the proper execution of their runtime artifacts.

That's why we extended our deployment interface:

* __Atomar__: The complete feature set of an application can be deployed at once. Just drop a zip file that contains multiple projects that belong to the same application into our engine `deploy` directory and it will be rolled-out. 
* __Controllable__: The new deployment option file gives you the chance to fine tune the deployment process. It allows to enforce configuration updates and to steer the target Process Model Version to use. Now there are no technical reasons to migrate workflow data into a new Process Model Version. 
* __Self-documented__: Deployment options can be stored in <a href="@engine.guide.url@/administration/deployment.html#advanced-deployment" target="_blank">YAML files</a> or in Maven plugin configurations. The deployment process is therefore documented, visible and reproducible in any environment. A separate documentation in a guide becomes obsolete.
* __Automated__: The deployment to the engine is steered by simple file operations. So almost any scripting environment can be used to automate deployments. 
The roll-out of a new application version should never take more effort than one click.
* __Via HTTP__: Deployment to remote engines has never been easier! Just upload your new application with one HTTP file transfer and you're done, perfect for your CI/CD environment!

<div class="short-links">
	<a href="${docBaseUrl}/engine-guide/administration/deployment.html" target="_blank">
	  <i class="fas fa-book"></i> Engine Guide
	</a>
	<a href="https://axonivy.github.io/project-build-plugin" target="_blank">
	  <i class="fas fa-book"></i> Maven Plugin
	</a>
	<a href="https://github.com/axonivy/project-build-examples" target="_blank">
	  <i class="fas fa-flask"></i> GitHub Examples
	</a>
</div>
