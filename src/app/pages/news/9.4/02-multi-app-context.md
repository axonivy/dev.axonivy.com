## Multi applications per security context {#multiApp}

Axon Ivy applications no longer impose hard boundaries on each other. Applications are part of a security system in which users and roles live. This enables independent feature-driven development.

- __Feature Driven Development__: It is no longer necessary to pack everything into one application and have a risk of clumping. Different sub-applications can be developed in independent applications and still have the same user and role base.

- __Independent release cycles__: By splitting your application into multiple applications, you can develop each application independently and maintain an independent release cycle.

- __Standalone Portal__: The portal no longer needs to be part of your application. Run the portal in its own application and integrate your business processes using the iFrame approach and keep the portal up-2-date and leave all migration pain 
behind.

- __Multi Tenancy__: For multi-tenancy, we strongly recommend to run a separate Axon Ivy Engine per tenant and to orchestrate this in a container platform. If you want to run multi-tenancy on one engine, then we recommend one security system per tenant and run them in independent applications.


<div class="short-links">
	<a href="${docBaseUrl}/concepts/application-lifecycle/index.html" target="_blank" rel="noopener noreferrer">
	  <i class="si si-check"></i> Application Lifecycle
	</a>

	<a href="${docBaseUrl}/concepts/multi-tenancy/index.html" target="_blank" rel="noopener noreferrer">
	  <i class="si si-check"></i> Multi Tenancy
	</a>
</div>
