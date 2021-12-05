# Adding Resource-Level Services

Resource-level services execute only on the resource they are added to.

To add resource-level services, use the `services` property in your resource
class. For example:

```typescript
import { Drash } from "./deps.ts";

import {
  AllRequestsService,
  GetRequestsService,
  DeleteRequestsService,
  PostRequestsService,
  PutRequestsService,
} from "/path/to/some_file_that_exports_services.ts";

export default class HomeResource extends Drash.Resource {

  public paths = ["/"];

  // All services must be instantiated using the `new` keyword in the arrays
  public services = {
    // Run services on all requests
    ALL: [ new AllRequestsService() ],

    // Run services only on GET requests
    GET: [ new GetRequestsService() ],

    // Run services only on DELETE requests
    PUT: [ new DeleteRequestsService() ],

    // Run services only on POST requests
    POST: [ new PostRequestsService() ],

    // Run services only on PUT requests
    PUT: [ new PutRequestsService() ],

    // Run services only on CONNECT requests
    CONNECT: [ ... ],

    // Run services only on HEAD requests
    HEAD: [ ... ],

    // Run services only on OPTIONS requests
    OPTIONS: [ ... ],

    // Run services only on PATCH requests
    PATCH: [ ... ],

    // Run services only on TRACE requests
    TRACE: [ ... ],
  };
}
```
