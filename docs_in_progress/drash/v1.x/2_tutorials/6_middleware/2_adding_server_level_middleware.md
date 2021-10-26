# Adding Server-Level Middleware

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Server-level middleware is middleware executed by the server on _every_ request.
You define server-level middleware when you create your server object.
Server-level middleware can be executed at the following points in the
request-resource-response lifecycle:

- when the server starts;
- before the request is made;
- after the request is matched to a resource; and
- after the request is made

Take the example below. There is a set of server-level middleware that will
execute throughout the request-resource-response lifecycle.

- `ServeTypeScript` executes at compile time
- `Auth` executes before each request is made
- `TemplateEngine` executes after a request is matched to a resource
- `CleanUpData` executes after each request is made

```typescript
const server = new Drash.Http.Server({
  middleware: {
    compile_time: [
      ServeTypeScript,
    ],
    before_request: [
      Auth,
    ],
    after_resource: [
      TemplateEngine,
    ],
    after_request: [
      CleanUpData,
    ],
  },
});
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  home_resource.ts
  verify_token_middleware.ts
```

## Steps

1. Create your `home_resource.ts` file.

   ```typescript
   import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

   export default class HomeResource extends Drash.Http.Resource {
     static paths = ["/"];

     public GET() {
       this.response.body = {
         method: "GET",
         body: "Hello!",
       };

       return this.response;
     }
   }
   ```

2. Create your `verify_token_middleware.ts` file. This file takes in the
   `request` and `response` params.

   ```typescript
   import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

   export default function VerifyTokenMiddleware(
     request: Drash.Http.Request,
     response?: Drash.Http.Response,
   ): void {
     let token = request.getUrlQueryParam("super_secret_token");

     if (!token) {
       throw new Drash.Exceptions.HttpMiddlewareException(
         400,
         "Where is the token?",
       );
     }

     if (token != "AllYourBaseAreBelongToUs") {
       throw new Drash.Exceptions.HttpMiddlewareException(
         403,
         `Mmm... "${token}" is a bad token.`,
       );
     }
   }
   ```

Your middleware will check if `super_secret_token` was passed in the request's
URL. If not, then a `400` error will be thrown. It will also check if the value
of `super_secret_token` is `AllYourBaseAreBelongToUs`. If not, then a `403`
error will be thrown.

3. Create your `app.ts` file.

   ```typescript
   import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

   import HomeResource from "./home_resource.ts";
   import VerifyTokenMiddleware from "./verify_token_middleware.ts";

   const server = new Drash.Http.Server({
     middleware: {
       before_request: [
         VerifyTokenMiddleware,
       ],
     },
     resources: [
       HomeResource,
     ],
     response_output: "application/json",
   });

   server.run({
     hostname: "0.0.0.0",
     port: 1447,
   });

   console.log(
     `Server running. Go to http://${server.hostname}:${server.port}.`,
   );
   ```

## Verification

You can verify that your app's code works by making requests like the ones
below. Since this tutorial's app sets `application/json` as the response_output,
the server responds to requests with JSON by default.

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Make a request using `curl` or go to `localhost:1447` in your web browser.

   ```shell
   $ curl localhost:1447
   ```

`VerifyTokenMiddleware` is run on every request because it was specified as
server-level middleware. This request is missing the `super_secret_token` query
param; therefore, you should receive the following response:

    ```text
    "Where is the token?"
    ```

3. Make the same request with a bad token.

   ```shell
   $ curl localhost:1447/?super_secret_token=IsThisIt
   ```

You should receive the following response:

    ```text
    "Mmm... \"IsThisIt\" is a bad token."
    ```

4. Make the same request with the expected token.

   ```shell
   $ curl localhost:1447/?super_secret_token=AllYourBaseAreBelongToUs
   ```

You should receive the following response (we pretty-printe the response for
you):

    ```json
    {
      "method": "GET",
      "body": "Hello!"
    }
    ```
