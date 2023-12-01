## CRON expressions {#cron}

You can now configure periodical jobs by using <a href="https://en.wikipedia.org/wiki/Cron">CRON</a> expressions.
CRON expressions give you a broad spectrum of possible configurations. From once every minute to every day, week, month, or year.

- **User Synchronisation**: You can now define the time by a CRON expression, allowing synchronizations multiple times a day or only on weekends.
- **Timer Bean**: Use a CRON expression on the new Start Event Bean `ch.ivyteam.ivy.process.eventstart.beans.TimerBean` to define when your processes are started.
- **Poller API**: The definition of polling intervals in your Start and Intermediate Event Beans has become much easier with the new fluent <a href="${docBaseUrl}/public-api/ch/ivyteam/ivy/process/beans/IPoller.html">`poll()`</a> API
- **Monitoring**: Monitor all jobs and all your Start and Intermediate Event Beans in the new <a href="${docBaseUrl}/engine-guide/reference/engine-cockpit/monitor.html#jobs">Jobs</a>, <a href="${docBaseUrl}/engine-guide/reference/engine-cockpit/monitor.html#start-events">Start Events</a>, and <a href="${docBaseUrl}/engine-guide/reference/engine-cockpit/monitor.html#intermediate-events">Intermediate Events</a> view of the Engine Cockpit.

<div class="short-links">
	<a href="${docBaseUrl}/engine-guide/configuration/advanced-configuration.html#cron-expression"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-book"></i> Engine Guide - Configuration
	</a>
</div>
<div class="short-links">
	<a href="${docBaseUrl}/engine-guide/reference/engine-cockpit/monitor.html#start-events"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-book"></i> Engine Guide - Monitor
	</a>
</div>
<div class="short-links">
	<a href="${docBaseUrl}/public-api/ch/ivyteam/ivy/process/beans/IPoller.html"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-book"></i> Public API
	</a>
</div>


