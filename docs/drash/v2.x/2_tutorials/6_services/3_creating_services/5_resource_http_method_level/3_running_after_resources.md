# Running After Resources

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial goes over creating a resource HTTP method level service that runs
after a resource for `POST` requests only to a specific resource.

Specifically, it will show you how you can add a response header to responses
for `POST` requests.

Since this tutorial goes over a resource HTTP method level service for `POST`
requests, you will not use the `services` config when creating your server.
Instead, you will use the `POST` field in the `services` property in the
resource that uses the service.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  resources/
       response_modified_for_post_resource.ts
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
   import ResponseModifiedForPostResource from "./resources/response_modified_for_post_resource.ts";

   const server = new Drash.Server({
     resources: [
       ResponseModifiedForPostResource,
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

   The service in this file will be used in the
   `ResponseModifiedForPostResource` (created in the next step) to add a
   `X-CUSTOM-HEADER` response header.

   ```typescript
   // File: services/response_header_service.ts

   import { Drash } from "../deps.ts";

   class ResponseHeaderService extends Drash.Service {
     /**
      * Run the following code after a resource is hit.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client (if needed).
      */
     public runBeforeResource(
       request: Drash.Request,
       response: Drash.Response,
     ): void {
       response.headers.set("X-CUSTOM-HEADER", "Got modified!");
     }
   }

   export default new ResponseHeaderService();
   ```

1. Create your `resources/response_modified_for_post_resource.ts` file.

   The resource in this file will have its `POST` method using the
   `ResponseHeaderService`. Any `POST` request to this resource will receive a
   response with the `X-CUSTOM-HEADER` header applied.

   Also, any `GET` request made to this resource will not have the
   `X-CUSTOM-HEADER` header applied.

   ```typescript
   // File: resources/response_modified_for_post_resource.ts

   import { Drash } from "../deps.ts";
   import responseHeaderService from "../services/response_header_service.ts";

   export default class ResponseModifiedForPostResource extends Drash.Resource {
     public paths = ["/response-modified-for-post-requests"];

     public services = {
       // For POST requests, run the service
       POST: [responseHeaderService],
     };

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text("No X-CUSTOM-HEADER present in the response.");
     }

     /**
      * Handle POST requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public POST(request: Drash.Request, response: Drash.Response): void {
       return response.text("X-CUSTOM-HEADER is present in the response.");
     }
   }
   ```

## Verification

1. Run your app.

   ```typescript
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447/response-modified-for-post-requests`.

   ```text
   $ curl -v http://localhost:1447/response-modified-for-post-requests
   ```

   Since this resource's `GET` method does not use the `ResponseHeaderService`
   class, you should receive the following response:

   ```text
   *   Trying ::1...
   * TCP_NODELAY set
   * Connection failed
   * connect to ::1 port 1447 failed: Connection refused
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > GET /response-modified-for-post-requests HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: text/plain
   < vary: Accept-Encoding
   < content-length: 43
   < date: Sun, 03 Apr 2022 19:44:54 GMT
   <
   * Connection #0 to host localhost left intact
   No X-CUSTOM-HEADER present in the response.* Closing connection 0
   ```

   Notice that the response does not contain the `x-custom-header` header.

3. Make a `POST` request to
   `http://localhost:1447/response-modified-for-post-requests`.

   ```text
   $ curl -v -X POST http://localhost:1447/response-modified-for-post-requests
   ```

   Since this resource's `POST` method uses the `ResponseHeaderService` class,
   you should receive the following response:

   ```text
   *   Trying ::1...
   * TCP_NODELAY set
   * Connection failed
   * connect to ::1 port 1447 failed: Connection refused
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > POST /response-modified-for-post-requests HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: text/plain
   < x-custom-header: Got modified!
   < vary: Accept-Encoding
   < content-length: 43
   < date: Sun, 03 Apr 2022 20:42:48 GMT
   <
   * Connection #0 to host localhost left intact
   X-CUSTOM-HEADER is present in the response.* Closing connection 0
   ```

   Notice that the response contains `x-custom-header` with `Got modified!`.
