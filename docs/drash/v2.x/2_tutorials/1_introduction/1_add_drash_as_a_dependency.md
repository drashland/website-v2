# Add Drash as a Dependency

## Table of Contents

- [Add Drash as a Dependency](#add-drash-as-a-dependency)
- [Managing Dependencies](#managing-dependencies)

## Add Drash as a Dependency

All tutorials will either reference a `deps.ts` file in example code blocks or
have a "Create your `deps.ts` file" step.

The `deps.ts` file is a Deno convention. You can read more about managing
dependencies and the use of a `deps.ts` file in Deno
[here](https://deno.land/manual/examples/manage_dependencies).

## Please Replace the Version Placeholder!

All tutorials with example code blocks that import or export `Drash` will have a
version placeholder. See the example below with the `<LATEST v2.x VERSION>`
placeholder.

```typescript
// deps.ts

export * as Drash from "https://deno.land/x/drash@<LATEST v2.x VERSION>/mod.ts";
```

Please make sure you replace this `<LATEST v2.x VERSION>` placeholder with the
latest version of **Drash v2.x**. The latest version can be found
[here](https://github.com/drashland/drash/releases/latest).
