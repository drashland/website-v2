# Add Drash a Dependency

Before you get started with any tutorial, make sure you create a `deps.ts` file for the tutorial **_and add Drash as a dependency_** in the file like so:

```typescript
// deps.ts

export { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts"
```

This file is **_required_** for all tutorials. Tutorials will reference this `deps.ts` file in code blocks like so:

```typescript
// some_file.ts

import { Drash } from "./deps.ts";
```

You will also notice that this file is referenced in the **Folder Structure End State** section in the tutorials like so:

```text
▾ /path/to/your/project/
  deps.ts
```

Please make sure you have this file created and set up properly.

## Managing Dependencies

You can read more about managing dependencies and the use of a `deps.ts` file in Deno [here](https://deno.land/manual/examples/manage_dependencies).