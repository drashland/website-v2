# Adding Server-Level Services

Server-level services execute on all requests.

To add server-level services, use the `services` config when you create your
`server` object. For example:

```typescript
import { Drash } from "./deps.ts";

import SomeService from "./some/path/some_service.ts";
import SomeOtherService from "./some/path/some_other_service.ts";

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [ ... ],
  // All services must be instantiated using the `new` keyword in this array
  services: [
    new ServerService()
    new SomeOtherService(),
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```
