# Handling URL Encoded Bodies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

You can get a value from an `application/x-www-form-urlencoded` request body by
using the following in a resource:

```typescript
const param = request.bodyParam("param_name");
// or const param = request.bodyParam<SomeType>("param_name");
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   // app.ts

   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public POST(request: Drash.Request, response: Drash.Response): void {
       // Check for the param
       const param = request.bodyParam("name");

       // No param passed in? Get out.
       if (!param) {
         throw new Drash.Errors.HttpError(
           400,
           "This resource requires the `name` body param.",
         );
       }

       return response.text(`You passed in the following body param: ${param}`);
     }
   }

   // Create and run your server

   const server = new Drash.Server({
     hostname: "0.0.0.0",
     port: 1447,
     protocol: "http",
     resources: [
       HomeResource,
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

2. Using `curl` (or similar command), make a `POST` request to
   `http://localhost:1447/` and pass in `{"name":"deno"}` in the request body.

   ```text
   $ curl --header "Content-Type: application/x-www-form-urlencoded" \
   --request POST \
   --data '{"name":"deno"}' \
   http://localhost:1447
   ```

   You should receive the following response:

   ```text
   You passed in the following body param: deno
   ```

3. Make the same request, but change the data to use `username` instead of
   `name`.

   ```text
   $ curl --header "Content-Type: application/x-www-form-urlencoded" \
   --request POST \
   --data '{"username":"deno"}' \
   http://localhost:1447
   ```

   You should receive the following response:

   ```text
   This resource requires the `name` body param.
   ```
