# Running Before Resources

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

_Disclaimer: The service shown in this tutorial is just a proof of concept. You
should not use this service in a production environment. It is not secure._

This tutorial goes over creating a server-level service that runs before a
resource for all requests.

Specifically, it will show you how you can create an authentication service
proof of concept.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  resources/
       protected_resource.ts
  ▾  services/
       authentication_service.ts
     app.ts
     deps.ts
```

## Steps

1. {{ placeholder: drash_create_deps_file_step }}

1. Create your `app.ts` file.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";
   import ProtectedResource from "./resources/protected_resource.ts";
   import authenticationService from "./services/authentication_service.ts";

   // Create your server and plug in the instantiated AuthenticationService class

   const server = new Drash.Server({
     resources: [
       ProtectedResource,
     ],
     services: [
       authenticationService,
     ],
     hostname: "localhost",
     port: 1447,
     protocol: "http",
   });

   // Run your server

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

1. Create your `services/authentication_service.ts` file.

   The service in this file will be in charge of making sure all requests have
   the `username` and `token` query parameters; and they must match the ones
   defined in the `#users` property.

   ```typescript
   // File: services/authentication_service.ts

   import { Drash } from "../deps.ts";

   class AuthenticationService extends Drash.Service {
     /**
      * Map to hold usernames and tokens.
      */
     #users = new Map<string, string>([
       ["user_1", "token_1"],
       ["user_2", "token_2"],
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

       const providedToken = request.queryParam("token");
       if (!providedToken) {
         throw new Drash.Errors.HttpError(
           401,
           "You are not authorized! Token not provided.",
         );
       }

       const token = this.#users.get(username);

       // End the lifecycle if the authentication requirements have not been met
       if (token !== providedToken) {
         throw new Drash.Errors.HttpError(
           401,
           "You are not authorized! Invalid credentials.",
         );
       }
     }
   }

   export default new AuthenticationService();
   ```

1. Create your `resources/protected_resource.ts` file.

   The resource in this file will be protected by the `AuthenticationService`
   class. Since the `AuthenticationService` class will be filtering all
   requests, any request should not see the response in this resource unless the
   request meets all of the `AuthenticationService` class' requirements
   (requires a `username` and `token`).

   ```typescript
   // File: resources/protected_resource.ts

   import { Drash } from "../deps.ts";

   export default class ProtectedResource extends Drash.Resource {
     public paths = ["/"];

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.text("You successfully authenticated!");
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
   $ curl http://localhost:1447
   ```

   You should receive the following error message:

   ```text
   Error: You are not authorized! Username not provided.
   ```

3. Make the same request, but add the `username` query parameter with `user_1`
   as the value.

   ```text
   $ curl http://localhost:1447?username=user_1
   ```

   You should receive the following error message:

   ```text
   Error: You are not authorized! Token not provided.
   ```

4. Make the same request, but add the `token` query parameter with `token_1` as
   the value.

   ```text
   $ curl "http://localhost:1447?username=user_1&token=token_1"
   ```

   _You may need to wrap the URL in quotes to prevent `&` from starting a
   background process._

   You should receive the following message from `ProtectedResource`:

   ```text
   You successfully authenticated!
   ```

5. Make the same request, but change the token value to exercise a token
   mismatch.

   ```text
   $ curl "http://localhost:1447?username=user_1&token=token_2"
   ```

   _You may need to wrap the URL in quotes to prevent `&` from starting a
   background process._

   You should receive the following error message:

   ```text
   Error: You are not authorized! Invalid credentials.
   ```

The above verification steps show the error stack strace. This is the default
behavior in Drash. If you want to learn more about handling errors, read
[Error Handling](/drash/v2.x/tutorials/servers/error-handling).
