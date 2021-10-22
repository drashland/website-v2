# Add Sinco as a Dependency

## Table of Contents

* [Add Sinco as a Dependency](#add-sinco-as-a-dependency)
* [Managing Dependencies](#managing-dependencies)

## Add Sinco as a Dependency

Before you get started with any tutorial, make sure you create a `tests/deps.ts` file (at the root of your project) for the tutorial you are viewing and **_add Sinco as a dependency_** in the file like so:

```typescript
// deps.ts

export { buildFor } from "https://deno.land/x/sinco@v2.0.0/mod.ts"
```

This file is **_required_** for all tutorials. Tutorials will reference this `tests/deps.ts` file in code blocks like so:

```typescript
// tests/some_file.ts

import { buildFor } from "./deps.ts";
```

You will also notice that this file is referenced in the **Folder Structure End State** section in the tutorials like so:

```text
▾ /path/to/your/project/
  ▾  tests/
    deps.ts
```

Please make sure you have this file created and set up properly.

## Managing Dependencies

You can read more about managing dependencies and the use of a `deps.ts` file in Deno [here](https://deno.land/manual/examples/manage_dependencies).