# Add Line as a Dependency

## Table of Contents

- [Add Line as a Dependency](#add-line-as-a-dependency)
- [Managing Dependencies](#managing-dependencies)

## Add Line as a Dependency

Before you get started with any tutorial, make sure you create a `deps.ts` file
(at the root of your project) for the tutorial you are viewing and **_add Line
as a dependency_** in the file like so:

```typescript
// deps.ts

export * as Line from "https://deno.land/x/line@<VERSION>/mod.ts";
```

Replace `<VERSION>` with the latest version of **Line v1.x**. The latest version
can be found [here](https://github.com/drashland/line/releases/latest).

The `deps.ts` file is **_required_** for all tutorials. Tutorials will reference
the `deps.ts` file in code blocks like so:

```typescript
// some_file.ts

import { Line } from "./deps.ts";
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
