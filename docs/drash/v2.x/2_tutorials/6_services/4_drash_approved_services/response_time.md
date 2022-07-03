# Response Time

This service was introduced in v2.2.0. Please make sure you are using v2.2.0 (or
higher) before proceeding with this tutorial.

This service will record how long a response takes for any given request, by
setting a `X-Response-Time` header on the response.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

{{ placeholder: drash_edit_your_deps_file_to_include_the_service }}

```typescript
// File: deps.ts

// @Export drash_from_deno_no_version_comment
// @Export response_time_service_from_deno_no_version_comment
// ... rest
// ... of
// ... your
// ... deps
```

This tutorial adds the `ResponseTimeService` to the server's `services` config.
This means `ResponseTimeService` will record the response time as follows:

- Drash receives request from client
- Request is passed to `ResponseTimeService` (`ResponseTimeService` starts
  timer)
- Request is passed to other services (if any)
- Request is passed to resource
- Request is pased to other services (if any)
- Request is passed to `ResponseTimeService` (`ResponseTimeService` ends timer
  and sets `X-Response-Time` header)
- Response is sent to client

If you want to record the response times only when the resource is hit, then add
the response time service to the resources that you want `X-Response-Time`
headers set. For example, if you add this service as a resource-level service,
then it will record the response time as follows:

- Drash receives request from client
- Request is passed to other services (if any)
- Request is passed to `ResponseTimeService` (`ResponseTimeService` starts
  timer)
- Request is passed to resource
- Request is passed to `ResponseTimeService` (`ResponseTimeService` ends timer
  and sets `X-Response-Time` header)
- Request is pased to other services (if any)
- Response is sent to client

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

   import { Drash, ResponseTimeService } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text("Hello, world!");
     }
   }

   // Create and run your server (with ResponseTimeServer instantiated)

   const server = new Drash.Server({
     hostname: "localhost",
     port: 1447,
     protocol: "http",
     resources: [
       HomeResource,
     ],
     services: [
       new ResponseTimeService(),
     ],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447`.

   ```shell
   $ curl -v http://localhost:1447
   ```

   You should receive a response similar to the following:

   ```text
   *   Trying ::1...
   * TCP_NODELAY set
   * Connection failed
   * connect to ::1 port 1447 failed: Connection refused
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > GET / HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: text/plain
   < x-response-time: 5ms
   < content-length: 13
   < date: Wed, 20 Oct 2021 02:20:33 GMT
   <
   * Connection #0 to host localhost left intact
   Hello, world!* Closing connection 0
   ```

   As you can see, the response contains the following header:

   ```text
   < x-response-time: 5ms
   ```
