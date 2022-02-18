# Add Wocket as a Dependency

## Table of Contents

- [Add Wocket as a Dependency](#add-wocket-as-a-dependency)
- [Managing Dependencies](#managing-dependencies)

## Add Wocket as a Dependency

Before you get started with any tutorial, make sure you create a `deps.ts` file
(at the root of your project) for the tutorial you are viewing and **_add Wocket
as a dependency_** in the file like so:

```typescript
// deps.ts

export {
  Server,
  WebSocketClient,
} from "https://deno.land/x/wocket@<VERSION>/mod.ts";
```

Replace `<VERSION>` with the latest version of **Wocket v1.x**. The latest
version can be found
[here](https://github.com/drashland/wocket/releases/latest?q=v3&expanded=true).

The `deps.ts` file is **_required_** for all tutorials. Tutorials will reference
the `deps.ts` file in code blocks like so:

```typescript
// some_file.ts

import { Server } from "./deps.ts";
```

You will also notice that this file is referenced in the **Folder Structure End
State** section in the tutorials like so:

```text
▾ /path/to/your/project/
  deps.ts
```

Please make sure you have this file created and set up properly.

Whilst using our own `WebSocketClient` isn't required, our documentation will
use it, and it makes interacting with the server easy to do.

## Managing Dependencies

You can read more about managing dependencies and the use of a `deps.ts` file in
Deno [here](https://deno.land/manual/examples/manage_dependencies).
