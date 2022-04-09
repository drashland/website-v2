# Add Drash as a Dependency

## Table of Contents

- [Add Rhum as a Dependency](#add-rhum-as-a-dependency)
- [Managing Dependencies](#managing-dependencies)

## Add Rhum as a Dependency

Before you get started with any tutorial, make sure you create a `deps.ts` file
(at the root of your project) for the tutorial you are viewing and **_add Rhum
as a dependency_** in the file like so:

```typescript
// deps.ts

export { Rhum } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
```

Replace `<VERSION>` with the latest version of **Rhum v2.x**. The latest
version can be found [here](https://github.com/drashland/rhum/releases/latest).

The `deps.ts` file is **_required_** for all tutorials. Tutorials will reference
the `deps.ts` file in code blocks like so:

```typescript
// some_file.ts

import { Rhum } from "./deps.ts";
```

You will also notice that this file is referenced in the **Folder Structure End
State** section in the tutorials like so:

```text
▾ /path/to/your/project/
  deps.ts
```

Please make sure you have this file created and set up properly.

## Managing Dependencies

You can read more about managing dependencies and the use of a `deps.ts` file in
Deno [here](https://deno.land/manual/examples/manage_dependencies).
