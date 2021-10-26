# Handling JSON Bodies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

You can get a value from an `application/json` request body by using the
following in a resource:

```typescript
const param = this.request.getBodyParam("param_name");
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will check for the
   `name` param in the request's body. If it exists, then it will return what
   was passed in. If it does not exist, then it will throw a `400 Bad Request`
   response.

   ```typescript
   // app.ts

   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Http.Resource {
     static paths = [
       "/",
     ];

     public POST() {
       const param = this.request.getBodyParam("name");

       if (!param) {
         throw new Drash.Exceptions.HttpException(
           400,
           "This resource requires the `name` body param.",
         );
       }

       this.response.body = `You passed in the following body param: ${param}`;

       return this.response;
     }
   }

   // Create your server

   const server = new Drash.Http.Server({
     response_output: "text/plain",
     resources: [HomeResource],
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

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `POST` request to `localhost:1447/`
   and pass in `{"name":"deno"}` in the request body.

   ```text
   $ curl --header "Content-Type: application/json" \
   --request POST \
   --data '{"name":"deno"}' \
   localhost:1447
   ```

You should receive the following response:

    ```text
    You passed in the following body param: deno
    ```

2. Make the same request, but change the data to use `username` instead of
   `name`.

   ```text
   $ curl --header "Content-Type: application/json" \
   --request POST \
   --data '{"username":"deno"}' \
   localhost:1447
   ```

You should receive the following response:

    ```text
    This resource requires the `name` body param.
    ```
