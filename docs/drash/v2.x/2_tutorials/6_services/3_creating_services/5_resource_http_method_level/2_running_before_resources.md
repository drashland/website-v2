# Running Before Resources

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

_Disclaimer: The service shown in this tutorial is just a proof of concept. You
should not use this service in a production environment. It is not secure._

This tutorial goes over creating a resource HTTP method level service that runs
before a resource for `POST` requests only to a specific resource.

Specifically, it will show you how you can check a user's role to see if they
can view or upload files. Users with the `admin` role will be able to upload
files, users with the `user` role will not be able to upload files, and users
with any role will be able to view files.

Since this tutorial goes over a resource HTTP method level service for `POST`
requests, you will not use the `services` config when creating your server.
Instead, you will use the `POST` field in the `services` property in the
resource that uses the service.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  resources/
       files_resource.ts
  ▾  services/
       can_upload_service.ts
     app.ts
     deps.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";
   import FilesResource from "./resources/files_resource.ts";

   const server = new Drash.Server({
     resources: [
       FilesResource,
     ],
     hostname: "0.0.0.0",
     port: 1447,
     protocol: "http",
   });

   // Run your server

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

2. Create your `services/can_upload_service.ts` file.

   The service in this file will be used in the `FilesResource` (created in the
   next step) to check if a user can upload files via `POST` requests.

   ```typescript
   // File: services/can_upload_service.ts

   import { Drash } from "../deps.ts";

   class CanUploadService extends Drash.Service {
     /**
      * Map to hold usernames and their roles.
      */
     #users = new Map<string, string>([
       ["user_1", "admin"], // Can upload files
       ["user_2", "user"], // Cannot upload files
     ]);

     /**
      * Run the following code before a resource is hit.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client (if needed).
      */
     public runBeforeResource(
       request: Drash.Request,
       response: Drash.Response,
     ): void {
       const username = request.queryParam("username");
       if (!username) {
         throw new Drash.Errors.HttpError(
           401,
           "You are not authorized! Username not provided.",
         );
       }

       const role = this.#users.get(username);

       // End the lifecycle if the role requirements have not been met
       if (role !== "admin") {
         throw new Drash.Errors.HttpError(
           401,
           "You are not authorized to upload files!",
         );
       }
     }
   }

   export default new CanUploadService();
   ```

3. Create your `resources/files_resource.ts` file.

   The resource in this file will have its `POST` method protected by the
   `CanUploadService` class. Since the `CanUploadService` class will be applied
   to this resource's `POST` method, any client making a `POST` request to this
   resource must pass in a user that has a role of `admin`.

   - If the user's role in the request is not `admin`, then the client will
     receive a `401` response from the `CanUploadService` class when making a
     `POST` request.
   - If the user's role in the request is `admin`, then the client will receive
     a `File uploaded!` response when making a `POST` request.

   Also, any client with any role will be able to make `GET` requests since
   `CanUploadService` will only be applied to `POST` requests.

   ```typescript
   // File: resources/files_resource.ts

   import { Drash } from "../deps.ts";
   import canUploadService from "../services/can_upload_service.ts";

   export default class FilesResource extends Drash.Resource {
     public paths = ["/files"];

     public services = {
       // For POST requests, run the service
       POST: [canUploadService],
     };

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text("You can view files!");
     }

     /**
      * Handle POST requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public POST(request: Drash.Request, response: Drash.Response): void {
       return response.text("File uploaded!");
     }
   }
   ```

## Verification

1. Run your app.

   ```typescript
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447/files`.

   ```text
   $ curl http://localhost:1447/files
   ```

   Since this resource's `GET` method is not protected by the `CanUploadService`
   class, you should receive the following response:

   ```text
   You can view files!
   ```

3. Make a `POST` request to `http://localhost:1447/files`.

   ```text
   $ curl -X POST http://localhost:1447/files
   ```

   Since this resource's `POST` method is protected by the `CanUploadService`
   class, you should receive the following error message:

   ```text
   Error: You are not authorized! Username not provided.
   ```

4. Make the same request, but add the `username` query parameter with `user_2`
   as the value.

   ```text
   $ curl -X POST http://localhost:1447/files?username=user_2
   ```

   Since `user_2` does not have a role of `admin`, you should receive the
   following error message:

   ```text
   Error: You are not authorized to upload files!
   ```

5. Make the same request, but change the `username` query parameter value to
   `user_1`.

   ```text
   $ curl -X POST http://localhost:1447/files?username=user_1
   ```

   You should receive the following response since `user_1` has a role of
   `admin`:

   ```text
   File uploaded!
   ```

The above verification steps show the error stack strace. This is the default
behavior in Drash. If you want to learn more about handling errors, read
[Error Handling](/drash/v2.x/tutorials/servers/error-handling).
