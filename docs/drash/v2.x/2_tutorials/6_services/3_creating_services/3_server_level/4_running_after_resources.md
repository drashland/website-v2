# Running After Resources

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial goes over creating a server-level service that runs after a
resource for all requests.

Specifically, it will show you how you can set a response header on all
responses to all requests.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  resources/
       response_modified_resource.ts
  ▾  services/
       response_header_service.ts
     app.ts
     deps.ts
```

## Steps

1. {{ placeholder: create_deps_file_step_drash }}

1. Create your `app.ts` file.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";
   import ResponseModifiedResource from "./resources/response_modified_resource.ts";
   import responseHeaderService from "./services/response_header_service.ts";

   // Create your server and plug in the instantiated AuthenticationService class

   const server = new Drash.Server({
     resources: [
       ResponseModifiedResource,
     ],
     services: [
       responseHeaderService,
     ],
     hostname: "localhost",
     port: 1447,
     protocol: "http",
   });

   // Run your server

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

1. Create your `services/response_header_service.ts` file.

   The service in this file will be in charge of making sure all responses
   contain the `X-CUSTOM-HEADER` header.

   ```typescript
   // File: services/response_header_service.ts

   import { Drash } from "../deps.ts";

   class ResponseHeaderService extends Drash.Service {
     /**
      * Run the following code after a resource is hit.
      */
     public runAfterResource(
       request: Drash.Request,
       response: Drash.Response,
     ): void {
       response.headers.set("X-CUSTOM-HEADER", "Got modified!");
     }
   }

   export default new ResponseHeaderService();
   ```

1. Create your `resources/response_modified_resource.ts` file.

   The resource in this file sends a response without modifying its headers.
   After this resource is run by the server, the `ResponseHeaderService` class
   will be called and it will set the `X-CUSTOM-HEADER` header on the response
   -- ensuring the header is present for the client.

   ```typescript
   // File: resources/response_modified_resource.ts

   import { Drash } from "../deps.ts";

   export default class ResponseModifiedResource extends Drash.Resource {
     public paths = ["/"];

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text(
         "This response should have an X-CUSTOM-HEADER response header.",
       );
     }
   }
   ```

## Verification

1. Run your app.

   ```typescript
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447`.

   ```text
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
   < x-custom-header: Got modified!
   < vary: Accept-Encoding
   < content-length: 61
   < date: Sun, 03 Apr 2022 03:41:06 GMT
   <
   * Connection #0 to host localhost left intact
   This response should have an X-CUSTOM-HEADER response header.* Closing connection 0
   ```

   Notice that the response contains `x-custom-header` with `Got modified!`. To
   test that the response header does not get set, you can comment out
   `responseHeaderService` in your `app.ts` file, restart your app, and make the
   same `curl` request above. You will notice the response does not contain the
   header anymore.
