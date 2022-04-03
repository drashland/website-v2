# Dexter

Dexter is a logging service inspired by
[expressjs/morgan](https://github.com/expressjs/morgan). It is configurable and
can be used throughout the request-resource-response lifecycle.

When used, it will log information on a request to the stdout, such as request
method and request URL, response time. This service will run before and after a
resource method is called.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Example](#example)
- [Configuration](#configuration)
- [Tutorials](#tutorials)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { DexterService } from "https://deno.land/x/drash@<VERSION>/src/services/dexter/dexter.ts";
```

Replace `<VERSION>` with the **Drash v2.x** version you want to use. All
versions can be found
[here](https://github.com/drashland/drash/releases?q=v2&expanded=true).

## Example

```typescript
import { Drash } from "./deps.ts";

// Import the Dexter service
import { DexterService } from "./deps.ts";

// Instantiate dexter
const dexter = new DexterService(); // By default, will display the date and time of the request

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello");
  }
}

// Create your server and plug in dexter to the middleware config
const server = new Drash.Server({
  resources: [
    HomeResource,
  ],
  services: [
    dexter,
  ],
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
});

server.run();

console.log(`Server running at ${server.address}`);
```

## Configuration

### `datetime`

Will display the date and time of when the request was handled. Example logging
output would be: `[INFO] 2021-07-08 19:59:50 | Request received`.

Note that this option is enabled by default. Set `datetime` to `false` when
calling `new DexterService()` to disable this.

### `url`

Will display the requested URL. Example logging output would be:
`[INFO] /users | Request received`.

### `method`

Will display the HTTP verb (method) of the request. Example logging output would
be: `[INFO] GET | Request received`.

### `response_time`

If you want to see how fast your responses are taking, then use this config.
This config will output something similar to `Response sent. [2 ms]`.

```typescript
const dexter = new DexterService({
  enabled: true,
  response_time: true, // or false
});
```

## Tutorials

### Reusing Dexter in resource classes (or other parts of your codebase)

You can reuse Dexter in your codebase by accessing its `logger`. For example, if
you want to use Dexter in one of your resources, then do the following:

1. Set up your `deps.ts` file to export a `dexter` object.

   ```typescript
   // deps.ts

   export * as Drash from { ... };
   import { DexterService } from { ... };

   export const dexter = new DexterService({
     enabled: true,
     level: "debug",
     tag_string: "{request_method} {request_url} |",
   });
   ```

2. Create your `app.ts` file.

   ```typescript
   // app.ts

   import { dexter, Drash } from "./deps.ts";
   import { HomeResource } from "./home_resource.ts";

   const server = new Drash.Server({
     resources: [
       HomeResource,
     ],
     services: [
       dexter,
     ],
     protocol: "http",
     port: 1447,
     hostname: "0.0.0.0",
   });

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

3. Create your `home_resource.ts` file.

   ```typescript
   // home_resource.ts

   import { dexter, Drash } from "./deps.ts";

   export class HomeResource extends Drash.Resource {
     paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response) {
       // Access Dexter's logger from it's prototype and log some messages
       dexter.logger.debug("This is a log message.");
       dexter.logger.error("This is a log message.");
       dexter.logger.fatal("This is a log message.");
       dexter.logger.info("This is a log message.");
       dexter.logger.trace("This is a log message.");
       dexter.logger.warn("This is a log message.");

       return response.text("GET request received!");
     }
   }
   ```
