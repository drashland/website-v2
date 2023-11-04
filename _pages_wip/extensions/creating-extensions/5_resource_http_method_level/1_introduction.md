# Introduction

Resource HTTP method level services execute only on:

- The resource they are added to; and
- The HTTP method they target.

To add resource HTTP method level services, use the HTTP method field (e.g.,
`GET`, `POST`, `PUT`) in the `services` property in your resource class. For
example:

```typescript
// File: app.ts

// @Import drash_from_deno

import {
  GETService,
  POSTService,
  PUTService,
} from "/path/to/some_file_that_exports_services.ts";

export default class HomeResource extends Drash.Resource {
  public paths = ["/"];

  // All services must be instantiated using the `new` keyword in the array
  public services = {
    // Run the following service on all GET requests to this resource
    GET: [
      new GETService(),
    ],

    // Run the following service on all POST requests to this resource
    POST: [
      new POSTService(),
    ],

    // Run the following service on all PUT requests to this resource
    PUT: [
      new PUTService(),
    ],
  };
}
```
