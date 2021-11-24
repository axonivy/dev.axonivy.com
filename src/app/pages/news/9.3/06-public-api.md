## Public API {#publicApi93}

With twenty years of project experience we knew what customers expect from a powerful process automation platform.
The newly added API makes process development even easier. 

- **ISecurity**: The new `ivy.security` and `Ivy.security()` API provide a lot of methods to manage users, roles, security members and sessions.
- **IRoleMatcher**: The new `ivy.session.has().role("Manager")` API makes it easy to check if the current session user has a certain role. 
  The same API is also available on a user `user.has().anyRoles("Manager", "Employee")`
  Additional new API which take a role name instead of a role makes it much easier to use them.
- **Sudo**: A new API to disable permission checking while executing some code `Sudo.call(() -> permissionCheckDisabledHere())`.
- **IvyRuntime**: A new API that provides information about the runtime (Designer or Engine) `IvyRuntime.isDesigner()` and the current version `IvyRuntime.version()`.
- **BooleanFieldOperation**: A new API to filter business data with boolean fields.
- **IBusinessCase**: A new API `getStartedFrom()` to find out how a business case was started. Either from a process start or a case map start.

<div class="short-links">
	<a href="${docBaseUrl}/public-api"
		target="_blank" rel="noopener noreferrer">
		<i class="si si-book"></i> Public API
	</a>
</div>
