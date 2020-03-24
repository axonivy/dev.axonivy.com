## Custom Fields
Customizing a task and case list based on process data is easier than ever before.
Put data in the custom field store of the task or case and it becomes automatically searchable.
In addition, it can also be helpful for workflow process reporting.

 * __MEANINGFUL NAME__: Name the custom field as you like.
 * __SEARCHABLE__: You won't miss any search capabilities. Simply use `TaskQuery` and `CaseQuery` API to filter, aggregate and order by custom fields.
 * __STRONG TYPING__: All custom fields are strongly typed. You can choose between `STRING`, `TEXT`, `NUMBER` and `TIMESTAMP`.

```java
TaskQuery.create().where()
        .customField().stringField("branchOffice").isEqual("Zug")
      .and()
        .customField().numberField("creditLimit").isGreaterThan(10_000);
```

__Legacy Support__: Forget the additional properties, the limited old custom fields, the strange business fields and the legacy categorization.
You don't need them anymore. But we are fully backward compatible. All legacy API calls will be mapped to custom fields.
All inscribed inscriptions in your project will automatically be converted.

<div class="short-links">
	<a href="/doc/8.0.latest/public-api/ch/ivyteam/ivy/workflow/custom/field/ICustomFields.html" target="_blank">
	  <i class="fab fa-java"></i> Public API Custom Field
	</a>
	<a href="/doc/8.0.latest/public-api/ch/ivyteam/ivy/workflow/query/TaskQuery.IFilterableColumns.html#customField--" target="_blank">
	  <i class="fab fa-java"></i> Public API Query
	</a>
</div>
