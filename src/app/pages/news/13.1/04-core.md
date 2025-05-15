## Core {#core}

Roles and Users Responsible for Task and Process Starts:

- **Start Roles**: you can now configuree multiple roles on a start element, allowing any of them to start the corresponding process.
- **Task Responsibles**: Tasks can now be assigned to multiple roles and users simultaneously. There's no longer a need to create temporary dynamic roles just to assign a task to multiple entities.
- **Task Lists**: Both the Portal and Developer Workflow UI now display all responsible users and roles for each task in the task list.
- **Responsibles API**: New APIs are available to manage and query the multiple roles and users assigned to tasks.
- **Performance**: The Axon Ivy System Database schema has been optimized, and the implementations of TaskQuery and CaseQuery have been improved—resulting in significantly faster query response times.

<div class="short-links">
	<a href="${docBaseUrl}/designer-guide/process-modeling/process-elements/start.html#request-tab"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-megaphone"></i> Start Roles
	</a>
</div>
<div class="short-links">
	<a href="${docBaseUrl}/designer-guide/process-modeling/process-elements/task-switch-gateway.html#tasks-tab"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-clock"></i> Task Responsible
	</a>
</div>
<div class="short-links">
	<a href="${docBaseUrl}/public-api/ch/ivyteam/ivy/workflow/task/responsible/Responsibles.html"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-clock"></i> Task Responsibles API
	</a>
</div>
