# Dexter

Dexter is a logging service inspired by
[expressjs/morgan](https://github.com/expressjs/morgan). It is configurable and
can be used throughout the request-resource-response lifecycle.

When used, it will log information on a request to the stdout, such as the
request method, request URL, and response time. This service will run before and
after a resource method is called.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Example](#example)
- [Configuration](#configuration)
- [Tutorials](#tutorials)

## Before You Get Started

{{ placeholder: drash_edit_your_deps_file_to_include_the_service }}

```typescript
// File: deps.ts

// @Export drash_from_deno_no_version_comment
// @Export dexter_service_from_deno_no_version_comment
// ... rest
// ... of
// ... your
// ... deps
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. This assumes you edited your `deps.ts` file above.

   ```typescript
   // File: app.ts

   import { DexterService, Drash } from "./deps.ts";

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
     hostname: "localhost",
     port: 1447,
     protocol: "http",
   });

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `POST` request to
   `http://localhost:1447`.

   ```shell
   $ curl http://localhost:1447
   ```

   You should receive a response similar to the following:

   ```text
   Hello
   ```

   Also, if you look in the terminal where you ran your app, you should see
   something similar to the following:

   ```text
   [INFO] 2022-07-03 04:28:17 | Request received
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
   // File: app.ts

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
     hostname: "localhost",
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
