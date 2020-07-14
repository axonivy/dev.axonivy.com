## Testing

It has never been easier as today to write unit tests that verify the quality of your workflow application.
Though testing of your components has always been possible, the new Axon.ivy platform makes writing and maintenance of tests much easier:

- __@IvyTest__: a JUnit 5 annotation that make calls against the Ivy environment possible.
- __@IvyProcessTest__: provides a rich BpmClient API to simulate processes being executed by test users. Assertions on the process flow and the returned data are possible.
- __@IvyWebTest__: orchestrates a real browser in order to simulate users working on your Html Dialogs.

<div class="short-links">
	<a href="${docBaseUrl}/concepts/testing/index.html" target="_blank" rel="noopener noreferrer">
	  <i class="fas fa-check-circle"></i> Concepts: Testing
	</a>
</div>
