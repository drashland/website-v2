# Introduction

Server-level services execute on all requests.

To add server-level services, use the `services` config when you create your
`server` object. For example:

```typescript
// File: app.ts

// @Import drash_from_deno

import SomeService from "./some/path/some_service.ts";
import SomeOtherService from "./some/path/some_other_service.ts";

const server = new Drash.Server({
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [ ... ],
  // All services must be instantiated using the `new` keyword in this array
  services: [
    new SomeService(),
    new SomeOtherService(),
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```
