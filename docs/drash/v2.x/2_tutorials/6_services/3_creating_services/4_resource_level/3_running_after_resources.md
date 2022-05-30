# Running After Resources

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial goes over creating a resource-level service that runs after a
resource for requests only to that resource.

Specifically, it will show you how you can set a response header on all requests
to a resource. You will create two resources:

1. A resource that applies the response header service; and
2. A resource that does not apply the response header service.

Since this tutorial goes over a resource-level service, you will not use the
`services` config when creating your server. Instead, you will use the `ALL`
field in the `services` property in the resource that uses the service.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  resources/
       response_modified_resource.ts
       response_not_modified_resource.ts
  ▾  services/
       response_header_service.ts
     app.ts
     deps.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";
   import ResponseModifiedResource from "./resources/response_modified_resource.ts";
   import ResponseNotModifiedResource from "./resources/response_not_modified_resource.ts";

   const server = new Drash.Server({
     resources: [
       ResponseModifiedResource,
       ResponseNotModifiedResource,
     ],
     hostname: "localhost",
     port: 1447,
     protocol: "http",
   });

   // Run your server

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

2. Create your `services/response_header_service.ts` file.

   The service in this file will be in charge of making sure responses have the
   `X-CUSTOM-HEADER` header.

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
     public runAfterResource(
       request: Drash.Request,
       response: Drash.Response,
     ): void {
       response.headers.set("X-CUSTOM-HEADER", "Got modified!");
     }
   }

   export default new ResponseHeaderService();
   ```

3. Create your `resources/resonse_modified_resource.ts` file.

   The resource in this file will have its responses modified by the
   `ResponseHeaderService` class. Specifically, all responses will have the
   `X-CUSTOM-HEADER` header applied.

   ```typescript
   // File: resources/response_modified_resource.ts

   import { Drash } from "../deps.ts";
   import responseHeaderService from "../services/response_header_service.ts";

   export default class ResponseModifiedResource extends Drash.Resource {
     public paths = ["/modified"];

     public services = {
       // For all requests, run the response header service
       ALL: [responseHeaderService],
     };

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text(
         "X-CUSTOM-HEADER is present in the response headers.",
       );
     }
   }
   ```

4. Create your `resources/response_not_modified_resource.ts` file.

   The resource in this file will not be be using the `ResponseHeaderService`.
   This means all responses from this resource will not have the
   `X-CUSTOM-HEADER` header applied.

   ```typescript
   // File: resources/response_not_modified_resource.ts

   import { Drash } from "../deps.ts";

   export default class ResponseNotModifiedResource extends Drash.Resource {
     public paths = ["/not-modified"];

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text(
         "X-CUSTOM-HEADER is not present in the response headers.",
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
   `http://localhost:1447/not-modified`.

   ```text
   $ curl -v http://localhost:1447/not-modified
   ```

   Since this resource is not using the `ResponseHeaderService` class, you
   should receive the following response (without the `X-CUSTOM-HEADER` header):

   ```text
   *   Trying ::1...
   * TCP_NODELAY set
   * Connection failed
   * connect to ::1 port 1447 failed: Connection refused
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > GET /not-modified HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: text/plain
   < vary: Accept-Encoding
   < content-length: 55
   < date: Sun, 03 Apr 2022 15:51:16 GMT
   <
   * Connection #0 to host localhost left intact
   X-CUSTOM-HEADER is not present in the response headers.* Closing connection 0
   ```

   Notice that the response does not contain `x-custom-header` with
   `Got modified!`.

3. Make a `GET` request to `http://localhost:1447/modified`.

   ```text
   $ curl -v http://localhost:1447/modified
   ```

   Since this resource is using the `ReponseHeaderService` class for all
   requests, you should receive the following response:

   ```text
   *   Trying ::1...
   * TCP_NODELAY set
   * Connection failed
   * connect to ::1 port 1447 failed: Connection refused
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > GET /modified HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: text/plain
   < x-custom-header: Got modified!
   < vary: Accept-Encoding
   < content-length: 51
   < date: Sun, 03 Apr 2022 15:52:47 GMT
   <
   * Connection #0 to host localhost left intact
   X-CUSTOM-HEADER is present in the response headers.* Closing connection 0
   ```

   Notice that the response does not contain `x-custom-header` with
   `Got modified!`.
